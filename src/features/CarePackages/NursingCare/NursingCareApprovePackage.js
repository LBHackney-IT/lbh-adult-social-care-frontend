import ApprovalClientSummary from "../../components/ApprovalClientSummary";
import Layout from "../../Layout/Layout";
import React, { useState } from "react";
import NursingCareApprovalTitle from "./components/NursingCareApprovalTitle";
import PackageCostBox from "../DayCare/components/PackageCostBox";
import PackageApprovalHistorySummary from "../../components/PackageApprovalHistorySummary";
import TitleHeader from "../../components/TitleHeader";
import NursingCareSummary from "./components/NursingCareSummary";
import TextArea from "../../components/TextArea";

const approvalHistoryEntries = [
  {
    eventDate: "03/12/2021",
    eventMessage: "Package requested by Martin Workman · Social Worker ",
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
];

const initialNeedEntries = [
  {
    id: 1,
    needToAddress:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor. Aliquam suscipit laoreet pharetra. Aenean vestibulum ullamcorper enim, sed rhoncus sem tempor vitae. ",
    selectedCost: 1,
    selectedCostText: "Weekly",
    selectedPeriod: undefined,
  },
];

const NursingCareApprovePackage = () => {
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(
    initialNeedEntries
  );
  return (
    <Layout headerTitle="NURSING CARE APPROVAL">
      <div className="hackney-text-black font-size-12px">
        <NursingCareApprovalTitle />
        <ApprovalClientSummary />

        <div className="columns">
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">
                      STARTS
                    </p>
                    <p className="font-size-14px">03/07/2021</p>
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
                    <p className="font-weight-bold hackney-text-green">ENDS</p>
                    <p className="font-size-14px">Ongoing</p>
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
                      DAYS/WEEK
                    </p>
                    <p className="font-size-14px">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column" />
          <div className="column" />
        </div>

        <div className="columns">
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-yellow-box"
              title="COST OF CARE / WK"
              cost="£1892"
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-yellow-box"
              title="ANP / WK"
              cost="£132"
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-yellow-box"
              title="TOTAL / WK"
              cost="£132"
              costType="ESTIMATE"
            />
          </div>
        </div>

        <PackageApprovalHistorySummary
          approvalHistoryEntries={approvalHistoryEntries}
        />

        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-1">
              <TitleHeader>Package Details</TitleHeader>
              <NursingCareSummary
                startDate="03/07/2021"
                endDate={undefined}
                additionalNeedsEntries={additionalNeedsEntries}
                setAdditionalNeedsEntries={setAdditionalNeedsEntries}
                needToAddress="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor. Aliquam suscipit laoreet pharetra. Aenean vestibulum ullamcorper enim, sed rhoncus sem tempor vitae. Sed dignissim ornare metus eu faucibus.  Sed vel diam mi. Aenean a auctor felis, sit amet lacinia urna. Pellentesque bibendum dui a nulla faucibus, vel dignissim mi rutrum."
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
          </div>
        </div>

        <div className="columns">
          <div className="column">
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

export default NursingCareApprovePackage;
