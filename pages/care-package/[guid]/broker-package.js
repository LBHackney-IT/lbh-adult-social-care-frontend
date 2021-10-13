import React, { useEffect, useState } from 'react';
import { BrokerPackage } from 'components/Brokerage/BrokerPackage';
import { useRouter } from 'next/router';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { getSuppliers } from 'api/CarePackages/SuppliersApi';

const BrokerPackagePage = () => {
  const router = useRouter();
  const { guid: packageId, supplierName } = router.query;

  const [supplierSearch, setSupplierSearch] = useState(supplierName || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(supplierName);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { mutate: getDetails, data: detailsData = {} } = useCarePackageApi.details(packageId);
  const { data: searchResults } = useCarePackageApi.suppliers({ supplierName: search });
  const { data: selectedSupplier, mutate: getSelectedSupplierDetails } = useCarePackageApi.singleSupplier(
    detailsData?.supplierId
  );
  const { data: carePackageCore = { packageType: '', serviceUserId: '' } } = useCarePackageApi.coreSettings(packageId);

  const onSearchSupplier = () => {
    setSearch(supplierSearch);
    setShowSearchResults(true);
  };

  useEffect(() => {
    if (supplierName) {
      setSearch(supplierName);
      setSupplierSearch(supplierName);
      getSuppliers({ supplierName })
        .then(({ data }) => {
          setSelectedItem(data.data[0]);
        })
        .catch((e) => console.log(e));
    }
  }, [supplierName]);

  useEffect(() => {
    if (!Number.isNaN(detailsData?.supplierId)) {
      // Get supplier details
      getSelectedSupplierDetails();
    }
  }, [detailsData]);

  useEffect(() => {
    if (typeof selectedSupplier === 'object' && Object.keys(selectedSupplier).length > 0) {
      setSelectedItem(selectedSupplier);
      setSearch(selectedSupplier?.supplierName);
      setSupplierSearch(selectedSupplier?.supplierName);
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
