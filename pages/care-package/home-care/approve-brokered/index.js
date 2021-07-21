import { getServiceTypeCareTimes } from "../../../../service/homeCareServiceHelper";
import { PERSONAL_CARE_MODE } from "../../../../service/homeCarePickerHelper";
import Layout from "../../../../components/Layout/Layout";
import React from "react";
import HomeCareApprovalTitle from "../../../../components/HomeCare/HomeCareApprovalTitle";
import ApprovalClientSummary from "../../../../components/ApprovalClientSummary";
import HomeCarePackageBreakdown from "../../../../components/HomeCare/HomeCarePackageBreakdown";
import HomeCarePackageElementCostings from "../../../../components/HomeCare/HomeCarePackageElementCostings";
import PackageApprovalHistorySummary from "../../../../components/PackageApprovalHistorySummary";
import HomeCarePackageDetails from "../../../../components/HomeCare/HomeCarePackageDetails";
import TextArea from "../../../../components/TextArea";
import {getHomeCareServices, getHomeCareTimeSlotShifts} from "../../../../api/CarePackages/HomeCareApi";
import useSWR from 'swr';
import { useRouter } from 'next/router'

const approvalHistoryEntries = [
  {
    eventDate: "03/12/2021",
    eventMessage: "Package requested by Martin Workman · Social Worker",
    eventSubMessage: null,
  },
  {
    eventDate: "05/12/2021",
    eventMessage: "Futher information requested by Amecie Steadman · Approver",
    eventSubMessage:
      '"There appears to be more support than needed in the morning for Mr Stephens, please amend or call me to discuss" More',
  },
  {
    eventDate: "06/12/2021",
    eventMessage: "Package re-submitted by Martin Workman · Social Worker ",
    eventSubMessage: null,
  },
  {
    eventDate: "14/12/2021",
    eventMessage:
      "Care Package Approved for brokerage by  Amecie Steadman · Approver",
    eventSubMessage: null,
  },
  {
    eventDate: "14/12/2021",
    eventMessage:
      "Care Package approve-brokered STA by  Derek Knightman · Broker",
    eventSubMessage: null,
  },
];

const serverHomeCareApproveBrokered = async () => {
  const data = {
    errorData: [],
  };

  try {
    // Call to api to get package
    data.homeCareServices = await getHomeCareServices();
  } catch (error) {
    data.errorData.push(
      `Retrieve day care package details failed. ${error.message}`
    );
  }

  try {
    // Get home care time shifts
    data.homeCareTimeShiftsData = await getHomeCareTimeSlotShifts();
  } catch (error) {
    data.errorData.push(
      `Retrieve home care time shift details failed. ${error.message}`
    );
  }

  return data;
}

const HomeCareApproveBrokered = () => {
  const { data } = useSWR('test arg', serverHomeCareApproveBrokered);
  const { times, secondaryTimes } = getServiceTypeCareTimes(PERSONAL_CARE_MODE);

  return (
    <Layout headerTitle="HOME CARE APPROVE BROKERED PACKAGE">
      <div className="hackney-text-black font-size-12px">
        <HomeCareApprovalTitle />
        <ApprovalClientSummary />

        <div className="columns">
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">
                      HOURS PER WEEK
                    </p>
                    <p className="font-size-14px">18</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">
                      COST OF CARE
                    </p>
                    <p className="font-size-14px">£1,982</p>
                    <p className="font-weight-bold hackney-text-green">
                      ACTUAL
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column" />
          <div className="column" />
          <div className="column" />
        </div>

        <HomeCarePackageBreakdown />

        <HomeCarePackageElementCostings />

        <PackageApprovalHistorySummary
          approvalHistoryEntries={approvalHistoryEntries}
        />

        <HomeCarePackageDetails />

        <div className="columns mb-4">
          <div className="column">
            <div className="mt-2">
              {/* <WeekCarePicker
                primaryCareTimes={times}
                secondaryCareTimes={secondaryTimes}
              /> */}
            </div>

            <div className="level mt-3">
              <div className="level-left" />
              <div className="level-right">
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-light">Deny</button>
                </div>
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-light">
                    Request more information
                  </button>
                </div>
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-green">
                    Approve contracting
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-1">
              <p className="font-size-16px font-weight-bold">
                Request more information
              </p>
              <TextArea label="" rows={5} placeholder="Add details..." />
              <button className="button hackney-btn-green">
                Request more information
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeCareApproveBrokered;
