import React, { useEffect } from 'react';
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
} from 'components';
import TitleSubtitleHeader from 'components/Pages/CarePackages/TitleSubtitleHeader';
import { useRouter } from 'next/router';
import { addNotification } from 'reducers/notificationsReducer';
import { useDispatch } from 'react-redux';
import { getBrokerPackageRoute } from 'routes/RouteConstants';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateCoreCarePackage, useSinglePackageInfo, usePackageSchedulingOptions } from 'api';

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
  const { data: packageInfo } = useSinglePackageInfo(packageId);
  const { settings } = packageInfo;
  const { data: schedulingOptions = [] } = usePackageSchedulingOptions();

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
    formState: { errors },
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
    }
  }, [packageInfo]);

  const updatePackage = async (data = {}) => {
    try {
      const { id } = await updateCoreCarePackage({ data, packageId });
      router.push(getBrokerPackageRoute(id));
      dispatch(addNotification({ text: 'Package saved.', className: 'success' }));
    } catch (error) {
      dispatch(addNotification({ text: error, className: 'error' }));
    }
  };

  return (
    <>
      <BrokerageHeader />
      <Container maxWidth="1080px" margin="0 auto" padding="60px">
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
          <Button type="submit">Save and continue</Button>
        </form>
      </Container>
    </>
  );
};

export default CorePackage;
