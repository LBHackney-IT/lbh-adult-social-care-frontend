import React from "react";
import ClientSummary from "../../components/ClientSummary";
import CostCard from "../../components/CostCard";
import {
  getAgeFromDateString,
  getEnGBFormattedDate,
} from "../../../api/Utils/FuncUtils";

const ApprovalHistory = ({
  status = "",
  history,
  costCards,
  clientDetails = [],
}) => {
  return (
    <div className="approval-history">
      <h2>
        Home Care <span>{status}</span>
      </h2>
      <ClientSummary
        client={clientDetails?.clientName}
        hackneyId={clientDetails?.hackneyId}
        age={clientDetails && getAgeFromDateString(clientDetails.dateOfBirth)}
        sourcingCare="hackney"
        dateOfBirth={
          clientDetails && getEnGBFormattedDate(clientDetails.dateOfBirth)
        }
        postcode={clientDetails?.postCode}
      />
      <div className="care-info">
        <div>
          <p>STARTS</p>
          <p>03/07/2021</p>
        </div>
        <div>
          <p>ENDS</p>
          <p>Ongoing</p>
        </div>
        <div>
          <p>DAYS/WEEK</p>
          <p>3</p>
        </div>
      </div>
      {!!costCards.length && (
        <div className="is-flex is-flex-wrap-wrap">
          {costCards.map((item) => {
            return <CostCard selected={item.selected} key={item.id} />;
          })}
        </div>
      )}
      <div className="approval-history__history">
        <p className="approval-history__title">APPROVAL HISTORY</p>
        {history.map((item) => (
          <p key={item.id} className="approval-history__text">
            <span className="date">{item.date}</span>
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ApprovalHistory;
