import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import HomeCarePackageBreakdown from 'components/HomeCare/HomeCarePackageBreakdown';
import Layout from 'components/Layout/Layout';
import PackageApprovalHistorySummary from 'components/PackageApprovalHistorySummary';
import withSession from 'lib/session';
import { getErrorResponse, getUserSession } from 'service/helpers';
import useHomeCareApi from 'api/SWR/useHomeCareApi';
import { Button } from 'components/Button';
import ClientSummaryItem from 'components/CarePackages/ClientSummaryItem';
import TitleHeader from 'components/TitleHeader';
import DaySummary from 'components/HomeCare/DaySummary';
import RequestMoreInformation from 'components/Approver/RequestMoreInformation';
import fieldValidator from 'service/inputValidator';
import { nursingCareRequestClarification } from 'api/CarePackages/NursingCareApi';
import { APPROVER_HUB_ROUTE } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { getServiceTypeCareTimes } from 'service/homeCareServiceHelper';
import { testDataDaySummaries } from '../../../../testData/testDateHomeCare';

const approvalHistoryEntries = [
  {
    eventDate: '08/07/2021',
    eventMessage: 'Package requested by Martin Workman · Social Worker ',
    eventSubMessage: null,
  },
  {
    eventDate: '15/07/2021',
    eventMessage: 'Futher information requested by Amecie Steadman · Approver',
    eventSubMessage:
      '"There appears to be more support than needed in the morning for Mr Stephens, please amend or call me to discuss more"',
  },
  {
    eventDate: '25/07/2021',
    eventMessage: 'Package re-submitted by Martin Workman · Social Worker ',
    eventSubMessage: null,
  },
];

export const getServerSideProps = withSession(({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return { props: {} };
});

// eslint-disable-next-line no-unused-vars,no-shadow
const HomeCareApprovePackage = () => {
  // Route
  const router = useRouter();
  const dispatch = useDispatch();
  const homeCarePackageId = router.query.id;

  const { data: homeCareTimeShiftsData } = useHomeCareApi.getAllTimeShiftSlots();
  const { data: homeCareServices } = useHomeCareApi.getAllServices();
  const { data: packageData } = useHomeCareApi.detailsForBrokerage(homeCarePackageId);
  const [homeCareSummaryData, setHomeCareSummaryData] = useState([]);
  const [errorFields, setErrorFields] = useState({
    requestInformationText: '',
  });
  const [requestInformationText, setRequestInformationText] = useState(undefined);

  const changeErrorFields = (field) => {
    setErrorFields({
      ...errorFields,
      [field]: '',
    });
  };

  const updateErrorFields = (errors, field) => {
    const newErrors = field ? {[field]: errors} : getErrorResponse(errors);
    setErrorFields({
      ...errorFields,
      ...newErrors,
    });
  };

  const { times, secondaryTimes } = getServiceTypeCareTimes(homeCarePackageId);

  const editDaySummary = (daySummary, value) => {
    daySummary.needToAddress = value;
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleRequestMoreInformation = () => {
    const { validFields, hasErrors } = fieldValidator([{
      name: 'requestInformationText', value: requestInformationText, rules: ['empty'],
    }]);
    setErrorFields(validFields);

    if(hasErrors) return;

    nursingCareRequestClarification(homeCarePackageId, requestInformationText)
      .then(() => {
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        updateErrorFields(error);
      });
  };

  useEffect(() => {
    setHomeCareSummaryData(testDataDaySummaries);
  }, [testDataDaySummaries]);

  return (
    <Layout
      clientSummaryInfo={{
        whoIsSourcing: 'hackney',
        client: 'James Stephens',
        title: `Home Care`,
        hackneyId: '#786288',
        age: '91',
        dateOfBirth: '09/12/1972',
        postcode: 'E9 6EY',
      }}
    >
      <div className="hackney-text-black font-size-12px">
        <div className='client-summary mb-5'>
          <ClientSummaryItem itemDetail={18} itemName='HOURS PER WEEK' />
          <ClientSummaryItem itemDetail='£1,982' itemName='COST OF CARE' />
        </div>

        <HomeCarePackageBreakdown />

        <PackageApprovalHistorySummary approvalHistoryEntries={approvalHistoryEntries} />

        <TitleHeader>Package Details</TitleHeader>
        {homeCareSummaryData?.length ? homeCareSummaryData.map((summaryItem) => (
          <DaySummary
            key={summaryItem.id}
            daySummaryItem={summaryItem}
            edit={editDaySummary}
          />
        )) : <p className='mt-3 pl-4'>No package details</p>}

        <div className="columns mb-4">
          <div className="column">
            <div className="mt-2">
              {/* <WeekCarePicker
                homeCareServices={homeCareServices}
                homeCareTimeShifts={homeCareTimeShiftsData}
                weekDays={weekDays}
                primaryCareTimes={times}
                secondaryCareTimes={secondaryTimes}
              /> */}
            </div>

            <div className='button-group mb-5'>
              <Button className='gray'>Deny</Button>
              <Button>Approve to be brokered</Button>
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

export default HomeCareApprovePackage;
