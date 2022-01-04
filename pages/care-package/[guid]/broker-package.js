import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import {
  Button,
  DynamicBreadcrumbs,
  Container,
  Loading,
  TitleSubtitleHeader,
  HorizontalSeparator,
  VerticalSeparator,
} from 'components';
import { useRouter } from 'next/router';
import { addNotification } from 'reducers/notificationsReducer';
import { useDispatch } from 'react-redux';
import { getCareChargesRoute, getCorePackageRoute, getFundedNursingCareRoute } from 'routes/RouteConstants';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { updateCarePackageCosts, usePackageDetails } from 'api';
import withSession from 'lib/session';
import ResetApprovedPackageDialog from 'components/Pages/CarePackages/ResetApprovedPackageDialog';
import { formValidationSchema } from 'service/formValidationSchema';
import omit from 'lodash.omit';
import { packageTypes } from 'constants/variables';
import {
  BrokerPackageDateSelection,
  AdditionalNeeds,
  CoreWeeklyCost,
  SupplierSelection,
} from 'components/Pages/CarePackages/BrokerPackage/index';
import NewAdditionalNeedModal from 'components/Pages/CarePackages/BrokerPackage/NewAdditionalNeedModal/NewAdditionalNeedModal';
import { NewHeader } from 'components/NewHeader';
import { handleRoleBasedAccess } from '../../api/handleRoleBasedAccess';
import { accessRoutes } from '../../api/accessMatrix';

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
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.CARE_PACKAGE_BROKER_PACKAGE)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

const BrokerPackage = ({ roles }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isRequestBeingSent, setIsRequestBeingSent] = useState(false);
  const [packageStatus, setPackageStatus] = useState();
  const [packageType, setPackageType] = useState();
  const [isAddingNew, setIsAddingNew] = useState(false);

  const { guid: packageId } = router.query;
  const { data: detailsData, isLoading: packageDetailsLoading } = usePackageDetails(packageId);

  const { isLoading: coreLoading, data: packageInfo } = useRedirectIfPackageNotExist();

  const isLoading = coreLoading || packageDetailsLoading;

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { isDirty, errors },
  } = useForm({
    resolver: yupResolver(formValidationSchema.carePackageBrokerPackageSchema),
    defaultValues: {
      isOngoing: false,
      endDate: null,
      startDate: null,
      supplierId: null,
      coreCost: null,
      details: null,
    },
  });

  const isOngoing = watch('isOngoing');
  const supplierId = watch('supplierId');
  const coreCost = watch('coreCost');
  const weeklyNeeds = watch('details');

  useEffect(() => {
    if (detailsData) {
      setValue('startDate', detailsData.startDate);
      setValue('supplierId', detailsData.supplierId);
      setValue('coreCost', detailsData.coreCost);
      setValue('details', detailsData.details);
      if (!detailsData.endDate && detailsData.startDate) setValue('isOngoing', true);
      if (detailsData.endDate) {
        setValue('endDate', detailsData.endDate);
        setValue('isOngoing', false);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (packageInfo) {
      setPackageStatus(packageInfo.status);
      setPackageType(packageInfo.packageType);
    }
  }, [packageInfo]);

  const updatePackage = async () => {
    if (isDirty) {
      if (packageStatus && parseInt(packageStatus, 10) === 3) {
        setDialogOpen(true);
      } else {
        handleFormSubmission();
      }
    } else {
      router.push(
        packageType === packageTypes.nursing ? getFundedNursingCareRoute(packageId) : getCareChargesRoute(packageId)
      );
    }
  };

  const handleFormSubmission = async () => {
    const data = getValues();
    const { details } = data;
    const newDetails = details?.map((detail) => (detail.isNew ? omit(detail, ['id', 'isNew']) : detail)) ?? [];
    const newData = {
      ...data,
      details: newDetails,
      startDate: new Date(data.startDate).toISOString(),
      endDate: data.endDate && !data.isOngoing ? new Date(data.endDate).toISOString() : null,
    };
    setIsRequestBeingSent(true);
    try {
      await updateCarePackageCosts({
        data: newData,
        packageId,
      });
      router.push(
        packageType === packageTypes.nursing ? getFundedNursingCareRoute(packageId) : getCareChargesRoute(packageId)
      );
      dispatch(addNotification({ text: 'Package saved.', className: 'success' }));
    } catch (error) {
      dispatch(addNotification({ text: error, className: 'error' }));
    }
    setIsRequestBeingSent(false);
  };

  const updateDetails = (newDetail) => {
    const formattedDetail = {
      ...newDetail,
      startDate: new Date(newDetail.startDate).toISOString(),
      endDate: newDetail.endDate && !newDetail.isOngoing ? new Date(newDetail.endDate).toISOString() : null,
    };
    if (weeklyNeeds) {
      setValue('details', [...weeklyNeeds, formattedDetail], { shouldDirty: true });
    } else {
      setValue('details', [formattedDetail]);
    }
  };

  const clickBack = () => router.push(getCorePackageRoute(packageId));
  return (
    <>
      <NewHeader roles={roles ?? []} />
      <ResetApprovedPackageDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        handleConfirmation={handleFormSubmission}
      />
      <NewAdditionalNeedModal
        isOpen={isAddingNew}
        onClose={() => setIsAddingNew(false)}
        handleConfirmation={updateDetails}
      />
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Broker Package" title="Build a care package" />
        <form onSubmit={handleSubmit(updatePackage)}>
          <Loading className="loading" isLoading={isLoading} />
          {!isLoading && (
            <>
              <BrokerPackageDateSelection control={control} isOngoing={isOngoing} errors={errors} />
              <SupplierSelection setValue={setValue} supplierId={supplierId} errors={errors} />
              <CoreWeeklyCost control={control} coreCost={coreCost ?? 0} errors={errors} />
              <HorizontalSeparator height="48px" />
              <AdditionalNeeds
                control={control}
                weeklyNeeds={weeklyNeeds}
                setValue={setValue}
                isAddingNew={isAddingNew}
                setIsAddingNew={setIsAddingNew}
              />
              <HorizontalSeparator height="48px" />
              <Container display="flex">
                <Button onClick={clickBack} secondary color="gray">
                  Back
                </Button>
                <VerticalSeparator width="10px" />
                <Button isLoading={isRequestBeingSent} disabled={isLoading} type="submit">
                  Save and continue
                </Button>
              </Container>
            </>
          )}
        </form>
      </Container>
    </>
  );
};

export default BrokerPackage;
