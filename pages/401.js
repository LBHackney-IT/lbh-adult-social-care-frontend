import React from 'react';
import { Button } from 'components';
import { useRouter } from 'next/router';
import { NewHeader } from 'components/NewHeader';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  return { props: { roles: user.roles } };
});

export default function Custom401({ roles }) {
  const router = useRouter();

  return (
    <>
      <NewHeader roles={roles ?? []} />
      <div className="not-fount-page">
        <h1 className="mb-5">401 - Unauthorised Access test</h1>
        <Button onClick={router.back}>Go Back</Button>
      </div>
    </>
  );
}
