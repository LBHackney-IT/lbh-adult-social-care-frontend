import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import {
  createHomeCarePackage,
  getHomeCareServices,
  getHomeCareSummaryData,
} from "../../../api/CarePackages/HomeCareApi";
import { Button } from "../../components/Button";
import ClientSummary from "../../components/ClientSummary";
import Dropdown from "../../components/Dropdown";
import TextArea from "../../components/TextArea";
import TitleHeader from "../../components/TitleHeader";
import Layout from "../../Layout/Layout";
import CareTitle from "../components/CareTitle";
import "./assets/homeCare.scss";
import SummaryDataList from "./components/SummaryDataList";
import WeekCarePicker from "./components/WeekCarePicker";
import { PERSONAL_CARE_MODE } from "./HomeCarePickerHelper";
import { getServiceTypeCareTimes, serviceTypes } from "./HomeCareServiceHelper";
import ShouldPackageReclaim from "./components/ShouldPackageReclaim";
import PackageReclaim from "../../components/PackageReclaim";
import { uniqueID } from "../../../service/helpers";

const initialPackageReclaim = {
  type: "",
  notes: "",
  from: "",
  category: "",
  amount: "",
  id: "1",
};

const HomeCare = () => {
  // Parameters
  const params = useParams();
  const { startDate, endDate, isImmediate, isS117, isFixedPeriod } = params;

  // State
  const [selectedCareType, setSelectedCareType] = useState(PERSONAL_CARE_MODE);
  const [selectedPrimaryCareTime, setSelectedPrimaryCareTime] = useState(1);
  const [selectedSecondaryCareTime, setSelectedSecondaryCareTime] = useState(1);
  const [homeCareSummaryData, setHomeCareSummaryData] = useState(undefined);
  const [homeCareServices, setHomeCareServices] = useState(undefined);
  const [carePackageId, setCarePackageId] = useState(undefined);
  const [packagesReclaimed, setPackagesReclaimed] = useState([
    { ...initialPackageReclaim },
  ]);
  const [isReclaimed, setIsReclaimed] = useState(null);

  const addPackageReclaim = () => {
    setPackagesReclaimed([
      ...packagesReclaimed,
      { ...initialPackageReclaim, id: uniqueID() },
    ]);
  };

  const removePackageReclaim = (id) => {
    const newPackagesReclaim = packagesReclaimed.filter(
      (item) => item.id !== id
    );
    setPackagesReclaimed(newPackagesReclaim);
  };

  const changePackageReclaim = (id) => (updatedPackage) => {
    const newPackage = packagesReclaimed.slice();
    const packageIndex = packagesReclaimed.findIndex((item) => item.id == id);
    newPackage.splice(packageIndex, 1, updatedPackage);
    setPackagesReclaimed(newPackage);
  };

  const changeIsPackageReclaimed = (status) => {
    setPackagesReclaimed([{ ...initialPackageReclaim }]);
    setIsReclaimed(status);
  };

  // Init home care package via API
  useEffect(() => {
    async function createHomeCarePackageAsync() {
      const carePackageCreateResult = await createHomeCarePackage(
        new Date(startDate),
        new Date(endDate),
        isImmediate === "true",
        isS117 === "true",
        isFixedPeriod === "true"
      );

      setCarePackageId(carePackageCreateResult);
    }

    createHomeCarePackageAsync();
  }, [startDate, endDate, isImmediate, isS117, isFixedPeriod]);

  useEffect(() => {
    // Home care services
    async function getHomeCareServicesAsync() {
      setHomeCareServices(await getHomeCareServices());
    }
    getHomeCareServicesAsync();
  }, []);

  const { times, secondaryTimes } = getServiceTypeCareTimes(selectedCareType);

  const addToPackageClick = () => {
    setHomeCareSummaryData(getHomeCareSummaryData());
    //window.scrollTo(0, 200);
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
        <CareTitle startDate="2021/05/19" endDate="2021/05/19">
          Homecare Care
        </CareTitle>
        <div className="is-flex is-justify-content-flex-start home-care-options">
          <div className="home-care-option">
            <div>
              <Dropdown
                label="Select Service"
                options={serviceTypes}
                selectedValue={selectedCareType}
                onOptionSelect={(option) => setSelectedCareType(option)}
                buttonStyle={{ minWidth: "239px" }}
              />
            </div>
          </div>
          <div className="home-care-option">
            <div>
              <Dropdown
                label="Primary Carer"
                options={times}
                selectedValue={selectedPrimaryCareTime}
                onOptionSelect={(option) => setSelectedPrimaryCareTime(option)}
                buttonStyle={{ minWidth: "200px" }}
              />
            </div>
          </div>
          {secondaryTimes !== undefined ? (
            <div className="home-care-option">
              <div>
                <Dropdown
                  label="Secondary Carer"
                  options={secondaryTimes}
                  selectedValue={selectedSecondaryCareTime}
                  onOptionSelect={(option) =>
                    setSelectedSecondaryCareTime(option)
                  }
                  buttonStyle={{ minWidth: "200px" }}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="columns mt-2">
          <div className="column">
            <TextArea
              label="Need to Address"
              rows={5}
              placeholder="Add details..."
            />
          </div>
          <div className="column">
            <TextArea
              label="What should be done"
              rows={5}
              placeholder="Add details..."
            />
          </div>
        </div>
        <div className="mt-2">
          <WeekCarePicker
            currentMode={selectedCareType}
            primaryCareTimes={times}
            secondaryCareTimes={secondaryTimes}
            selectedPrimaryCareTypeId={selectedPrimaryCareTime}
            selectedSecondaryCareTypeId={selectedSecondaryCareTime}
          />
        </div>

        <PackageReclaims
          errors={errors}
          setErrors={setErrors}
          packagesReclaimed={packagesReclaimed}
          setPackagesReclaimed={setPackagesReclaimed}
        />
        <div className="level mt-4">
          <div className="level-item level-right">
            <Button onClick={addToPackageClick}>Add to package</Button>
          </div>
        </div>
        <ShouldPackageReclaim
          isReclaimed={isReclaimed}
          setIsReclaimed={changeIsPackageReclaimed}
        />
        {isReclaimed && (
          <div>
            {packagesReclaimed.map((item, index) => {
              return (
                <PackageReclaim
                  remove={
                    index !== 0
                      ? () => removePackageReclaim(item.id)
                      : undefined
                  }
                  key={item.id}
                  packageReclaim={item}
                  setPackageReclaim={changePackageReclaim(item.id)}
                />
              );
            })}
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
