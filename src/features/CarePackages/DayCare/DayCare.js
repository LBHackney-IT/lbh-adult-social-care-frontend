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
  createDayCarePackage,
  getOpportunitiesLengthOptions,
  getOpportunityTimesPerMonthOptions,
  getTermTimeConsiderationOptions
} from "../../../api/CarePackages/DayCareApi";
import DayCareOpportunities from "./components/DayCareOpportunities";
import { Button } from '../../components/Button';
import { CARE_PACKAGE } from '../../../routes/RouteConstants';
import TitleHeader from '../../components/TitleHeader';
import DayCareSummary from './components/DayCareSummary';

const DayCare = ({history}) => {
  const isTrueSet = (myValue) => (myValue === 'true');
  const checkFixedPeriod = (myValue) => (myValue === '1');

  // Parameters
  const params = useParams();
  let {startDate, endDate, isImmediate, isS117, isFixedPeriod} = params;
  isImmediate = isTrueSet(isImmediate) || false;
  isS117 = isTrueSet(isS117) || false;
  isFixedPeriod = checkFixedPeriod(isFixedPeriod) || false;
  startDate = startDate ?? null;
  endDate = endDate ?? null;

  const [errors, setErrors] = useState([]);
  const [termTimeConsiderationOptions, setTermTimeConsiderationOptions] = useState([]);
  const [opportunitiesLengthOptions, setOpportunitiesLengthOptions] = useState([]);
  const [opportunityTimesPerMonthOptions, setOpportunityTimesPerMonthOptions] = useState([]);

  const [needToAddress, setNeedToAddress] = useState(undefined);
  const [transportNeeded, setTransportIsNeeded] = useState(undefined);
  const [escortNeeded, setEscortIsNeeded] = useState(undefined);
  const [termTimeConsideration, setTermTimeConsideration] = useState(undefined);
  const [opportunityEntries, setOpportunityEntries] = useState([
    {id: 1, howLongValue: 1, timesPerMonthValue: 1, needToAddress: undefined},
  ]);
  // Setup days state using base days value
  const [daysSelected, setDaysSelected] = useState(
    days.map((dayItem) => {
      return {...dayItem, checked: false};
    })
  );

  useEffect(() => {
    retrieveTermTimeConsiderationOptions();
    retrieveOpportunitiesLengthOptions();
    retrieveOpportunityTimesPerMonthOptions();
  }, []);


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
    const newList = opportunityEntries.filter(entry => entry.id !== id);
    setOpportunityEntries(newList);
  }

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
  }

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
    getTermTimeConsiderationOptions().then(res => {
      let options = res.map(option => ({text: option.optionName, value: option.optionId}))
      setTermTimeConsiderationOptions(options);
    })
      .catch(error => {
        setErrors([...errors, `Retrieve term time considerations failed. ${error.message}`]);
      });
  };

  const retrieveOpportunitiesLengthOptions = () => {
    getOpportunitiesLengthOptions().then(res => {
      let options = res.map(option => ({
        text: option.optionName,
        value: option.opportunityLengthOptionId,
        valueInMinutes: option.timeInMinutes
      }))
      setOpportunitiesLengthOptions(options);
    })
      .catch(error => {
        setErrors([...errors, `Retrieve opportunity length options failed. ${error.message}`]);
      });
  };

  const retrieveOpportunityTimesPerMonthOptions = () => {
    getOpportunityTimesPerMonthOptions().then(res => {
      let options = res.map(option => ({text: option.optionName, value: option.opportunityTimePerMonthOptionId}))
      setOpportunityTimesPerMonthOptions(options);
    })
      .catch(error => {
        setErrors([...errors, `Retrieve opportunity times per month options failed. ${error.message}`]);
      });
  };

  const formIsValid = () => {
    const errors = [];

    setErrors(errors);
    // Form is valid if the errors array has no items
    return errors.length === 0;
  }

  const savePackageClick = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;

    const dayCarePackageOpportunities = opportunityEntries.map(item => ({
      howLongId: item.howLongValue,
      howManyTimesPerMonthId: item.timesPerMonthValue,
      opportunitiesNeedToAddress: item.needToAddress
    }));

    const dayCarePackageToCreate = {
      packageId: "33ed381b-32b6-4b41-0fb7-08d900eacb75",
      clientId: "aa872631-02db-474b-42c5-08d900e9e51a",
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
      escortNeeded: escortNeeded,
      termTimeConsiderationOptionId: termTimeConsideration,
      dayCarePackageOpportunities: dayCarePackageOpportunities,
      creatorId: "ffd65af6-8cec-420f-f71d-08d900ea14f0",
      statusId: "380a0e08-eb8a-473f-aaa0-08d900ea3333"
    };
    console.log(dayCarePackageToCreate);

    createDayCarePackage(dayCarePackageToCreate)
      .then(() => {
        alert("Package saved.");
        history.push(`${CARE_PACKAGE}`);
      })
      .catch(error => {
        alert(`Create package failed. ${error.message}`)
        setErrors([...errors, `Create package failed. ${error.message}`]);
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
            setOpportunityEntries={setOpportunityEntries}
            onOpportunityUpdate={handleOpportunityChange}
            addEntry={onAddOpportunityEntry}
          />
        </div>
        <div className="mt-4 mb-4">
          <TitleHeader>Package Details</TitleHeader>
          <DayCareSummary
            opportunityEntries={opportunityEntries}
            needToAddress={needToAddress}
            transportNeeded={transportNeeded}
            daysSelected={daysSelected}
            deleteOpportunity={handleDeleteOpportunityEntry}/>
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
