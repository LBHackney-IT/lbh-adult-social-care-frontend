import React, { useEffect } from 'react';
import { BrokerPackage } from 'components/Brokerage/BrokerPackage';
import useCarePackageApi from 'api/SWR/CarePackage/useBrokerageApi';
import { useRouter } from 'next/router';

const BrokerPackagePage = () => {
  const router = useRouter();
  const carePackageId = router.query.id;
  const { data } = useCarePackageApi.details(carePackageId);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <BrokerPackage careName="Nursing care"/>;
};

export default BrokerPackagePage;