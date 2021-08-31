import React, { useState } from 'react'
import { getServiceTypeCareTimes } from '../../../../service/homeCareServiceHelper';
import { PERSONAL_CARE_MODE } from '../../../../service/homeCarePickerHelper';
import Layout from '../../../../components/Layout/Layout';
import HomeCarePackageBreakdown from '../../../../components/HomeCare/HomeCarePackageBreakdown';
import HomeCarePackageElementCostings from '../../../../components/HomeCare/HomeCarePackageElementCostings';
import PackageApprovalHistorySummary from '../../../../components/PackageApprovalHistorySummary';
import { getUserSession } from '../../../../service/helpers';
import withSession from '../../../../lib/session';
import useHomeCareApi from '../../../../api/SWR/useHomeCareApi'
import ClientSummaryItem from '../../../../components/CarePackages/ClientSummaryItem'
import { Button } from '../../../../components/Button'
import DaySummary from '../../../../components/HomeCare/DaySummary'
import TitleHeader from '../../../../components/TitleHeader'
import RequestMoreInformation from '../../../../components/Approver/RequestMoreInformation'
import { dayCarePackageCommercialsRequestClarification } from '../../../../api/CarePackages/DayCareApi'
import fieldValidator from '../../../../service/inputValidator'

const approvalHistoryEntries = [
  {
    eventDate: '03/12/2021',
    eventMessage: 'Package requested by Martin Workman · Social Worker',
    eventSubMessage: null,
  },
  {
    eventDate: '05/12/2021',
    eventMessage: 'Futher information requested by Amecie Steadman · Approver',
    eventSubMessage:
      '"There appears to be more support than needed in the morning for Mr Stephens, please amend or call me to discuss" More',
  },
  {
    eventDate: '06/12/2021',
    eventMessage: 'Package re-submitted by Martin Workman · Social Worker ',
    eventSubMessage: null,
  },
  {
    eventDate: '14/12/2021',
    eventMessage: 'Care Package Approved for brokerage by  Amecie Steadman · Approver',
    eventSubMessage: null,
  },
  {
    eventDate: '14/12/2021',
    eventMessage: 'Care Package approve-brokered STA by  Derek Knightman · Broker',
    eventSubMessage: null,
  },
];

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  const data = {
    errorData: [],
  };

  try {
    // Get home care time shifts
  } catch (error) {
    data.errorData.push(`Retrieve home care time shift details failed. ${error.message}`);
  }

  return { props: { ...data } };
});

// eslint-disable-next-line no-shadow
const HomeCareApproveBrokered = () => {
  // const router = useRouter();
  // const id = router.query.id;
  const { data: homeCareServices } = useHomeCareApi.getAllServices();
  const { data: homeCareTimeShiftsData } = useHomeCareApi.getAllTimeShiftSlots();
  const [errorFields, setErrorFields] = useState({
    requestInformationText: '',
  });
  const [requestInformationText, setRequestInformationText] = useState(undefined);
  const [homeCareSummaryData] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const { times, secondaryTimes } = getServiceTypeCareTimes(PERSONAL_CARE_MODE);

  const changeErrorFields = (field) => {
    setErrorFields({
      ...errorFields,
      [field]: '',
    });
  };

  const handleRequestMoreInformation = () => {
    const { validFields, hasErrors } = fieldValidator([{
      name: 'requestInformationText', value: requestInformationText, rules: ['empty'],
    }]);

    setErrorFields(validFields);

    if(hasErrors) return;
    console.log('request more information info');
  };

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

        <HomeCarePackageElementCostings />

        <PackageApprovalHistorySummary approvalHistoryEntries={approvalHistoryEntries} />

        <TitleHeader>Package Details</TitleHeader>
        {homeCareSummaryData?.length ? homeCareSummaryData.map((summaryItem) => (
          <DaySummary
            key={summaryItem.id}
            daySummaryItem={summaryItem}
          />
        )) : <p className='mt-3 pl-4'>No package details</p>}

        <div className="columns mb-4">
          <div className="column">
            <div className="mt-2">
              {/* <WeekCarePicker
                primaryCareTimes={times}
                secondaryCareTimes={secondaryTimes}
              /> */}
            </div>

            <div className='button-group mb-5'>
              <Button className='gray'>Deny</Button>
              <Button >Approve to be brokered</Button>
            </div>

            <RequestMoreInformation
              requestMoreInformationText={requestInformationText}
              setRequestInformationText={setRequestInformationText}
              errorFields={errorFields}
              changeErrorFields={changeErrorFields}
              handleRequestMoreInformation={handleRequestMoreInformation}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeCareApproveBrokered;
