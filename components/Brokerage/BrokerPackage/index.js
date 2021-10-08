import React, { useEffect, useState } from 'react';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Checkbox, Container, SearchBox } from '../../HackneyDS';
import BrokeragePackageDates from '../BrokeragePackageDates';
import BrokerPackageCost from './BrokerPackageCost';
import BrokerageContainerHeader from '../BrokerageContainerHeader';
import BrokerPackageSelector from './BrokerPackageSelector';
import { CORE_PACKAGE_DETAILS_ROUTE } from '../../../routes/RouteConstants';
import { useRouter } from 'next/router';
import { changeCarePackageDetails } from '../../../api/CarePackages/CarePackage';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../reducers/notificationsReducer';
import { brokerageTypeOptions, costPeriods } from '../../../Constants';
import { uniqueID } from '../../../service/helpers';
import Loading from '../../Loading';

export const BrokerPackage = ({
  supplierSearch,
  packageId,
  setSupplierSearch,
  detailsData,
  currentPage,
  setCurrentPage,
  searchResults,
  onSearchSupplier,
  careName = 'Nursing Care'
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOngoing, setIsOngoing] = useState(false);
  const [supplierWeeklyCost, setSupplierWeeklyCost] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [initialNeed] = useState({
    cost: 0,
    startDate: null,
    endDate: null,
    isOngoing: false,
  });

  const [weeklyNeeds, setWeeklyNeeds] = useState([{ ...initialNeed, id: uniqueID() }]);
  const [oneOffNeeds, setOneOffNeeds] = useState([{ ...initialNeed, id: uniqueID() }]);
  const [weeklyTotalCost, setWeeklyTotalCost] = useState(0);
  const [oneOfTotalCost, setOneOfTotalCost] = useState(0);
  const [isNewSupplier, setIsNewSupplier] = useState(false);

  const [packageDates, setPackageDates] = useState({
    endDate: null,
    startDate: null,
  });

  const clickBack = () => {
    router.push(`${CORE_PACKAGE_DETAILS_ROUTE}/${packageId}`);
  };

  useEffect(() => {
    if (detailsData) {
      setPackageDates({
        endDate: detailsData.endDate,
        startDate: detailsData.startDate,
      });
      if(!detailsData.endDate) {
        setIsOngoing(true);
      }

      setSupplierWeeklyCost(detailsData.coreCost);

      if (detailsData.details) {
        const weeklyDetails = detailsData.details
          .filter(item => item.costPeriod === 2)
          .map(item => ({ ...item, isOngoing: !item.endDate}));

        const oneOffDetails = detailsData.details.filter(item => item.costPeriod === 3);

        setWeeklyNeeds(weeklyDetails);
        setOneOffNeeds(oneOffDetails);
      }
    }
  }, [detailsData]);

  const clickSave = async () => {
    const weeklyDetails = weeklyNeeds
      .filter(item => item.cost !== 0)
      .map(({ cost, id, endDate, startDate }) => ({
        id: id,
        cost: cost,
        startDate,
        endDate: isOngoing ? null : endDate,
        costPeriod: costPeriods.weekly,
        type: brokerageTypeOptions.additionalNeed,
      }));

    const oneOffDetails = oneOffNeeds
      .filter(item => item.cost !== 0)
      .map(({ cost, endDate, startDate, id }) => ({
        id,
        cost,
        startDate,
        endDate,
        costPeriod: costPeriods.oneOff,
        type: brokerageTypeOptions.additionalNeed,
      }));

    try {
      await changeCarePackageDetails({
        data: {
          coreCost: supplierWeeklyCost,
          startDate: packageDates.startDate,
          endDate: packageDates.endDate,
          supplierId: selectedItem.id,
          details: [...weeklyDetails, ...oneOffDetails]
        },
        packageId,
      });
      dispatch(addNotification({ text: 'Success', className: 'success' }));
    } catch (e) {
      dispatch(addNotification({ text: e }));
    }
  };

  const changeNeed = (getter, setter, field, value, index) => {
    console.log(field, value);
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
      { ...initialNeed, id: uniqueID() },
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

  useEffect(() => {
    setIsOngoing(!detailsData?.endDate);
  }, [detailsData?.endDate]);

  return (
    <div className="supplier-look-up brokerage">
      <BrokerageHeader/>
      {detailsData === undefined && <Loading className='loading-center' />}
      <Container className="brokerage__container-main">
        <BrokerageContainerHeader title="Broker package"/>
        <Container>
          <h3 className="brokerage__item-title">{careName}</h3>
          <BrokeragePackageDates
            fields={{
              dateFrom: 'startDate',
              dateTo: 'endDate',
            }}
            dates={packageDates}
            label="Package dates"
            setDates={(field, date) => setPackageDates(prevState => ({ ...prevState, [field]: date }))}
            isOngoing={isOngoing}
            setIsOngoing={setIsOngoing}
          />
        </Container>
        <>
          {!selectedItem &&
          <Container className="supplier-search-container" display="flex">
            <SearchBox
              onChangeValue={value => setSupplierSearch(value)}
              label="Supplier"
              searchIcon={null}
              clearIcon={<p className="lbh-primary-button">Clear</p>}
              clear={() => setSupplierSearch('')}
              value={supplierSearch}
              className="supplier-search-box"
              id="supplier-search-box"
            />
            <Button className="supplier-search-button" handler={onSearchSupplier}>Search</Button>
          </Container>
          }

          {
            !supplierSearch &&
            <Container className="is-new-supplier">
              <Checkbox onChangeValue={setIsNewSupplier} value={isNewSupplier}/>
              <Container className="is-new-supplier-text" display="flex" flexDirection="column">
                <p>This is a new supplier</p>
                <p>Contact <span className="link-button green">claire.surname.hackney.gov.uk</span> to add a new
                  supplier</p>
              </Container>
            </Container>
          }
        </>
        {searchResults && supplierSearch && !selectedItem ?
          <BrokerPackageSelector
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={searchResults?.pagingMetaData?.pageSize}
            totalCount={searchResults?.pagingMetaData?.totalCount}
            totalPages={searchResults?.pagingMetaData?.totalPages}
            items={searchResults?.data}
            setSelectedItem={setSelectedItem}
          />
          :
          <BrokerPackageCost
            setSelectedItem={setSelectedItem}
            cardInfo={selectedItem}
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
          <Button disabled={!oneOfTotalCost && !weeklyTotalCost && !supplierWeeklyCost} handler={clickSave}>Save and
            continue</Button>
        </Container>
      </Container>
    </div>
  );
};