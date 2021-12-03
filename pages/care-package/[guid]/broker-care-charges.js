import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dateToIsoString, getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import {
  Button,
  Container,
  DynamicBreadcrumbs,
  HorizontalSeparator,
  Loading,
  TitleSubtitleHeader,
  VerticalSeparator,
} from 'components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  createProvisionalCareCharge,
  updateCareChargeBrokerage,
  usePackageCalculatedCost,
  useProvisionalCareCharges,
} from 'api';
import withSession from 'lib/session';
import { getCarePackageReviewRoute, getFundedNursingCareRoute } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { getFormData } from 'service/getFormData';
import { formValidationSchema } from 'service/formValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  CareChargeCost,
  CareChargeSchedule,
  ClaimsCollector,
  FundingPerWeek,
  PreviousCareCharges,
} from 'components/Pages/CarePackages/BrokerCareCharge';

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

const initialValues = {
  cost: null,
  subType: 1,
  claimCollector: 2,
  claimReason: null,
  startDate: null,
  endDate: null,
  isOngoing: false,
  description: null,
  assessmentFileId: null,
  assessmentFileName: null,
  id: null,
};

const CareCharge = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isRequestBeingSent, setIsRequestBeingSent] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);

  const { guid: carePackageId } = router.query;

  const { isLoading: coreLoading, data: coreInfo } = useRedirectIfPackageNotExist();
  const { serviceUser } = coreInfo;

  const {
    data: { careCharge = {}, hasAssessment },
    isLoading: careChargeLoading
  } = useProvisionalCareCharges(carePackageId);
  const careChargeId = careCharge.id;

  const { data: calculatedCost } = usePackageCalculatedCost(carePackageId, serviceUser?.id);

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(formValidationSchema.carePackageBrokerCareChargesSchema),
    defaultValues: {
      carePackageId,
      ...initialValues,
    },
  });

  useEffect(() => {
    if (calculatedCost) setValue('cost', calculatedCost);
  }, [calculatedCost]);

  const usePreviousCareCharge = () => {
    setIsPrevious(true);

    const {
      id,
      claimReason,
      claimCollector,
      description,
      assessmentFileName,
      assessmentFileId,
      endDate,
      startDate
    } = careCharge;

    setValue('id', id);
    setValue('startDate', startDate);
    setValue('claimCollector', claimCollector);
    if (claimReason) setValue('claimReason', claimReason);
    if (description) setValue('description', description);
    if (assessmentFileName) setValue('assessmentFileName', assessmentFileName);
    if (assessmentFileId) setValue('assessmentFileId', assessmentFileId);
    if (!endDate && startDate) setValue('isOngoing', true);
    if (endDate) setValue('endDate', endDate);
  };

  const useNewCareCharge = () => {
    setIsPrevious(false);
    reset({
      carePackageId,
      ...initialValues,
    });
  };

  const clickBack = () => router.push(getFundedNursingCareRoute(carePackageId));

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
    const omittedData = getValues();
    const formData = getFormData({
      ...omittedData,
      startDate: dateToIsoString(omittedData.startDate),
      endDate: dateToIsoString(!isOngoing && omittedData.endDate),
    });

    try {
      if (omittedData.id || isPrevious) {
        await updateCareChargeBrokerage(carePackageId, omittedData.id, formData);
        pushNotification(`Funded Nursing Care updated successfully`, 'success');
      } else {
        await createProvisionalCareCharge(carePackageId, formData);
        pushNotification(`Funded Nursing Care created successfully`, 'success');
      }
      router.push(getCarePackageReviewRoute(carePackageId));
    } catch (e) {
      pushNotification(e);
    }

    setIsRequestBeingSent(false);
  };

  const collectedBy = watch('claimCollector');
  const isOngoing = watch('isOngoing');
  const cost = watch('cost');

  const isS117Client = coreInfo?.settings?.isS117Client;

  const buttonProps = useMemo(() => {
    if (isS117Client) return { text: 'Continue', onClick: skipPage };
    if (careChargeId) return { text: 'Review', onClick: skipPage };
    return { text: 'Save and continue', type: 'submit', isLoading: isRequestBeingSent };
  }, [isS117Client, careChargeId, isRequestBeingSent]);

  const isDisabled = isS117Client || careChargeId || hasAssessment;

  const skipPage = () => router.push(getCarePackageReviewRoute(carePackageId));

  const isLoading = coreLoading || careChargeLoading || isRequestBeingSent;

  return (
    <>
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Care Charges" title="Build a care package" />
        {careChargeId && !hasAssessment && !isS117Client && (
          <PreviousCareCharges
            careChargeId={careChargeId}
            useNewCareCharge={useNewCareCharge}
            usePreviousCareCharge={usePreviousCareCharge}
          />
        )}
        <Loading isLoading={isLoading} />
        {!careChargeLoading && !coreLoading && (
          <form onSubmit={handleSubmit(updatePackage)}>
            <CareChargeCost
              control={control}
              errors={errors}
              isS117Client={isS117Client}
              isDisabled={isDisabled}
            />
            <CareChargeSchedule control={control} errors={errors} isOngoing={isOngoing} isS117Client={isDisabled} />
            <ClaimsCollector control={control} errors={errors} collectedBy={collectedBy} isS117Client={isDisabled} />
            <HorizontalSeparator height="48px" />
            <FundingPerWeek total={cost} isS117Client={isDisabled} />
            <HorizontalSeparator height="48px" />
            <Container display="flex">
              <Button onClick={clickBack} secondary color="gray">
                Back
              </Button>
              <VerticalSeparator width="10px" />
              <VerticalSeparator width="10px" />
              <Button
                type={buttonProps.type || 'button'}
                onClick={buttonProps.onClick}
                isLoading={buttonProps.isLoading}
              >
                {buttonProps.text}
              </Button>
            </Container>
          </form>
        )}
      </Container>
    </>
  );
};

export default CareCharge;
