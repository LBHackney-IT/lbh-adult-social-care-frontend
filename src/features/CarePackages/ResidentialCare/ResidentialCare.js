import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ClientSummary from "../../components/ClientSummary";
import Layout from "../../Layout/Layout";
import CareTitle from "../components/CareTitle";
import "./assets/residentialCare.scss";
import TextArea from "../../components/TextArea";
import Dropdown from "../../components/Dropdown";
import AdditionalNeeds, {
  getInitialAdditionalNeedsArray,
} from "../components/AdditionalNeedsEntries";
import {
  getResidentialCareAdditionalNeedsCostOptions,
  getTypeOfResidentialCareHomeOptions,
} from "../../../api/CarePackages/ResidentialCareApi";
import TitleHeader from "../../components/TitleHeader";
import ResidentialCareSummary from "./components/ResidentialCareSummary";
import { Button } from "../../components/Button";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResidentialCare = () => {
  const isTrueParse = (myValue) => myValue === "true";
  const notNullString = (myValue) =>
    myValue !== "null" && myValue !== "undefined";

  // Parameters
  const params = useParams();
  let {
    hasRespiteCare,
    hasDischargePackage,
    isImmediateOrReEnablement,
    typeOfStayId,
    isS117,
    startDate,
    endDate,
  } = params;
  hasRespiteCare = isTrueParse(hasRespiteCare) || false;
  hasDischargePackage = isTrueParse(hasDischargePackage) || false;
  isImmediateOrReEnablement = isTrueParse(isImmediateOrReEnablement) || false;
  typeOfStayId = parseInt(typeOfStayId) ?? null;
  isS117 = isTrueParse(isS117) || false;
  startDate = startDate ?? null;
  endDate = endDate && notNullString(endDate) ? endDate : undefined;

  // get query params
  let query = useQuery();
  let typeOfStayText = query.get("typeOfStayText");
  console.log(typeOfStayText);

  console.log(
    hasRespiteCare,
    hasDischargePackage,
    isImmediateOrReEnablement,
    typeOfStayId,
    isS117,
    startDate,
    endDate
  );

  // State
  const [careHomeTypes, setCareHomeTypes] = useState([]);
  const [additionalNeedsCostOptions, setAdditionalNeedsCostOptions] = useState(
    []
  );
  const [errors, setErrors] = useState([]);

  const [needToAddress, setNeedToAddress] = useState(undefined);
  const [selectedCareHomeType, setSelectedCareHomeType] = useState(1);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(
    getInitialAdditionalNeedsArray()
  );

  const retrieveTypeOfResidentialCareHomeOptions = () => {
    const types = getTypeOfResidentialCareHomeOptions();
    setCareHomeTypes(types);
  };

  const retrieveResidentialCareAdditionalNeedsCostOptions = () => {
    const options = getResidentialCareAdditionalNeedsCostOptions();
    setAdditionalNeedsCostOptions(options);
  };

  useEffect(() => {
    if (careHomeTypes.length === 0 || careHomeTypes.length === 1) {
      retrieveTypeOfResidentialCareHomeOptions();
    }
    if (
      additionalNeedsCostOptions.length === 0 ||
      additionalNeedsCostOptions.length === 1
    ) {
      retrieveResidentialCareAdditionalNeedsCostOptions();
    }
  }, []);

  const formIsValid = () => {
    const errors = [];

    setErrors(errors);
    // Form is valid if the errors array has no items
    return errors.length === 0;
  };

  const handleSavePackage = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;

    const residentialCareAdditionalNeeds = additionalNeedsEntries.map(
      (item) => ({
        isWeeklyCost: item.selectedCost === 1,
        isOneOffCost: item.selectedCost === 2,
        isFixedPeriod: item.selectedCost === 3,
        startDate:
          item.selectedCost === 3
            ? new Date(item.selectedPeriod.startDate).toJSON()
            : null,
        endDate:
          item.selectedCost === 3
            ? new Date(item.selectedPeriod.endDate).toJSON()
            : null,
        needToAddress: item.needToAddress,
        creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      })
    );

    const residentialCarePackageToCreate = {
      clientId: "aee45700-af9b-4ab5-bb43-535adbdcfb80",
      startDate: startDate ? new Date(startDate).toJSON() : null,
      endDate: endDate ? new Date(endDate).toJSON() : null,
      hasRespiteCare: hasRespiteCare,
      hasDischargePackage: hasDischargePackage,
      isThisAnImmediateService: isImmediateOrReEnablement,
      isThisUserUnderS117: isS117,
      residentialCareTypeOfStayId: typeOfStayId,
      needToAddress: needToAddress,
      typeOfResidentialCareHomeId: selectedCareHomeType,
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      residentialCareAdditionalNeeds,
    };

    console.log(residentialCarePackageToCreate);
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
          Residential Care
        </CareTitle>
      </div>
      <div className="mt-4 columns">
        <div className="column">
          <TextArea
            label="Need to Address"
            rows={5}
            placeholder="Add details..."
            onChange={setNeedToAddress}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Type of care home"
            options={careHomeTypes}
            selectedValue={selectedCareHomeType}
            onOptionSelect={(option) => setSelectedCareHomeType(option)}
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
        <ResidentialCareSummary
          startDate={startDate}
          endDate={endDate}
          typeOfStayText={typeOfStayText}
          needToAddress={needToAddress}
          additionalNeedsEntries={additionalNeedsEntries}
          setAdditionalNeedsEntries={setAdditionalNeedsEntries}
        />
      </div>

      <div className="level mt-4">
        <div className="level-item level-right">
          <Button onClick={handleSavePackage}>Confirm Package</Button>
        </div>
      </div>
    </Layout>
  );
};

export default ResidentialCare;
