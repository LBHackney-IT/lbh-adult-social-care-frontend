import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getLoggedInUser, removeEmpty } from 'service';
import {
  Button,
  DynamicBreadcrumbs,
  Container,
  Loading,
  TitleSubtitleHeader,
  VerticalSeparator,
  HorizontalSeparator,
  Hint,
  FormGroup,
  Input,
  RadioGroup,
  Select,
  WarningText,
  Textarea,
} from 'components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  createCareChargeReclaim,
  updateCareChargeReclaim,
  updateCarePackageReclaimFnc,
  usePackageActiveFncPrice,
  usePackageCalculatedCost,
  usePackageCareCharge,
  usePackageFnc,
  useSingleCorePackageInfo,
} from 'api';
import withSession from 'lib/session';
import { getBrokerPackageRoute, getCareChargesRoute, getCarePackageReviewRoute } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { getFormData } from 'service/getFormData';
import { formValidationSchema } from 'service/formValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { reclaimType } from 'constants/variables';
import { CareChargeSchedule } from 'components/Pages/CarePackages/BrokerCareCharge/CareChargeSchedule';
import { FundingPerWeek } from 'components/Pages/CarePackages/BrokerCareCharge/FundingPerWeek';

export const getServerSideProps = withSession(async ({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
});

const CareCharge = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isRequestBeingSent, setIsRequestBeingSent] = useState(false);

  const { guid: carePackageId } = router.query;

  const { data: careChargeData, isLoading: careChargeLoading } = usePackageCareCharge(
    carePackageId,
    reclaimType.careCharge
  );

  const { data: packageInfo } = useSingleCorePackageInfo(carePackageId);
  const { serviceUser } = packageInfo;
  const { data: calculatedCost, isLoading: calculatedCostLoading } = usePackageCalculatedCost(
    carePackageId,
    serviceUser?.id
  );

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(formValidationSchema.carePackageFNCSchema),
    defaultValues: {
      carePackageId,
      cost: null,
      subType: 1,
      claimCollector: 2,
      claimReason: null,
      startDate: null,
      endDate: null,
      isOngoing: false,
      description: null,
      id: null,
    },
  });

  useEffect(() => {
    if (calculatedCost) setValue('cost', calculatedCost);
  }, [calculatedCost]);

  useEffect(() => {
    if (careChargeData && careChargeData.length) {
      const data = careChargeData[0];
      setValue('id', data.id);
      setValue('startDate', data.startDate);
      setValue('claimCollector', data.claimCollector);
      if (data.claimReason) setValue('claimReason', data.claimReason);
      if (data.description) setValue('description', data.description);
      if (data.assessmentFileName) setValue('assessmentFileName', data.assessmentFileName);
      if (data.assessmentFileId) setValue('assessmentFileId', data.assessmentFileId);
      if (!data.endDate && data.startDate) setValue('isOngoing', true);
      if (data.endDate) {
        setValue('endDate', data.endDate);
        setValue('isOngoing', false);
      }
    }
  }, [careChargeLoading]);

  const clickBack = () => router.push(getBrokerPackageRoute(carePackageId));

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const updatePackage = async (data = {}) => {
    if (isDirty) {
      handleFormSubmission(data);
    } else {
      router.push(getCarePackageReviewRoute(carePackageId));
    }
  };

  const handleFormSubmission = async () => {
    setIsRequestBeingSent(true);
    const data = getValues();

    // const omittedData = data.endDate && !data.isOngoing ? data : omit(data, ['endDate']);
    const omittedData = removeEmpty(data);

    const formData =
      !omittedData.endDate || omittedData.isOngoing
        ? getFormData({
            ...omittedData,
            startDate: new Date(omittedData.startDate).toISOString(),
          })
        : getFormData({
            ...omittedData,
            startDate: new Date(omittedData.startDate).toISOString(),
            endDate: new Date(omittedData.endDate).toISOString(),
          });

    if (data.id) {
      try {
        await updateCareChargeReclaim(carePackageId, formData);
        pushNotification(`Funded Nursing Care updated successfully`, 'success');
        router.push(getCarePackageReviewRoute(carePackageId));
      } catch (e) {
        pushNotification(e);
      }
    } else {
      try {
        await createCareChargeReclaim(carePackageId, formData);
        pushNotification(`Funded Nursing Care updated successfully`, 'success');
        router.push(getCarePackageReviewRoute(carePackageId));
      } catch (e) {
        pushNotification(e);
      }
    }

    setIsRequestBeingSent(false);
  };

  const collectingReasonOptions = [
    { text: 'Service user unable to manage finances', value: '1' },
    { text: 'Agreement with provider to pay gross', value: '2' },
    { text: 'Service user or family declining payment', value: '3' },
    { text: 'Finance managed by CFAT', value: '4' },
    { text: 'Other', value: '5' },
  ];
  const collectedBy = watch('claimCollector');
  const isOngoing = watch('isOngoing');
  const cost = watch('cost');
  return (
    <>
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Care Charges" title="Build a care package" />
        <Loading isLoading={careChargeLoading} />
        {!careChargeLoading && (
          <form onSubmit={handleSubmit(updatePackage)}>
            <Container className="brokerage__container">
              <WarningText>Provisional care charge (pre-assessement)</WarningText>
              <HorizontalSeparator height="30px" />
              <FormGroup label="Cost per week" hint="Auto calculated on age">
                <Controller
                  name="cost"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      step="any"
                      preSign="£"
                      value={field.value}
                      onChangeValue={(text) => field.onChange(parseFloat(text))}
                      flex
                    />
                  )}
                />
              </FormGroup>
            </Container>
            <CareChargeSchedule control={control} errors={errors} isOngoing={isOngoing} />

            <Container>
              <Controller
                name="claimCollector"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    handle={field.onChange}
                    inline
                    // error={errors.collectedBy}
                    label="Collected by"
                    items={[
                      { id: 1, label: 'Hackney council (gross)' },
                      { id: 2, label: 'Supplier (net)' },
                    ]}
                    {...field}
                  />
                )}
              />
              <HorizontalSeparator height="20px" />
              <FormGroup label="Why is Hackney collecting these care charges?" disabled={collectedBy !== 1}>
                <Controller
                  name="claimReason"
                  control={control}
                  render={({ field }) => <Select options={collectingReasonOptions} {...field} />}
                />
                <HorizontalSeparator height="10px" />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <Textarea value={field.value} handler={field.onChange} />}
                />
              </FormGroup>
            </Container>
            <HorizontalSeparator height="48px" />
            <FundingPerWeek total={cost} />
            <HorizontalSeparator height="48px" />
            <Container display="flex">
              <Button onClick={clickBack} secondary color="gray">
                Back
              </Button>
              <VerticalSeparator width="10px" />
              <VerticalSeparator width="10px" />
              <Button isLoading={isRequestBeingSent} type="submit">
                Save and continue
              </Button>
            </Container>
          </form>
        )}
      </Container>
    </>
  );
};

export default CareCharge;
