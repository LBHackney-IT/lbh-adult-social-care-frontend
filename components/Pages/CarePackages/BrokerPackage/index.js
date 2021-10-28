import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useDebounce } from 'react-use';
import { compareDescendingDMY, dateStringToDate, uniqueID } from 'service';
import { updateCarePackageCosts, useSuppliers, useSingleCorePackageInfo } from 'api';
import { getCareChargesRoute, getCorePackageRoute, getFundedNursingCareRoute } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { brokerageTypeOptions, costPeriods } from 'constants/variables';
import { Button, Checkbox, Container, SearchBox } from '../../../HackneyDS';
import Loading from '../../../Loading';
import BrokerageHeader from '../BrokerageHeader';
import BrokerPackageCost from './BrokerPackageCost';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import BrokerPackageSelector from './BrokerPackageSelector';
import BrokeragePackageDates from '../BrokeragePackageDates';
import CarePackageBreadcrumbs from '../CarePackageBreadcrumbs';

const initialNeed = {
  cost: 0,
  startDate: null,
  endDate: null,
  isOngoing: false,
};

const BrokerPackage = ({
  detailsData,
  loading,
  setLoading,
  currentPage,
  setCurrentPage,
  selectedItem,
  setSelectedItem,
}) => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const dispatch = useDispatch();

  const [isOngoing, setIsOngoing] = useState(false);
  const [coreCost, setCoreCost] = useState(0);
  const [coreCostError, setCoreCostError] = useState('');
  const [weeklyNeeds, setWeeklyNeeds] = useState([]);
  const [oneOffNeeds, setOneOffNeeds] = useState([]);
  const [weeklyTotalCost, setWeeklyTotalCost] = useState(0);
  const [oneOffTotalCost, setOneOffTotalCost] = useState(0);
  const [isNewSupplier, setIsNewSupplier] = useState(false);

  const [coreDates, setCoreDates] = useState({
    startDate: new Date(),
    endDate: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  useDebounce(() => setSearchQuery(searchText), 1000, [searchText]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const onSearchSupplier = () => {
    setSearchQuery(searchText);
    setShowSearchResults(true);
  };

  const params = useMemo(() => ({ supplierName: searchQuery }), [searchQuery]);

  const { data: searchResults, isLoading: suppliersLoading } = useSuppliers({
    params,
    shouldFetch: searchQuery || showSearchResults,
  });

  const { data: packageInfo } = useSingleCorePackageInfo(packageId);
  const { packageType } = packageInfo;

  const clickBack = () => {
    router.push(getCorePackageRoute(packageId));
  };

  const removeSupplierCard = () => {
    setSelectedItem('');
    setShowSearchResults(false);
    setSearchText('');
  };

  const clearSearch = () => {
    setShowSearchResults(false);
    setSearchText('');
  };

  const composeDetailsData = () => {
    if (detailsData?.coreCost !== undefined) {
      setCoreDates({
        startDate: dateStringToDate(detailsData.startDate) || new Date(),
        endDate: dateStringToDate(detailsData.endDate),
      });

      if (!detailsData.endDate) {
        setIsOngoing(true);
      }

      setCoreCost(detailsData.coreCost);

      if (detailsData?.details?.length) {
        const weeklyDetails = detailsData.details
          .filter((item) => item.costPeriod === 2)
          .map((item) => ({
            ...item,
            startDate: dateStringToDate(item.startDate),
            endDate: dateStringToDate(item.endDate),
            isOngoing: !item.endDate,
          }));

        const oneOffDetails = detailsData.details
          .filter((item) => item.costPeriod === 3)
          .map((item) => ({
            ...item,
            startDate: dateStringToDate(item.startDate),
            endDate: dateStringToDate(item.endDate),
          }));

        if(weeklyDetails.length) setWeeklyNeeds(weeklyDetails);
        if(oneOffDetails.length) setOneOffNeeds(oneOffDetails);
      }
    }
  };

  const errorCoreDate = useMemo(() => {
    const { startDate: coreStartDate, endDate: coreEndDate } = coreDates;

    return (!coreStartDate && !isOngoing && coreEndDate) ? 'Core start date is wrong' : ''
  }, [isOngoing, coreDates]);

  useEffect(() => {
    composeDetailsData();
  }, [detailsData]);

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const checkNeedError = (item) => {
    const { startDate, endDate, isOngoing: isOngoingItem, cost } = item;

    const { startDate: coreStartDate, endDate: coreEndDate } = coreDates;

    let errorStartDate = '';
    let errorEndDate = '';
    let errorCost = '';
    if (!startDate && !isOngoingItem && endDate) errorStartDate = 'Invalid start date';
    if (startDate && !isOngoingItem && !endDate) errorEndDate = 'Invalid end date';
    if (startDate && endDate && !isOngoingItem && compareDescendingDMY(startDate, endDate) === -1) {
      errorEndDate = 'End date should be later then start date';
    }
    if (startDate && !isOngoing && compareDescendingDMY(coreEndDate, startDate) === -1) {
      errorStartDate = 'Start date should be later then core date';
    }
    if (startDate && isOngoing && compareDescendingDMY(coreStartDate, startDate) === -1) {
      errorStartDate = 'Start date should be later then core date';
    }
    if(cost && !startDate) {
      errorStartDate = 'Start date is wrong';
    }

    if(!cost && (startDate || endDate)) {
      errorCost = 'Cost is required';
    }

    return errorStartDate || errorEndDate || errorCost;
  };

  const checkDateErrors = (needs) => needs.some(item => checkNeedError(item));

  const clickSave = async () => {
    const { startDate: coreStartDate, endDate: coreEndDate } = coreDates;
    if (!isNewSupplier && !selectedItem?.id) {
      pushNotification('No supplier selected');
      return;
    }

    if (!coreCost) {
      setCoreCostError('Required field');
      pushNotification('Core weekly cost is required')
      return;
    }

    if (
      (!coreStartDate && !isOngoing && coreEndDate) ||
      !isOngoing && (!coreDates.endDate || compareDescendingDMY(coreDates.startDate, coreDates.endDate) === -1)
    ) {
      pushNotification('Core date is wrong');
      return;
    }

    const weeklyDateErrors = checkDateErrors(weeklyNeeds);
    const oneOfNeedDateErrors = checkDateErrors(oneOffNeeds);
    if (!coreCost) {
      setCoreCostError('The core cost field is required');
    }

    if (weeklyDateErrors || oneOfNeedDateErrors) {
      pushNotification('Some validation errors above');
      return;
    }

    const weeklyDetails = weeklyNeeds
      .filter((item) => item.startDate || item.endDate || item.cost)
      .map(({ cost, endDate, startDate, isOngoing: isOngoingItem }) => ({
        // id,
        cost,
        startDate,
        endDate: isOngoingItem ? null : endDate,
        costPeriod: costPeriods.weekly,
        type: brokerageTypeOptions.additionalNeed,
      }));

    const oneOffDetails = oneOffNeeds
      .filter((item) => item.startDate || item.endDate || item.cost)
      .map(({ cost, endDate, startDate }) => ({
        // id,
        cost,
        startDate,
        endDate,
        costPeriod: costPeriods.oneOff,
        type: brokerageTypeOptions.additionalNeed,
      }));

    setLoading(true);

    const postData = {
      coreCost,
      startDate: coreDates.startDate,
      endDate: isOngoing ? null : coreDates.endDate,
      supplierId: selectedItem.id,
    };
    const details = [...weeklyDetails, ...oneOffDetails];
    if (details.length) {
      postData.details = details;
    }

    try {
      await updateCarePackageCosts({
        data: postData,
        packageId,
      });
      pushNotification('Success', 'success');

      router.push(packageType === 4 ? getFundedNursingCareRoute(packageId) : getCareChargesRoute(packageId));
    } catch (e) {
      pushNotification(e);
    }
    setLoading(false);
  };

  const changeNeed = (getter, setter, field, value, index) => {
    const cloneNeed = { ...getter[index] };
    if (field === 'cost') {
      cloneNeed.cost = value;
    } else if (field === 'isOngoing') {
      cloneNeed.isOngoing = value;
    } else {
      cloneNeed[field] = value;
    }
    const cloneNeeds = getter.slice();
    cloneNeeds.splice(index, 1, cloneNeed);
    setter(cloneNeeds);
  };

  const changeCoreCost = (value) => {
    setCoreCost(value);
    setCoreCostError('');
  };

  const addNeed = (setter) => {
    setter((prevState) => [...prevState, { ...initialNeed, id: uniqueID() }]);
  };

  const removeNeed = (getter, setter, index) => {
    const copyGetter = getter.slice();
    copyGetter.splice(index, 1);
    setter(copyGetter);
  };

  const changeCoreDate = (field, date) => (
    setCoreDates((prevState) => ({ ...prevState, [field]: date }))
  );

  useEffect(() => {
    let totalCost = 0;
    if (weeklyNeeds) {
      weeklyNeeds.forEach((item) => {
        totalCost += Number(item.cost);
      });
    }
    setWeeklyTotalCost(totalCost);
  }, [coreCost, weeklyNeeds]);

  useEffect(() => {
    let totalCost = 0;
    if (oneOffNeeds) {
      oneOffNeeds.forEach((item) => {
        totalCost += Number(item.cost);
      });
    }
    setOneOffTotalCost(totalCost);
  }, [coreCost, oneOffNeeds]);

  useEffect(() => {
    setIsOngoing(!detailsData?.endDate);
  }, [detailsData?.endDate]);

  const getPackageType = (packageTypeValue) => {
    switch (packageTypeValue) {
      case 1:
        return 'Home Care';
      case 2:
        return 'Residential Care';
      case 3:
        return 'Day Care';
      case 4:
        return 'Nursing Care Package';
      default:
        return 'Package Type not found';
    }
  };

  return (
    <div className="broker-package brokerage">
      <BrokerageHeader />
      <CarePackageBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <Loading isLoading={loading || suppliersLoading} />
        <Container className="brokerage__container-main">
          <TitleSubtitleHeader title="Build a care package" subTitle="Broker package" />

          <Container>
            <h3 className="brokerage__item-title">{getPackageType(packageType)}</h3>
            <BrokeragePackageDates
              error={errorCoreDate}
              fields={{
                dateFrom: 'startDate',
                dateTo: 'endDate',
              }}
              dates={coreDates}
              label="Package dates"
              setDates={changeCoreDate}
              isOngoing={isOngoing}
              setIsOngoing={setIsOngoing}
            />
          </Container>

          <>
            {!selectedItem && (
              <Container className="supplier-search-container" display="flex">
                <SearchBox
                  onChangeValue={setSearchText}
                  label="Supplier"
                  searchIcon={null}
                  clearIcon={<p className="lbh-primary-color">Clear</p>}
                  clear={clearSearch}
                  search={onSearchSupplier}
                  value={searchText}
                  className="supplier-search-box"
                  id="supplier-search-box"
                  required
                />

                <Button className="supplier-search-button" onClick={onSearchSupplier}>
                  Search
                </Button>
              </Container>
            )}

            {!searchText && !selectedItem && (
              <Container className="is-new-supplier">
                <Checkbox onChangeValue={setIsNewSupplier} value={isNewSupplier} />

                <Container className="is-new-supplier-text" display="flex" flexDirection="column">
                  <p>This is a new supplier</p>
                  <p>
                    Contact <span className="link-button green">claire.surname.hackney.gov.uk</span> to add a new
                    supplier
                  </p>
                </Container>
              </Container>
            )}
          </>

          {(searchResults && searchText && !selectedItem) || (showSearchResults && searchResults) ? (
            <BrokerPackageSelector
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={searchResults?.pagingMetaData?.pageSize}
              totalCount={searchResults?.pagingMetaData?.totalCount}
              totalPages={searchResults?.pagingMetaData?.totalPages}
              items={searchResults?.data}
              setSelectedItem={(value) => {
                setSelectedItem(value);
                setShowSearchResults(false);
              }}
            />
          ) : (
            <BrokerPackageCost
              setCoreCostError={setCoreCostError}
              removeSupplierCard={removeSupplierCard}
              cardInfo={selectedItem}
              corePackageDates={coreDates}
              addNeed={addNeed}
              checkNeedError={checkNeedError}
              weeklyNeeds={weeklyNeeds}
              coreCostError={coreCostError}
              oneOffNeeds={oneOffNeeds}
              setWeeklyNeeds={setWeeklyNeeds}
              setOneOffNeeds={setOneOffNeeds}
              oneOffTotalCost={oneOffTotalCost}
              weeklyTotalCost={weeklyTotalCost}
              coreCost={coreCost}
              setCoreCost={changeCoreCost}
              changeNeed={changeNeed}
              removeNeed={removeNeed}
            />
          )}

          <Container className="brokerage__actions">
            <Button onClick={clickBack} className="brokerage__back-button">
              Back
            </Button>

            <Button
              isLoading={loading}
              disabled={loading}
              onClick={clickSave}
            >
              Save and continue
            </Button>
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default BrokerPackage;
