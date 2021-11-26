import { useSingleSupplier } from 'api';
import { Container, Heading, HorizontalSeparator, Link, Loading } from 'components';
import React from 'react';
import { COLORS } from 'constants/strings';

export const SupplierInfo = ({ id, setValue }) => {
  const { data: supplier, isLoading } = useSingleSupplier(id);
  const handleClick = (e) => {
    e.preventDefault();
    setValue('supplierId', null);
  };
  return (
    <Container padding="24px 16px" background={COLORS.white} display="flex" flexDirection="column" alignItems="flex-start">
      <Loading isLoading={isLoading} />
      {supplier && (
        <>
          <Heading size="m">{supplier.supplierName}</Heading>
          <HorizontalSeparator height="5px" />
          {supplier.address}
          <HorizontalSeparator height="10px" />
          <Link onClick={(e) => handleClick(e)} noVisited>
            Remove
          </Link>
        </>
      )}
    </Container>
  );
};
