import ClientSummary from '../ClientSummary'
import { getAgeFromDateString, getEnGBFormattedDate } from '../../api/Utils/FuncUtils'
import PackageCostBox from '../DayCare/PackageCostBox'
import PackageApprovalHistorySummary from '../PackageApprovalHistorySummary'
import React from 'react'

const ApprovalHistory = ({
  history,
  costSummary,
  clientDateOfBirth,
  isFixedPeriodOrOngoing,
  termTimeConsiderationOption,
  clientName,
  clientHackneyId,
  hackneyId,
  startDate,
  endDate,
  careType,
}) => {
  return (
    <div className="approval-history">
      <h2>
        {careType}{" "}
        <span>
          (
          {isFixedPeriodOrOngoing
            ? "Fixed Period"
            : "Ongoing"}{" "}
          - {termTimeConsiderationOption})
        </span>
      </h2>
      <ClientSummary
        client={clientName}
        hackneyId={clientHackneyId}
        age={
          clientDateOfBirth &&
          getAgeFromDateString(clientDateOfBirth)
        }
        sourcingCare="hackney"
        dateOfBirth={
          clientDateOfBirth &&
          getEnGBFormattedDate(clientDateOfBirth)
        }
        postcode={hackneyId}
      />
      <div className="care-info">
        <div>
          <p>STARTS</p>
          <p>
            {getEnGBFormattedDate(startDate)}
          </p>
        </div>
        <div>
          <p>ENDS</p>
          <p>
            {endDate !== null
              ? getEnGBFormattedDate(endDate)
              : "Ongoing"}
          </p>
        </div>
        <div>
          <p>DAYS/WEEK</p>
          <p />
        </div>
      </div>
      <div className="columns font-size-12px">
        <div className="column">
          <div className="is-flex is-flex-wrap-wrap">
            <PackageCostBox
              title="COST OF CARE / WK"
              cost={costSummary?.costOfCarePerWeek ?? 0.0}
              costType="ESTIMATE"
            />

            <PackageCostBox
              title="ANP / WK"
              cost={costSummary?.anpPerWeek ?? 0.0}
              costType="ESTIMATE"
            />

            <PackageCostBox
              title="ONE OFF COSTS"
              cost={costSummary?.oneOffCost ?? 0.0}
              costType="ESTIMATE"
            />

            <PackageCostBox
              title="TOTAL / WK"
              cost={costSummary?.totalCostPerWeek ?? 0.0}
              costType="ESTIMATE"
            />
          </div>
        </div>
      </div>
      <PackageApprovalHistorySummary approvalHistoryEntries={history} />
    </div>
  );
};

export default ApprovalHistory;
