import React, { useState } from 'react';
import { Button, Container, SearchBox } from '../../../HackneyDS';
import SupplierLookUpSelector from './BrokerPackageSelector';

const BrokerageSearchSupplier = ({ searchResults: { totalCount, items, totalPages }, setSelectedItem }) => {
  const [supplierSearch, setSupplierSearch] = useState('');

  const onSearchSupplier = () => {
    alert('search supplier');
  };

  const searchResultText = totalCount === 1 ? 'result' : 'results';

  return (
    <>
      <Container display="flex">
        <SearchBox
          onChangeValue={(value) => setSupplierSearch(value)}
          label="Supplier"
          search={onSearchSupplier}
          searchIcon={null}
          clearIcon={<p className="lbh-primary-button">Clear</p>}
          clear={() => setSupplierSearch('')}
          value={supplierSearch}
          className="supplier-search-box"
          id="supplier-search-box"
        />
        <Button className="supplier-search-button" handler={() => alert('Search')}>
          Search
        </Button>
      </Container>
      <p className="supplier-search-box__results">
        Showing {totalCount} {searchResultText} for <span className="supplier-search-for">{supplierSearch}</span>
      </p>
      <SupplierLookUpSelector
        items={items}
        setSelectedItem={setSelectedItem}
        totalCount={totalCount}
        totalPages={totalPages}
      />
    </>
  );
};

export default BrokerageSearchSupplier;
