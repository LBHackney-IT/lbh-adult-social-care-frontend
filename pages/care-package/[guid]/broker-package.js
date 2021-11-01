import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { usePackageDetails, useSuppliers } from 'api';
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

  const params = useMemo(
    () => ({
      supplierId: detailsData.supplierId,
    }),
    [detailsData.supplierId]
  );

  const {
    data: { data: selectedSupplier },
    isLoading: singleSupplierLoading,
  } = useSuppliers({ params });
  const { supplierName } = selectedSupplier;

  useEffect(() => {
    if (selectedSupplier.length > 0) {
      setSelectedItem(selectedSupplier[0]);
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
      supplierName={supplierName || ''}
      detailsData={detailsData}
    />
  );
};

export default BrokerPackagePage;
