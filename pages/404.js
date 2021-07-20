import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '../components/Button';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="not-fount-page">
      <h1 className="mb-5">404 - Page Not Found</h1>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );
}
