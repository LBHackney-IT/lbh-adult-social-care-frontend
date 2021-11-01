import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePackageDetails, useSingleSupplier } from 'api';
import { BrokerPackage } from 'components';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import withSession from 'lib/session';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
});

const BrokerPackagePage = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  useRedirectIfPackageNotExist();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: detailsData, isLoading: detailsLoading } = usePackageDetails(packageId);

  const {
    data: selectedSupplier,
    isLoading: singleSupplierLoading
  } = useSingleSupplier(detailsData.supplierId);

  useEffect(() => {
    if (selectedSupplier?.id) {
      setSelectedItem(selectedSupplier);
    }
  }, [selectedSupplier]);

  return (
    <BrokerPackage
      loading={detailsLoading || singleSupplierLoading || loading}
      setLoading={setLoading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      setSelectedItem={setSelectedItem}
      selectedItem={selectedItem}
      detailsData={detailsData}
    />
  );
};

export default BrokerPackagePage;
