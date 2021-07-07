import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  createHomeCarePackage,
  getHomeCareServices,
  getHomeCareSummaryData,
} from "../../../api/CarePackages/HomeCareApi";
import ClientSummary from "../../../components/ClientSummary";
import Dropdown from "../../../components/Dropdown";
import TextArea from "../../../components/TextArea";
import TitleHeader from "../../../components/TitleHeader";
import Layout from "../../../components/Layout/Layout";
import CareTitle from "../../../components/CarePackages/CareTitle";
import SummaryDataList from "../../../components/HomeCare/SummaryDataList";
import WeekCarePicker from "../../../components/HomeCare/WeekCarePicker";
import { Button } from "../../../components/Button";
import { PERSONAL_CARE_MODE } from "../../../service/homeCarePickerHelper";
import {
  getServiceTypeCareTimes,
  serviceTypes,
} from "../../../service/homeCareServiceHelper";
import ShouldPackageReclaim from "../../../components/HomeCare/ShouldPackageReclaim";
import PackageReclaim from "../../../components/PackageReclaim";
import { getUserSession, uniqueID } from "../../../service/helpers";
import withSession from "../../../lib/session";

const initialPackageReclaim = {
  type: "",
  notes: "",
  from: "",
  category: "",
  amount: "",
  id: "1",
};

// start before render
export const getServerSideProps = withSession(async function ({ req }) {
  const user = getUserSession({ req });
  if (user.redirect) {
    return user;
  }

  const data = {
    errorData: [],
  };

  try {
    // Call to api to get package
    data.homeCareServices = await getHomeCareServices();
  } catch (error) {
    data.errorData.push(
      `Retrieve day care package details failed. ${error.message}`
    );
  }

  return { props: { ...data } };
});

const HomeCare = ({ homeCareServices }) => {
  // Parameters
  const router = useRouter();
  const [startDate, endDate, isImmediate, isS117, isFixedPeriod] =
    router.query.slug;

  // State
  const [selectedCareType, setSelectedCareType] = useState(PERSONAL_CARE_MODE);
  const [selectedPrimaryCareTime, setSelectedPrimaryCareTime] = useState(1);
  const [selectedSecondaryCareTime, setSelectedSecondaryCareTime] = useState(1);
  const [homeCareSummaryData, setHomeCareSummaryData] = useState(undefined);
  const [errors, setErrors] = useState([]);
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
      // TODO remove fixed dates
      const carePackageCreateResult = await createHomeCarePackage(
        new Date("2021/07/07"),
        new Date("2021/07/07"),
        isImmediate === "true",
        isS117 === "true",
        isFixedPeriod === "true"
      );

      setCarePackageId(carePackageCreateResult);
    }

    createHomeCarePackageAsync();
  }, [startDate, endDate, isImmediate, isS117, isFixedPeriod]);

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
                initialText={null}
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
        <div className="level mt-4">
          <div className="level-item level-right">
            <Button onClick={addToPackageClick}>Add to package</Button>
          </div>
        </div>
        <ShouldPackageReclaim
          isReclaimed={isReclaimed}
          className="mt-6"
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
