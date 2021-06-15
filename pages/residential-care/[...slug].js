import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ClientSummary from "../../components/ClientSummary";
import Layout from "../../components/Layout/Layout";
import CareTitle from "../../components/CarePackages/CareTitle";
import TextArea from "../../components/TextArea";
import Dropdown from "../../components/Dropdown";
import AdditionalNeeds, {
  getInitialAdditionalNeedsArray
} from "../../components/CarePackages/AdditionalNeedsEntries";
import {
  createResidentialCarePackage,
  getResidentialCareAdditionalNeedsCostOptions,
  getTypeOfResidentialCareHomeOptions,
} from "../../api/CarePackages/ResidentialCareApi";
import TitleHeader from "../../components/TitleHeader";
import ResidentialCareSummary from "../../components/ResidentialCare/ResidentialCareSummary";
import { Button } from "../../components/Button";
import { CARE_PACKAGE_ROUTE } from "../../routes/RouteConstants";
import {getUserSession} from "../../service/helpers";
import withSession from "../../lib/session";
import PackageReclaims from "../../components/PackageReclaims";

export const getServerSideProps = withSession(async function({ req }) {
  const user = getUserSession({ req });
  if(user.redirect) {
    return user;
  }

  return {
    props: {}, // will be passed to the page component as props
  }
});

const ResidentialCare = (props) => {
  const isTrueParse = (myValue) => myValue === "true";
  const notNullString = (myValue) =>
    myValue !== "null" && myValue !== "undefined";

  // Parameters
  const router = useRouter();
  let [
    hasRespiteCare,
    hasDischargePackage,
    isImmediateOrReEnablement,
    typeOfStayId,
    isS117,
    startDate,
    endDate,
    typeOfStayText,
  ] = router.query.slug; // get query params
  hasRespiteCare = isTrueParse(hasRespiteCare) || false;
  hasDischargePackage = isTrueParse(hasDischargePackage) || false;
  isImmediateOrReEnablement = isTrueParse(isImmediateOrReEnablement) || false;
  typeOfStayId = parseInt(typeOfStayId) ?? null;
  isS117 = isTrueParse(isS117) || false;
  startDate = startDate ?? null;
  endDate = endDate && notNullString(endDate) ? endDate : undefined;

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

  // Package reclaim
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);

  const retrieveTypeOfResidentialCareHomeOptions = () => {
    getTypeOfResidentialCareHomeOptions()
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
          `Retrieve residential care home type options failed. ${error.message}`,
        ]);
      });
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
  }, [careHomeTypes, additionalNeedsCostOptions]);

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

    const packageReclaims = packagesReclaimed.map((reclaim) => {
      return {
        ReclaimFromId: reclaim.from,
        ReclaimCategoryId: reclaim.category,
        ReclaimAmountOptionId: reclaim.type,
        Notes: reclaim.notes,
        Amount: reclaim.amount,
      };
    });

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
      packageReclaims: packageReclaims,
    };

    createResidentialCarePackage(residentialCarePackageToCreate)
      .then(() => {
        alert("Package saved.");
        router.push(`${CARE_PACKAGE_ROUTE}`);
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

      <PackageReclaims
        errors={errors}
        setErrors={setErrors}
        packagesReclaimed={packagesReclaimed}
        setPackagesReclaimed={setPackagesReclaimed}
      />

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
