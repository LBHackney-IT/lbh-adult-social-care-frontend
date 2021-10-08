import React, { useEffect, useState } from 'react';
import { BrokerPackage } from 'components/Brokerage/BrokerPackage';
import { useRouter } from 'next/router';
import useCarePackageApi from '../../../../api/SWR/CarePackage/useCarePackageApi';

const BrokerPackagePage = () => {
  const router = useRouter();
  const [packageId, supplierName] = router?.query?.slug || [];
  const [supplierSearch, setSupplierSearch] = useState(supplierName);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(supplierName);
  const { data: detailsData } = useCarePackageApi.details(packageId);
  const { data: searchResults } = useCarePackageApi.suppliers({ supplierName: search });

  const onSearchSupplier = () => {
    setSearch(supplierSearch);
  };

  useEffect(() => {
    setSearch(supplierName);
    setSupplierSearch(supplierName);
  }, [supplierName]);

  useEffect(() => {
    console.log(detailsData);
  }, [detailsData]);

  return (
    <BrokerPackage
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onSearchSupplier={onSearchSupplier}
      supplierSearch={supplierSearch}
      setSupplierSearch={setSupplierSearch}
      supplierName={supplierName}
      detailsData={detailsData}
      packageId={packageId}
      searchResults={searchResults}
      careName="Nursing care"
    />
  );
};

export default BrokerPackagePage;