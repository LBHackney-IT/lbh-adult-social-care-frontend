import React from 'react';
import { Container } from '../../HackneyDS/Layout/Container';
import { Input } from '../../HackneyDS/Input';
import { RadioGroup } from '../../HackneyDS';
import TextArea from '../../TextArea';
import { currency } from '../../../constants/strings';

const NursingCareChargesEdit = ({
  provisionalAge,
  setProvisionalCost,
  careChargeErrors,
  provisionalCost,
  collectingCharges,
  setCollectingCharges,
  reasonCollectingCharges,
  setReasonCollectingCharges,
}) => {
  return (
    <>
      <Container display='flex'>
        <Container className='nursing-care-charges__container' display='flex' flexDirection='column'>
          <p className='text-black'>Provisional care charge (pre-assessement)</p>
          <Container className='nursing-care-charges__age' display='flex' alignItems='center'>
            <p>Age {provisionalAge}</p>
            <Input
              type='number'
              preSign={currency.euro}
              handler={setProvisionalCost}
              error={careChargeErrors.provisionalCost}
              value={provisionalCost}
            />
          </Container>
        </Container>
        <Container
          className='nursing-care-charges__container nursing-care-charges__collecting-charges'
          display='flex'
          flexDirection='column'
        >
          <p className='text-black'>Who is collecting these care charges</p>
          <RadioGroup
            small
            inline
            value={collectingCharges}
            handle={setCollectingCharges}
            items={[
              { labelHeading: 'Supplier', id: 'supplier' },
              { labelHeading: 'Hackney Council', id: 'hackney-council' },
            ]}
          />
        </Container>
      </Container>
      <Container display='flex' flexDirection='column'>
        <p className='text-required-after'>Why is Hackney collecting these care charges?</p>
        <TextArea
          className='nursing-care-charges__textarea'
          value={reasonCollectingCharges}
          onChange={setReasonCollectingCharges}
        />
      </Container>
    </>
  );
};

export default NursingCareChargesEdit;