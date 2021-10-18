import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import AssignCarePlan from 'components/Pages/BrokerPortal/AssignCarePlan';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { mapServiceUserBasicInfo } from 'api/Mappers/optionsMapper';
import { usePackageGetAll } from 'api/SWR';

// todo: replace with data from API once available
const brokerOptions = [
  { text: 'Furkan Kayar', value: 'aee45700-af9b-4ab5-bb43-535adbdcfb84' },
  { text: 'Duncan Okeno', value: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8' },
];

const AssignPackage = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data: packageInfo } = useCarePackageApi.singlePackageInfo(packageId);
  const { options: packageTypeOptions } = usePackageGetAll();

  const userDetails = useMemo(() => mapServiceUserBasicInfo(packageInfo.serviceUser), [packageInfo.serviceUser]);

  return (
    <AssignCarePlan userDetails={userDetails} brokerOptions={brokerOptions} packageTypeOptions={packageTypeOptions} />
  );
};

export default AssignPackage;
