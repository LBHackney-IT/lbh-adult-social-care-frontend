import React from 'react';
import ClientSummary from '../ClientSummary';
import { getAgeFromDateString, getEnGBFormattedDate } from '../../api/Utils/FuncUtils';
import PackageCostBox from '../DayCare/PackageCostBox';
import PackageApprovalHistorySummary from '../PackageApprovalHistorySummary';

const ApprovalHistory = ({
  history = [],
  costSummary,
  clientDateOfBirth,
  isFixedPeriodOrOngoing,
  termTimeConsiderationOption,
  clientName,
  clientHackneyId,
  hackneyId,
  startDate,
  boxClasses,
  endDate,
  careType,
}) => (
  <div className="approval-history">
    <h2>
      {careType}{' '}
      <span>
        ({isFixedPeriodOrOngoing ? 'Fixed Period' : 'Ongoing'} - {termTimeConsiderationOption})
      </span>
    </h2>
    <ClientSummary
      client={clientName}
      hackneyId={clientHackneyId}
      age={clientDateOfBirth && getAgeFromDateString(clientDateOfBirth)}
      whoIsSourcing="hackney"
      dateOfBirth={clientDateOfBirth && getEnGBFormattedDate(clientDateOfBirth)}
      postcode={hackneyId}
    />
    <div className="care-info">
      <div>
        <p>STARTS</p>
        <p>{getEnGBFormattedDate(startDate)}</p>
      </div>
      <div>
        <p>ENDS</p>
        <p>{endDate !== null ? getEnGBFormattedDate(endDate) : 'Ongoing'}</p>
      </div>
      <div>
        <p>DAYS/WEEK</p>
        <p />
      </div>
    </div>
    <div className="columns font-size-12px">
      <div className="column">
        <div className="is-flex is-flex-wrap-wrap">
          {costSummary && (
            <>
              {costSummary.costOfCarePerWeek && (
                <PackageCostBox
                  title="COST OF CARE / WK"
                  cost={costSummary?.costOfCarePerWeek ?? 0.0}
                  costType="ESTIMATE"
                />
              )}
              {costSummary.costOfCarePerDay && (
                <PackageCostBox
                  title="COST OF CARE / DAY"
                  cost={costSummary?.costOfCarePerDay ?? 0.0}
                  costType="ESTIMATE"
                />
              )}
              {costSummary.anpPerWeek && (
                <PackageCostBox title="ANP / WK" cost={costSummary?.anpPerWeek ?? 0.0} costType="ESTIMATE" />
              )}
              {costSummary.transportPerWeek && (
                <PackageCostBox
                  title="TRANSPORT / WK"
                  cost={costSummary?.transportPerWeek ?? 0.0}
                  costType="ESTIMATE"
                />
              )}
              {costSummary.oneOffCost && (
                <PackageCostBox
                  boxClass="hackney-package-cost-yellow-box"
                  title="ONE OFF COSTS"
                  cost={costSummary?.oneOffCost ?? 0.0}
                  costType="ESTIMATE"
                />
              )}
              {costSummary.totalCostPerWeek && (
                <PackageCostBox
                  boxClass={`${boxClasses?.totalCostPerWeek || 'hackney-package-cost-yellow-box'}`}
                  title="TOTAL / WK"
                  cost={costSummary?.totalCostPerWeek ?? 0.0}
                  costType="ESTIMATE"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
    <PackageApprovalHistorySummary approvalHistoryEntries={history} />
  </div>
);

export default ApprovalHistory;
