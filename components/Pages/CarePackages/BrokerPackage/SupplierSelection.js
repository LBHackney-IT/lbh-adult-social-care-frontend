import React, { useState } from 'react';
import { Button, Container, FormGroup, SearchBox, HorizontalSeparator, VerticalSeparator } from 'components';
import { SupplierList } from './SupplierList';
import { SupplierInfo } from './SupplierInfo';

export const SupplierSelection = ({ setValue, supplierId, errors }) => {
  const [supplierSearchTerm, setSupplierSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [newSearch, setNewSearch] = useState(false);
  const supplierContactEmail = 'Supplier.Management@hackney.gov.uk';

  const onSupplierSearch = () => {
    setNewSearch(true);
    if (supplierSearchTerm) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const clearSearch = () => {
    setSupplierSearchTerm('');
    setShowSearchResults(false);
  };
  return (
    <Container className="brokerage__container">
      {supplierId ? (
        <SupplierInfo id={supplierId} setValue={setValue} />
      ) : (
        <Container display="flex" flexDirection="column" alignItems="flex-start">
          <FormGroup label="Supplier" error={errors.supplierId?.message}>
            <Container display="flex">
              <SearchBox
                value={supplierSearchTerm}
                onChangeValue={setSupplierSearchTerm}
                search={onSupplierSearch}
                className="supplier-search-box"
              />
              {(showSearchResults || supplierSearchTerm) && (
                <>
                  <VerticalSeparator width="10px" />
                  <Button outline secondary color="gray" onClick={clearSearch}>
                    Clear
                  </Button>
                </>
              )}
            </Container>
            <HorizontalSeparator height="10px" />
            <Container display="flex">
              Contact
              <VerticalSeparator width="6px" />
              <a className="link-button green" href={`mailto:${supplierContactEmail}`}>
                {supplierContactEmail}
              </a>
              <VerticalSeparator width="6px" />
              to add a new supplier
            </Container>
          </FormGroup>
          {showSearchResults && (
            <>
              <HorizontalSeparator height="10px" />
              <SupplierList
                searchTerm={supplierSearchTerm}
                newSearch={newSearch}
                setNewSearch={setNewSearch}
                setValue={setValue}
              />
            </>
          )}
        </Container>
      )}
    </Container>
  );
};
