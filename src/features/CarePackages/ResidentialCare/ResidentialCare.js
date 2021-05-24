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
  createResidentialCarePackage,
  getResidentialCareAdditionalNeedsCostOptions,
  getTypeOfResidentialCareHomeOptions,
} from "../../../api/CarePackages/ResidentialCareApi";
import TitleHeader from "../../components/TitleHeader";
import ResidentialCareSummary from "./components/ResidentialCareSummary";
import { Button } from "../../components/Button";
import { CARE_PACKAGE } from "../../../routes/RouteConstants";
import PackageReclaim from "../../components/PackageReclaim";
import {
  getReclaimAmountOptions,
  getReclaimFromCategories,
  getReclaimFromOptions,
} from "../../../api/CarePackages/PackageReclaimApi";
import { getInitialPackageReclaim } from "../../../api/Utils/CommonOptions";
import { uniqueID } from "../../../service/helpers";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResidentialCare = ({ history }) => {
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
  const [reclaimFromOptions, setReclaimFromOptions] = useState([]);
  const [reclaimFromCategoryOptions, setReclaimFromCategoryOptions] = useState(
    []
  );
  const [reclaimAmountOptions, setReclaimAmountOptions] = useState([]);

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
    if (reclaimFromOptions.length === 0) {
      retrieveReclaimFromOptions();
    }
    if (reclaimFromCategoryOptions.length === 0) {
      retrieveReclaimFromCategories();
    }
    if (reclaimAmountOptions.length === 0) {
      retrieveReclaimAmountOptions();
    }
  }, []);

  const retrieveReclaimFromOptions = () => {
    getReclaimFromOptions()
      .then((res) => {
        let options = res.map((option) => ({
          text: option.reclaimFromName,
          value: option.reclaimFromId,
        }));
        setReclaimFromOptions(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve reclaim from options failed. ${error.message}`,
        ]);
      });
  };

  const retrieveReclaimFromCategories = () => {
    getReclaimFromCategories()
      .then((res) => {
        let options = res.map((option) => ({
          text: option.reclaimCategoryName,
          value: option.reclaimCategoryId,
        }));
        setReclaimFromCategoryOptions(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve reclaim from categories failed. ${error.message}`,
        ]);
      });
  };

  const retrieveReclaimAmountOptions = () => {
    getReclaimAmountOptions()
      .then((res) => {
        let options = res.map((option) => ({
          text: option.amountOptionName,
          value: option.amountOptionId,
        }));
        setReclaimAmountOptions(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve reclaim amount options failed. ${error.message}`,
        ]);
      });
  };

  const addDayCarePackageReclaim = () => {
    setPackagesReclaimed([
      ...packagesReclaimed,
      { ...getInitialPackageReclaim(), id: uniqueID() },
    ]);
  };

  const removeDayCarePackageReclaim = (id) => {
    const newPackagesReclaim = packagesReclaimed.filter(
      (item) => item.id !== id
    );
    setPackagesReclaimed(newPackagesReclaim);
  };

  const changeDayCarePackageReclaim = (id) => (updatedPackage) => {
    const newPackage = packagesReclaimed.slice();
    const packageIndex = packagesReclaimed.findIndex((item) => item.id === id);
    newPackage.splice(packageIndex, 1, updatedPackage);
    setPackagesReclaimed(newPackage);
  };

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

      <div>
        <div className="mt-4 is-flex is-align-items-center is-justify-content-space-between">
          <p className="package-reclaim__text">
            Should the cost of this package be reclaimed in part or full from
            another body, e.g. NHS, CCG, another LA ?
          </p>
          <div className="control radio-list mr-4">
            <label className="radio">
              <input
                type="radio"
                name="showReclaim"
                checked={packagesReclaimed.length > 0}
                onChange={addDayCarePackageReclaim}
              />
              Yes
            </label>
            <br />
            <label className="radio">
              <input
                type="radio"
                name="showReclaim"
                checked={packagesReclaimed.length === 0}
                onChange={() => setPackagesReclaimed([])}
              />
              Not Sure
            </label>
          </div>
        </div>
        <hr className="horizontal-delimiter" />
      </div>

      {!!packagesReclaimed.length && (
        <div>
          {packagesReclaimed.map((item) => {
            return (
              <PackageReclaim
                remove={() => removeDayCarePackageReclaim(item.id)}
                key={item.id}
                packageReclaim={item}
                setPackageReclaim={changeDayCarePackageReclaim(item.id)}
                reclaimFromOptions={reclaimFromOptions}
                reclaimFromCategoryOptions={reclaimFromCategoryOptions}
                reclaimAmountOptions={reclaimAmountOptions}
              />
            );
          })}
          <p onClick={addDayCarePackageReclaim} className="action-button-text">
            + Add another reclaim
          </p>
        </div>
      )}

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
