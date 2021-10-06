import React, { useState } from 'react';
import { Button, Container, Input, Label, RadioGroup, Select, Textarea } from '../../HackneyDS';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import BrokerageContainerHeader from '../BrokerageContainerHeader';
import BrokerageTotalCost from '../BrokerageTotalCost';
import { requiredSchema } from '../../../constants/schemas';
import { currency } from '../../../constants/strings';

const CareCharges = ({ reasonsCollecting, defaultCost = 84.4 }) => {
  const [collectedByType] = useState({
    supplier: 'net',
    hackney: 'gross',
  });
  const [errors, setErrors] = useState({
    collectedBy: '',
    costPerWeek: '',
  });

  const [collectedBy, setCollectedBy] = useState('');
  const [reasonCollecting, setReasonCollecting] = useState('');
  const [notes, setNotes] = useState('');

  const [costPerWeek, setCostPerWeek] = useState(defaultCost);

  const finalCost = collectedBy === 'hackney' ? -costPerWeek : costPerWeek;

  const clickBack = () => {
    alert('Click back');
  };

  const clickSave = async () => {
    const validFields = [
      {
        schema: requiredSchema.number,
        value: costPerWeek,
        field: 'costPerWeek',
      },
      {
        schema: requiredSchema.string,
        value: collectedBy,
        field: 'collectedBy'
      },
    ];

    let hasErrors = false;
    let localErrors = {};
    for await (let { schema, value, field } of validFields) {
      const isValid = await schema.isValid({ value });
      if (!isValid) {
        hasErrors = true;
        localErrors[field] = 'Required field';
      }
    }
    setErrors(prevState => ({ ...prevState, ...localErrors }));

    if (hasErrors) return;

    alert(`Save and continue with final cost: ${finalCost}`);
  };

  const changeError = (field, value = '') => {
    setErrors(prevState => ({ ...prevState, [field]: value }));
  };

  return (
    <Container className="brokerage__care-charges">
      <BrokerageHeader/>
      <Container className="brokerage__container-main">
        <BrokerageContainerHeader title="Funded Nursing Care"/>
        <Container>
          <h3 className="brokerage__item-title">Care charges</h3>
          <p className='care-charges-hint'>Provisional care charge (pre-assessement)</p>
          <Input
            onChangeValue={setCostPerWeek}
            className='care-charges__cost-input'
            value={costPerWeek}
            label="Cost per week"
            error={errors.costPerWeek}
            hint="Auto calculated on age"
            preSign={currency.euro}
            onBlur={() => {
              if (costPerWeek < defaultCost) {
                setCostPerWeek(defaultCost);
              }
            }}
          />
          <RadioGroup
            handle={value => {
              changeError('collectedBy');
              setCollectedBy(value);
            }}
            inline
            error={errors.collectedBy}
            value={collectedBy}
            label="Collected by"
            items={[
              { id: 'hackney', label: 'Hackney council (gross)' },
              { id: 'supplier', label: 'Supplier (net)' },
            ]}
          />
          <Label className="reason-collecting" htmlFor="reason-collecting">
            Why is
            <span className="text-capitalize"> {collectedBy} </span>
            collecting these care charges?
          </Label>
          <Select
            id="reason-collecting"
            options={reasonsCollecting}
            value={collectedBy}
            onChangeValue={setReasonCollecting}
          />
          <Textarea className='care-charges__textarea' handler={setNotes} value={notes}/>
          <BrokerageTotalCost
            name={`Funding per week ${collectedBy ? `(${collectedByType[collectedBy]})` : ''}`}
            className="brokerage__border-cost"
            value={finalCost}
          />
          <Container className="brokerage__actions">
            <Button handler={clickBack} className="brokerage__back-button">Back</Button>
            <Button handler={clickSave}>Save and review</Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default CareCharges;