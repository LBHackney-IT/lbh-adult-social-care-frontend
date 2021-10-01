import React, { useState } from 'react';
import { Container, Input } from '../../HackneyDS';
import BrokerageActionCard from '../BrokerageActionCard';
import { currency } from '../../../constants/strings';

const SupplierLookUpSelected = ({ cardInfo, setSelectedItem }) => {
  const [supplierWeeklyCost, setSupplierWeeklyCost] = useState(0);
  return (
    <Container>
      <h3>Supplier</h3>
      <BrokerageActionCard
        cardInfo={cardInfo}
        actionsComponent={<p onClick={() => setSelectedItem('')} className='link-button red'>Remove</p>}
      />
      <Input
        id='supplier-weekly-cost'
        preSign={currency.euro}
        label='Weekly Cost'
        value={supplierWeeklyCost}
        onChangeValue={setSupplierWeeklyCost}
      />
    </Container>
  );
};

export default SupplierLookUpSelected;