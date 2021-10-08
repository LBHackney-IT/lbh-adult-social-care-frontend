import PackageUserDetails from 'components/Brokerage/PackageUserDetails';
import { Container } from 'components/HackneyDS';
import { useRouter } from 'next/router';
import React from 'react';

export const PackageRequest = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <PackageUserDetails />
      <Container>New Package Request</Container>
    </>
  );
};
