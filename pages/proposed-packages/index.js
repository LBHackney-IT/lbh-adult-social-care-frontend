import React from "react";
import ClientSummary from "../../components/ClientSummary";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBrokerage } from "../../reducers/brokerageReducer";
import { getHomeCareSummaryData } from "../../api/CarePackages/HomeCareApi";
import {getUserSession, uniqueID} from "../../service/helpers";
import PackagesHomeCare from "../../components/packages/home-care";
import PackagesNursingCare from "../../components/packages/nursing-care";
import PackagesResidentialCare from "../../components/packages/residential-care";
import withSession from "../../lib/session";

export const getServerSideProps = withSession(async function({ req }) {
  const user = getUserSession({ req });
  console.log(user);
  if(user.redirect) {
    return {
      props: { user },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
})

const ProposedPackages = (props) => {
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
        Package re-submitted by <a href="/123">Martin Workman</a> · Social Worker
      </span>
      ),
    },
    {
      date: "14/12/2021",
      id: 4,
      text: (
        <span>
        Care Package Approved for brokerage by <a href="/123">Amecie Steadman</a> ·
        Approver
      </span>
      ),
    },
    {
      date: "14/12/2021",
      id: 5,
      text: (
        <span>
        Care Package brokered STA by <a href="/123">Derek Knightman</a> · Broker
      </span>
      ),
    },
  ]);

  const [costCardsTestData] = useState([
    { id: 1, title: "TOTAL / WK", cost: "1892", status: "ESTIMATE" },
    { id: 2, title: "TOTAL / WK", cost: "1892", status: "ESTIMATE" },
    { id: 3, title: "TOTAL / WK", cost: "1892", status: "ESTIMATE" },
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

  const [nursingCardsTestData] = useState([
    { id: 1, title: "TOTAL / WK", cost: "1892", status: "ESTIMATE" },
    { id: 2, title: "TOTAL / WK", cost: "1892", status: "ESTIMATE" },
    {
      id: 3,
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
    }
    setTab(tab);
  };

  return (
    <Layout headerTitle="Rapid D2A">
      <ClientSummary
        client="James Stephens"
        hackneyId="786288"
        age="91"
        preferredContact="Phone"
        canSpeakEnglish="Fluent"
        packagesCount={4}
        dateOfBirth="09/12/1972"
        postcode="E9 6EY"
      >
        Proposed Packages
      </ClientSummary>
      <PackagesResidentialCare
        tab={tab}
        careType="Residential care"
        addPackageReclaim={addPackageReclaim}
        removePackageReclaim={removePackageReclaim}
        costCards={nursingCardsTestData}
        summaryData={summaryData}
        approvalHistory={approvalHistoryTestData}
        packagesReclaimed={packagesReclaimed}
        changePackageReclaim={changePackageReclaim}
        brokerage={brokerage}
        changeTab={changeTab}
      />
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
      <PackagesNursingCare
        tab={tab}
        brokerage={brokerage}
        addPackageReclaim={addPackageReclaim}
        removePackageReclaim={removePackageReclaim}
        packagesReclaimed={packagesReclaimed}
        changePackageReclaim={changePackageReclaim}
        changeTab={changeTab}
        costCards={costCardsTestData}
        summaryData={summaryData}
        approvalHistory={approvalHistoryTestData}
      />
    </Layout>
  );
};

export default ProposedPackages;
