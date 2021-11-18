import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { updateCoreCarePackage, usePackageSchedulingOptions, useSingleCorePackageInfo } from 'api';
import withSession from 'lib/session';
import ResetApprovedPackageDialog from 'components/Pages/CarePackages/ResetApprovedPackageDialog';

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
  const { guid: packageId } = router.query;
  const [loading, setLoading] = useState(false);
  const { data: packageInfo, singleCoreLoading } = useSingleCorePackageInfo(packageId);
  const { settings } = packageInfo;
  const { data: schedulingOptionsData = [], schedulingOptionsLoading } = usePackageSchedulingOptions();

  const coreLoading = useRedirectIfPackageNotExist();

  const schedulingOptions = useMemo(
    () =>
      schedulingOptionsData.map(({ id, optionName, optionPeriod }) => ({
        id,
        label: `${optionName} (${optionPeriod})`,
      })),
    [schedulingOptionsData]
  );

  const schema = yup.object().shape({
    packageType: yup
      .number()
      .typeError('Please select a package type')
      .required()
      .min(1, 'Please select a package type'),
    primarySupportReasonId: yup
      .number()
      .typeError('Please select a primary support reason')
      .required()
      .min(1, 'Please select a primary support reason'),
    packageScheduling: yup.number().required().min(1, 'Please select a package scheduling option'),
  });

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
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
    },
  });
  const onSubmit = (data) => updatePackage(data);

  useEffect(() => {
    if (packageInfo) {
      setValue('packageType', packageInfo.packageType, 10);
      setValue('primarySupportReasonId', packageInfo.primarySupportReasonId);
      setValue('packageScheduling', packageInfo.packageScheduling);
      setPackageStatus(packageInfo.status);
    }
  }, [packageInfo]);

  const [packageStatus, setPackageStatus] = useState();

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
    setLoading(true);
    try {
      const { id } = await updateCoreCarePackage({ data, packageId });
      router.push(getBrokerPackageRoute(id));
      dispatch(addNotification({ text: 'Package saved.', className: 'success' }));
    } catch (error) {
      dispatch(addNotification({ text: error, className: 'error' }));
    }
    setLoading(false);
  };

  const isLoading = loading || singleCoreLoading || schedulingOptionsLoading || coreLoading;

  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <ResetApprovedPackageDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        handleConfirmation={handleFormSubmission}
      />
      <DynamicBreadcrumbs />
      <Loading isLoading={isLoading} />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Core package details" title="Build a care package" />
        {packageInfo.serviceUser && (
          <ServiceUserDetails
            serviceUserName={packageInfo.serviceUser.fullName}
            hackneyId={packageInfo.serviceUser.hackneyId}
            dateOfBirth={packageInfo.serviceUser.dateOfBirth}
            address={packageInfo.serviceUser.postCode}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <PackageType errors={errors} control={control} />
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
          <HorizontalSeparator height="20px" />
          <Button isLoading={isLoading} disabled={isLoading} type="submit">
            Save and continue
          </Button>
        </form>
      </Container>
    </>
  );
};

export default CorePackage;
