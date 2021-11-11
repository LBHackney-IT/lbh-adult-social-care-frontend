import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collectingReasonOptions, claimCollector, collectedByType } from 'constants/variables';
import { requiredSchema } from 'constants/schemas';
import { currency } from 'constants/strings';
import { getCarePackageReviewRoute } from 'routes/RouteConstants';
import {
  Announcement,
  Button,
  Container,
  ErrorMessage,
  Input,
  Label,
  RadioGroup,
  Select,
  Textarea
} from '../../../HackneyDS';
import BrokerageHeader from '../BrokerageHeader';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import BrokerageTotalCost from '../BrokerageTotalCost';
import Loading from '../../../Loading';
import CarePackageBreadcrumbs from '../CarePackageBreadcrumbs';

const CareCharges = ({
  isS117,
  calculatedCost,
  careCharge,
  createCareCharge = () => {},
  updateCareCharge = () => {},
  loading,
}) => {
  const router = useRouter();
  const carePackageId = router.query.guid;
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

  const packageReviewPageLink = getCarePackageReviewRoute(carePackageId);

  const clickSave = async () => {
    if(isS117) return router.push(packageReviewPageLink);

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

    const claimReason = collectedBy === 'hackney' ? reasonCollecting : null;

    const careChargeCreation = {
      carePackageId,
      cost: costPerWeek,
      claimCollector: claimCollector[collectedBy],
      supplierId: 1, // fix value to be removed after updating API side
      status: 1, // fix value to be removed after updating API side
      type: 2, // fix value to be removed after updating API side
      subType: 1, // fix value to be removed after updating API side
      description: notes,
      claimReason,
    };

    const careChargeUpdate = {
      id: careCharge?.id,
      cost: costPerWeek,
      claimCollector: claimCollector[collectedBy],
      supplierId: 1, // fix value to be removed after updating API side
      status: 1, // fix value to be removed after updating API side
      type: 2, // fix value to be removed after updating API side
      subType: 1, // fix value to be removed after updating API side
      description: notes,
      claimReason,
    };

    if (!careCharge?.id) {
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

  useEffect(() => {
    if (careCharge) {
      const { description, claimCollector: claimCollectorInfo, claimReason } = careCharge;
      setNotes(description);
      setReasonCollecting(claimReason);
      if (claimCollectorInfo === 2) {
        setCollectedBy('hackney');
      } else {
        setCollectedBy('supplier');
      }
    }
  }, [careCharge]);

  return (
    <Container className="brokerage__care-charges">
      <BrokerageHeader />
      <CarePackageBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto 60px" padding="0 60px">
        <Loading isLoading={loading} />
        <TitleSubtitleHeader title="Build a care package" subTitle="Care Charges" />
        {isS117 && (
          <Announcement isError>
            <div slot="title">S117</div>
            <div slot="content">
              <p>This client has been categorised as S117. </p>
              <p>No care charges need to be applied</p>
            </div>
          </Announcement>
        )}
        <Container className={isS117 ? 'disabled-content' : ''}>
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
            className="mb-3"
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
                options={collectingReasonOptions}
                value={reasonCollecting}
                onChangeValue={(value) => {
                  setReasonCollecting(value);
                  changeError('reasonCollecting');
                }}
              />
            </>
          )}
          <Textarea className="care-charges__textarea" handler={setNotes} value={notes} />
        </Container>
        <BrokerageTotalCost
          name={`Funding per week ${collectedBy ? `(${collectedByType[collectedBy]})` : ''}`}
          className="brokerage__border-cost"
          value={finalCost}
        />
        <Container className="brokerage__actions">
          <Button onClick={clickBack} secondary color='gray'>
            Back
          </Button>
          <Button isLoading={loading} disabled={loading} onClick={clickSave}>
            {isS117 ? 'Review' : 'Save and review'}
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default CareCharges;
