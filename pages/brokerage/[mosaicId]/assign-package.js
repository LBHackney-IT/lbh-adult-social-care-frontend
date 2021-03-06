import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Breadcrumbs,
  Button,
  Container,
  FormGroup,
  Heading,
  HorizontalSeparator,
  Loading,
  Select,
  ServiceUserDetails,
  Textarea,
  TitleSubtitleHeader,
  UploadFile,
} from 'components';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { assignToBroker, useBrokers, useLookups, useServiceUser } from 'api';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { BROKERAGE_ROUTE } from 'routes/RouteConstants';
import { getFormDataWithFile } from 'service/getFormData';
import { assignPackageSchema } from 'service/formValidationSchema';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { NewHeader } from 'components/NewHeader';
import { handleRoleBasedAccess } from '../../api/handleRoleBasedAccess';
import { accessRoutes } from '../../api/accessMatrix';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.BROKERAGE_ASSIGN_PACKAGES)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

const breadcrumbs = [
  { text: 'Home', href: BROKERAGE_ROUTE },
  { text: 'Brokerage', href: BROKERAGE_ROUTE },
  { text: 'Assign and attach a care plan' },
];

const AssignPackage = ({ roles }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mosaicId: hackneyId } = router.query;
  const { data: serviceUser, isLoading: serviceUserLoading } = useServiceUser(hackneyId);
  const { options: packageTypeOptions, isLoading: lookupsLoading } = useLookups('packageType');
  const { options: brokerOptions, isLoading: brokersLoading } = useBrokers();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(assignPackageSchema),
    defaultValues: {
      hackneyUserId: hackneyId,
      brokerId: 0,
      packageType: 0,
      assessmentFileName: null,
      assessmentFile: null,
      assessmentFileId: null,
      notes: '',
    },
  });
  const onSubmit = (data) => submitData(data);

  const submitData = async (data = {}) => {
    setIsSubmitting(true);
    const formData = getFormDataWithFile(data, {
      fileId: 'carePlanFileId',
      fileName: 'carePlanFileName',
      file: 'carePlanFile',
    });
    try {
      await assignToBroker({ data: formData });
      dispatch(addNotification({ text: 'Care plan assigned', className: 'success' }));
      router.push(BROKERAGE_ROUTE);
    } catch (error) {
      dispatch(addNotification({ text: error, className: 'error' }));
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (hackneyId) {
      setValue('hackneyUserId', parseInt(hackneyId, 10));
    }
  }, [hackneyId]);

  const isLoading = serviceUserLoading || lookupsLoading || brokersLoading || isSubmitting;

  return (
    <>
      <NewHeader roles={roles ?? []} />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <HorizontalSeparator height="10px" />
        <Breadcrumbs values={breadcrumbs} />
        <Loading isLoading={isLoading} />
        <TitleSubtitleHeader subTitle="Assign and attach a care plan" title="Assign a care plan to brokerage" />
        {serviceUser && (
          <ServiceUserDetails
            serviceUserName={serviceUser.fullName}
            hackneyId={serviceUser.hackneyId}
            dateOfBirth={serviceUser.dateOfBirth}
            address={serviceUser.postCode}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container className="brokerage__container">
            <FormGroup label="Assign a Broker" error={errors.brokerId?.message}>
              <Controller
                name="brokerId"
                control={control}
                render={({ field }) => <Select options={brokerOptions} {...field} />}
              />
            </FormGroup>
            <HorizontalSeparator height="20px" />
            <FormGroup label="Select a package type" error={errors.packageType?.message}>
              <Controller
                name="packageType"
                control={control}
                render={({ field }) => <Select options={packageTypeOptions} {...field} />}
              />
            </FormGroup>
          </Container>
          <Container className="brokerage__container">
            <Heading size="xl">Support plan and care package</Heading>
            <HorizontalSeparator height={24} />
            <UploadFile name="carePlanFile" control={control} title="Upload social worker care plan" />
          </Container>
          <Container>
            <FormGroup label="Add notes" error={errors.notes?.message}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => <Textarea handler={field.onChange} value={field.value} />}
              />
            </FormGroup>
            <HorizontalSeparator height="20px" />
            <Button isLoading={isLoading} disabled={isLoading} type="submit">
              Assign care plan
            </Button>
          </Container>
        </form>
      </Container>
    </>
  );
};

export default AssignPackage;
