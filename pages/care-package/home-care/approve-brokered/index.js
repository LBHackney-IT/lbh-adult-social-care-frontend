import React from 'react';
import { getServiceTypeCareTimes } from '../../../../service/homeCareServiceHelper';
import { PERSONAL_CARE_MODE } from '../../../../service/homeCarePickerHelper';
import Layout from '../../../../components/Layout/Layout';
import HomeCarePackageBreakdown from '../../../../components/HomeCare/HomeCarePackageBreakdown';
import HomeCarePackageElementCostings from '../../../../components/HomeCare/HomeCarePackageElementCostings';
import PackageApprovalHistorySummary from '../../../../components/PackageApprovalHistorySummary';
import HomeCarePackageDetails from '../../../../components/HomeCare/HomeCarePackageDetails';
import TextArea from '../../../../components/TextArea';
import { getUserSession } from '../../../../service/helpers';
import withSession from '../../../../lib/session';
import useHomeCareApi from '../../../../api/SWR/useHomeCareApi'
import ClientSummaryItem from '../../../../components/CarePackages/ClientSummaryItem'
import { Button } from '../../../../components/Button'

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
  const { data: homeCareServices } = useHomeCareApi.getAllServices();
  const { data: homeCareTimeShiftsData } = useHomeCareApi.getAllTimeShiftSlots();

  // eslint-disable-next-line no-unused-vars
  const { times, secondaryTimes } = getServiceTypeCareTimes(PERSONAL_CARE_MODE);

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
        <div className='client-summary'>
          <ClientSummaryItem itemDetail={18} itemName='HOURS PER WEEK' />
          <ClientSummaryItem itemDetail='£1,982' itemName='COST OF CARE' />
        </div>

        <HomeCarePackageBreakdown />

        <HomeCarePackageElementCostings />

        <PackageApprovalHistorySummary approvalHistoryEntries={approvalHistoryEntries} />

        <HomeCarePackageDetails />

        <div className="columns mb-4">
          <div className="column">
            <div className="mt-2">
              {/* <WeekCarePicker
                primaryCareTimes={times}
                secondaryCareTimes={secondaryTimes}
              /> */}
            </div>

            <div className='button-group mb-5'>
              <Button className="button hackney-btn-light">Deny</Button>
              <Button className="button hackney-btn-light">Request more information</Button>
              <Button className="button hackney-btn-green">Approve to be brokered</Button>
            </div>

            <div className="mt-1">
              <p className="font-size-16px font-weight-bold">Request more information</p>
              <TextArea label="" rows={5} placeholder="Add details..." />
              <button className="button hackney-btn-green">Request more information</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeCareApproveBrokered;
