import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useCarePackageOptions from '../../../../../api/SWR/CarePackage/useCarePackageOptions';
import { usePackageGetAll } from '../../../../../api/SWR';
import usePrimarySupportReason from '../../../../../api/SWR/package/usePrimarySupportReason';
import { addNotification } from '../../../../../reducers/notificationsReducer';
import { CARE_PACKAGE_ROUTE } from '../../../../../routes/RouteConstants';
import { createCoreCarePackage, updateCoreCarePackage } from '../../../../../api/CarePackages/CarePackage';
import CorePackageDetails from '../../../../../components/Brokerage/CorePackageDetails';
import useGetServiceUserApi from '../../../../../api/SWR/Common/UseGetServiceUserApi';
import optionsMapper, {
  mapPackageSchedulingOptions,
  mapServiceUserBasicInfo,
} from '../../../../../api/Mappers/optionsMapper';
import useCarePackageApi from '../../../../../api/SWR/CarePackage/useCarePackageApi';

const packageSettingOptions = [
  { id: 'hasRespiteCare', label: 'Respite care' },
  { id: 'hospitalAvoidance', label: 'Hospital avoidance' },
  { id: 'hasDischargePackage', label: 'Discharge package' },
  { id: 'isReEnablement', label: 'Re-enablement package' },
  { id: 'isS117Client', label: 'S117 client' },
];

const settingKeys = ['hasRespiteCare', 'hospitalAvoidance', 'hasDischargePackage', 'isReEnablement', 'isS117Client'];

const getCurrentSelectedSettings = (carePackage = {}) => settingKeys.filter((setting) => carePackage[setting] === true);

const CorePackageDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { serviceUserId, packageId } = router.query;
  const { data: schedulingOptions } = useCarePackageOptions.packageSchedulingOptions();
  const { options: packageTypes = [] } = usePackageGetAll();
  const { data: primarySupportReasons = [] } = usePrimarySupportReason();
  const { data: carePackageCore = {} } = useCarePackageApi.coreSettings(packageId);
  const { data: client = {} } = useGetServiceUserApi.single(serviceUserId);

  const [currentPackageCoreSettings, setCurrentPackageCoreSettings] = useState({
    supportReason: '',
    packageType: '',
    furtherDetails: [],
    packageSchedule: null,
  });

  useEffect(() => {
    if (packageId !== undefined && Object.keys(carePackageCore).length > 0) {
      setCurrentPackageCoreSettings({
        supportReason: carePackageCore.primarySupportReasonId,
        packageType: carePackageCore.packageType,
        furtherDetails: getCurrentSelectedSettings(carePackageCore),
        packageSchedule: carePackageCore.packageScheduling,
      });
    }
  }, [carePackageCore]);

  const handleCreateCoreCarePackage = (data = {}) => {
    if (packageId !== undefined) {
      const packageToUpdate = {
        ...data,
        packageType: carePackageCore.packageType,
      };

      updateCoreCarePackage({ data: packageToUpdate, packageId })
        .then(({ id }) => {
          // move to brokerage page
          router.push(`${CARE_PACKAGE_ROUTE}/brokerage/broker-package/${id}`);
          pushNotification('Package saved.', 'success');
        })
        .catch((error) => {
          pushNotification(error);
        });
    } else {
      const packageToCreate = {
        ...data,
        serviceUserId,
      };

      createCoreCarePackage({ data: packageToCreate })
        .then(({ id }) => {
          // move to brokerage page
          router.push({ pathname: `${CARE_PACKAGE_ROUTE}/brokerage/broker-package/${id}`, query:id});
          pushNotification('Package saved.', 'success');
        })
        .catch((error) => {
          pushNotification(error);
        });
    }
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const args = {
    // userDetails: testUserDetails,
    userDetails: mapServiceUserBasicInfo(client),
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
    saveCorePackage: handleCreateCoreCarePackage,
    defaultValues: currentPackageCoreSettings,
  };

  return <CorePackageDetails {...args} />;
};

export default CorePackageDetailsPage;
