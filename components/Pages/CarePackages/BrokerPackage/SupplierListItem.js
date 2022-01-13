import { Container, Heading, HorizontalSeparator, Link } from 'components';
import React from 'react';
import { getHighlightedSearchQuery } from 'service/getHighlightedSearchQuery';

export const SupplierListItem = ({ supplier, searchTerm, setValue, isParent, childrenCount }) => {
  const handleClick = (e, supplierId) => {
    e.preventDefault();
    setValue('supplierId', supplierId, { shouldDirty: true, shouldValidate: true });
  };

  const supplierName = (name) => getHighlightedSearchQuery(name, searchTerm);
  return (
    <Container>
      <Heading size="m">{supplierName(supplier.supplierName)}</Heading>
      <HorizontalSeparator height="5px" />
      {supplier.address}
      <HorizontalSeparator height="10px" />
      {!isParent && (
        <Link onClick={(e) => handleClick(e, supplier.id)} noVisited>
          Select
        </Link>
      )}
      {isParent && <p>{`${childrenCount} sites`}</p>}
    </Container>
  );
};
