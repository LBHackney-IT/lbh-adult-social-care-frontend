import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePackageDetails, useSuppliers } from 'api';
import { BrokerPackage } from 'components';
import { getLoggedInUser } from 'service';
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

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: detailsData, isLoading: detailsLoading } = usePackageDetails(packageId);

  const { data: selectedSupplier, isLoading: singleSupplierLoading } = useSuppliers({
    supplierId: detailsData.supplierId
  });
  const { supplierName } = selectedSupplier;

  useEffect(() => {
    if (Object.keys(selectedSupplier).length > 0) {
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
      supplierName={supplierName || ''}
      detailsData={detailsData}
    />
  );
};

export default BrokerPackagePage;
