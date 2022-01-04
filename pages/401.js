import React from 'react';
import { Button } from 'components';
import { useRouter } from 'next/router';

export default function Custom401() {
  const router = useRouter();

  return (
    <div className="not-fount-page">
      <h1 className="mb-5">401 - Unauthorised Access</h1>
      <Button onClick={router.back}>Go Back</Button>
    </div>
  );
}
