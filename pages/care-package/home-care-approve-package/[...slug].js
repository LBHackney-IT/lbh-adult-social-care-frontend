import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getHomeCareBrokergage,
  getHomeCareServices,
  getHomeCareTimeSlotShifts,
} from "../../../api/CarePackages/HomeCareApi";
import ApprovalClientSummary from "../../../components/ApprovalClientSummary";
import HomeCareApprovalTitle from "../../../components/HomeCare/HomeCareApprovalTitle";
import HomeCarePackageBreakdown from "../../../components/HomeCare/HomeCarePackageBreakdown";
import HomeCarePackageDetails from "../../../components/HomeCare/HomeCarePackageDetails";
import WeekCarePicker from "../../../components/HomeCare/WeekCarePicker";
import Layout from "../../../components/Layout/Layout";
import PackageApprovalHistorySummary from "../../../components/PackageApprovalHistorySummary";
import TextArea from "../../../components/TextArea";
import withSession from "../../../lib/session";
import { getUserSession } from "../../../service/helpers";
import {
  PERSONAL_CARE_MODE,
  weekDays,
} from "../../../service/homeCarePickerHelper";
import { getServiceTypeCareTimes } from "../../../service/homeCareServiceHelper";

const approvalHistoryEntries = [
  {
    eventDate: "08/07/2021",
    eventMessage: "Package requested by Martin Workman · Social Worker ",
    eventSubMessage: null,
  },
  {
    eventDate: "15/07/2021",
    eventMessage: "Futher information requested by Amecie Steadman · Approver",
    eventSubMessage:
      '"There appears to be more support than needed in the morning for Mr Stephens, please amend or call me to discuss more"',
  },
  {
    eventDate: "25/07/2021",
    eventMessage: "Package re-submitted by Martin Workman · Social Worker ",
    eventSubMessage: null,
  },
];

export const getServerSideProps = withSession(async function ({ req }) {
  const user = getUserSession({ req });
  if (user.redirect) {
    return user;
  }

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

  return { props: { ...data, approvalHistoryEntries } };
});

const HomeCareApprovePackage = ({
  approvalHistoryEntries,
  homeCareTimeShiftsData,
  homeCareServices,
}) => {
  // Route
  const router = useRouter();
  const [homeCarePackageId] = router.query.slug;

  // State
  const [packageData, setPackageData] = useState(undefined);

  // On load retrieve package
  useEffect(() => {
    if (!packageData) {
      async function retrieveData() {
        setPackageData(await getHomeCareBrokergage(homeCarePackageId));
      }

      retrieveData();
    }
  }, [homeCarePackageId, packageData]);

  const { times, secondaryTimes } = getServiceTypeCareTimes(PERSONAL_CARE_MODE);

  return (
    <Layout headerTitle="HOME CARE PACKAGE APPROVAL">
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
                      ESTIMATE
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

        <PackageApprovalHistorySummary
          approvalHistoryEntries={approvalHistoryEntries}
        />

        <HomeCarePackageDetails />

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
                    Approve to be brokered
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

export default HomeCareApprovePackage;
