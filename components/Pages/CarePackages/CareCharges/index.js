import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, ErrorMessage, Input, Label, RadioGroup, Select, Textarea } from '../../../HackneyDS';
import { requiredSchema } from '../../../../constants/schemas';
import { currency } from '../../../../constants/strings';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import BrokerageTotalCost from '../BrokerageTotalCost';
import Loading from '../../../Loading';

const CareCharges = ({
  reasonsCollecting,
  calculatedCost,
  carePackageReclaimCareCharge,
  createCareCharge = () => {},
  updateCareCharge = () => {},
  loading,
}) => {
  const router = useRouter();
  const carePackageId = router.query.guid;

  const [collectedByType] = useState({
    supplier: 'net',
    hackney: 'gross',
  });
  const [claimCollector] = useState({
    hackney: 2,
    supplier: 1,
  });
  const [errors, setErrors] = useState({
    collectedBy: '',
    costPerWeek: '',
    reasonCollecting: '',
  });

  const [collectedBy, setCollectedBy] = useState('');
  const [reasonCollecting, setReasonCollecting] = useState('');
  const [notes, setNotes] = useState('');
  const [costPerWeek, setCostPerWeek] = useState(calculatedCost);
  const finalCost = collectedBy === 'hackney' ? -costPerWeek : costPerWeek;

  const clickBack = () => {
    router.back();
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
        field: 'collectedBy',
      },
    ];

    if (collectedBy === 'hackney') {
      validFields.push({
        schema: requiredSchema.string,
        value: reasonCollecting,
        field: 'reasonCollecting',
      });
    }

    let hasErrors = false;
    const localErrors = {};
    for await (const { schema, value, field } of validFields) {
      const isValid = await schema.isValid({ value });
      if (!isValid) {
        hasErrors = true;
        localErrors[field] = 'Required field';
      }
    }
    setErrors((prevState) => ({ ...prevState, ...localErrors }));

    if (hasErrors) return;

    const careChargeCreation = {
      carePackageId,
      cost: costPerWeek,
      claimCollector: claimCollector[collectedBy],
      supplierId: 1, // fix value to be removed after updating API side
      status: 1, // fix value to be removed after updating API side
      type: 2, // fix value to be removed after updating API side
      subType: 1, // fix value to be removed after updating API side
      description: notes,
      claimReason: reasonCollecting,
    };

    const careChargeUpdate = {
      id: carePackageReclaimCareCharge.id,
      cost: costPerWeek,
      claimCollector: claimCollector[collectedBy],
      supplierId: 1, // fix value to be removed after updating API side
      status: 1, // fix value to be removed after updating API side
      type: 2, // fix value to be removed after updating API side
      subType: 1, // fix value to be removed after updating API side
      description: notes,
      claimReason: reasonCollecting,
    };

    if (!carePackageReclaimCareCharge?.id) {
      createCareCharge(carePackageId, careChargeCreation);
      return;
    }
    updateCareCharge(carePackageId, careChargeUpdate);
  };

  const changeError = (field, value = '') => {
    setErrors((prevState) => ({ ...prevState, [field]: value }));
  };

  useEffect(() => {
    if (calculatedCost) {
      setCostPerWeek(calculatedCost);
    }
  }, [calculatedCost]);

  const composecarePackageReclaimCareChargeData = () => {
    if (carePackageReclaimCareCharge) {
      setNotes(carePackageReclaimCareCharge.description);
      if (carePackageReclaimCareCharge.claimCollector === 2) {
        setCollectedBy('hackney');
      } else {
        setCollectedBy('supplier');
      }
      setReasonCollecting(carePackageReclaimCareCharge.claimReason);
    }
  };

  useEffect(() => {
    composecarePackageReclaimCareChargeData();
  }, [carePackageReclaimCareCharge]);

  return (
    <Container className="brokerage__care-charges">
      <BrokerageHeader />
      <Container maxWidth="1080px" margin="0 auto" padding="60px">
        <Loading isLoading={loading} />
        <TitleSubtitleHeader title="Build a care package" subTitle="Care Charges" />
        <Container>
          <h3 className="brokerage__item-title">Care charges</h3>
          <p className="care-charges-hint">Provisional care charge (pre-assessement)</p>
          <Input
            onChangeValue={setCostPerWeek}
            className="care-charges__cost-input"
            value={costPerWeek}
            label="Cost per week"
            error={errors.costPerWeek}
            hint="Auto calculated on age"
            preSign={currency.euro}
            onBlur={() => {
              if (costPerWeek < calculatedCost) {
                setCostPerWeek(calculatedCost);
              }
            }}
          />
          <RadioGroup
            handle={(value) => {
              changeError('collectedBy');
              setCollectedBy(value);
            }}
            inline
            className='mb-3'
            error={errors.collectedBy}
            value={collectedBy}
            label="Collected by"
            items={[
              { id: 'hackney', label: 'Hackney council (gross)' },
              { id: 'supplier', label: 'Supplier (net)' },
            ]}
          />
          {collectedBy === 'hackney' && (
            <>
              <Label className="reason-collecting text-required-after" htmlFor="reason-collecting">
                Why is Hackney collecting these care charges?
              </Label>
              {errors.reasonCollecting && <ErrorMessage>{errors.reasonCollecting}</ErrorMessage>}
              <Select
                id="reason-collecting"
                options={reasonsCollecting}
                value={reasonCollecting}
                onChangeValue={(value) => {
                  setReasonCollecting(value);
                  changeError('reasonCollecting');
                }}
              />
            </>
          )}
          <Textarea className="care-charges__textarea" handler={setNotes} value={notes} />
          <BrokerageTotalCost
            name={`Funding per week ${collectedBy ? `(${collectedByType[collectedBy]})` : ''}`}
            className="brokerage__border-cost"
            value={finalCost}
          />
          <Container className="brokerage__actions">
            <Button onClick={clickBack} className="brokerage__back-button">
              Back
            </Button>
            <Button isLoading={loading} disabled={loading} onClick={clickSave}>Save and review</Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default CareCharges;
