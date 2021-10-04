import React, { useEffect, useState } from 'react';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container } from '../../HackneyDS';
import BrokeragePackageDates from '../BrokeragePackageDates';
import BrokerageSearchSupplier from './BrokerageSearchSupplier';
import SupplierLookUpSelected from './SupplierLookUpSelected';

export const SupplierLookUp = ({ searchResults }) => {
  const [isOngoing, setIsOngoing] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [supplierWeeklyCost, setSupplierWeeklyCost] = useState(0);
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

  const [packageDates, setPackageDates] = useState({
    dateFrom: null,
    dateTo: null,
  });

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
        <Container className="brokerage__container-header brokerage__container">
          <p>Build a care package</p>
          <h2>Broker package</h2>
        </Container>
        <Container>
          <h3 className="brokerage__item-title">Nursing Care</h3>
          <BrokeragePackageDates
            dates={packageDates}
            label="Package dates"
            setDates={(field, date) => setPackageDates(prevState => ({ ...prevState, [field]: date }))}
            isOngoing={isOngoing}
            setIsOngoing={setIsOngoing}
          />
        </Container>
        {
          selectedItem ?
            <SupplierLookUpSelected
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
              setSelectedItem={setSelectedItem}
              cardInfo={selectedItem}
            />
            : <BrokerageSearchSupplier searchResults={searchResults} setSelectedItem={setSelectedItem}/>
        }
        <Container className="brokerage__actions">
          <Button handler={clickBack} className="brokerage__back-button">Back</Button>
          <Button handler={clickSave}>Save and continue</Button>
        </Container>
      </Container>
    </div>
  );
};