import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useCareCharge } from 'api';
import { NewCareChargePackages } from 'components';

const initialFilters = {
  orderByDate: '',
  status: '',
  modifiedBy: '',
};

const CareChargePackages = () => {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);
  const [pageNumber, setPageNumber] = useState(1);

  const params = useMemo(() => ({
    pageNumber,
    orderByDate: filters.orderByDate,
    status: filters.status,
    modifiedBy: filters.modifiedBy,
  }), [filters, pageNumber]);

  const { data: searchResults, isLoading } = useCareCharge({ params });

  const clearFilters = () => setFilters({ ...initialFilters });

  const pushRoute = (route) => router.push(route)

  return (
    <NewCareChargePackages
      isLoading={isLoading}
      setPageNumber={setPageNumber}
      clearFilters={clearFilters}
      pageNumber={pageNumber}
      filters={filters}
      pushRoute={pushRoute}
      searchResults={searchResults}
      setFilters={setFilters}
    />
  );
};

export default CareChargePackages;