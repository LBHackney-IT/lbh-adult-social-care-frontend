import React from "react";
import ClientSummary from "../components/ClientSummary";
import Layout from "../Layout/Layout";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectBrokerage} from "../../reducers/brokerageReducer";
import ApprovalHistory from "./components/ApprovalHistory";
import SummaryDataList from "../CarePackages/HomeCare/components/SummaryDataList";
import {getHomeCareSummaryData} from "../../api/CarePackages/HomeCareApi";
import PackagesDayCare from "./PackagesDayCare";
import {uniqueID} from "../../service/helpers";

const initialPackageReclaim = {
  type: '',
  notes: '',
  from: '',
  category: '',
  amount: '',
  id: '1',
};

const approvalHistory = [
  {
    date: '03/12/2021',
    id: 1,
    text: <span>Package requested by <a href=''>Martin Workman</a> · Social Worker</span>,
  },
  {
    date: '05/12/2021',
    id: 2,
    text: <span>
      Futher information requested by
      <a>Amecie Steadman</a> · Approver
      <br/>
      <em>
        "There appears to be more support than needed in the morning for Mr Stephens, please amend or call me to discuss"
        <a href=""> More</a>
        </em>
      </span>,
  },
  {
    date: '06/12/2021',
    id: 3,
    text: <span>Package re-submitted by <a href="">Martin Workman</a> · Social Worker</span>,
  },
  {
    date: '14/12/2021',
    id: 4,
    text: <span>Care Package Approved for brokerage by <a href="">Amecie Steadman</a> · Approver</span>,
  },
  {
    date: '14/12/2021',
    id: 5,
    text: <span>Care Package brokered STA by <a href="">Derek Knightman</a> · Broker</span>,
  },
];

const ProposedPackages = () => {
  const brokerage = useSelector(selectBrokerage);
  const [tab, setTab] = useState('approvalHistory');
  const [summaryData, setSummaryData] = useState([]);
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);

  const addPackageReclaim = () => {
    setPackagesReclaimed([...packagesReclaimed, {...initialPackageReclaim, id: uniqueID()}]);
  };

  const removePackageReclaim = id => {
    const newPackagesReclaim = packagesReclaimed.filter(item => item.id !== id);
    setPackagesReclaimed(newPackagesReclaim);
  };

  const changePackageReclaim = (id) => (updatedPackage) => {
    const newPackage = packagesReclaimed.slice();
    const packageIndex = packagesReclaimed.findIndex(item => item.id == id);
    newPackage.splice(packageIndex, 1, updatedPackage);
    setPackagesReclaimed(newPackage);
  };

  const changeTab = (tab) => {
    if(tab === 'packageDetails') {
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
        preferredContact='Phone'
        canSpeakEnglish='Fluent'
        packagesCount={4}
        dateOfBirth="09/12/1972"
        postcode="E9 6EY"
      >
        Proposed Packages
      </ClientSummary>
      {/*<PackagesHomeCare*/}
      {/*  tab={tab}*/}
      {/*  brokerage={brokerage}*/}
      {/*addPackageReclaim={addPackageReclaim}*/}
      {/*removePackageReclaim={removePackageReclaim}*/}
      {/*packagesReclaimed={packagesReclaimed}*/}
      changePackageReclaim={changePackageReclaim}
      {/*  changeTab={changeTab}*/}
      {/*/>*/}
      <PackagesDayCare
        tab={tab}
        addPackageReclaim={addPackageReclaim}
        removePackageReclaim={removePackageReclaim}
        packagesReclaimed={packagesReclaimed}
        changePackageReclaim={changePackageReclaim}
        brokerage={brokerage}
        changeTab={changeTab}
      />
      {tab === 'approvalHistory' ?
          <ApprovalHistory status='(Ongoing)' history={approvalHistory} />
          : !!summaryData.length &&
          <SummaryDataList
            edit={(item) => console.log('edit', item)}
            remove={(item) => console.log('remove', item)}
            confirmPackage={false}
            slicedText={true}
            summaryData={summaryData}
          />
      }
    </Layout>
  );
};

export default ProposedPackages;
