import { useParams } from "react-router-dom";
import ClientSummary from "../../components/ClientSummary";
import Layout from "../../Layout/Layout";
import "./assets/dayCare.scss";
import CareTitle from "../components/CareTitle";
import TextArea from "../../components/TextArea";
import { days } from "../../components/daysData";
import Checkbox from "../../components/Checkbox";
import { useEffect, useState } from "react";
import RadioButton, { yesNoValues } from "../../components/RadioButton";
import {
  getOpportunitiesLengthOptions,
  getOpportunityTimesPerMonthOptions,
  getTermTimeConsiderationOptions
} from "../../../api/CarePackages/DayCareApi";
import DayCareOpportunities from "./components/DayCareOpportunities";

const DayCare = () => {
  // Parameters
  const params = useParams();
  // const { startDate, endDate, isImmediate, isS117, isFixedPeriod } = params;

  const [errors, setErrors] = useState([]);
  const [termTimeConsiderationOptions, setTermTimeConsiderationOptions] = useState([]);
  const [opportunitiesLengthOptions, setOpportunitiesLengthOptions] = useState([]);
  const [opportunityTimesPerMonthOptions, setOpportunityTimesPerMonthOptions] = useState([]);
  const [transportNeeded, setTransportIsNeeded] = useState(undefined);
  const [escortNeeded, setEscortIsNeeded] = useState(undefined);
  const [termTimeConsideration, setTermTimeConsideration] = useState(undefined);
  const [opportunityEntries, setOpportunityEntries] = useState([
    { id: 1, howLongValue: 45, perMonthValue: 1, needToAddress: undefined },
  ]);

  useEffect(() => {
    retrieveTermTimeConsiderationOptions();
    retrieveOpportunitiesLengthOptions();
    retrieveOpportunityTimesPerMonthOptions();
  }, []);

  // Setup days state using base days value
  const [daysSelected, setDaysSelected] = useState(
    days.map((dayItem) => {
      return { ...dayItem, checked: false };
    })
  );

  // Adding a new opportunity entry
  const onAddOpportunityEntry = () => {
    retrieveOpportunitiesLengthOptions();
    setOpportunityEntries([
      ...opportunityEntries,
      {
        id: opportunityEntries.length + 1,
        howLongValue: 45,
        perMonthValue: 1,
        needToAddress: undefined,
      },
    ]);
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


  const retrieveTermTimeConsiderationOptions =() => {
    getTermTimeConsiderationOptions().then(res => {
      let options = res.map(option => ({ text: option.optionName, value: option.optionId }))
      setTermTimeConsiderationOptions(options);
    })
      .catch(error => {
        setErrors([...errors, `Retrieve term time considerations failed. ${error.message}`]);
      });
  };

  const retrieveOpportunitiesLengthOptions =() => {
    getOpportunitiesLengthOptions().then(res => {
      let options = res.map(option => ({ text: option.optionName, value: option.opportunityLengthOptionId, valueInMinutes: option.timeInMinutes}))
      setOpportunitiesLengthOptions(options);
    })
      .catch(error => {
        setErrors([...errors, `Retrieve opportunity length options failed. ${error.message}`]);
      });
  };

  const retrieveOpportunityTimesPerMonthOptions =() => {
    getOpportunityTimesPerMonthOptions().then(res => {
      let options = res.map(option => ({ text: option.optionName, value: option.opportunityTimePerMonthOptionId}))
      setOpportunityTimesPerMonthOptions(options);
    })
      .catch(error => {
        setErrors([...errors, `Retrieve opportunity times per month options failed. ${error.message}`]);
      });
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
        <CareTitle startDate="27/11/1997" endDate="Ongoing">
          Day Care
        </CareTitle>
        <div className="mt-4 columns">
          <div className="column">
            <TextArea
              label="Need to Address"
              rows={5}
              placeholder="Add details... NB - where half days are needed please specify"
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
            label="Escort needed?"
            onChange={setEscortIsNeeded}
            options={yesNoValues}
            selectedValue={escortNeeded}
          />
        </div>
        <div className="mt-4">
          <RadioButton
            label="Term Time Consideration"
            onChange={setTermTimeConsideration}
            options={termTimeConsiderationOptions}
            selectedValue={termTimeConsideration}
          />
        </div>
        <div className="mt-4">
          <DayCareOpportunities
            entries={opportunityEntries}
            lengthOptions={opportunitiesLengthOptions}
            timesPerMonthOptions={opportunityTimesPerMonthOptions}
            addEntry={onAddOpportunityEntry}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DayCare;
