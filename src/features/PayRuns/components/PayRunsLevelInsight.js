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
  firstButton,
  secondButton,
}) => {
  return (
    <div className='level-insight'>
      <div className='pay-runs__level-insight-container'>
        <div className='pay-runs__level-insight-cost'>
          <p className='pay-runs__level-insight-cost-title'>High Level Insight</p>
          <p className='pay-runs__level-insight-cost-text'>{cost}</p>
          <p className='pay-runs__level-insight-cost-increase'><ArrowTopIcon /><span>{costIncrease}</span> increase from last cycle</p>
        </div>
        <div className='pay-runs__level-insight-supplier level-insight__bordered'>
          <p>{suppliersCount}</p>
          <p>suppliers</p>
        </div>
        <div className='pay-runs__level-insight-users level-insight__bordered'>
          <p>{servicesUsersCount}</p>
          <p>services users</p>
        </div>
        <div className='pay-runs__level-insight-holds level-insight__bordered'>
          <p>{holdsCount}</p>
          <p>Holds worth {currency.euro}{holdsPrice}</p>
        </div>
        <div className='pay-runs__level-insight-action-buttons'>
          <Button onClick={firstButton.onClick}>{firstButton.text}</Button>
          <Button onClick={secondButton.onClick} className='outline red'>{secondButton.text}</Button>
        </div>
      </div>
    </div>
  );
};

export default PayRunsLevelInsight;
