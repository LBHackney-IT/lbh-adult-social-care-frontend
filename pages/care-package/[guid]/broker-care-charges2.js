import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getLoggedInUser } from 'service';
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
} from 'components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  updateCarePackageReclaimFnc,
  usePackageActiveFncPrice,
  usePackageCalculatedCost,
  usePackageCareCharge,
  usePackageFnc,
  useSingleCorePackageInfo,
} from 'api';
import withSession from 'lib/session';
import { getBrokerPackageRoute, getCareChargesRoute } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { getFormData } from 'service/getFormData';
import { formValidationSchema } from 'service/formValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { reclaimType } from 'constants/variables';

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
      cost: null,
      claimCollector: 2,
    },
  });

  useEffect(() => {
    if (calculatedCost) setValue('cost', calculatedCost);
  }, [calculatedCost]);
  // useEffect(() => {
  //   if (fncData) {
  //     setValue('startDate', fncData.startDate);
  //     setValue('claimCollector', fncData.claimCollector);
  //     if (fncData.id) setValue('id', fncData.id);
  //     if (fncData.description) setValue('description', fncData.description);
  //     if (fncData.assessmentFileName) setValue('assessmentFileName', fncData.assessmentFileName);
  //     if (fncData.assessmentFileId) setValue('assessmentFileId', fncData.assessmentFileId);
  //     if (!fncData.endDate && fncData.startDate) setValue('isOngoing', true);
  //     if (fncData.endDate) {
  //       setValue('endDate', fncData.endDate);
  //       setValue('isOngoing', false);
  //     }
  //   }
  // }, [fncLoading]);

  const clickBack = () => router.push(getBrokerPackageRoute(carePackageId));

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
    const data = getValues();
    const formData = getFormData({
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: data.endDate && !data.isOngoing ? new Date(data.endDate).toISOString() : null,
    });
    try {
      await updateCarePackageReclaimFnc(carePackageId, formData);
      pushNotification(`Funded Nursing Care updated successfully`, 'success');
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
        <TitleSubtitleHeader subTitle="Care Charges" title="Build a care package" />
        <Loading isLoading={careChargeLoading} />
        {!careChargeLoading && (
          <form onSubmit={handleSubmit(updatePackage)}>
            <Container className="brokerage__container">
              <Hint>Provisional care charge (pre-assessement)</Hint>
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
