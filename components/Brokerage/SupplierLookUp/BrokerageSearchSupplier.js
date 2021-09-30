import { SearchBox } from '../../HackneyDS';
import SupplierLookUpSelector from './SupplierLookUpSelector';
import React, { useState } from 'react';

const BrokerageSearchSupplier = ({ searchResults, setSelectedItem }) => {
  const [supplierSearch, setSupplierSearch] = useState('');

  const onSearchSupplier = () => {
    alert('search supplier');
  };

  return (
    <>
      <SearchBox
        onChangeValue={value => setSupplierSearch(value)}
        label="Supplier"
        search={onSearchSupplier}
        clear={() => setSupplierSearch('')}
        value={supplierSearch}
        id="supplier-search-box"
      />
      <p>Showing {searchResults?.totalCount} results for {supplierSearch}</p>
      <SupplierLookUpSelector
        items={searchResults.items}
        setSelectedItem={setSelectedItem}
        totalCount={searchResults.totalCount}
        totalPages={searchResults.totalPages}
      />
    </>
  );
};

export default BrokerageSearchSupplier;