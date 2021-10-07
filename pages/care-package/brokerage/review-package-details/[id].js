import React, { useEffect } from 'react';
import useCarePackageApi from '../../../../api/SWR/CarePackage/useCarePackageApi';
import { useRouter } from 'next/router';
import { ReviewPackageDetails } from '../../../../components/Brokerage/ReviewPackageDetails';

const ReviewPackageDetailsPage = () => {
  const router = useRouter();
  const carePackageId = router.query.id;
  const { data } = useCarePackageApi.summary(carePackageId);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (<ReviewPackageDetails userDetails={data?.serviceUser} summary={[]}/>);
};

export default ReviewPackageDetailsPage;