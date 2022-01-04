import React from 'react';
import { Button } from 'components';
import { useRouter } from 'next/router';
import { NewHeader } from 'components/NewHeader';

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <NewHeader roles={[]} />
      <div className="not-fount-page">
        <h1 className="mb-5">404 - Page Not Found</h1>
        <Button onClick={router.back}>Go Back</Button>
      </div>
    </>
  );
}
