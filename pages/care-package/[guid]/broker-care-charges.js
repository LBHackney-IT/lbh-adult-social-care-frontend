import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getLoggedInUser, removeEmpty, useNotifications, useRedirectIfPackageNotExist } from 'service';
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
import {
  createCareChargeReclaim,
  updateCareChargeBrokerage,
  usePackageCalculatedCost,
  usePackageCareCharge,
} from 'api';
import withSession from 'lib/session';
import { getCarePackageReviewRoute, getFundedNursingCareRoute } from 'routes/RouteConstants';
import { getFormData } from 'service/getFormData';
import { formValidationSchema } from 'service/formValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { reclaimType } from 'constants/variables';
import {
  CareChargeCost,
  CareChargeSchedule,
  ClaimsCollector,
  FundingPerWeek,
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

const CareCharge = () => {
  const router = useRouter();

  const pushNotification = useNotifications();

  const [isRequestBeingSent, setIsRequestBeingSent] = useState(false);

  const { guid: carePackageId } = router.query;

  const { data: careChargeData, isLoading: careChargeLoading } = usePackageCareCharge(
    carePackageId,
    reclaimType.careCharge
  );

  const { data: packageInfo, isLoading: coreLoading } = useRedirectIfPackageNotExist();
  const { serviceUser } = packageInfo;
  const {
    data: calculatedCost,
    isLoading: calculatedCostLoading
  } = usePackageCalculatedCost(carePackageId, serviceUser?.id);

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(formValidationSchema.carePackageBrokerCareChargesSchema),
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

  const clickBack = () => router.push(getFundedNursingCareRoute(carePackageId));

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

    try {
      if (data.id) {
        await updateCareChargeBrokerage(carePackageId, data.id, data);
        pushNotification(`Funded Nursing Care updated successfully`, 'success');
      } else {
        await createCareChargeReclaim(carePackageId, formData);
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

  const isLoading = coreLoading || calculatedCostLoading || careChargeLoading || isRequestBeingSent;
  const isS117Client = packageInfo?.settings?.isS117Client;
  const skipPage = () => router.push(getCarePackageReviewRoute(carePackageId));
  return (
    <>
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Care Charges" title="Build a care package" />
        <Loading isLoading={isLoading} />
        {!careChargeLoading && (
          <form onSubmit={handleSubmit(updatePackage)}>
            <CareChargeCost control={control} errors={errors} isS117Client={isS117Client} />
            <CareChargeSchedule control={control} errors={errors} isOngoing={isOngoing} isS117Client={isS117Client} />
            <ClaimsCollector control={control} errors={errors} collectedBy={collectedBy} isS117Client={isS117Client} />
            <HorizontalSeparator height="48px" />
            <FundingPerWeek total={cost} isS117Client={isS117Client} />
            <HorizontalSeparator height="48px" />
            <Container display="flex">
              <Button onClick={clickBack} secondary color="gray">
                Back
              </Button>
              <VerticalSeparator width="10px" />
              <VerticalSeparator width="10px" />
              {isS117Client ? (
                <Button type="button" onClick={skipPage}>
                  Continue
                </Button>
              ) : (
                <Button isLoading={isLoading} type="submit">
                  Save and continue
                </Button>
              )}
            </Container>
          </form>
        )}
      </Container>
    </>
  );
};

export default CareCharge;
