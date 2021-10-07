import React, { useEffect, useState } from 'react';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Checkbox, Container, SearchBox } from '../../HackneyDS';
import BrokeragePackageDates from '../BrokeragePackageDates';
import BrokerPackageCost from './BrokerPackageCost';
import BrokerageContainerHeader from '../BrokerageContainerHeader';
import BrokerPackageSelector from './BrokerPackageSelector';

export const BrokerPackage = ({ searchResult, careName = 'Nursing Care' }) => {
  const [isOngoing, setIsOngoing] = useState(false);
  const [supplierWeeklyCost, setSupplierWeeklyCost] = useState(0);
  const [supplierSearch, setSupplierSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [initialNeed] = useState({
    cost: 0,
    dates: {
      dateFrom: null,
      dateTo: null
    },
    isOngoing: false,
  });

  const [weeklyNeeds, setWeeklyNeeds] = useState([{ ...initialNeed }]);
  const [oneOffNeeds, setOneOffNeeds] = useState([{ ...initialNeed }]);
  const [weeklyTotalCost, setWeeklyTotalCost] = useState(0);
  const [oneOfTotalCost, setOneOfTotalCost] = useState(0);
  const [isNewSupplier, setIsNewSupplier] = useState(false);

  const [packageDates, setPackageDates] = useState({
    dateFrom: null,
    dateTo: null,
  });

  const onSearchSupplier = () => {
    alert('search supplier');
  };

  const clickBack = () => {
    alert('Click back');
  };

  const clickSave = () => {
    alert('Click save');
  };

  const changeNeed = (getter, setter, field, value, index) => {
    const cloneNeed = { ...getter[index] };
    if (field === 'cost') {
      cloneNeed.cost = value;
    } else if (field === 'isOngoing') {
      cloneNeed.isOngoing = value;
    } else {
      cloneNeed.dates = { ...cloneNeed.dates, [field]: value };
    }
    const cloneNeeds = getter.slice();
    cloneNeeds.splice(index, 1, cloneNeed);
    setter(cloneNeeds);
  };

  const addNeed = (setter) => {
    setter(prevState => ([
      ...prevState,
      { ...initialNeed },
    ]));
  };

  const removeNeed = (getter, setter, index) => {
    const copyGetter = getter.slice();
    copyGetter.splice(index, 1);
    setter(copyGetter);
  };

  useEffect(() => {
    let totalCost = Number(supplierWeeklyCost);
    if (weeklyNeeds) {
      weeklyNeeds.forEach(item => totalCost += Number(item.cost));
    }
    setWeeklyTotalCost(totalCost);
  }, [supplierWeeklyCost, weeklyNeeds]);

  useEffect(() => {
    let totalCost = Number(supplierWeeklyCost);
    if (oneOffNeeds) {
      oneOffNeeds.forEach(item => totalCost += Number(item.cost));
    }
    setOneOfTotalCost(totalCost);
  }, [supplierWeeklyCost, oneOffNeeds]);

  return (
    <div className="supplier-look-up brokerage">
      <BrokerageHeader/>
      <Container className="brokerage__container-main">
        <BrokerageContainerHeader title="Broker package"/>
        <Container>
          <h3 className="brokerage__item-title">{careName}</h3>
          <BrokeragePackageDates
            dates={packageDates}
            label="Package dates"
            setDates={(field, date) => setPackageDates(prevState => ({ ...prevState, [field]: date }))}
            isOngoing={isOngoing}
            setIsOngoing={setIsOngoing}
          />
        </Container>
        <>
          <Container display='flex'>
            <SearchBox
              onChangeValue={value => setSupplierSearch(value)}
              label="Supplier"
              search={onSearchSupplier}
              searchIcon={null}
              clearIcon={<p className='lbh-primary-button'>Clear</p>}
              clear={() => setSupplierSearch('')}
              value={supplierSearch}
              className='supplier-search-box'
              id="supplier-search-box"
            />
            <Button className='supplier-search-button' handler={() => alert('Search')}>Search</Button>
          </Container>
          {
            supplierSearch &&
            <Container className='is-new-supplier'>
              <Checkbox onChangeValue={setIsNewSupplier} value={isNewSupplier} />
              <Container className='is-new-supplier-text' display='flex' flexDirection='column'>
                <p>This is a new supplier</p>
                <p>Contact <span className='link-button green'>claire.surname.hackney.gov.uk</span> to add a new supplier</p>
              </Container>
            </Container>
          }
        </>
        {searchResult ?
          <BrokerPackageSelector
            pageSize={searchResult.pageSize}
            totalCount={searchResult.totalCount}
            totalPages={searchResult.totalPages}
            items={searchResult.data}
            setSelectedItem={setSelectedItem}
          />
          :
          <BrokerPackageCost
            addNeed={addNeed}
            weeklyNeeds={weeklyNeeds}
            oneOffNeeds={oneOffNeeds}
            setWeeklyNeeds={setWeeklyNeeds}
            setOneOffNeeds={setOneOffNeeds}
            oneOffTotalCost={oneOfTotalCost}
            weeklyTotalCost={weeklyTotalCost}
            supplierWeeklyCost={supplierWeeklyCost}
            setSupplierWeeklyCost={setSupplierWeeklyCost}
            changeNeed={changeNeed}
            removeNeed={removeNeed}
          />
        }
        <Container className="brokerage__actions">
          <Button handler={clickBack} className="brokerage__back-button">Back</Button>
          <Button handler={clickSave}>Save and continue</Button>
        </Container>
      </Container>
    </div>
  );
};