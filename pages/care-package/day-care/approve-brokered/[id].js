import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../../../components/Layout/Layout';
import PackageCostBox from '../../../../components/DayCare/PackageCostBox';
import PackageApprovalHistorySummary from '../../../../components/PackageApprovalHistorySummary';
import TitleHeader from '../../../../components/TitleHeader';
import DayCareSummary from '../../../../components/DayCare/DayCareSummary';
import TextArea from '../../../../components/TextArea';
import {
  dayCarePackageApproveCommercials,
  dayCarePackageCommercialsRequestClarification,
  dayCarePackageRejectCommercials,
} from '../../../../api/CarePackages/DayCareApi';
import withSession from '../../../../lib/session';
import { formatCareDatePeriod, getErrorResponse, getUserSession } from '../../../../service/helpers'
import { getSelectedDate } from '../../../../api/Utils/CommonOptions';
import useDayCareApi from '../../../../api/SWR/useDayCareApi';
import { addNotification } from '../../../../reducers/notificationsReducer';
import { formatApprovalHistory, formatDayCareOpportunities } from '../../../../service/formatItems'
import ClientSummaryItem from '../../../../components/CarePackages/ClientSummaryItem'
import { Button } from '../../../../components/Button'

// get server side props before render
export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return { props: {} };
});

const DayCareApproveBrokered = () => {
  const router = useRouter();
  const dayCarePackageId = router.query.id;
  const dispatch = useDispatch();
  const [daysSelected, setDaysSelected] = useState([]);
  const [approvalHistoryEntries, setApprovalHistoryEntries] = useState([]);
  const [opportunityEntries, setOpportunityEntries] = useState([]);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(undefined);
  const [errorFields, setErrorFields] = useState({
    requestInformationText: '',
  });

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
    dispatch(addNotification({ text, className }))
  }

  const handleRejectPackage = () => {
    dayCarePackageRejectCommercials(dayCarePackageId)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => pushNotification(error));
  };
  const handleRequestMoreInformation = () => {
    dayCarePackageCommercialsRequestClarification(dayCarePackageId, requestInformationText)
      .then(() => {
        setDisplayMoreInfoForm(false);
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        updateErrorFields(error);
      });
  };
  const handleApprovePackageCommercials = () => {
    dayCarePackageApproveCommercials(dayCarePackageId)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => pushNotification(error));
  };

  const datePeriod = formatCareDatePeriod(
    packageDetails?.startDate,
    packageDetails?.endDate,
  );

  const periodText = packageDetails?.isFixedPeriodOrOngoing ? 'Fixed Period' : 'Ongoing';

  return (
    <Layout clientSummaryInfo={{
      whoIsSourcing: 'hackney',
      client: 'James Stephens',
      title: `Nursing Care (${periodText} - ${packageDetails?.termTimeConsiderationOptionName})`,
      hackneyId: '#786288',
      age: '91',
      dateOfBirth: '09/12/1972',
      postcode: 'E9 6EY',
    }}
    >
      <div className="hackney-text-black font-size-12px">
        <div className='client-summary mb-5'>
          <ClientSummaryItem itemDetail={datePeriod.startDate} itemName='STARTS' />
          <ClientSummaryItem itemDetail={datePeriod.endDate} itemName='ENDS' />
          <ClientSummaryItem itemDetail={3} itemName='DAYS/WEEK' />
        </div>

        <div className="package-cost-box__group mb-5">
          <PackageCostBox
            boxClass="hackney-package-cost-light-green-box"
            title="COST OF CARE / WK"
            cost={costSummary?.costOfCarePerWeek}
            costType="ACTUAL"
          />
          <PackageCostBox
            boxClass="hackney-package-cost-light-green-box"
            title="ANP / WK"
            cost={costSummary?.anpPerWeek}
            costType="ACTUAL"
          />
          <PackageCostBox
            boxClass="hackney-package-cost-light-green-box"
            title="TRANSPORT / WK"
            cost={costSummary?.transportCostPerWeek}
            costType="ACTUAL"
          />
          <PackageCostBox
            boxClass="hackney-package-cost-green-box"
            title="TOTAL / WK"
            cost={costSummary?.totalCostPerWeek}
            costType="ACTUAL"
          />
        </div>

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

        <div className='button-group'>
          <Button className="gray" onClick={handleRejectPackage}>Deny</Button>
          <Button onClick={() => setDisplayMoreInfoForm(!displayMoreInfoForm)} className="gray">
            {displayMoreInfoForm ? 'Hide Request more information' : 'Request More Information'}
          </Button>
          <Button onClick={handleApprovePackageCommercials}>Approve Commercials</Button>
        </div>

        {displayMoreInfoForm && (
          <div className="columns">
            <div className="column">
              <div className="mt-1">
                <p className="font-size-16px font-weight-bold">Request more information</p>
                <TextArea
                  error={errorFields.requestInformationText}
                  setError={() => changeErrorFields('changeErrorFields')}
                  label=""
                  rows={5}
                  placeholder="Add details..."
                  onChange={setRequestInformationText}
                />
                <button className="button hackney-btn-green" onClick={handleRequestMoreInformation}>
                  Request more information
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DayCareApproveBrokered;
