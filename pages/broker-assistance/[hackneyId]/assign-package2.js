import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  CarePackageBreadcrumbs,
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
import { useBrokers, useLookups, useServiceUser } from 'api';

const AssignPackage2 = () => {
  const router = useRouter();
  const { hackneyId } = router.query;
  const { data: serviceUser, isLoading: serviceUserLoading } = useServiceUser(hackneyId);
  const { options: packageTypeOptions, isLoading: lookupsLoading } = useLookups('packageType');
  const { options: brokerOptions, isLoading: brokersLoading } = useBrokers();

  //   const brokerName = brokerOptions?.find((el) => el.value === broker)?.text;
  const isLoading = serviceUserLoading || lookupsLoading || brokersLoading;

  const schema = yup.object().shape({
    assignBroker: yup.number().typeError('Please choose a broker').required().min(1, 'Please choose a broker'),
    packageType: yup
      .number()
      .typeError('Please select a package type')
      .required()
      .min(1, 'Please select a package type'),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      assignBroker: 0,
      packageType: 0,
      notes: '',
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <CarePackageBreadcrumbs />
      <Loading isLoading={isLoading} />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
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
            <FormGroup label="Assign a Broker" error={errors.assignBroker?.message}>
              <Controller
                name="assignBroker"
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
              <Controller name="notes" control={control} render={({ field }) => <Textarea {...field} />} />
            </FormGroup>
            <HorizontalSeparator height="20px" />
            <Button isLoading={isLoading} disabled={isLoading} type="submit">
              Save and continue
            </Button>
          </Container>
        </form>
      </Container>
    </>
  );
};

export default AssignPackage2;
