import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCarePackageApi } from 'api';
import { BrokerPackage } from 'components/Pages/CarePackages/BrokerPackage';
import { getLoggedInUser } from 'service/helpers';
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: detailsData, isLoading: detailsLoading } = useCarePackageApi.details(packageId);

  const { data: selectedSupplier, isLoading: singleSupplierLoading } = useCarePackageApi.singleSupplier(detailsData.supplierId);
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
