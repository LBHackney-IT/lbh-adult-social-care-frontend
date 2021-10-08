import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useCarePackageOptions from '../../../../../api/SWR/CarePackage/useCarePackageOptions';
import { usePackageGetAll } from '../../../../../api/SWR';
import usePrimarySupportReason from '../../../../../api/SWR/package/usePrimarySupportReason';
import { addNotification } from '../../../../../reducers/notificationsReducer';
import { CARE_PACKAGE_ROUTE } from '../../../../../routes/RouteConstants';
import { createCoreCarePackage } from '../../../../../api/CarePackages/CarePackage';
import CorePackageDetails from '../../../../../components/Brokerage/CorePackageDetails';
import useGetServiceUserApi from '../../../../../api/SWR/Common/UseGetServiceUserApi';
import optionsMapper, {
  mapPackageSchedulingOptions,
  mapServiceUserBasicInfo,
} from '../../../../../api/Mappers/optionsMapper';

const packageSettingOptions = [
  { id: 'hasRespiteCare', label: 'Respite care' },
  { id: 'hospitalAvoidance', label: 'Hospital avoidance' },
  { id: 'hasDischargePackage', label: 'Discharge package' },
  { id: 'isReEnablement', label: 'Re-enablement package' },
  { id: 'isS117Client', label: 'S117 client' },
];

const CorePackageDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { serviceUserId } = router.query;
  const { data: schedulingOptions } = useCarePackageOptions.packageSchedulingOptions();
  const { options: packageTypes = [] } = usePackageGetAll();
  const { data: primarySupportReasons = [] } = usePrimarySupportReason();
  // const { data: client = {} } = useGetServiceUserApi.single(serviceUserId);
  const { data: client = {} } = useGetServiceUserApi.single(serviceUserId); // TODO: Fixing the value for demo. When find service user is implemented and request redirected with a valid user id, this will be disabled

  const handleCreateCoreCarePackage = (data = {}) => {
    const packageToCreate = {
      ...data,
      serviceUserId,
    };

    createCoreCarePackage({ data: packageToCreate })
      .then(({ id }) => {
        // move to brokerage page
        router.push(`${CARE_PACKAGE_ROUTE}/brokerage/broker-package/${id}`);
        pushNotification('Package saved.', 'success');
      })
      .catch((error) => {
        pushNotification(error);
      });
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
  };

  return <CorePackageDetails {...args} />;
};

export default CorePackageDetailsPage;
