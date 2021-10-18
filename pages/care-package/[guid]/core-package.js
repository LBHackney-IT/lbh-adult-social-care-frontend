import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  optionsMapper,
  usePackageGetAll,
  useCarePackageApi,
  useCarePackageOptions,
  updateCoreCarePackage,
  usePrimarySupportReason,
  mapServiceUserBasicInfo,
  mapPackageSchedulingOptions,
} from 'api';
import { addNotification } from 'reducers/notificationsReducer';
import { getBrokerPackageRoute } from 'routes/RouteConstants';
import CorePackageDetails from 'components/Pages/CarePackages/CorePackageDetails';
import { getLoggedInUser } from 'service/helpers';
import withSession from 'lib/session';

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

const packageSettingOptions = [
  { id: 'hasRespiteCare', label: 'Respite care' },
  { id: 'hospitalAvoidance', label: 'Hospital avoidance' },
  { id: 'hasDischargePackage', label: 'Discharge package' },
  { id: 'isReEnablement', label: 'Re-enablement package' },
  { id: 'isS117Client', label: 'S117 client' },
];

const settingKeys = ['hasRespiteCare', 'hospitalAvoidance', 'hasDischargePackage', 'isReEnablement', 'isS117Client'];

const getCurrentSelectedSettings = (carePackage = {}) => settingKeys.filter((setting) => carePackage[setting] === true);

const CorePackagePage = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data: schedulingOptions } = useCarePackageOptions.packageSchedulingOptions();
  const { options: packageTypes = [] } = usePackageGetAll();
  const { data: primarySupportReasons = [] } = usePrimarySupportReason();

  const { data: packageInfo } = useCarePackageApi.singlePackageInfo(packageId);

  const currentPackageCoreSettings = useMemo(
    () => ({
      supportReason: packageInfo.primarySupportReasonId ?? '',
      packageType: packageInfo.packageType ?? '',
      furtherDetails: getCurrentSelectedSettings(packageInfo.settings),
      packageSchedule: packageInfo.packageScheduling,
    }),
    [packageInfo]
  );

  const updatePackage = async (data = {}) => {
    try {
      const { id } = await updateCoreCarePackage({ data, packageId });
      router.push(getBrokerPackageRoute(id));
      pushNotification('Package saved.', 'success');
    } catch (error) {
      pushNotification(error);
    }
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const props = {
    userDetails: mapServiceUserBasicInfo(packageInfo.serviceUser),
    packageScheduleOptions: mapPackageSchedulingOptions(schedulingOptions || []),
    supportReasonOptions: optionsMapper(
      {
        text: 'primarySupportReasonName',
        value: 'primarySupportReasonId',
      },
      primarySupportReasons
    ),
    checkboxOptions: packageSettingOptions,
    packageTypeOptions: packageTypes,
    saveCorePackage: updatePackage,
    defaultValues: currentPackageCoreSettings,
  };

  return <CorePackageDetails {...props} />;
};

export default CorePackagePage;
