import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  getCorePackageRoute,
  getCareChargesRoute,
  getFundedNursingCareRoute,
} from '../../../routes/RouteConstants';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Checkbox, Container, SearchBox } from '../../HackneyDS';
import BrokeragePackageDates from '../BrokeragePackageDates';
import BrokerPackageCost from './BrokerPackageCost';
import BrokerageContainerHeader from '../BrokerageContainerHeader';
import BrokerPackageSelector from './BrokerPackageSelector';
import { updateCarePackageCosts } from '../../../api/CarePackages/CarePackage';
import { addNotification } from '../../../reducers/notificationsReducer';
import { brokerageTypeOptions, costPeriods } from '../../../Constants';
import { dateStringToDate, uniqueID } from '../../../service/helpers';
import Loading from '../../Loading';

export const BrokerPackage = ({
  supplierSearch,
  setSupplierSearch,
  showSearchResults,
  setShowSearchResults,
  detailsData,
  currentPage,
  setCurrentPage,
  searchResults,
  selectedItem,
  setSelectedItem,
  onSearchSupplier,
  carePackageCore = {
    packageType: undefined,
    serviceUserId: undefined,
  },
  packageType,
}) => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);
  const [supplierWeeklyCost, setSupplierWeeklyCost] = useState(0);
  const [initialNeed] = useState({
    cost: 0,
    startDate: new Date(),
    endDate: new Date(),
    isOngoing: false,
    errorStartDate: '',
    errorEndDate: '',
  });

  const [weeklyNeeds, setWeeklyNeeds] = useState([{ ...initialNeed, id: uniqueID() }]);
  const [oneOffNeeds, setOneOffNeeds] = useState([{ ...initialNeed, id: uniqueID() }]);
  const [weeklyTotalCost, setWeeklyTotalCost] = useState(0);
  const [oneOfTotalCost, setOneOfTotalCost] = useState(0);
  const [isNewSupplier, setIsNewSupplier] = useState(false);

  const [packageDates, setPackageDates] = useState({
    endDate: new Date(),
    startDate: new Date(),
  });

  const clickBack = () => {
    router.push({
      pathname: getCorePackageRoute(carePackageCore.serviceUserId),
      query: { packageId },
    });
  };

  const removeSupplierCard = () => {
    setSelectedItem('');
    setShowSearchResults(false);
    setSupplierSearch('');
  };

  const clearSearch = () => {
    setShowSearchResults(false);
    setSupplierSearch('');
  };

  const composeDetailsData = () => {
    if (detailsData) {
      setPackageDates({
        endDate: dateStringToDate(detailsData.endDate || new Date()),
        startDate: dateStringToDate(detailsData.startDate || new Date()),
      });

      if (!detailsData.endDate) {
        setIsOngoing(true);
      }

      setSupplierWeeklyCost(detailsData.coreCost);

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

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  useEffect(() => {
    composeDetailsData();
  }, [detailsData]);

  const checkNeedsErrors = (needs) => {
    let hasErrors = false;
    const checkedNeeds = needs.map((item) => {
      let errorStartDate = '';
      let errorEndDate = '';
      if (!item.startDate || ((item.startDate && item.endDate) && item.startDate > item.endDate)) {
        errorStartDate = 'Invalid start date';
      } else if (item.startDate < packageDates.endDate) {
        errorStartDate = 'Start date should be later then core date';
      }
      if (item.startDate && item.startDate < packageDates.endDate) {
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
    const checkedWeeklyDetails = checkNeedsErrors(weeklyNeeds);
    const checkOneOffDetails = checkNeedsErrors(oneOffNeeds);

    setWeeklyNeeds(checkedWeeklyDetails.checkedNeeds);
    setOneOffNeeds(checkOneOffDetails.checkedNeeds);

    if (checkedWeeklyDetails.hasErrors || checkOneOffDetails.hasErrors) {
      pushNotification('Some validation errors above');
      return;
    }

    const weeklyDetails = weeklyNeeds
      .filter((item) => item.cost !== 0)
      .map(({ cost, id, endDate, startDate }) => ({
        // id,
        cost,
        startDate,
        endDate: isOngoing ? null : endDate,
        costPeriod: costPeriods.weekly,
        type: brokerageTypeOptions.additionalNeed,
      }));

    const oneOffDetails = oneOffNeeds
      .filter((item) => item.cost !== 0)
      .map(({ cost, endDate, startDate, id }) => ({
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
          coreCost: supplierWeeklyCost,
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
  }, [supplierWeeklyCost, weeklyNeeds]);

  useEffect(() => {
    let totalCost = 0;
    if (oneOffNeeds) {
      oneOffNeeds.forEach((item) => {
        totalCost += Number(item.cost);
      });
    }
    setOneOfTotalCost(totalCost);
  }, [supplierWeeklyCost, oneOffNeeds]);

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
      <Container maxWidth="1080px" margin="0 auto" padding="60px">
        {(loading || detailsData === undefined) && <Loading className="loading-center" />}
        <Container className="brokerage__container-main">
          <BrokerageContainerHeader title="Broker package" />
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
                  onChangeValue={(value) => setSupplierSearch(value)}
                  label="Supplier"
                  searchIcon={null}
                  clearIcon={<p className="lbh-primary-button">Clear</p>}
                  clear={clearSearch}
                  value={supplierSearch}
                  className="supplier-search-box"
                  id="supplier-search-box"
                />
                <Button className="supplier-search-button" handler={onSearchSupplier}>
                  Search
                </Button>
              </Container>
            )}

            {!supplierSearch && !selectedItem && (
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
          {(searchResults && supplierSearch && !selectedItem) || (showSearchResults && searchResults) ? (
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
              removeSupplierCard={removeSupplierCard}
              cardInfo={selectedItem}
              corePackageDates={packageDates}
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
          )}
          <Container className="brokerage__actions">
            <Button handler={clickBack} className="brokerage__back-button">
              Back
            </Button>
            <Button disabled={!oneOfTotalCost && !weeklyTotalCost && !supplierWeeklyCost} handler={clickSave}>
              Save and continue
            </Button>
          </Container>
        </Container>
      </Container>
    </div>
  );
};
