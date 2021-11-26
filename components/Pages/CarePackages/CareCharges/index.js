import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { claimCollector, collectedByType, collectingReasonNameOptions } from 'constants/variables';
import { currency } from 'constants/strings';
import { getCarePackageReviewRoute } from 'routes/RouteConstants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { dateStringToDate, getBrokerCareChargeSchema, getFormData } from 'service';
import {
  Announcement,
  Button,
  Container,
  ErrorMessage,
  HorizontalSeparator,
  Input,
  Label,
  RadioGroup,
  Select,
  Textarea
} from '../../../HackneyDS';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import BrokerageTotalCost from '../BrokerageTotalCost';
import Loading from '../../../Loading';
import DynamicBreadcrumbs from '../../DynamicBreadcrumbs';
import BrokeragePackageDates from '../BrokeragePackageDates';
import { usePackageDetails } from '../../../../api';

const CareCharges = ({
  isS117,
  subType,
  calculatedCost,
  careCharge,
  createCareCharge = () => {},
  updateCareCharge = () => {},
  loading,
}) => {
  const router = useRouter();
  const carePackageId = router.query.guid;
  const [isOngoing, setIsOngoing] = useState(false);

  const { data: details, isLoading: detailsLoading } = usePackageDetails(carePackageId);

  const coreStartDate = dateStringToDate(details.startDate);
  const coreEndDate = dateStringToDate(details.endDate);

  const schema = useMemo(() => getBrokerCareChargeSchema(isOngoing), [isOngoing]);

  const {
    handleSubmit,
    reset,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      collectedBy: '',
      cost: '',
      reasonCollecting: '',
      description: '',
      dates: {
        startDate: null,
        endDate: null,
      }
    },
  });

  const [formCollectedBy, formCostPerWeek] = watch(['collectedBy', 'cost']);

  const finalCost = formCollectedBy === 'hackney' ? -formCostPerWeek : formCostPerWeek;

  const clickBack = () => {
    router.back();
  };

  const packageReviewPageLink = getCarePackageReviewRoute(carePackageId);

  const clickSave = async ({
    dates: { startDate, endDate },
    reasonCollecting,
    cost,
    description,
    collectedBy
  }) => {
    if (isS117) return router.push(packageReviewPageLink);

    const newData = {
      cost,
      claimCollector: claimCollector[collectedBy],
      startDate,
      endDate: isOngoing ? null : endDate,
      description,
      subType,
      claimReason: collectedBy === 'hackney' ? reasonCollecting : null,
    };

    if (!careCharge?.id) {
      const formattedData = getFormData({ ...newData, carePackageId });
      createCareCharge(carePackageId, formattedData);
    } else {
      const updatedData = new FormData();
      const { assessmentFileId, assessmentFileName } = careCharge;

      if (assessmentFileName) updatedData.append('assessmentFileId', assessmentFileId);

      getFormData({ ...newData, id: careCharge?.id }, updatedData, 'reclaims[0]');
      updateCareCharge(carePackageId,);
    }
  };

  useEffect(() => {
    if (calculatedCost) {
      reset({ ...getValues(), cost: calculatedCost });
    }
  }, [calculatedCost]);

  useEffect(() => {
    if (careCharge) {
      const { description, claimCollector: claimCollectorInfo, claimReason } = careCharge;
      const data = {
        description,
        claimReason,
        dates: {
          startDate: null,
          endDate: null,
        }
      };
      if (claimCollectorInfo === 2) {
        reset({
          ...data,
          collectedBy: 'hackney'
        });
      } else {
        reset({
          ...data,
          collectedBy: 'supplier'
        });
      }
    }
  }, [careCharge]);

  const onSubmit = (data) => clickSave(data);

  const isLoading = detailsLoading || loading;

  return (
    <Container className="brokerage__care-charges">
      <DynamicBreadcrumbs />
      <Loading isLoading={isLoading} />
      <Container maxWidth="1080px" margin="0 auto 60px" padding="0 60px">
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container className={isS117 ? 'disabled-content' : ''}>
            <h3 className="brokerage__item-title">Care charges</h3>
            <p className="care-charges-hint">Provisional care charge (pre-assessement)</p>
            <Controller
              name="cost"
              control={control}
              render={({ field }) => (
                <Input
                  onChangeValue={field.onChange}
                  className="care-charges__cost-input"
                  value={field.value}
                  label="Cost per week"
                  error={errors.cost?.message}
                  hint="Auto calculated on age"
                  preSign={currency.euro}
                  onBlur={() => {
                    if (field.value < calculatedCost) {
                      field.onChange(calculatedCost);
                    }
                  }}
                />
              )}
            />

            <Controller
              name="collectedBy"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  handle={field.onChange}
                  inline
                  className="mb-3"
                  error={errors.collectedBy?.message}
                  value={field.value}
                  label="Collected by"
                  items={[
                    { id: 'hackney', label: 'Hackney council (gross)' },
                    { id: 'supplier', label: 'Supplier (net)' },
                  ]}
                />
              )}
            />
            <Controller
              name="dates"
              control={control}
              render={({ field: formField }) => (
                <BrokeragePackageDates
                  checkMinDate
                  startMaxDate={coreEndDate}
                  endMaxDate={coreEndDate}
                  startMinDate={coreStartDate}
                  fields={{
                    dateFrom: 'startDate',
                    dateTo: 'endDate',
                  }}
                  showError={false}
                  error={errors.dates?.message}
                  dates={formField.value}
                  setDates={(field, value) => formField.onChange({ ...formField.value, [field]: value })}
                  setIsOngoing={setIsOngoing}
                  isOngoing={isOngoing}
                />
              )}
            />
            <HorizontalSeparator height={32} />
            {formCollectedBy === 'hackney' && (
              <>
                <Label className="reason-collecting text-required-after" htmlFor="reason-collecting">
                  Why is Hackney collecting these care charges?
                </Label>
                {errors.reasonCollecting?.message && <ErrorMessage>{errors.reasonCollecting?.message}</ErrorMessage>}
                <Controller
                  name="reasonCollecting"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="reason-collecting"
                      options={collectingReasonNameOptions}
                      value={field.value}
                      onChangeValue={field.onChange}
                    />
                  )}
                />
              </>
            )}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  className="care-charges__textarea"
                  handler={field.onChange}
                  value={field.value}
                />
              )}
            />
          </Container>
          <BrokerageTotalCost
            name={`Funding per week ${formCollectedBy ? `(${collectedByType[formCollectedBy]})` : ''}`}
            className="brokerage__border-cost"
            value={finalCost}
          />
          <Container className="brokerage__actions">
            <Button onClick={clickBack} secondary color="gray">Back</Button>
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              {isS117 ? 'Review' : 'Save and review'}
            </Button>
          </Container>
        </form>
      </Container>
    </Container>
  );
};

export default CareCharges;
