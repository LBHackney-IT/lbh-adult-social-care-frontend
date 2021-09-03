import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Layout from 'components/Layout/Layout';
import PackageCostBox from 'components/DayCare/PackageCostBox';
import DayCarePackageBreakdown from 'components/DayCare/DayCarePackageBreakdown';
import DayCarePackageElementCostings from 'components/DayCare/DayCarePackageElementCostings';
import PackageApprovalHistorySummary from 'components/PackageApprovalHistorySummary';
import TitleHeader from 'components/TitleHeader';
import DayCareSummary from 'components/DayCare/DayCareSummary';
import {
  approveDayCarePackageContents,
  dayCarePackageContentsRequestClarification,
  dayCarePackageRejectContents,
} from 'api/CarePackages/DayCareApi';
import { getSelectedDate } from 'api/Utils/CommonOptions';
import withSession from 'lib/session';
import { formatCareDatePeriod, getErrorResponse, getUserSession } from 'service/helpers';
import fieldValidator from 'service/inputValidator';
import useDayCareApi from 'api/SWR/useDayCareApi';
import { formatApprovalHistory, formatDayCareOpportunities } from 'service/formatItems';
import { addNotification } from 'reducers/notificationsReducer';
import ClientSummaryItem from 'components/CarePackages/ClientSummaryItem';
import RequestMoreInformation from 'components/Approver/RequestMoreInformation';

// start before render
export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return { props: {} };
});

const DayCareApprovePackage = () => {
  // Parameters
  const router = useRouter();
  const dayCarePackageId = router.query.id;
  const dispatch = useDispatch();
  const [daysSelected, setDaysSelected] = useState([]);
  const [approvalHistoryEntries, setApprovalHistoryEntries] = useState([]);
  const [opportunityEntries, setOpportunityEntries] = useState([]);
  const [requestInformationText, setRequestInformationText] = useState(undefined);

  const { data: dayCarePackage } = useDayCareApi.approvalDetails(dayCarePackageId);

  const packageDetails = dayCarePackage?.packageDetails;
  const costSummary = dayCarePackage?.costSummary;

  useEffect(() => {
    if(packageDetails) {
      const newApprovalHistoryItems = formatApprovalHistory(dayCarePackage?.packageApprovalHistory);
      setApprovalHistoryEntries(newApprovalHistoryItems);

      const newOpportunityEntries = formatDayCareOpportunities(packageDetails?.dayCareOpportunities);
      setOpportunityEntries(newOpportunityEntries);
      setDaysSelected(getSelectedDate(dayCarePackage));
    }

  }, [dayCarePackage]);

  const [errorFields, setErrorFields] = useState({
    requestInformationText: '',
  });

  const changeErrorFields = (field) => {
    setErrorFields({
      ...errorFields,
      [field]: '',
    });
  };

  const updateErrorFields = (errors) => {
    setErrorFields({
      ...errorFields,
      ...getErrorResponse(errors),
    });
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  }

  const handleRejectPackage = () => {
    dayCarePackageRejectContents(dayCarePackageId)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => pushNotification(error));
  };
  const handleRequestMoreInformation = () => {
    const { validFields, hasErrors } = fieldValidator([
      { name: 'requestInformationText', value: requestInformationText, rules: ['empty'] },
    ]);
    if (hasErrors) {
      setErrorFields(validFields);
      return;
    }
    dayCarePackageContentsRequestClarification(dayCarePackageId, requestInformationText)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        updateErrorFields(error);
      });
  };
  const handleApprovePackageContents = () => {
    approveDayCarePackageContents(dayCarePackageId)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        updateErrorFields(error);
      });
  };

  const periodText = packageDetails?.isFixedPeriodOrOngoing ? 'Fixed Period' : 'Ongoing';

  const datePeriod = formatCareDatePeriod(
    packageDetails?.startDate,
    packageDetails?.endDate,
  );

  return (
    <Layout
      clientSummaryInfo={{
        whoIsSourcing: 'hackney',
        client: 'James Stephens',
        hackneyId: '#786288',
        title: `Nursing Care (${periodText} - ${packageDetails?.termTimeConsiderationOptionName})`,
        age: '91',
        dateOfBirth: '09/12/1972',
        postcode: 'E9 6EY',
      }}
      headerTitle="DAY CARE APPROVAL"
    >
      <div className="hackney-text-black font-size-12px">
        <div className='client-summary mb-5'>
          <ClientSummaryItem itemDetail={datePeriod.startDate} itemName='STARTS' />
          <ClientSummaryItem itemDetail={datePeriod.endDate} itemName='ENDS' />
          <ClientSummaryItem itemDetail={3} itemName='DAYS/WEEK' />
        </div>
        <div className="package-cost-box__group mb-5">
          <PackageCostBox
            title="COST OF CARE / WK"
            cost={costSummary?.costOfCarePerWeek}
            costType="ESTIMATE"
          />
          <PackageCostBox title="ANP / WK" cost={costSummary?.anpPerWeek} costType="ESTIMATE" />
          <PackageCostBox
            title="TRANSPORT / WK"
            cost={costSummary?.transportCostPerWeek}
            costType="ESTIMATE"
          />
          <PackageCostBox
            title="TOTAL / WK"
            cost={costSummary?.totalCostPerWeek}
            costType="ESTIMATE"
          />
        </div>

        <DayCarePackageBreakdown dayCareTime="12h" transportTime="4h/week" dayOpportunitiesTotalTime="3h" />
        <DayCarePackageElementCostings />
        <PackageApprovalHistorySummary approvalHistoryEntries={approvalHistoryEntries} />
        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-4">
              <TitleHeader>Package Details</TitleHeader>
              <DayCareSummary
                opportunityEntries={opportunityEntries}
                needToAddress={packageDetails?.needToAddress}
                transportNeeded={packageDetails?.transportNeeded}
                daysSelected={daysSelected}
                deleteOpportunity={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="level mt-3">
              <div className="level-left" />
              <div className="level-right">
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-light" onClick={handleRejectPackage}>
                    Deny
                  </button>
                </div>
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-green" onClick={handleApprovePackageContents}>
                    Approve to be brokered
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RequestMoreInformation
          requestMoreInformationText={requestInformationText}
          setRequestInformationText={setRequestInformationText}
          errorFields={errorFields}
          changeErrorFields={changeErrorFields}
          handleRequestMoreInformation={handleRequestMoreInformation}
        />
      </div>
    </Layout>
  );
};

export default DayCareApprovePackage;
