import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Breadcrumbs,
  Button,
  Container,
  FormGroup,
  HorizontalSeparator,
  Loading,
  Select,
  ServiceUserDetails,
  Textarea,
  TitleSubtitleHeader,
} from 'components';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { assignToBroker, useBrokers, useLookups, useServiceUser } from 'api';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { BROKER_ASSISTANCE_ROUTE } from 'routes/RouteConstants';

const breadcrumbs = [
  { text: 'Home', href: BROKER_ASSISTANCE_ROUTE },
  { text: 'Broker Assistance', href: BROKER_ASSISTANCE_ROUTE },
  { text: 'Assign and attach a care plan' },
];

const AssignPackage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { hackneyId } = router.query;
  const { data: serviceUser, isLoading: serviceUserLoading } = useServiceUser(hackneyId);
  const { options: packageTypeOptions, isLoading: lookupsLoading } = useLookups('packageType');
  const { options: brokerOptions, isLoading: brokersLoading } = useBrokers();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoading = serviceUserLoading || lookupsLoading || brokersLoading;
  const schema = yup.object().shape({
    brokerId: yup.string().typeError('Please choose a Broker').required().min(2, 'Please choose a Broker'),
    packageType: yup
      .number()
      .typeError('Please select a package type')
      .required()
      .min(1, 'Please select a package type'),
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hackneyUserId:hackneyId,
      brokerId: 0,
      packageType: 0,
      notes: '',
    },
  });
  const onSubmit = (data) => submitData(data);

  const submitData = async (data = {}) => {
    setIsSubmitting(true);
    try {
      await assignToBroker({ data });
      dispatch(addNotification({ text: 'Care plan assigned', className: 'success' }));
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

  return (
    <>
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
          <Container>
            <FormGroup label="Add notes" error={errors.notes?.message}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => <Textarea handler={field.onChange} value={field.value} />}
              />
            </FormGroup>
            <HorizontalSeparator height="20px" />
            <Button isLoading={isSubmitting} disabled={isLoading} type="submit">
              Save and continue
            </Button>
          </Container>
        </form>
      </Container>
    </>
  );
};

export default AssignPackage;
