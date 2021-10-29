import React, { useEffect, useMemo } from 'react';
import withSession from 'lib/session';
import { useForm, Controller } from 'react-hook-form';
import { getLoggedInUser } from 'service';
import {
  Button,
  Container,
  HorizontalSeparator,
  RadioGroup,
  BrokerageHeader,
  ServiceUserDetails,
  FurtherDetails,
  PackageType,
  TitleSubtitleHeader,
  CarePackageBreadcrumbs,
} from 'components';
import { useRouter } from 'next/router';
import { addNotification } from 'reducers/notificationsReducer';
import { useDispatch } from 'react-redux';
import { getBrokerPackageRoute } from 'routes/RouteConstants';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateCoreCarePackage, usePackageSchedulingOptions, useSingleCorePackageInfo } from 'api';

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
  const { data: packageInfo } = useSingleCorePackageInfo(packageId);
  const { packageType } = packageInfo;


  const schema = yup.object().shape({
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
    defaultValues: {},
  });
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    if (packageInfo) {
      setValue('packageType', packageInfo.packageType, 10);
      setValue('primarySupportReasonId', packageInfo.primarySupportReasonId);
      setValue('packageScheduling', packageInfo.packageScheduling);
    }
  }, [packageInfo]);

  return (
    <>
      <BrokerageHeader />
      <CarePackageBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <TitleSubtitleHeader subTitle="Broker package" title="Build a care package" />
        <form onSubmit={handleSubmit(onSubmit)}></form>
      </Container>
    </>
  );
};

export default CorePackage;
