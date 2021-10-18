import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import AssignCarePlan from 'components/Pages/BrokerPortal/AssignCarePlan';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { mapServiceUserBasicInfo } from 'api/Mappers/optionsMapper';
import { usePackageGetAll } from 'api/SWR';

const AssignPackage = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data: packageInfo } = useCarePackageApi.singlePackageInfo(packageId);
  const { options: packageTypeOptions } = usePackageGetAll();

  const userDetails = useMemo(() => mapServiceUserBasicInfo(packageInfo.serviceUser), [packageInfo.serviceUser]);

  return (
    <div>
      <AssignCarePlan userDetails={userDetails} packageTypeOptions={packageTypeOptions} />
    </div>
  );
};

export default AssignPackage;
