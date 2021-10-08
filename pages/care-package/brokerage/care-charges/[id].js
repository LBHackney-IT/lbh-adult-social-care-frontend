import React, { useEffect } from 'react';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { useRouter } from 'next/router';
import CareCharges from 'components/Brokerage/CareCharges';
import { updateCoreCarePackage } from 'api/CarePackages/CarePackage';

const CareChargesPage = () => {
  const router = useRouter();
  const carePackageId = router.query.id;
  const { data } = useCarePackageApi.details(carePackageId);

  const changeDetailsExample = async () => {
    await updateCoreCarePackage({ data: 'exampleData' }, carePackageId);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <CareCharges />;
};

export default CareChargesPage;