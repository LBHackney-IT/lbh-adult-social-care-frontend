import React, { useEffect } from 'react';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { useRouter } from 'next/router';
import CorePackageDetails from 'components/Brokerage/CorePackageDetails';

const CorePackagePage = () => {
  const router = useRouter();
  const carePackageId = router.query.id;
  const { data } = useCarePackageApi.details(carePackageId);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <CorePackageDetails
    userDetails={data.serviceUser}
    supportReasonOptions={[]}
    checkboxOptions={[]}
    packageTypeOptions={[]}
    packageScheduleOptions={[]}
  />;
};

export default CorePackagePage;