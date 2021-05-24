import { useParams } from "react-router-dom";
import ClientSummary from "../../components/ClientSummary";
import Layout from "../../Layout/Layout";
import "./assets/dayCare.scss";
import CareTitle from "../components/CareTitle";
import TextArea from "../../components/TextArea";
import { days } from "../../components/daysData";
import Checkbox from "../../components/Checkbox";
import React, { useEffect, useState } from "react";
import RadioButton, { yesNoValues } from "../../components/RadioButton";
import {
  createDayCarePackage,
  getOpportunitiesLengthOptions,
  getOpportunityTimesPerMonthOptions,
  getTermTimeConsiderationOptions,
} from "../../../api/CarePackages/DayCareApi";
import DayCareOpportunities from "./components/DayCareOpportunities";
import { Button } from "../../components/Button";
import { CARE_PACKAGE } from "../../../routes/RouteConstants";
import TitleHeader from "../../components/TitleHeader";
import DayCareSummary from "./components/DayCareSummary";
import DayCareCollegeAsyncSearch from "./components/DayCareCollegeAsyncSearch";
import PackageReclaims from "../components/PackageReclaims";

const DayCare = ({ history }) => {
  const isTrueSet = (myValue) => myValue === "true";
  const checkFixedPeriod = (myValue) => myValue === "1";

  // Parameters
  const params = useParams();
  let { startDate, endDate, isImmediate, isS117, isFixedPeriod } = params;
  isImmediate = isTrueSet(isImmediate) || false;
  isS117 = isTrueSet(isS117) || false;
  isFixedPeriod = checkFixedPeriod(isFixedPeriod) || false;
  startDate = startDate ?? null;
  endDate = endDate ?? null;

  const [errors, setErrors] = useState([]);
  const [termTimeNAId, setTermTimeNaId] = useState(undefined);
  const [
    termTimeConsiderationOptions,
    setTermTimeConsiderationOptions,
  ] = useState([]);
  const [opportunitiesLengthOptions, setOpportunitiesLengthOptions] = useState(
    []
  );
  const [
    opportunityTimesPerMonthOptions,
    setOpportunityTimesPerMonthOptions,
  ] = useState([]);

  const [needToAddress, setNeedToAddress] = useState(undefined);
  const [transportNeeded, setTransportIsNeeded] = useState(undefined);
  const [transportEscortNeeded, setTransportEscortIsNeeded] = useState(
    undefined
  );
  const [escortNeeded, setEscortIsNeeded] = useState(undefined);
  const [termTimeConsideration, setTermTimeConsideration] = useState(undefined);
  const [displaySelectCollege, setDisplaySelectCollege] = useState(false);
  const [collegeId, setCollegeId] = useState(undefined);
  const [opportunityEntries, setOpportunityEntries] = useState([
    { id: 1, howLongValue: 1, timesPerMonthValue: 1, needToAddress: undefined },
  ]);
  // Setup days state using base days value
  const [daysSelected, setDaysSelected] = useState(
    days.map((dayItem) => {
      return { ...dayItem, checked: false };
    })
  );

  // package reclaim
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);

  // Adding a new opportunity entry
  const onAddOpportunityEntry = () => {
    setOpportunityEntries([
      ...opportunityEntries,
      {
        id: opportunityEntries.length + 1,
        howLongValue: 1,
        timesPerMonthValue: 1,
        needToAddress: undefined,
      },
    ]);
  };

  const handleDeleteOpportunityEntry = (id) => {
    const newList = opportunityEntries.filter((entry) => entry.id !== id);
    setOpportunityEntries(newList);
  };

  const handleNeedToUpdateChange = (event) => {
    setNeedToAddress(event);
  };

  const handleOpportunityChange = (opportunity) => {
    const newList = opportunityEntries.map((item) => {
      if (item.id === opportunity.id) {
        return {
          ...item,
          ...opportunity,
        };
      }

      return item;
    });

    setOpportunityEntries(newList);
  };

  // Handle a day checkbox change
  const onDayCheckboxChange = (dayId, isChecked) => {
    const dayEntry = daysSelected.find((item) => item.id === dayId);
    dayEntry.checked = isChecked;
    setDaysSelected(
      daysSelected.map((dayEntryItem) =>
        dayEntryItem.id === dayId ? dayEntry : dayEntryItem
      )
    );
  };

  const retrieveTermTimeConsiderationOptions = () => {
    getTermTimeConsiderationOptions()
      .then((res) => {
        let options = res.map((option) => {
          if (option.optionName.toLowerCase().trim() === "n/a") {
            setTermTimeNaId(option.optionId);
          }
          return {
            text: option.optionName,
            value: option.optionId,
          };
        });
        setTermTimeConsiderationOptions(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve term time considerations failed. ${error.message}`,
        ]);
      });
  };

  const retrieveOpportunitiesLengthOptions = () => {
    getOpportunitiesLengthOptions()
      .then((res) => {
        let options = res.map((option) => ({
          text: option.optionName,
          value: option.opportunityLengthOptionId,
          valueInMinutes: option.timeInMinutes,
        }));
        setOpportunitiesLengthOptions(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve opportunity length options failed. ${error.message}`,
        ]);
      });
  };

  const retrieveOpportunityTimesPerMonthOptions = () => {
    getOpportunityTimesPerMonthOptions()
      .then((res) => {
        let options = res.map((option) => ({
          text: option.optionName,
          value: option.opportunityTimePerMonthOptionId,
        }));
        setOpportunityTimesPerMonthOptions(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve opportunity times per month options failed. ${error.message}`,
        ]);
      });
  };

  useEffect(() => {
    if (termTimeConsiderationOptions.length === 0) {
      retrieveTermTimeConsiderationOptions();
    }
    if (
      opportunitiesLengthOptions.length === 0 ||
      opportunitiesLengthOptions.length === 1
    ) {
      retrieveOpportunitiesLengthOptions();
    }
    if (
      opportunityTimesPerMonthOptions.length === 0 ||
      opportunityTimesPerMonthOptions.length === 1
    ) {
      retrieveOpportunityTimesPerMonthOptions();
    }
  }, [history]);

  const formIsValid = () => {
    const errors = [];

    setErrors(errors);
    // Form is valid if the errors array has no items
    return errors.length === 0;
  };

  const savePackageClick = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;

    const dayCarePackageOpportunities = opportunityEntries.map((item) => ({
      howLongId: item.howLongValue,
      howManyTimesPerMonthId: item.timesPerMonthValue,
      opportunitiesNeedToAddress: item.needToAddress,
    }));

    const packageReclaims = packagesReclaimed.map((reclaim) => {
      return {
        ReclaimFromId: reclaim.from,
        ReclaimCategoryId: reclaim.category,
        ReclaimAmountOptionId: reclaim.type,
        Notes: reclaim.notes,
        Amount: reclaim.amount,
      };
    });

    const dayCarePackageToCreate = {
      clientId: "aee45700-af9b-4ab5-bb43-535adbdcfb80",
      isFixedPeriodOrOngoing: isFixedPeriod,
      startDate: startDate ? new Date(startDate).toJSON() : null,
      endDate: endDate ? new Date(endDate).toJSON() : null,
      isThisAnImmediateService: isImmediate,
      isThisUserUnderS117: isS117,
      needToAddress: needToAddress,
      monday: daysSelected[0].checked,
      tuesday: daysSelected[1].checked,
      wednesday: daysSelected[2].checked,
      thursday: daysSelected[3].checked,
      friday: daysSelected[4].checked,
      saturday: daysSelected[5].checked,
      sunday: daysSelected[6].checked,
      transportNeeded: transportNeeded,
      transportEscortNeeded: transportEscortNeeded,
      escortNeeded: escortNeeded,
      termTimeConsiderationOptionId: termTimeConsideration,
      dayCarePackageOpportunities: dayCarePackageOpportunities,
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      collegeId: collegeId,
      packageReclaims: packageReclaims,
    };

    createDayCarePackage(dayCarePackageToCreate)
      .then(() => {
        alert("Package saved.");
        history.push(`${CARE_PACKAGE}`);
      })
      .catch((error) => {
        alert(`Create package failed. ${error.message}`);
        setErrors([...errors, `Create package failed. ${error.message}`]);
      });
  };

  const handleTermTimeSelectionChanged = (value) => {
    setTermTimeConsideration(value);
    setCollegeId(undefined);
    if (value !== termTimeNAId) {
      // Display select college
      setDisplaySelectCollege(true);
    } else {
      // Hide select college
      setDisplaySelectCollege(false);
    }
  };
  return (
    <Layout headerTitle="BUILD A CARE PACKAGE">
      <ClientSummary
        client="James Stephens"
        hackneyId="786288"
        age="91"
        dateOfBirth="09/12/1972"
        postcode="E9 6EY"
      >
        Care Package
      </ClientSummary>
      <div className="mt-5 mb-5">
        <CareTitle startDate={startDate} endDate={endDate}>
          Day Care
        </CareTitle>
        <div className="mt-4 columns">
          <div className="column">
            <TextArea
              label="Need to Address"
              rows={5}
              placeholder="Add details... NB - where half days are needed please specify"
              onChange={handleNeedToUpdateChange}
            />
          </div>
          <div className="column columns day-care-day-cbxs">
            {daysSelected.map((dayItem) => {
              // Handle this checkbox click
              const onThisDayCheckboxChange = (isChecked) => {
                onDayCheckboxChange(dayItem.id, isChecked);
              };

              return (
                <div className="column" key={dayItem.id}>
                  <label>{dayItem.short.toUpperCase()}</label>
                  <Checkbox
                    id="immediateServiceCbx"
                    checked={dayItem.checked}
                    onChange={onThisDayCheckboxChange}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-4">
          <RadioButton
            label="Transport needed?"
            onChange={setTransportIsNeeded}
            options={yesNoValues}
            selectedValue={transportNeeded}
          />
        </div>
        <div className="mt-4">
          <RadioButton
            label="Transport escort needed?"
            onChange={setTransportEscortIsNeeded}
            options={yesNoValues}
            selectedValue={transportEscortNeeded}
          />
        </div>
        <div className="mt-4">
          <RadioButton
            label="Escort needed?"
            onChange={setEscortIsNeeded}
            options={yesNoValues}
            selectedValue={escortNeeded}
          />
        </div>
        <div className="mt-4">
          <RadioButton
            label="Term Time Consideration"
            onChange={handleTermTimeSelectionChanged}
            options={termTimeConsiderationOptions}
            selectedValue={termTimeConsideration}
          />
        </div>

        {displaySelectCollege && (
          <div className="mt-4">
            <DayCareCollegeAsyncSearch
              classNames="is-3"
              setSelectedCollege={(collegeItem) => {
                if (collegeItem) setCollegeId(collegeItem.id);
              }}
            />
          </div>
        )}

        <div className="mt-4">
          <DayCareOpportunities
            entries={opportunityEntries}
            lengthOptions={opportunitiesLengthOptions}
            timesPerMonthOptions={opportunityTimesPerMonthOptions}
            setOpportunityEntries={setOpportunityEntries}
            onOpportunityUpdate={handleOpportunityChange}
            addEntry={onAddOpportunityEntry}
          />
        </div>

        <PackageReclaims
          errors={errors}
          setErrors={setErrors}
          packagesReclaimed={packagesReclaimed}
          setPackagesReclaimed={setPackagesReclaimed}
        />

        <div className="mt-4 mb-4">
          <TitleHeader>Package Details</TitleHeader>
          <DayCareSummary
            opportunityEntries={opportunityEntries}
            needToAddress={needToAddress}
            transportNeeded={transportNeeded}
            daysSelected={daysSelected}
            deleteOpportunity={handleDeleteOpportunityEntry}
          />
        </div>
        <div className="level mt-4">
          <div className="level-item level-right">
            <Button onClick={savePackageClick}>Confirm Package</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DayCare;
