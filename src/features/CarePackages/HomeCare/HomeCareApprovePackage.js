import Layout from "../../Layout/Layout";
import React from "react";
import TextArea from "../../components/TextArea";
import WeekCarePicker from "./components/WeekCarePicker";
import { getServiceTypeCareTimes } from "./HomeCareServiceHelper";
import { PERSONAL_CARE_MODE } from "./HomeCarePickerHelper";
import HomeCareApprovalTitle from "./components/HomeCareApprovalTitle";
import ApprovalClientSummary from "../../components/ApprovalClientSummary";
import HomeCarePackageBreakdown from "./components/HomeCarePackageBreakdown";
import PackageApprovalHistorySummary from "../../components/PackageApprovalHistorySummary";
import HomeCarePackageDetails from "./components/HomeCarePackageDetails";

const HomeCareApprovePackage = ({ history }) => {
  const { times, secondaryTimes } = getServiceTypeCareTimes(PERSONAL_CARE_MODE);
  return (
    <Layout headerTitle="HOME CARE APPROVAL">
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

        <PackageApprovalHistorySummary />

        <HomeCarePackageDetails />

        <div className="columns">
          <div className="column">
            <div className="mt-2">
              <WeekCarePicker
                primaryCareTimes={times}
                secondaryCareTimes={secondaryTimes}
              />
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
