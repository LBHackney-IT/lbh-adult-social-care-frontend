import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientSummary from "../../components/ClientSummary";
import Dropdown from "../../components/Dropdown";
import TextArea from "../../components/TextArea";
import Layout from "../../Layout/Layout";
import AdditionalNeeds, { getInitialAdditionalNeedsArray, } from "../components/AdditionalNeedsEntries";
import CareTitle from "../components/CareTitle";
import "./assets/nursingCare.scss";
import TitleHeader from '../../components/TitleHeader';
import NursingCareSummary from './components/NursingCareSummary';
import { Button } from '../../components/Button';
import { getTypeOfNursingHomeOptions } from '../../../api/CarePackages/NursingCareApi';

// TODO remove
const additionalNeedsCostOptions = [
  { text: "Weekly", value: 1 },
  { text: "One off", value: 2 },
];

const NursingCare = () => {

  const isTrueParse = (myValue) => (myValue === 'true');
  const checkFixedPeriod = (myValue) => (myValue === '1');

  // Parameters
  const params = useParams();
  let { startDate, endDate, isThisAnImmediateService, isThisUserUnderS117, isFixedPeriod, typeOfStayId, hasRespiteCare, hasDischargePackage } = params;
  isThisAnImmediateService = isTrueParse(isThisAnImmediateService) || false;
  isThisUserUnderS117 = isTrueParse(isThisUserUnderS117) || false;
  isFixedPeriod = checkFixedPeriod(isFixedPeriod) || false;
  startDate = startDate ?? null;
  endDate = endDate ?? null;
  typeOfStayId = parseInt(typeOfStayId) ?? null;
  hasRespiteCare = isTrueParse(hasRespiteCare) || false;
  hasDischargePackage = isTrueParse(hasDischargePackage) || false;

  console.log(startDate, endDate, isThisAnImmediateService, isThisUserUnderS117, isFixedPeriod, typeOfStayId, hasRespiteCare, hasDischargePackage);

  // State
  const [careHomeTypes, setCareHomeTypes] = useState([]);
  const [errors, setErrors] = useState([]);

  const [selectedNursingHomeType, setSelectedNursingHomeType] = useState(1);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(
    getInitialAdditionalNeedsArray()
  );

  const retrieveTypeOfNursingHomeOptions = () => {
    getTypeOfNursingHomeOptions().then(res => {
      let options = res.map(option => ({
        text: option.typeOfCareHomeName,
        value: option.typeOfCareHomeId
      }))
      setCareHomeTypes(options);
    })
      .catch(error => {
        setErrors([...errors, `Retrieve nursing care home type options failed. ${error.message}`]);
      });
  };

  useEffect(() => {
    if(careHomeTypes.length === 0 || careHomeTypes.length === 1) {
      retrieveTypeOfNursingHomeOptions();
    }
  }, [])

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
        <CareTitle startDate="27/11/1997" endDate="03/09/2021">
          Nursing Care
        </CareTitle>
      </div>
      <div className="mt-4 columns">
        <div className="column">
          <TextArea
            label="Need to Address"
            rows={5}
            placeholder="Add details..."
          />
        </div>
        <div className="column">
          <Dropdown
            label="Type of nursing home"
            options={careHomeTypes}
            selectedValue={selectedNursingHomeType}
            onOptionSelect={(option) => setSelectedNursingHomeType(option)}
            buttonStyle={{ width: "240px" }}
          />
        </div>
      </div>
      <div className="mt-4">
        <AdditionalNeeds
          costOptions={additionalNeedsCostOptions}
          entries={additionalNeedsEntries}
          setAdditionalNeedsState={setAdditionalNeedsEntries}
        />
      </div>

      <div className="mt-4 mb-4">
        <TitleHeader>Package Details</TitleHeader>
        <NursingCareSummary/>
      </div>

      <div className="level mt-4">
        <div className="level-item level-right">
          <Button>Confirm Package</Button>
        </div>
      </div>
    </Layout>
  );
};

export default NursingCare;
