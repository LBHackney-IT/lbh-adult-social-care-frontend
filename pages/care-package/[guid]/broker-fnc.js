import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  dateToIsoString,
  getFormDataWithFile,
  getLoggedInUser,
  useGetFile,
} from 'service';
import {
  Button,
  Container,
  DynamicBreadcrumbs,
  HorizontalSeparator,
  Loading,
  TitleSubtitleHeader,
  UploadFile,
  VerticalSeparator,
} from 'components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  createCarePackageReclaimFnc,
  updateCarePackageReclaimFnc,
  usePackageActiveFncPrice,
  usePackageDetails,
  usePackageFnc
} from 'api';
import withSession from 'lib/session';
import { getBrokerPackageRoute, getCareChargesRoute } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { formValidationSchema } from 'service/formValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  ClaimsCollector,
  FundingPerWeek,
  NursingCareNotes,
  NursingSchedule,
} from 'components/Pages/CarePackages/FundedNusringCare';

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

const BrokerFNC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { guid: carePackageId } = router.query;

  const [isRequestBeingSent, setIsRequestBeingSent] = useState(false);
  const { data: details, isLoading: detailsLoading } = usePackageDetails(carePackageId);

  const { data: fncData, isLoading: fncLoading } = usePackageFnc(carePackageId);
  const { data: activeFncPrice } = usePackageActiveFncPrice(carePackageId);

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
      id: null,
      cost: null,
      claimCollector: 0,
      startDate: null,
      endDate: null,
      description: null,
      assessmentFileName: null,
      assessmentFileId: null,
      assessmentFile: null,
      isOngoing: false,
    },
  });

  const [cost, isOngoing, startDate] = watch(['cost', 'isOngoing', 'startDate']);

  const { isLoading: fileLoading } = useGetFile({
    fileId: fncData.assessmentFileId,
    fileName: fncData.assessmentFileName,
    setter: (file) => setValue('assessmentFile', file)
  });

  const isLoading = fncLoading || fileLoading || isRequestBeingSent || detailsLoading;

  useEffect(() => {
    if (activeFncPrice) {
      setValue('cost', activeFncPrice);
    }
  }, [activeFncPrice]);

  useEffect(() => {
    if (!fncData.startDate) return;

    setValue('startDate', fncData.startDate);
    setValue('claimCollector', fncData.claimCollector);
    if (fncData.id) setValue('id', fncData.id);
    if (fncData.description) setValue('description', fncData.description);
    if (fncData.assessmentFileName) setValue('assessmentFileName', fncData.assessmentFileName);
    if (fncData.assessmentFileId) setValue('assessmentFileId', fncData.assessmentFileId);
    if (!fncData.endDate && fncData.startDate) setValue('isOngoing', true);
    if (fncData.endDate) {
      setValue('endDate', fncData.endDate);
      setValue('isOngoing', false);
    }
  }, [fncLoading]);

  const clickBack = () => router.push(getBrokerPackageRoute(carePackageId));
  const skip = () => router.push(getCareChargesRoute(carePackageId));

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const updatePackage = async (data = {}) => {
    if (isDirty) {
      handleFormSubmission(data);
    } else {
      router.push(getCareChargesRoute(carePackageId));
    }
  };

  const handleFormSubmission = async () => {
    setIsRequestBeingSent(true);
    const omittedData = getValues();

    omittedData.endDate = !isOngoing ? dateToIsoString(omittedData.endDate) : null;
    omittedData.startDate = dateToIsoString(omittedData.startDate);

    const formData = getFormDataWithFile(omittedData);

    try {
      if (omittedData.id) {
        await updateCarePackageReclaimFnc(carePackageId, formData);
        pushNotification(`Funded Nursing Care updated successfully`, 'success');
      } else {
        await createCarePackageReclaimFnc(carePackageId, formData);
        pushNotification(`Funded Nursing Care created successfully`, 'success');
      }
      router.push(getCareChargesRoute(carePackageId));
    } catch (e) {
      pushNotification(e);
    }
    setIsRequestBeingSent(false);
  };

  return (
    <>
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Funded Nursing Care" title="Build a care package" />
        <Loading isLoading={isLoading} />
        {!fncLoading && (
          <form onSubmit={handleSubmit(updatePackage)}>
            <ClaimsCollector errors={errors} control={control} />
            <NursingSchedule
              startDate={startDate}
              minStartDate={details.startDate}
              errors={errors}
              control={control}
              isOngoing={isOngoing}
            />
            <NursingCareNotes errors={errors} control={control} />
            <HorizontalSeparator height={32} />
            <UploadFile title="Upload FNC Assessment..." control={control} />
            <HorizontalSeparator height="48px" />
            <FundingPerWeek total={cost} />
            <HorizontalSeparator height="48px" />
            <Container display="flex">
              <Button onClick={clickBack} secondary color="gray">
                Back
              </Button>
              <VerticalSeparator width="10px" />
              <Button onClick={skip} className="secondary-yellow">
                Skip and continue
              </Button>
              <VerticalSeparator width="10px" />
              <Button isLoading={isLoading} type="submit">
                Save and continue
              </Button>
            </Container>
          </form>
        )}
      </Container>
    </>
  );
};

export default BrokerFNC;
