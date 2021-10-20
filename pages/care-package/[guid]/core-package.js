import React, { useMemo, useState } from 'react';
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
import { CorePackageDetails } from 'components';
import { addNotification } from 'reducers/notificationsReducer';
import { getBrokerPackageRoute } from 'routes/RouteConstants';
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

  const { data: schedulingOptions = [], isLoading: schedulingLoading } = useCarePackageOptions.packageSchedulingOptions();
  const { options: packageTypes = [], isLoading: packageGetAllLoading } = usePackageGetAll();
  const { data: primarySupportReasons = [], isLoading: primarySupportReasonLoading } = usePrimarySupportReason();

  const { data: packageInfo, isLoading: singlePackageInfoLoading } = useCarePackageApi.singlePackageInfo(packageId);

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const { id } = await updateCoreCarePackage({ data, packageId });
      router.push(getBrokerPackageRoute(id));
      pushNotification('Package saved.', 'success');
    } catch (error) {
      pushNotification(error);
    }
    setLoading(false);
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
    loading:
      schedulingLoading || loading || packageGetAllLoading || primarySupportReasonLoading || singlePackageInfoLoading,
  };

  return <CorePackageDetails {...props} />;
};

export default CorePackagePage;
