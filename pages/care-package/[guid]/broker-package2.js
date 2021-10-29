import React, { useEffect } from 'react';
import withSession from 'lib/session';
import { Controller, useForm } from 'react-hook-form';
import { getLoggedInUser } from 'service';
import {
  Container,
  BrokerageHeader,
  TitleSubtitleHeader,
  CarePackageBreadcrumbs,
  DatePicker,
  FormGroup,
  Button,
  VerticalSeparator,
  Checkbox,
} from 'components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePackageDetails, useSingleCorePackageInfo } from 'api';
import DatePick from 'components/DatePick';

export const getServerSideProps = withSession(({ req }) => {
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
  const { data: detailsData, isLoading: detailsLoading } = usePackageDetails(packageId);
  console.log(detailsData);

  const schema = yup.object().shape({});

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    if (detailsData) {
      setValue('startDate', new Date(detailsData.startDate));
      setValue('endDate', new Date(detailsData.endDate));
    }
  }, [detailsData]);

  return (
    <>
      <BrokerageHeader />
      <CarePackageBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Broker package" title="Build a care package" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container className="brokerage__container">{}</Container>
          <FormGroup label="Package dates">
            <Container display="flex">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker day={{ label: 'From' }} date={field.value} setDate={field.onChange} {...field} hasClear />
                )}
              />
              <VerticalSeparator width="20px" />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker day={{ label: 'To' }} date={field.value} setDate={field.onChange} {...field} hasClear />
                )}
              />
              {/* <Checkbox value={}/> */}
            </Container>
          </FormGroup>
          <Button type="submit">Save and continue</Button>
        </form>
      </Container>
    </>
  );
};

export default CorePackage;
