import React from 'react';
import { stringIsNullOrEmpty } from 'api/Utils/FuncUtils';
import PackageCostBox from '../DayCare/PackageCostBox';
import PackageApprovalHistorySummary from '../PackageApprovalHistorySummary';
import { formatCareDatePeriod } from 'service/helpers';
import ClientSummaryItem from '../CarePackages/ClientSummaryItem';

const ApprovalHistory = ({
  history = [],
  costSummary,
  boxClasses,
  approvalData,
}) => {
  if(!history?.length) return React.Fragment;

  const datePeriod = formatCareDatePeriod(approvalData?.startDate, approvalData?.endDate);
  return (
    <div className="approval-history">
      <div className="client-summary mb-5">
        <ClientSummaryItem itemDetail={datePeriod.startDate} itemName='STARTS' />
        <ClientSummaryItem itemDetail={datePeriod.endDate} itemName='ENDS' />
        <ClientSummaryItem itemDetail={1} itemName='DAYS/WEEK' />
        {approvalData?.hasRespiteCare && <ClientSummaryItem itemName="RESPITE CARE" itemDetail={approvalData?.hasRespiteCare === true ? 'yes' : 'no'} />}
        {approvalData?.hasDischargePackage && <ClientSummaryItem itemName="DISCHARGE PACKAGE" itemDetail={approvalData?.hasDischargePackage === true ? 'yes' : 'no'} />}
        {approvalData?.isThisAnImmediateService && <ClientSummaryItem
          itemName="IMMEDIATE / RE-ENABLEMENT PACKAGE"
          itemDetail={approvalData?.isThisAnImmediateService === true ? 'Immediate' : 'Re-enablement'}
        />}
        {approvalData?.isThisUserUnderS117 && <ClientSummaryItem itemName="S117 CLIENT" itemDetail={approvalData?.isThisUserUnderS117 === true ? 'yes' : 'no'} />}
        {approvalData?.typeOfStayOptionName && <ClientSummaryItem
          itemName="TYPE OF STAY"
          itemDetail={!stringIsNullOrEmpty(approvalData?.typeOfStayOptionName) ? approvalData?.typeOfStayOptionName : ''}
        />}
      </div>
      <div className='package-cost-box__group mb-5'>
        {costSummary && (
          <>
            {costSummary.costOfCarePerWeek !== undefined && (
              <PackageCostBox
                title="COST OF CARE / WK"
                cost={costSummary?.costOfCarePerWeek ?? 0.0}
                costType="ESTIMATE"
              />
            )}
            {costSummary.costOfCarePerDay !== undefined && (
              <PackageCostBox
                title="COST OF CARE / DAY"
                cost={costSummary?.costOfCarePerDay ?? 0.0}
                costType="ESTIMATE"
              />
            )}
            {costSummary.anpPerWeek !== undefined && (
              <PackageCostBox title="ANP / WK" cost={costSummary?.anpPerWeek ?? 0.0} costType="ESTIMATE" />
            )}
            {costSummary.transportPerWeek !== undefined && (
              <PackageCostBox
                title="TRANSPORT / WK"
                cost={costSummary?.transportPerWeek ?? 0.0}
                costType="ESTIMATE"
              />
            )}
            {costSummary.oneOffCost !== undefined && (
              <PackageCostBox
                boxClass="hackney-package-cost-yellow-box"
                title="ONE OFF COSTS"
                cost={costSummary?.oneOffCost ?? 0.0}
                costType="ESTIMATE"
              />
            )}
            {costSummary.totalCostPerWeek !== undefined && (
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
      <PackageApprovalHistorySummary approvalHistoryEntries={history} />
    </div>
  );
}

export default ApprovalHistory;
