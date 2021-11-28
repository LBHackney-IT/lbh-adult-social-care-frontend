import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getLoggedInUser, getNumberWithCommas } from 'service';
import {
  Button,
  DynamicBreadcrumbs,
  Container,
  Loading,
  TitleSubtitleHeader,
  Select,
  FormGroup,
  Textarea,
  VerticalSeparator,
  Hint,
  HorizontalSeparator,
  Heading,
} from 'components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { updateCarePackageReclaimFnc, usePackageActiveFncPrice, usePackageFnc } from 'api';
import withSession from 'lib/session';
import { NursingSchedule } from 'components/Pages/CarePackages/FundedNusringCare2/NursingSchedule';
import { getBrokerPackageRoute, getCareChargesRoute } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { getFormData } from 'service/getFormData';
import { formValidationSchema } from 'service/formValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

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

  const [isRequestBeingSent, setIsRequestBeingSent] = useState(false);

  const { guid: carePackageId } = router.query;
  const { data: fncData, isLoading: fncLoading } = usePackageFnc(carePackageId);
  const { data: activeFncPrice } = usePackageActiveFncPrice(carePackageId);

  const collectedOptions = [
    { text: 'Supplier', value: '1' },
    { text: 'Hackney', value: '2' },
  ];

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
      isOngoing: false,
    },
  });

  const cost = watch('cost');
  const isOngoing = watch('isOngoing');

  useEffect(() => {
    if (activeFncPrice) {
      setValue('cost', activeFncPrice);
    }
  }, [activeFncPrice]);

  useEffect(() => {
    if (fncData) {
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
        <TitleSubtitleHeader subTitle="Funded Nursing Care" title="Build a care package" />
        <Loading isLoading={fncLoading} />
        {!fncLoading && (
          <form onSubmit={handleSubmit(updatePackage)}>
            <Container className="brokerage__container">
              <FormGroup label="Claims are collected by" error={errors.claimCollector?.message}>
                <Controller
                  name="claimCollector"
                  control={control}
                  render={({ field }) => <Select options={collectedOptions} {...field} />}
                />
              </FormGroup>
            </Container>
            <NursingSchedule errors={errors} control={control} isOngoing={isOngoing} />
            <Container>
              <FormGroup label="Funded Nursing Care notes" error={errors.description?.message}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <Textarea value={field.value} handler={field.onChange} {...field} />}
                />
              </FormGroup>
            </Container>
            <HorizontalSeparator height="48px" />
            <Container
              borderTop="1px solid #bfc1c3"
              borderBottom="1px solid #bfc1c3"
              display="flex"
              flexDirection="column"
              justifyContent="stretch"
            >
              <Container
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderBottom="1px solid #bfc1c3"
                padding="30px 0"
              >
                <Heading size="l">Funding per week</Heading>
                <Heading size="l">£{getNumberWithCommas(cost)}</Heading>
              </Container>
            </Container>
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

export default BrokerFNC;
