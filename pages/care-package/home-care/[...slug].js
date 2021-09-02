import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createHomeCarePackage, postHomeCareTimeSlots } from 'api/CarePackages/HomeCareApi';
import { Button } from 'components/Button';
import Dropdown from 'components/Dropdown';
import ShouldPackageReclaim from 'components/HomeCare/ShouldPackageReclaim';
import SummaryDataList from 'components/HomeCare/SummaryDataList';
import WeekCarePicker from 'components/HomeCare/WeekCarePicker';
import Layout from 'components/Layout/Layout';
import PackageReclaim from 'components/PackageReclaim';
import TextArea from 'components/TextArea';
import TitleHeader from 'components/TitleHeader';
import withSession from 'lib/session';
import { formatCareDatePeriod, getLoggedInUser, getUserSession, uniqueID } from 'service/helpers';
import {
  DOMESTIC_CARE_MODE,
  ESCORT_CARE_MODE, getWeekSlots,
  LIVE_IN_CARE_MODE,
  PERSONAL_CARE_MODE,
  weekDays,
} from 'service/homeCarePickerHelper';
import { getServiceTimes } from 'service/homeCareServiceHelper';
import { SOCIAL_WORKER_ROUTE } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import useHomeCareApi from 'api/SWR/useHomeCareApi';

const initialPackageReclaim = {
  homeCarePackageId: '1',
  reclaimFromId: '',
  reclaimCategoryId: 0,
  reclaimAmountOptionId: 0,
  notes: '',
  amount: '',
};

// start before render
export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  const user = getLoggedInUser({ req });

  return { props: { loggedInUserId: user.userId } };
});

const HomeCare = ({ loggedInUserId }) => {
  // Parameters
  const { data: homeCareServices } = useHomeCareApi.getAllServices();
  const { data: homeCareTimeShiftsData } = useHomeCareApi.getAllTimeShiftSlots();

  const router = useRouter();
  const dispatch = useDispatch();
  const [isImmediate, isS117, isFixedPeriod, startDate, endDate] = router.query.slug;

  // State
  const [homeCareTimeShifts, setHomeCareTimeShifts] = useState([]);
  const [weekDaysValue, setWeekDaysValue] = useState(weekDays);
  const [selectedCareType, setSelectedCareType] = useState(1);
  const [selectedPrimaryCareTime, setSelectedPrimaryCareTime] = useState(30);
  const [selectedSecondaryCareTime, setSelectedSecondaryCareTime] = useState(30);
  const [homeCareSummaryData, setHomeCareSummaryData] = useState(undefined);
  const [carePackageId, setCarePackageId] = useState(undefined);
  const [packageReclaims, setPackageReclaims] = useState([{ ...initialPackageReclaim }]);
  const [isReclaimed, setIsReclaimed] = useState(null);
  const [times, setTimes] = useState(undefined);
  const [secondaryTimes, setSecondaryTimes] = useState(undefined);

  const addPackageReclaim = () => {
    setPackageReclaims([...packageReclaims, { ...initialPackageReclaim, id: uniqueID() }]);
  };

  const removePackageReclaim = (id) => {
    const newPackagesReclaim = packageReclaims.filter((item) => item.id !== id);
    setPackageReclaims(newPackagesReclaim);
  };

  const changePackageReclaim = (id) => (updatedPackage) => {
    const newPackage = packageReclaims.slice();
    const packageIndex = packageReclaims.findIndex((item) => item.id === id);
    newPackage.splice(packageIndex, 1, updatedPackage);
    setPackageReclaims(newPackage);
  };

  const [needToAddress, setNeedToAddress] = useState(undefined);
  const [whatShouldBeDone, setWhatShouldBeDone] = useState(undefined);

  useEffect(() => {
    // Get the primary and secondary times for the selected service
    // eslint-disable-next-line no-shadow
    const { times, secondaryTimes } = getServiceTimes(homeCareServices, selectedCareType);
    setTimes(times);
    setSecondaryTimes(secondaryTimes);
  }, [homeCareServices]);

  const changeIsPackageReclaimed = (status) => {
    setPackageReclaims([{ ...initialPackageReclaim }]);
    setIsReclaimed(status);
  };

  // Init home care package via API
  useEffect(() => {
    if (!carePackageId) {
      (async function createHomeCarePackageAsync() {
        const filteredPackageReclaims = packageReclaims.filter(item => !!item.reclaimFromId);
        const params = {};

        if(filteredPackageReclaims.length) params.packageReclaims = filteredPackageReclaims;

        const carePackageCreateResult = await createHomeCarePackage({
          startDate,
          endDate,
          isImmediate: isImmediate === 'true',
          isS117: isS117 === 'true',
          isFixedPeriod: isFixedPeriod === 'true',
          creatorId: loggedInUserId,
          clientId: loggedInUserId,
          ...params,
        });

        setCarePackageId(carePackageCreateResult?.packageId);
      })();
    }
  }, [carePackageId, startDate, endDate, isImmediate, isS117, isFixedPeriod]);

  // Option selecting
  useEffect(() => {
    if (times && times.length > 0) {
      setSelectedPrimaryCareTime(times[0].value);
    }

    if (secondaryTimes && secondaryTimes.length > 0) {
      setSelectedSecondaryCareTime(secondaryTimes[1].value);
    }
  }, [times, secondaryTimes]);

  useEffect(() => {
    if(homeCareTimeShiftsData) {
      setHomeCareTimeShifts(getWeekSlots(homeCareTimeShiftsData));
    }
  }, [homeCareTimeShiftsData]);

  // Handle a care picker cell click
  const onCarePickerClick = (weekSlotId, dayId) => {
    const weekSlot = homeCareTimeShifts.find((item) => item.id === weekSlotId);
    const weekSlotDayItem = weekSlot?.days?.find((item) => item.id === dayId);
    let newWeekSlotDayItem;

    const primaryCareTimeItem = times.find((item) => item.value === selectedPrimaryCareTime);

    const setPrimaryTime = (primaryTimeProperty) => {
      // Determine primary care time
      const hasPrimary = primaryTimeProperty > 0;
      return hasPrimary ? 0 : primaryCareTimeItem.value;
    };

    switch (selectedCareType) {
      case PERSONAL_CARE_MODE: {
        const newPersonValue = { ...weekSlotDayItem.values.person };

        // Determine primary care time
        newPersonValue.primary = setPrimaryTime(weekSlotDayItem.values.person.primary);

        // Determine secondary care time
        const secondaryCareTimeItem = secondaryTimes.find((item) => item.value === selectedSecondaryCareTime);
        const hasSecondary = weekSlotDayItem.values.person.secondary > 0;
        newPersonValue.secondary = hasSecondary ? 0 : secondaryCareTimeItem.value;

        newWeekSlotDayItem = {
          ...weekSlotDayItem,
          values: { ...weekSlotDayItem.values, person: newPersonValue },
        };
        break;
      }
      case DOMESTIC_CARE_MODE: {
        let newDomesticValue = { ...weekSlotDayItem.values.domestic };

        // Determine primary care time
        newDomesticValue = setPrimaryTime(weekSlotDayItem.values.domestic);

        newWeekSlotDayItem = {
          ...weekSlotDayItem,
          values: {
            ...weekSlotDayItem.values,
            domestic: newDomesticValue,
          },
        };
        break;
      }
      case LIVE_IN_CARE_MODE: {
        let newLiveInValue = { ...weekSlotDayItem.values.liveIn };

        // Determine primary care time
        newLiveInValue = setPrimaryTime(weekSlotDayItem.values.liveIn);

        newWeekSlotDayItem = {
          ...weekSlotDayItem,
          values: {
            ...weekSlotDayItem.values,
            liveIn: newLiveInValue,
          },
        };
        break;
      }
      case ESCORT_CARE_MODE: {
        let newEscortInValue = { ...weekSlotDayItem.values.escort };

        // Determine primary care time
        newEscortInValue = setPrimaryTime(weekSlotDayItem.values.escort);

        newWeekSlotDayItem = {
          ...weekSlotDayItem,
          values: {
            ...weekSlotDayItem.values,
            liveIn: newEscortInValue,
          },
        };
        break;
      }
      default: {
        break;
      }
    }

    const newWeekSlotDays = weekSlot.days.map((dayItem) => (dayItem.id === dayId ? newWeekSlotDayItem : dayItem));
    const newWeekSlot = { ...weekSlot, days: newWeekSlotDays };

    const newWeekSlotsValue = homeCareTimeShifts.map((weekSlotItem) =>
      weekSlotItem.id === weekSlotId ? newWeekSlot : weekSlotItem
    );

    setHomeCareTimeShifts(newWeekSlotsValue);
    calculateTotalTimePerDay(newWeekSlotsValue);
  };

  // Recalculate the total time per day
  const calculateTotalTimePerDay = (newWeekSlotsValue) => {
    setWeekDaysValue(
      weekDaysValue.map((weekDayItem) => {
        let minutes = 0;

        // For each week slot, get the minutes for this day
        newWeekSlotsValue.forEach((weekSlotItem) => {
          const weekSlotItemDayEntry = weekSlotItem.days.find((item) => item.id === weekDayItem.id);

          if (weekSlotItemDayEntry !== undefined) {
            if (weekSlotItemDayEntry.values !== undefined) {
              minutes += weekSlotItemDayEntry.values.person.primary;
              minutes += weekSlotItemDayEntry.values.person.secondary;
              minutes += weekSlotItemDayEntry.values.domestic;
              minutes += weekSlotItemDayEntry.values.liveIn;
              minutes += weekSlotItemDayEntry.values.escort;
            } else {
              // Dropdown
            }
          }
        });

        // Overwrite the minutes
        return { ...weekDayItem, minutes };
      })
    );
  };

  // Add to package
  const addToPackageClick = async () => {
    const slots = [];

    homeCareTimeShifts.forEach((timeShiftItem) => {
      timeShiftItem?.days?.forEach((timeShiftCell) => {
        // eslint-disable-next-line no-empty
        if (timeShiftCell.value) {

        } else if (timeShiftCell.values) {
          const iterateServices = [
            { id: DOMESTIC_CARE_MODE, value: timeShiftCell.values.domestic },
            { id: ESCORT_CARE_MODE, value: timeShiftCell.values.escort },
            { id: LIVE_IN_CARE_MODE, value: timeShiftCell.values.liveIn },
            { id: PERSONAL_CARE_MODE, value: timeShiftCell.values.person },
          ];

          iterateServices.forEach((serviceItem) => {
            const hasSecondary = serviceItem.value.secondary !== undefined;
            const hasValue = hasSecondary ? serviceItem.value.primary > 0 : serviceItem.value > 0;

            if (hasValue) {
              slots.push({
                PrimaryInMinutes: hasSecondary ? serviceItem.value.primary : serviceItem.value,
                SecondaryInMinutes: hasSecondary ? serviceItem.value.secondary : 0,
                TimeSlotShiftId: timeShiftItem.id,
                DayId: timeShiftCell.id,
                NeedToAddress: needToAddress,
                WhatShouldBeDone: whatShouldBeDone,
                ServiceId: serviceItem.id,
              });
            }
          });
        }
      });
    });

    const postData = {
      id: carePackageId,
      slots,
    };

    const pushNotification = (text, className = 'error') => {
      dispatch(addNotification({ text, className }));
    };

    try {
      const summaryData = await postHomeCareTimeSlots(postData);
      setHomeCareSummaryData(summaryData);
      router.push(SOCIAL_WORKER_ROUTE);
    } catch (error) {
      pushNotification(error);
      console.log('error post time slots', error, error?.response);
    }
  };

  const datePeriod = formatCareDatePeriod(startDate, endDate);

  return (
    <Layout
      clientSummaryInfo={{
        client: "James Stephens",
        hackneyId: "786288",
        age: "91",
        dateOfBirth: "09/12/1972",
        postcode: "E9 6EY",
        title:
          <p>Home Care <br />
            <span className='font-size-14px'>
              ({datePeriod.startDate} - {datePeriod.endDate})
            </span>
          </p>
      }}
      headerTitle="BUILD A CARE PACKAGE">
      <div className="mt-5 mb-5">
        <div className="is-flex is-flex-wrap-wrap is-justify-content-flex-start home-care-options">
          <div className="home-care-option">
            <div>
              {homeCareServices !== undefined ? (
                <Dropdown
                  includeInitialText={false}
                  label="Select Service"
                  options={[...homeCareServices].map((item) => ({ text: item.serviceName, value: item.id }))}
                  selectedValue={selectedCareType}
                  onOptionSelect={(option) => setSelectedCareType(option)}
                  buttonStyle={{ minWidth: '239px' }}
                />
              ) : null}
            </div>
          </div>
          <div className="home-care-option">
            <div>
              {times !== undefined ? (
                <Dropdown
                  includeInitialText={false}
                  label="Primary Carer"
                  options={[...times]}
                  selectedValue={selectedPrimaryCareTime}
                  onOptionSelect={(option) => setSelectedPrimaryCareTime(option)}
                  buttonStyle={{ minWidth: '200px' }}
                />
              ) : null}
            </div>
          </div>
          {secondaryTimes !== undefined ? (
            <div className="home-care-option">
              <div>
                <Dropdown
                  includeInitialText={false}
                  label="Secondary Carer"
                  options={[...secondaryTimes]}
                  selectedValue={selectedSecondaryCareTime}
                  onOptionSelect={(option) => {
                    setSelectedSecondaryCareTime(option);
                  }}
                  buttonStyle={{ minWidth: '200px' }}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="columns mt-2">
          <div className="column">
            <TextArea label="Need to Address" rows={5} placeholder="Add details..." onChange={setNeedToAddress} />
          </div>
          <div className="column">
            <TextArea
              label="What should be done"
              rows={5}
              placeholder="Add details..."
              onChange={setWhatShouldBeDone}
            />
          </div>
        </div>
        <div className="mt-2">
          {homeCareServices !== undefined && homeCareTimeShifts !== undefined ? (
            <WeekCarePicker
              homeCareServices={homeCareServices}
              homeCareTimeShifts={homeCareTimeShifts}
              currentMode={selectedCareType}
              weekDays={weekDaysValue}
              onCarePickerClick={onCarePickerClick}
            />
          ) : null}
        </div>
        <div className="level mt-4">
          <div className="level-item level-right">
            <Button onClick={addToPackageClick}>Add to package</Button>
          </div>
        </div>
        <ShouldPackageReclaim isReclaimed={isReclaimed} className="mt-6" setIsReclaimed={changeIsPackageReclaimed} />
        {isReclaimed && (
          <div>
            {packageReclaims.map((item, index) => (
              <PackageReclaim
                remove={index !== 0 ? () => removePackageReclaim(item.id) : undefined}
                key={item.id}
                packageReclaim={item}
                setPackageReclaim={changePackageReclaim(item.id)}
              />
            ))}
            <p onClick={addPackageReclaim} className="action-button-text">
              + Add another reclaim
            </p>
          </div>
        )}
        {homeCareSummaryData !== undefined ? (
          <div className="mt-4 mb-4">
            <TitleHeader>Package Details</TitleHeader>
            <SummaryDataList summaryData={homeCareSummaryData} />
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default HomeCare;
