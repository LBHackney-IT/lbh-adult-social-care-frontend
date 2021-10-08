import React, { useEffect } from 'react';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import FundedNursingCare from 'components/Brokerage/FundedNursingCare';
import { useRouter } from 'next/router';
import { changeCarePackageDetails } from 'api/CarePackages/CarePackage';

const BrokerPackagePage = () => {
  const router = useRouter();
  const carePackageId = router.query.id;
  const { data } = useCarePackageApi.details(carePackageId);

  const changeDetailsExample = async () => {
    await changeCarePackageDetails({ data: 'exampleData' }, carePackageId);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <FundedNursingCare/>;
};

export default BrokerPackagePage;