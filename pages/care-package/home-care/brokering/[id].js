import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getHomeCareBrokerageApprovePackage,
  getHomeCarePackageDetailsForBrokerage,
  getHomeCareSummaryData
} from '../../../../api/CarePackages/HomeCareApi'
import Layout from '../../../../components/Layout/Layout'
import PackagesHomeCare from '../../../../components/packages/home-care'
import { selectBrokerage } from '../../../../reducers/brokerageReducer'
import { getUserSession, uniqueID } from '../../../../service/helpers'
import withSession from '../../../../lib/session'
import { getAgeFromDateString, getEnGBFormattedDate } from '../../../../api/Utils/FuncUtils'
import ClientSummary from '../../../../components/ClientSummary'

// start before render
export const getServerSideProps = withSession(async function({ req, query: { id: homeCarePackageId } }) {
  const user = getUserSession({ req });
  if(user.redirect) {
    return user;
  }

  const data = {
    errorData: [],
  };

  try {
    // Call to api to get package
     //TODO change API
    const homeCareBrokerageDetails = await getHomeCarePackageDetailsForBrokerage(homeCarePackageId);
    const newAdditionalNeedsEntries = homeCareBrokerageDetails.nursingCareAdditionalNeeds.map(
      (additionalneedsItem) => ({
        id: additionalneedsItem.id,
        isWeeklyCost: additionalneedsItem.isWeeklyCost,
        isOneOffCost: additionalneedsItem.isOneOffCost,
        needToAddress: additionalneedsItem.needToAddress,
      })
    );
    data.homeCarePackage = homeCareBrokerageDetails;
    data.additionalNeedsEntries = newAdditionalNeedsEntries;
  } catch(error) {
    data.errorData.push(`Retrieve home care package details failed. ${error.message}`);
  }

  try {
    // Call to api to get package
    data.approvalHistoryEntries = await getHomeCareBrokerageApprovePackage(homeCarePackageId)
      .map(
        (historyItem) => ({
          eventDate: new Date(historyItem.approvedDate).toLocaleDateString(
            "en-GB"
          ),
          eventMessage: historyItem.logText,
          eventSubMessage: undefined
        })
      );
  } catch(error) {
    data.errorData.push(`Retrieve home care approval history failed. ${error.message}`);
  }

  return { props: { ...data }};
});

const HomeCareBrokerPackage = ({ homeCarePackage, additionalNeedsEntries, approvalHistoryEntries }) => {
  const [initialPackageReclaim] = useState({
    type: "",
    notes: "",
    from: "",
    category: "",
    amount: "",
    id: "1",
  });

  const brokerage = useSelector(selectBrokerage);
  const [tab, setTab] = useState("approvalHistory");
  const [summaryData, setSummaryData] = useState([]);
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);

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
    const packageIndex = packagesReclaimed.findIndex(
      (item) => String(item.id) === String(id)
    );
    newPackage.splice(packageIndex, 1, updatedPackage);
    setPackagesReclaimed(newPackage);
  };

  const changeTab = (tab) => {
    if (tab === "packageDetails") {
      setSummaryData(getHomeCareSummaryData());
      setPackagesReclaimed([]);
    } else {
      setPackagesReclaimed([{...initialPackageReclaim}])
    }
    setTab(tab);
  };

  return (
    <Layout className='home-care-brokerage-page' headerTitle="HOME CARE BROKER PACKAGE">
      <ClientSummary
        client={homeCarePackage?.homeCarePackage?.clientName}
        hackneyId={homeCarePackage?.homeCarePackage?.clientHackneyId}
        age={homeCarePackage?.homeCarePackage && getAgeFromDateString(homeCarePackage?.homeCarePackage?.clientDateOfBirth)}
        preferredContact={homeCarePackage?.homeCarePackage?.clientPreferredContact}
        canSpeakEnglish={homeCarePackage?.homeCarePackage?.clientCanSpeakEnglish}
        packagesCount={4}
        dateOfBirth={
          homeCarePackage?.homeCarePackage && getEnGBFormattedDate(homeCarePackage?.homeCarePackage?.clientDateOfBirth)
        }
        postcode={homeCarePackage?.homeCarePackage?.clientPostCode}
      >
        Proposed Packages
      </ClientSummary>
      <div className="hackney-text-black font-size-12px">
        <PackagesHomeCare
          tab={tab}
          careType="Home care"
          addPackageReclaim={addPackageReclaim}
          removePackageReclaim={removePackageReclaim}
          summaryData={summaryData}
          approvalHistory={approvalHistoryEntries}
          homeCarePackage={homeCarePackage}
          packagesReclaimed={packagesReclaimed}
          changePackageReclaim={changePackageReclaim}
          homeCareSummary={{
            additionalNeedsEntries: additionalNeedsEntries,
            needToAddress: homeCarePackage?.homeCarePackage?.needToAddress,
            deleteOpportunity: () => {},
          }}
          brokerage={brokerage}
          changeTab={changeTab}
        />
      </div>
    </Layout>
  );
};

export default HomeCareBrokerPackage;
