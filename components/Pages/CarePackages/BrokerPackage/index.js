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
  const [weeklyNeeds, setWeeklyNeeds] = useState([{ ...initialNeed, id: uniqueID() }]);
  const [oneOffNeeds, setOneOffNeeds] = useState([{ ...initialNeed, id: uniqueID() }]);
  const [weeklyTotalCost, setWeeklyTotalCost] = useState(0);
  const [oneOffTotalCost, setOneOffTotalCost] = useState(0);
  const [isNewSupplier, setIsNewSupplier] = useState(false);

  const [packageDates, setPackageDates] = useState({
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
      setPackageDates({
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

        setWeeklyNeeds(weeklyDetails);
        setOneOffNeeds(oneOffDetails);
      }
    }
  };

  useEffect(() => {
    composeDetailsData();
  }, [detailsData]);

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const checkNeedError = (item) => {
    const { startDate, endDate, isOngoing: isOngoingItem } = item;
    let errorStartDate = '';
    let errorEndDate = '';
    if ((!startDate && isOngoingItem) || (!startDate && !isOngoingItem && endDate)) {
      errorStartDate = 'Invalid start date';
    } else if (startDate && endDate && !isOngoingItem && compareDescendingDMY(startDate, endDate) === -1) {
      errorEndDate = 'End date should be later then start date';
    } else if (startDate && !isOngoing && compareDescendingDMY(packageDates.endDate, startDate) === -1) {
      errorStartDate = 'Start date should be later then core date';
    } else if (startDate && isOngoing && compareDescendingDMY(packageDates.startDate, startDate) === -1) {
      errorEndDate = 'Start date should be later then core date';
    }

    return errorStartDate || errorEndDate;
  };

  const checkDateErrors = (needs) => needs.some(item => checkNeedError(item));

  const clickSave = async () => {
    if (!isNewSupplier && !selectedItem?.id) {
      pushNotification('No supplier selected');
      return;
    }

    if (!coreCost) {
      setCoreCostError('Required field');
      pushNotification('Core weekly cost is required')
      return;
    }

    if (!isOngoing && (!packageDates.endDate || compareDescendingDMY(packageDates.startDate, packageDates.endDate) === -1)) {
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

    try {
      await updateCarePackageCosts({
        data: {
          coreCost,
          startDate: packageDates.startDate,
          endDate: isOngoing ? null : packageDates.endDate,
          supplierId: selectedItem.id,
          details: [...weeklyDetails, ...oneOffDetails],
        },
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
    <div className="supplier-look-up brokerage">
      <BrokerageHeader />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <Loading isLoading={loading || suppliersLoading} />
        <Container className="brokerage__container-main">
          <TitleSubtitleHeader title="Build a care package" subTitle="Broker package" />

          <Container>
            <h3 className="brokerage__item-title">{getPackageType(packageType)}</h3>
            <BrokeragePackageDates
              fields={{
                dateFrom: 'startDate',
                dateTo: 'endDate',
              }}
              dates={packageDates}
              label="Package dates"
              setDates={(field, date) => setPackageDates((prevState) => ({ ...prevState, [field]: date }))}
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
                  clearIcon={<p className="lbh-primary-button">Clear</p>}
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
              corePackageDates={packageDates}
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
