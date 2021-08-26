import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { getHomeCareSummaryData } from '../../../../api/CarePackages/HomeCareApi';
import Layout from '../../../../components/Layout/Layout';
import PackagesHomeCare from '../../../../components/packages/home-care';
import { getBrokerageSuccess, selectBrokerage } from '../../../../reducers/brokerageReducer';
import { getUserSession, uniqueID } from '../../../../service/helpers';
import withSession from '../../../../lib/session';
import { mapHomeCarePackageDetailsForBrokerage } from '../../../../api/Mappers/CarePackageMapper';
import useHomeCareApi from '../../../../api/SWR/useHomeCareApi'
import { mapDetailsForBrokerage } from '../../../../api/Mappers/NursingCareMapper'
import { getAgeFromDateString, getEnGBFormattedDate } from '../../../../api/Utils/FuncUtils'

// start before render
export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const HomeCareBrokerPackage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id: homeCarePackageId } = router.query;
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState([]);
  const [initialPackageReclaim] = useState({
    type: '',
    notes: '',
    from: '',
    category: '',
    amount: '',
    id: '1',
  });

  const { data: approvalHistoryEntries } = useHomeCareApi.approvePackage(homeCarePackageId);
  const { data: homeCarePackage } = useHomeCareApi.detailsForBrokerage(homeCarePackageId);

  const innerCarePackage = homeCarePackage?.homeCarePackage;

  useEffect(() => {
    const additionalNeeds = homeCarePackage?.homeCareAdditionalNeeds;
    if(additionalNeeds) {
      const formattedAdditionalNeeds = mapDetailsForBrokerage(additionalNeeds);
      setAdditionalNeedsEntries(formattedAdditionalNeeds);
    }
  }, [homeCarePackage])

  const brokerage = useSelector(selectBrokerage);
  const [tab, setTab] = useState('approvalHistory');
  const [summaryData, setSummaryData] = useState([]);
  const [packagesReclaimed, setPackagesReclaimed] = useState([{ ...initialPackageReclaim }]);

  const addPackageReclaim = () => {
    setPackagesReclaimed([...packagesReclaimed, { ...initialPackageReclaim, id: uniqueID() }]);
  };

  const removePackageReclaim = (id) => {
    const newPackagesReclaim = packagesReclaimed.filter((item) => item.id !== id);
    setPackagesReclaimed(newPackagesReclaim);
  };

  const changePackageReclaim = (id) => (updatedPackage) => {
    const newPackage = packagesReclaimed.slice();
    const packageIndex = packagesReclaimed.findIndex((item) => String(item.id) === String(id));
    newPackage.splice(packageIndex, 1, updatedPackage);
    setPackagesReclaimed(newPackage);
  };

  const changeTab = (newTab) => {
    if (newTab === 'packageDetails') {
      setSummaryData(getHomeCareSummaryData());
      setPackagesReclaimed([]);
    } else {
      setPackagesReclaimed([{ ...initialPackageReclaim }]);
    }
    setTab(newTab);
  };

  useEffect(() => {
    dispatch(getBrokerageSuccess({ type: 'homeCarePackage', homeCarePackage }));
  }, []);

  return (
    <Layout
      clientSummaryInfo={{
        client: innerCarePackage?.clientName,
        hackneyId: innerCarePackage?.clientHackneyId,
        age:
          innerCarePackage && getAgeFromDateString(innerCarePackage?.clientDateOfBirth, 'No date'),
        preferredContact: innerCarePackage?.clientPreferredContact,
        canSpeakEnglish: innerCarePackage?.clientCanSpeakEnglish,
        packagesCount: 4,
        dateOfBirth:
          innerCarePackage && getEnGBFormattedDate(innerCarePackage?.clientDateOfBirth),
        postcode: innerCarePackage?.clientPostCode,
        title: 'HOME CARE BROKER PACKAGE',
      }}
      className="home-care-brokerage-page"
    >
      <div className="hackney-text-black font-size-12px care-packages-page">
        <PackagesHomeCare
          tab={tab}
          careType="Home care"
          addPackageReclaim={addPackageReclaim}
          removePackageReclaim={removePackageReclaim}
          summaryData={summaryData}
          approvalHistory={mapHomeCarePackageDetailsForBrokerage(approvalHistoryEntries)}
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
