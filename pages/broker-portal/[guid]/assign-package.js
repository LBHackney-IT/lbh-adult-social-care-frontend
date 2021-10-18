import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import AssignCarePlan from 'components/Pages/BrokerPortal/AssignCarePlan';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { mapServiceUserBasicInfo } from 'api/Mappers/optionsMapper';

const AssignPackage = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data: packageInfo } = useCarePackageApi.singlePackageInfo(packageId);

  const userDetails = useMemo(() => mapServiceUserBasicInfo(packageInfo.serviceUser), [packageInfo.serviceUser]);

  return (
    <div>
      <AssignCarePlan userDetails={userDetails} />
    </div>
  );
};

export default AssignPackage;
