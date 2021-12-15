import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dateToIsoString, formatDate, getLoggedInUser, usePushNotification } from 'service';
import {
  Button,
  Container,
  DynamicBreadcrumbs,
  Hint,
  HorizontalSeparator,
  InsetText,
  Loading,
  TitleSubtitleHeader,
  VerticalSeparator,
} from 'components';
import { useRouter } from 'next/router';
import { updateCareChargeReclaim, useAssessmentCareCharges, usePackageDetails } from 'api';
import withSession from 'lib/session';
import { ProvisionalCareCharge } from 'components/Pages/CarePackages/CareCharge/ProvisionalCareCharge';
import { CareCharge12 } from 'components/Pages/CarePackages/CareCharge/CareCharge12';
import { CareCharge13 } from 'components/Pages/CarePackages/CareCharge/CareCharge13';
import { formValidationSchema } from 'service/formValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { CARE_CHARGES_ROUTE } from 'routes/RouteConstants';

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

const defaultValues = {
  carePackageId: null,
  cost: null,
  subType: null,
  claimCollector: null,
  claimReason: 0,
  startDate: null,
  endDate: null,
  isOngoing: null,
  description: '',
  id: null,
  checkValidation: false,
};

const CareCharge = () => {
  const router = useRouter();
  const pushNotification = usePushNotification();
  const { guid: carePackageId } = router.query;

  const {
    data: { careCharges },
    isLoading: careChargeLoading,
    mutate,
  } = useAssessmentCareCharges(carePackageId);

  const { data: details } = usePackageDetails(carePackageId);
  const packageStartDate = details?.startDate;
  const packageEndDate = details?.endDate;

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    resetField,
    getValues,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValidationSchema.careChargeAssessmentSchema),
    defaultValues: {
      packageStart: packageStartDate,
      packageEnd: packageEndDate,
      provisional: defaultValues,
      residential12: defaultValues,
      residential13: defaultValues,
    },
  });

  const [provisionalOriginalValues, setProvisionalOriginalValues] = useState();
  const [residential12OriginalValues, setResidential12OriginalValues] = useState();
  const [residential13OriginalValues, setResidential13OriginalValues] = useState();

  useEffect(() => {
    if (careCharges && careCharges.length > 0) {
      const provisional = careCharges.find((careCharge) => careCharge.subType === 1);
      const residential12 = careCharges.find((careCharge) => careCharge.subType === 2);
      const residential13 = careCharges.find((careCharge) => careCharge.subType === 3);
      if (provisional) setProvisionalOriginalValues({ ...provisional });
      if (residential12) setResidential12OriginalValues(residential12);
      if (residential13) setResidential13OriginalValues(residential13);

      reset({
        provisional: { ...provisional, isOngoing: !provisional?.endDate, subType: 1, carePackageId },
        residential12: { ...residential12, isOngoing: !residential12?.endDate, subType: 2, carePackageId },
        residential13: { ...residential13, isOngoing: !residential13?.endDate, subType: 3, carePackageId },
      });
    } else {
      reset({
        provisional: { ...defaultValues, subType: 1, carePackageId },
        residential12: { ...defaultValues, subType: 2, carePackageId },
        residential13: { ...defaultValues, subType: 3, carePackageId },
      });
    }
  }, [careCharges]);

  useEffect(() => {
    if (details) {
      setValue('packageStart', details?.startDate);
      setValue('packageEnd', details?.endDate ?? null);
    }
  }, [details]);

  const onSubmit = async (data) => {
    const cc = [];
    if (data?.provisional?.startDate) {
      const formatted = {
        ...data.provisional,
        startDate: dateToIsoString(data?.provisional?.startDate),
        endDate:
          data?.provisional?.endDate && !data?.provisional?.isOngoing
            ? dateToIsoString(data?.provisional?.endDate)
            : null,
        description: data?.provisional?.claimCollector === 1 ? null : data?.provisional?.description,
        claimReason: data?.provisional?.claimCollector === 1 ? null : data?.provisional?.claimReason,
      };
      cc.push({ ...formatted });
    }
    if (data?.residential12?.startDate) {
      const formatted = {
        ...data.residential12,
        startDate: dateToIsoString(data?.residential12?.startDate),
        endDate: dateToIsoString(data?.residential12?.endDate),
        description: data?.residential12?.claimCollector === 1 ? null : data?.residential12?.description,
        claimReason: data?.residential12?.claimCollector === 1 ? null : data?.residential12?.claimReason,
      };
      cc.push({ ...formatted });
    }
    if (data?.residential13?.startDate) {
      const formatted = {
        ...data.residential13,
        startDate: dateToIsoString(data?.residential13?.startDate),
        endDate:
          data?.residential13?.endDate && !data?.residential13?.isOngoing
            ? dateToIsoString(data?.residential13?.endDate)
            : null,
        description: data?.residential13?.claimCollector === 1 ? null : data?.residential13?.description,
        claimReason: data?.residential13?.claimCollector === 1 ? null : data?.residential13?.claimReason,
      };
      cc.push({ ...formatted });
    }

    try {
      await updateCareChargeReclaim(carePackageId, { careCharges: cc });
      pushNotification('Care charges updated', 'success');
      refreshPage();
    } catch (error) {
      pushNotification(error);
    }
  };

  const refreshPage = () => {
    mutate();
    router.reload(window.location.pathname);
  };

  const [showProv, setShowProv] = useState(false);
  const [show12, setShow12] = useState(false);
  const [show13, setShow13] = useState(false);

  const handleBackClick = () => router.push(CARE_CHARGES_ROUTE);

  return (
    <>
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Care Charges" title="Add financial assessment">
          <Hint>{`${formatDate(packageStartDate)} - ${packageEndDate ? formatDate(packageEndDate) : 'Ongoing'}`}</Hint>
        </TitleSubtitleHeader>
        <Loading className="loading" isLoading={careChargeLoading} />
        {!careChargeLoading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {!!provisionalOriginalValues || showProv ? (
              <ProvisionalCareCharge
                carePackageId={carePackageId}
                control={control}
                errors={errors?.provisional}
                getValues={getValues}
                hideForm={() => setShowProv(false)}
                isOpen
                originalValues={provisionalOriginalValues}
                packageStartDate={packageStartDate}
                packageEndDate={packageEndDate}
                refreshPage={refreshPage}
                reset={reset}
                resetField={resetField}
                setValue={setValue}
                watch={watch}
              />
            ) : (
              <>
                <InsetText>No provisional contribution</InsetText>
                <HorizontalSeparator height="30px" />
                <Button onClick={() => setShowProv(true)}>Add provisional</Button>
              </>
            )}
            {!!residential12OriginalValues || show12 ? (
              <CareCharge12
                carePackageId={carePackageId}
                clearErrors={clearErrors}
                control={control}
                errors={errors?.residential12}
                getValues={getValues}
                hideForm={() => setShow12(false)}
                isOpen
                originalValues={residential12OriginalValues}
                packageStartDate={packageStartDate}
                packageEndDate={packageEndDate}
                refreshPage={refreshPage}
                reset={reset}
                resetField={resetField}
                setValue={setValue}
                watch={watch}
              />
            ) : (
              <>
                <HorizontalSeparator height="30px" />
                <InsetText>No residential SU contribution 1-12 weeks</InsetText>
                <HorizontalSeparator height="30px" />
                <Button onClick={() => setShow12(true)}>Add 1-12 weeks</Button>
              </>
            )}
            {!!residential13OriginalValues || show13 ? (
              <CareCharge13
                carePackageId={carePackageId}
                clearErrors={clearErrors}
                control={control}
                errors={errors?.residential13}
                getValues={getValues}
                hideForm={() => setShow13(false)}
                isOpen
                originalValues={residential13OriginalValues}
                packageStartDate={packageStartDate}
                packageEndDate={packageEndDate}
                refreshPage={refreshPage}
                reset={reset}
                resetField={resetField}
                setValue={setValue}
                watch={watch}
              />
            ) : (
              <>
                <HorizontalSeparator height="30px" />
                <InsetText>No residential SU contribution 13+ weeks</InsetText>
                <HorizontalSeparator height="30px" />
                <Button onClick={() => setShow13(true)}>Add 13+ weeks</Button>
              </>
            )}
            <HorizontalSeparator height="48px" />
            <Container display="flex">
              <Button secondary color="gray" onClick={handleBackClick}>
                Back
              </Button>
              <VerticalSeparator width="10px" />
              <Button type="submit">Save and continue</Button>
            </Container>
          </form>
        )}
      </Container>
    </>
  );
};

export default CareCharge;
