import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useCarePackageApi, updateCarePackageCosts } from '../../../../api';
import { getCareChargesRoute, getCorePackageRoute, getFundedNursingCareRoute } from '../../../../routes/RouteConstants';
import BrokerageHeader from '../BrokerageHeader';
import { Button, Checkbox, Container, SearchBox } from '../../../HackneyDS';
import BrokerPackageCost from './BrokerPackageCost';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import BrokerPackageSelector from './BrokerPackageSelector';
import { addNotification } from '../../../../reducers/notificationsReducer';
import { brokerageTypeOptions, costPeriods } from '../../../../Constants';
import { compareDescendingDMY, dateStringToDate, uniqueID } from '../../../../service';
import Loading from '../../../Loading';
import BrokeragePackageDates from '../BrokeragePackageDates';
import { compareDesc } from 'date-fns';
import { useDebounce } from 'react-use';

const initialNeed = {
  cost: 0,
  startDate: null,
  endDate: null,
  isOngoing: false,
  errorStartDate: '',
  errorEndDate: '',
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
    startDate: null,
    endDate: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  useDebounce(
    () => setSearchQuery(searchText),
    1000,
    [searchText]
  );
  const [showSearchResults, setShowSearchResults] = useState(false);

  const onSearchSupplier = () => {
    setSearchQuery(searchText);
    setShowSearchResults(true);
  };

  const { data: searchResults, isLoading: suppliersLoading } = useCarePackageApi.suppliers({
    supplierName: searchQuery,
    shouldFetch: searchQuery || showSearchResults,
  });

  const { data: packageInfo } = useCarePackageApi.singlePackageInfo(packageId);
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
    if (detailsData) {
      setPackageDates({
        startDate: dateStringToDate(detailsData.startDate) || new Date(),
        endDate: dateStringToDate(detailsData.endDate),
      });

      if (!detailsData.endDate) {
        setIsOngoing(true);
      }

      setCoreCost(detailsData.coreCost);

      if (detailsData.details) {
        const weeklyDetails = detailsData.details
          .filter((item) => item.costPeriod === 2)
          .map((item) => ({
            ...item,
            startDate: dateStringToDate(item.startDate),
            endDate: dateStringToDate(item.endDate),
            isOngoing: !item.endDate,
            errorStartDate: '',
            errorEndDate: '',
          }));

        const oneOffDetails = detailsData.details
          .filter((item) => item.costPeriod === 3)
          .map((item) => ({
            ...item,
            startDate: dateStringToDate(item.startDate),
            endDate: dateStringToDate(item.endDate),
            errorStartDate: '',
            errorEndDate: '',
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

  const checkNeedsErrors = (needs) => {
    let hasErrors = false;
    const checkedNeeds = needs.map((item) => {
      if (!item.startDate && !item.endDate && !item.cost) return { ...item };

      const { startDate, endDate } = item;
      let errorStartDate = '';
      let errorEndDate = '';
      if (!startDate || (startDate && endDate && compareDescendingDMY(startDate, endDate))) {
        errorStartDate = 'Invalid start date';
      } else if (startDate && compareDescendingDMY(startDate, packageDates.endDate)) {
        errorStartDate = 'Start date should be later then core date';
      }
      if (endDate && compareDescendingDMY(endDate, packageDates.endDate)) {
        errorEndDate = 'End date should be later then core date';
      }
      if (errorStartDate || errorEndDate) {
        hasErrors = true;
      }
      return {
        ...item,
        errorEndDate,
        errorStartDate,
      };
    });
    return { checkedNeeds, hasErrors };
  };

  const clickSave = async () => {
    if (!isNewSupplier && !selectedItem?.id) {
      pushNotification('No supplier selected');
      return;
    }

    if(!supplierWeeklyCost) {
      setSupplierWeeklyCostError('Required field');
      pushNotification('Core weekly cost is required')
      return;
    }

    if(!isOngoing && (!packageDates.endDate || compareDesc(packageDates.startDate, packageDates.endDate) === -1)) {
      pushNotification('Core date is wrong');
      return;
    }

    const checkedWeeklyDetails = checkNeedsErrors(weeklyNeeds);
    const checkOneOffDetails = checkNeedsErrors(oneOffNeeds);

    setWeeklyNeeds(checkedWeeklyDetails.checkedNeeds);
    setOneOffNeeds(checkOneOffDetails.checkedNeeds);
    if(!coreCost) {
      setCoreCostError('The core cost field is required')
    }

    if (checkedWeeklyDetails.hasErrors || checkOneOffDetails.hasErrors) {
      pushNotification('Some validation errors above');
      return;
    }

    const weeklyDetails = weeklyNeeds
      .filter((item) => item.startDate || item.endDate || item.cost)
      .map(({ cost, endDate, startDate }) => ({
        // id,
        cost,
        startDate,
        endDate: isOngoing ? null : endDate,
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
          coreCost: coreCost,
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

  const changeSupplierWeeklyCost = (value) => {
    setSupplierWeeklyCost(value);
    setSupplierWeeklyCostError('');
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
    setOneOfTotalCost(totalCost);
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
      <BrokerageHeader/>
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 30px">
        <Loading isLoading={loading || suppliersLoading} />
        <Container className="brokerage__container-main">
          <TitleSubtitleHeader title="Build a care package" subTitle="Broker package"/>
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
                  onChangeValue={(value) => setSearchText(value)}
                  label="Supplier"
                  searchIcon={null}
                  clearIcon={<p className="lbh-primary-button">Clear</p>}
                  clear={clearSearch}
                  search={onSearchSupplier}
                  value={searchText}
                  className="supplier-search-box"
                  id="supplier-search-box"
                />
                <Button className="supplier-search-button" onClick={onSearchSupplier}>
                  Search
                </Button>
              </Container>
            )}

            {!searchText && !selectedItem && (
              <Container className="is-new-supplier">
                <Checkbox onChangeValue={setIsNewSupplier} value={isNewSupplier}/>
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
              weeklyNeeds={weeklyNeeds}
              coreCostError={coreCostError}
              oneOffNeeds={oneOffNeeds}
              setWeeklyNeeds={setWeeklyNeeds}
              supplierWeeklyCostError={supplierWeeklyCostError}
              setOneOffNeeds={setOneOffNeeds}
              oneOffTotalCost={oneOffTotalCost}
              weeklyTotalCost={weeklyTotalCost}
              coreCost={coreCost}
              setCoreCost={setCoreCost}
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
              disabled={(!oneOffTotalCost && !weeklyTotalCost && !coreCost) || loading}
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
