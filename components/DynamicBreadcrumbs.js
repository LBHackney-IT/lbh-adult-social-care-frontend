import React, { useMemo } from 'react';
import { getMainRoute } from 'routes/RouteConstants';
import { useRouter } from 'next/router';
import { Breadcrumbs, Container } from './HackneyDS';

const DynamicBreadcrumbs = ({ additionalInfo }) => {
  const { route } = useRouter();
  const splitRoute = route.split('/');
  const currentRoute = splitRoute.length > 2 && splitRoute[splitRoute.length - 1];
  const breadcrumbs = useMemo(() => getMainRoute(currentRoute, additionalInfo), [additionalInfo]);

  return (
    <Container maxWidth="1080px" margin="10px auto 0" padding="0 60px">
      <Breadcrumbs values={breadcrumbs} />
    </Container>
  );
};

export default DynamicBreadcrumbs;