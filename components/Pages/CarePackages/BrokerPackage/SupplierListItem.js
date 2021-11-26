import { Container, Heading, HorizontalSeparator, Link } from 'components';
import React from 'react';
import { getHighlightedSearchQuery } from 'service/getHighlightedSearchQuery';
import { COLORS } from 'constants/strings';

export const SupplierListItem = ({ supplier, searchTerm, setValue }) => {
  const handleClick = (e, supplierId) => {
    e.preventDefault();
    setValue('supplierId', supplierId, { shouldDirty: true, shouldValidate: true });
  };

  const supplierName = (name) => getHighlightedSearchQuery(name, searchTerm);
  return (
    <Container padding="24px 16px" background={COLORS.white} display="flex" flexDirection="column" alignItems="flex-start">
      <Heading size="m">{supplierName(supplier.supplierName)}</Heading>
      <HorizontalSeparator height="5px" />
      {supplier.address}
      <HorizontalSeparator height="10px" />
      <Link onClick={(e) => handleClick(e, supplier.id)} noVisited>
        Select
      </Link>
    </Container>
  );
};
