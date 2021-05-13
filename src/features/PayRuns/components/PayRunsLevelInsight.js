import React from "react";
import {currency} from "../../../constants/strings";
import {Button} from "../../components/Button";

const PayRunsLevelInsight = ({
  suppliersCount,
  servicesUsersCount,
  holdsCount,
  holdsPrice,
  onSubmit = () => {},
  onDeleteDraft = () => {}
}) => {
  return (
    <div className='pay-runs__level-insight'>
      <div className='pay-runs__level-insight-cost'>

      </div>
      <div className='pay-runs__level-insight-supplier'>
        <p>{suppliersCount}</p>
        <p>suppliers</p>
      </div>
      <div className='pay-runs__level-insight-users'>
        <p>{servicesUsersCount}</p>
        <p>services users</p>
      </div>
      <div className='pay-runs__level-insight-holds'>
        <p>{holdsCount}</p>
        <p>Holds worth {currency.euro}{holdsPrice}</p>
      </div>
      <div className='pay-runs__level-insight-action-buttons'>
        <Button onClick={onSubmit}>Submit pay run for approval</Button>
        <Button onClick={onDeleteDraft} className='outline red'>Delete draft pay run</Button>
      </div>
    </div>
  );
};

export default PayRunsLevelInsight;
