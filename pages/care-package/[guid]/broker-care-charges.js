import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dateToIsoString, getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import {
  Announcement,
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
  claimReason: '',
  startDate: null,
  endDate: null,
  isOngoing: false,
  description: '',
  assessmentFileId: null,
  assessmentFileName: null,
  id: null,
};

const CareCharge = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isRequestBeingSent, setIsRequestBeingSent] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [showPreviousAnnouncement, setShowPreviousAnnouncement] = useState(false);

  const { guid: carePackageId } = router.query;

  const { isLoading: coreLoading, data: coreInfo } = useRedirectIfPackageNotExist();
  const { serviceUser } = coreInfo;

  const { data: careCharge, isLoading: careChargeLoading } = useProvisionalCareCharges(carePackageId);

  const {
    id: careChargeId,
    claimReason,
    claimCollector,
    description,
    assessmentFileName,
    assessmentFileId,
    endDate,
    subType,
    startDate,
    hasAssessmentBeenCarried
  } = careCharge;

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

  useEffect(() => {
    getPreviousCareCharge();
  }, [careCharge]);

  const getPreviousCareCharge = () => {
    setIsPrevious(true);

    if (careChargeId && !hasAssessmentBeenCarried) setIsPrevious(true);

    setValue('id', careChargeId);
    setValue('startDate', startDate && new Date(startDate));
    setValue('claimCollector', claimCollector);
    setValue('subType', subType);
    if (claimReason) setValue('claimReason', claimReason);
    if (description) setValue('description', description);
    if (assessmentFileName) setValue('assessmentFileName', assessmentFileName);
    if (assessmentFileId) setValue('assessmentFileId', assessmentFileId);
    if (!endDate && startDate) setValue('isOngoing', true);
    if (endDate) {
      setValue('isOngoing', false);
      setValue('endDate', endDate && new Date(endDate));
    }
  };

  const useNewCareCharge = () => {
    setIsPrevious(false);
    reset({
      carePackageId,
      ...initialValues,
      cost: calculatedCost,
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
    const formattedData = {
      ...omittedData,
      startDate: dateToIsoString(omittedData.startDate),
      endDate: dateToIsoString(!isOngoing && omittedData.endDate),
    };

    try {
      if (omittedData.id || isPrevious) {
        await updateCareChargeBrokerage(carePackageId, omittedData.id, formattedData);
        pushNotification(`Funded Nursing Care updated successfully`, 'success');
      } else {
        await createProvisionalCareCharge(carePackageId, {
          carePackageId,
          claimCollector: omittedData.claimCollector,
          claimReason: omittedData.claimReason,
          description: omittedData.description,
          cost: omittedData.cost,
          startDate: dateToIsoString(omittedData.startDate),
          endDate: dateToIsoString(!isOngoing && omittedData.endDate),
          subType: omittedData.subType,
        });
        pushNotification(`Funded Nursing Care created successfully`, 'success');
      }
      router.push(getCarePackageReviewRoute(carePackageId));
    } catch (e) {
      pushNotification(e);
    }

    setIsRequestBeingSent(false);
  };

  const collectedBy = watch('claimCollector');
  const formStartDate = watch('startDate');
  const isOngoing = watch('isOngoing');
  const cost = watch('cost');

  const isS117Client = coreInfo?.settings?.isS117Client;

  const isDisabled = isS117Client || hasAssessmentBeenCarried;

  const skipPage = () => router.push(getCarePackageReviewRoute(carePackageId));

  const isLoading = coreLoading || careChargeLoading || isRequestBeingSent;

  const isNewCareCharge = !(isS117Client || hasAssessmentBeenCarried);

  return (
    <>
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Care Charges" title="Build a care package" />
        <HorizontalSeparator height={20} />
        {showPreviousAnnouncement && (
          <PreviousCareCharges
            careChargeId={careChargeId}
            useNewCareCharge={useNewCareCharge}
            usePreviousCareCharge={getPreviousCareCharge}
          />
        )}
        {hasAssessmentBeenCarried && (
          <>
            <Announcement className="warning" title="Care charge assessment for this package already done.">
              <p>Manage care charges for this package in the Care Charges menu</p>
            </Announcement>
            <HorizontalSeparator height={32} />
          </>
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
            <CareChargeSchedule
              startDate={formStartDate}
              control={control}
              errors={errors}
              isOngoing={isOngoing}
              isS117Client={isDisabled}
            />
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
              {!isNewCareCharge && (
                <Button onClick={skipPage} type="button">
                  {isS117Client ? 'Continue' : 'Review'}
                </Button>
              )}
              {isNewCareCharge && <Button type='submit'>Save and continue</Button>}
            </Container>
          </form>
        )}
      </Container>
    </>
  );
};

export default CareCharge;
