import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getHomeCareBrokergage, getHomeCareSummaryData } from "../../../../api/CarePackages/HomeCareApi";
import Layout from "../../../../components/Layout/Layout";
import PackagesHomeCare from "../../../../components/packages/home-care";
import { selectBrokerage } from "../../../../reducers/brokerageReducer";
import { getUserSession, uniqueID } from "../../../../service/helpers";
import withSession from "../../../../lib/session";
import { getAgeFromDateString, getEnGBFormattedDate } from "../../../../api/Utils/FuncUtils";
import ClientSummary from "../../../../components/ClientSummary";

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
    data.homeCarePackage = await getHomeCareBrokergage(homeCarePackageId);
  } catch(error) {
    data.errorData.push(`Retrieve home care package details failed. ${error.message}`);
  }

  return { props: { ...data }};
});

const HomeCareBrokerPackage = ({ homeCarePackage }) => {

  const [initialPackageReclaim] = useState({
    type: "",
    notes: "",
    from: "",
    category: "",
    amount: "",
    id: "1",
  });

  const [approvalHistoryTestData] = useState([
    {
      date: "03/12/2021",
      id: 1,
      text: (
        <span>
          Package requested by <a href="123">Martin Workman</a> · Social Worker
        </span>
      ),
    },
    {
      date: "05/12/2021",
      id: 2,
      text: (
        <span>
          Futher information requested by
          <a>Amecie Steadman</a> · Approver
          <br />
          <em>
            "There appears to be more support than needed in the morning for Mr
            Stephens, please amend or call me to discuss"
            <a href="/213"> More</a>
          </em>
        </span>
      ),
    },
    {
      date: "06/12/2021",
      id: 3,
      text: (
        <span>
          Package re-submitted by <a href="/123">Martin Workman</a> · Social
          Worker
        </span>
      ),
    },
    {
      date: "14/12/2021",
      id: 4,
      text: (
        <span>
          Care Package Approved for brokerage by{" "}
          <a href="/123">Amecie Steadman</a> · Approver
        </span>
      ),
    },
    {
      date: "14/12/2021",
      id: 5,
      text: (
        <span>
          Care Package brokered STA by <a href="/123">Derek Knightman</a> ·
          Broker
        </span>
      ),
    },
  ]);

  const [residentialCardsTestData] = useState([
    { id: 1, title: "TOTAL / WK", cost: "1892", status: "ESTIMATE" },
    { id: 2, title: "TOTAL / WK", cost: "1892", status: "ESTIMATE" },
    {
      id: 3,
      title: "TOTAL / WK",
      cost: "1892",
      status: "ESTIMATE",
      selected: true,
    },
    {
      id: 4,
      title: "TOTAL / WK",
      cost: "1892",
      status: "ESTIMATE",
      selected: true,
    },
  ]);

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
          costCards={residentialCardsTestData}
          summaryData={summaryData}
          approvalHistory={approvalHistoryTestData}
          packagesReclaimed={packagesReclaimed}
          changePackageReclaim={changePackageReclaim}
          brokerage={brokerage}
          changeTab={changeTab}
        />
      </div>
    </Layout>
  );
};

export default HomeCareBrokerPackage;
