import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getHomeCarePackageDetailsForBrokerage,
  getHomeCareSummaryData
} from '../../../../api/CarePackages/HomeCareApi'
import Layout from '../../../../components/Layout/Layout'
import PackagesHomeCare from '../../../../components/packages/home-care'
import { getBrokerageSuccess, selectBrokerage } from '../../../../reducers/brokerageReducer'
import { getErrorResponse, uniqueID } from '../../../../service/helpers'
import { addNotification } from '../../../../reducers/notificationsReducer'
import PackageHeader from '../../../../components/CarePackages/PackageHeader'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { getAgeFromDateString, getEnGBFormattedDate } from '../../../../api/Utils/FuncUtils'

// start before render
const serverHomeCareBrokering = async (homeCarePackageId) => {
  const data = {
    errorData: [],
  };

  try {
    // Call to api to get package
    // TODO change API
    const homeCareBrokerageDetails = await getHomeCarePackageDetailsForBrokerage(homeCarePackageId);
    const newAdditionalNeedsEntries = homeCareBrokerageDetails?.homeCareAdditionalNeeds?.map(
      (additionalneedsItem) => ({
        id: additionalneedsItem.id,
        isWeeklyCost: additionalneedsItem.isWeeklyCost,
        isOneOffCost: additionalneedsItem.isOneOffCost,
        needToAddress: additionalneedsItem.needToAddress,
      })
    );
    data.homeCarePackage = homeCareBrokerageDetails;
    data.additionalNeedsEntries = newAdditionalNeedsEntries;
  } catch (error) {
    data.errorData.push({
      text: `Retrieve home care package details failed. ${error?.message || ''}`,
      response: getErrorResponse(error),
    });
  }

  try {
    // Call to api to get package
    data.approvalHistoryEntries = [];
  } catch(error) {
    data.errorData.push({
      text: `Retrieve home care approval history failed. ${error?.message || ''}`,
      response: getErrorResponse(error),
    });
  }
  return data;
}

const HomeCareBrokerPackage = () => {
  const router = useRouter();
  const packageId = router.query.id;
  const { data } = useSWR(packageId, serverHomeCareBrokering);

  let errorData, homeCarePackage, approvalHistoryEntries, additionalNeedsEntries;
  if(data) {
    errorData = data.errorData;
    homeCarePackage = data.homeCarePackage;
    approvalHistoryEntries = data.approvalHistoryEntries;
    additionalNeedsEntries = data.additionalNeedsEntries;
  }

  const dispatch = useDispatch();
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
  const [packagesReclaimed, setPackagesReclaimed] = useState([{...initialPackageReclaim}]);

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

  useEffect(() => {
    if(errorData && errorData?.length && errorData[0].text) {
      errorData.forEach(({ text: errorText, response }) => {
        console.error(response);
        dispatch(addNotification( { text: errorText }));
      })
    }
  }, [errorData]);

  useEffect(() => {
    dispatch(getBrokerageSuccess({ type: 'homeCarePackage', homeCarePackage }));
  }, []);

  if(!data) {
    return <p>Loading...</p>
  }

  return (
    <Layout clientSummaryInfo={{
      client: homeCarePackage?.homeCarePackage?.clientName,
      hackneyId: homeCarePackage?.homeCarePackage?.clientHackneyId,
      age: homeCarePackage?.homeCarePackage && getAgeFromDateString(homeCarePackage?.homeCarePackage?.clientDateOfBirth),
      preferredContact: homeCarePackage?.homeCarePackage?.clientPreferredContact,
      canSpeakEnglish: homeCarePackage?.homeCarePackage?.clientCanSpeakEnglish,
      packagesCount: 4,
      dateOfBirth: homeCarePackage?.homeCarePackage && getEnGBFormattedDate(homeCarePackage?.homeCarePackage?.clientDateOfBirth),
      postcode: homeCarePackage?.homeCarePackage?.clientPostCode,
    }} className='home-care-brokerage-page' headerTitle="HOME CARE BROKER PACKAGE">
      <PackageHeader />
      <div className='hackney-text-black font-size-12px care-packages-page'>
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
            additionalNeedsEntries,
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
