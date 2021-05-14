import React from "react";
import {currency} from "../../../constants/strings";
import {Button} from "../../components/Button";
import {ArrowTopIcon} from "../../components/Icons";

const PayRunsLevelInsight = ({
  suppliersCount,
  servicesUsersCount,
  holdsCount,
  holdsPrice,
  cost,
  costIncrease,
  onClickFirstButton = () => {console.log('click first button')},
  onClickSecondButton = () => {console.log('click second button')}
}) => {
  return (
    <div className='pay-runs__level-insight'>
      <div className='pay-runs__level-insight-container'>
        <div className='pay-runs__level-insight-cost'>
          <p className='pay-runs__level-insight-cost-title'>High Level Insight</p>
          <p className='pay-runs__level-insight-cost-text'>{cost}</p>
          <p className='pay-runs__level-insight-cost-increase'><ArrowTopIcon /><span>{costIncrease}</span> increase from last cycle</p>
        </div>
        <div className='pay-runs__level-insight-supplier pay-runs__level-insight-bordered'>
          <p>{suppliersCount}</p>
          <p>suppliers</p>
        </div>
        <div className='pay-runs__level-insight-users pay-runs__level-insight-bordered'>
          <p>{servicesUsersCount}</p>
          <p>services users</p>
        </div>
        <div className='pay-runs__level-insight-holds pay-runs__level-insight-bordered'>
          <p>{holdsCount}</p>
          <p>Holds worth {currency.euro}{holdsPrice}</p>
        </div>
        <div className='pay-runs__level-insight-action-buttons'>
          <Button onClick={onClickFirstButton}>Submit pay run for approval</Button>
          <Button onClick={onClickSecondButton} className='outline red'>Delete draft pay run</Button>
        </div>
      </div>
    </div>
  );
};

export default PayRunsLevelInsight;
