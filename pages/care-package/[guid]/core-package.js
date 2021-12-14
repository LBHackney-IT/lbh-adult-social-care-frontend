import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getFormDataWithFile, getLoggedInUser } from 'service';
import {
  Button,
  DynamicBreadcrumbs,
  Container,
  FurtherDetails,
  HorizontalSeparator,
  Loading,
  PackageType,
  RadioGroup,
  ServiceUserDetails,
  TitleSubtitleHeader,
} from 'components';
import { useRouter } from 'next/router';
import { addNotification } from 'reducers/notificationsReducer';
import { useDispatch } from 'react-redux';
import { getBrokerPackageRoute } from 'routes/RouteConstants';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { updateCoreCarePackage, usePackageSchedulingOptions, useSingleCorePackageInfo } from 'api';
import withSession from 'lib/session';
import ResetApprovedPackageDialog from 'components/Pages/CarePackages/ResetApprovedPackageDialog';
import { formValidationSchema } from 'service/formValidationSchema';
import UploadFile from 'components/UploadFile';

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

const CorePackage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isRequestBeingSent, setIsRequestBeingSent] = useState(false);
  const [packageStatus, setPackageStatus] = useState();

  const { guid: packageId } = router.query;
  const { data: packageInfo, isLoading: singleCoreLoading } = useSingleCorePackageInfo(packageId);
  const { settings } = packageInfo;
  const { data: schedulingOptionsData = [] } = usePackageSchedulingOptions();

  const schedulingOptions = useMemo(
    () =>
      schedulingOptionsData.map(({ id, optionName, optionPeriod }) => ({
        id,
        label: `${optionName} (${optionPeriod})`,
      })),
    [schedulingOptionsData]
  );

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(formValidationSchema.carePackageCorePackageSchema),
    defaultValues: {
      carePackageId: packageId,
      packageType: 0,
      primarySupportReasonId: 0,
      packageScheduling: 0,
      hasRespiteCare: false,
      hospitalAvoidance: false,
      hasDischargePackage: false,
      isReEnablement: false,
      isS117Client: false,
      socialWorkerCarePlanFileName: null,
      socialWorkerCarePlanFileId: null,
      file: null,
    },
  });
  const onSubmit = (data) => updatePackage(data);

  useEffect(() => {
    if (packageInfo) {
      setValue('packageType', packageInfo.packageType, 10);
      setValue('primarySupportReasonId', packageInfo.primarySupportReasonId);
      setValue('packageScheduling', packageInfo.packageScheduling);
      if (packageInfo.assessmentFileId && packageInfo.assessmentFileName) {
        const { assessmentFileId, assessmentFileName } = packageInfo;
        setValue('socialWorkerCarePlanFileId', assessmentFileId);
        setValue('socialWorkerCarePlanFileName', assessmentFileName);
      }
      setPackageStatus(packageInfo.status);
    }
  }, [packageInfo]);

  const updatePackage = async (data = {}) => {
    if (isDirty) {
      if (packageStatus && parseInt(packageStatus, 10) === 3) {
        setDialogOpen(true);
      } else {
        handleFormSubmission(data);
      }
    } else {
      router.push(getBrokerPackageRoute(packageId));
    }
  };

  const handleFormSubmission = async () => {
    const data = getValues();
    setIsRequestBeingSent(true);
    try {
      const formData = getFormDataWithFile(data, {
        file: 'file',
        fileId: 'socialWorkerCarePlanFileId',
        fileName: 'socialWorkerCarePlanFileName'
      });
      const { id } = await updateCoreCarePackage({ data: formData, packageId });
      router.push(getBrokerPackageRoute(id));
      dispatch(addNotification({ text: 'Package saved.', className: 'success' }));
    } catch (error) {
      dispatch(addNotification({ text: error, className: 'error' }));
    }
    setIsRequestBeingSent(false);
  };

  return (
    <>
      <ResetApprovedPackageDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        handleConfirmation={handleFormSubmission}
      />
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Core Details" title="Build a care package" />
        <Loading isLoading={singleCoreLoading} className="loading" />
        {!singleCoreLoading && (
          <>
            {packageInfo.serviceUser && (
              <ServiceUserDetails
                serviceUserName={packageInfo.serviceUser.fullName}
                hackneyId={packageInfo.serviceUser.hackneyId}
                dateOfBirth={packageInfo.serviceUser.dateOfBirth}
                address={packageInfo.serviceUser.postCode}
              />
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <PackageType errors={errors} control={control} packageStatus={packageStatus} />
              <Container className="brokerage__container">
                <Controller
                  name="packageScheduling"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      name="packageScheduling"
                      error={errors.packageScheduling?.message}
                      label="Packaging scheduling"
                      handle={field.onChange}
                      items={schedulingOptions}
                      {...field}
                    />
                  )}
                />
              </Container>
              <FurtherDetails settings={settings} control={control} setValue={setValue} />
              <UploadFile name='file' control={control} title='Upload social worker care plan' />
              <HorizontalSeparator height="20px" />
              <Button isLoading={isRequestBeingSent} disabled={isRequestBeingSent} type="submit">
                Save and continue
              </Button>
            </form>
          </>
        )}
      </Container>
    </>
  );
};

export default CorePackage;
