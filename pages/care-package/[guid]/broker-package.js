import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { BrokerPackage } from 'components/Pages/CarePackages/BrokerPackage';

const BrokerPackagePage = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const [supplierSearch, setSupplierSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { data: detailsData } = useCarePackageApi.details(packageId);
  const { data: searchResults } = useCarePackageApi.suppliers({ supplierName: search });
  const { data: carePackageCore = { packageType: '', serviceUserId: '' } } = useCarePackageApi.coreSettings(packageId);

  const { data: selectedSupplier } = useCarePackageApi.singleSupplier(detailsData.supplierId);
  const { supplierName } = selectedSupplier;

  const onSearchSupplier = () => {
    setSearch(supplierSearch);
    setShowSearchResults(true);
  };

  useEffect(() => {
    if (Object.keys(selectedSupplier).length > 0) {
      setSelectedItem(selectedSupplier);
      setSearch(supplierName);
      setSupplierSearch(supplierName);
    }
  }, [selectedSupplier]);

  return (
    <BrokerPackage
      showSearchResults={showSearchResults}
      setShowSearchResults={setShowSearchResults}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onSearchSupplier={onSearchSupplier}
      setSelectedItem={setSelectedItem}
      selectedItem={selectedItem}
      supplierSearch={supplierSearch || ''}
      setSupplierSearch={setSupplierSearch}
      supplierName={supplierName || ''}
      detailsData={detailsData}
      searchResults={searchResults}
      packageType={carePackageCore?.packageType}
      carePackageCore={carePackageCore}
    />
  );
};

export default BrokerPackagePage;
