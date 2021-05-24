import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientSummary from "../../components/ClientSummary";
import Dropdown from "../../components/Dropdown";
import TextArea from "../../components/TextArea";
import Layout from "../../Layout/Layout";
import AdditionalNeeds, {
  getInitialAdditionalNeedsArray,
} from "../components/AdditionalNeedsEntries";
import CareTitle from "../components/CareTitle";
import "./assets/nursingCare.scss";
import TitleHeader from "../../components/TitleHeader";
import NursingCareSummary from "./components/NursingCareSummary";
import { Button } from "../../components/Button";
import {
  createNursingCarePackage,
  getTypeOfNursingHomeOptions,
} from "../../../api/CarePackages/NursingCareApi";
import { CARE_PACKAGE } from "../../../routes/RouteConstants";
import PackageReclaims from "../components/PackageReclaims";

const NursingCare = ({ history }) => {
  const isTrueParse = (myValue) => myValue === "true";
  const notNullString = (myValue) =>
    myValue !== "null" && myValue !== "undefined";

  // TODO remove
  const additionalNeedsCostOptions = [
    { text: "Weekly", value: 1 },
    { text: "One off", value: 2 },
  ];

  // Parameters
  const params = useParams();
  let {
    startDate,
    endDate,
    isThisAnImmediateService,
    isThisUserUnderS117,
    isFixedPeriod,
    typeOfStayId,
    hasRespiteCare,
    hasDischargePackage,
  } = params;
  isThisAnImmediateService = isTrueParse(isThisAnImmediateService) || false;
  isThisUserUnderS117 = isTrueParse(isThisUserUnderS117) || false;
  isFixedPeriod = isTrueParse(isFixedPeriod) || false;
  startDate = startDate ?? null;
  endDate = endDate && notNullString(endDate) ? endDate : undefined;
  typeOfStayId = parseInt(typeOfStayId) ?? null;
  hasRespiteCare = isTrueParse(hasRespiteCare) || false;
  hasDischargePackage = isTrueParse(hasDischargePackage) || false;

  // State
  const [careHomeTypes, setCareHomeTypes] = useState([]);
  const [errors, setErrors] = useState([]);

  const [needToAddress, setNeedToAddress] = useState(undefined);
  const [selectedNursingHomeType, setSelectedNursingHomeType] = useState(1);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(
    getInitialAdditionalNeedsArray()
  );

  // Package reclaim
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);

  const retrieveTypeOfNursingHomeOptions = () => {
    getTypeOfNursingHomeOptions()
      .then((res) => {
        let options = res.map((option) => ({
          text: option.typeOfCareHomeName,
          value: option.typeOfCareHomeId,
        }));
        setCareHomeTypes(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve nursing care home type options failed. ${error.message}`,
        ]);
      });
  };

  useEffect(() => {
    if (careHomeTypes.length === 0 || careHomeTypes.length === 1) {
      retrieveTypeOfNursingHomeOptions();
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

    const nursingCareAdditionalNeeds = additionalNeedsEntries.map((item) => ({
      isWeeklyCost: item.selectedCost === 1,
      isOneOffCost: item.selectedCost === 2,
      needToAddress: item.needToAddress,
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
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

    const nursingCarePackageToCreate = {
      isFixedPeriod: isFixedPeriod,
      clientId: "aee45700-af9b-4ab5-bb43-535adbdcfb80",
      startDate: startDate ? new Date(startDate).toJSON() : null,
      endDate: endDate ? new Date(endDate).toJSON() : null,
      hasRespiteCare: hasRespiteCare,
      hasDischargePackage: hasDischargePackage,
      isThisAnImmediateService: isThisAnImmediateService,
      isThisUserUnderS117: isThisUserUnderS117,
      typeOfStayId: typeOfStayId,
      needToAddress: needToAddress,
      typeOfNursingCareHomeId: selectedNursingHomeType,
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      nursingCareAdditionalNeeds,
      packageReclaims,
    };

    createNursingCarePackage(nursingCarePackageToCreate)
      .then(() => {
        alert("Package saved.");
        history.push(`${CARE_PACKAGE}`);
      })
      .catch((error) => {
        alert(`Create package failed. ${error.message}`);
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
        <CareTitle startDate={startDate} endDate={endDate}>
          Nursing Care
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

      <PackageReclaims
        errors={errors}
        setErrors={setErrors}
        packagesReclaimed={packagesReclaimed}
        setPackagesReclaimed={setPackagesReclaimed}
      />

      <div className="mt-4 mb-4">
        <TitleHeader>Package Details</TitleHeader>
        <NursingCareSummary
          startDate={startDate}
          endDate={endDate}
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

export default NursingCare;
