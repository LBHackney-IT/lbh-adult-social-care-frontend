import React from "react";
import ClientSummary from "../../components/ClientSummary";
import CostCard from "../../components/CostCard";

const ApprovalHistory = ({ status = '', history, costCards = [] }) => {
  return (
    <div className='approval-history'>
      <h2>Home Care <span>{status}</span></h2>
      <ClientSummary
        client="James Stephens"
        hackneyId="786288"
        age="91"
        sourcingCare='hackney'
        dateOfBirth="09/12/1972"
        postcode="E9 6EY"
      />
      <div className='care-info'>
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
      {
        !!costCards.length &&
        <div className='is-flex is-flex-wrap-wrap'>
          {costCards.map(item => {
            console.log(item);
              return (<CostCard selected={item.selected} key={item.id} />)
            }
          )}
        </div>
      }
      <div className='approval-history__history'>
        <p className='approval-history__title'>APPROVAL HISTORY</p>
        {history.map(item => (
          <p key={item.id} className='approval-history__text'>
            <span className='date'>{item.date}</span>
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ApprovalHistory;
