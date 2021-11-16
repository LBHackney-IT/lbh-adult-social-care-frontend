import React, { useMemo, memo } from 'react';
import { getCarePackageMainRoute } from 'routes/RouteConstants';
import { Breadcrumbs, Container } from '../HackneyDS';

const DynamicBreadcrumbs = ({ additionalBreadcrumbs = [{ text: 'Full overview' }]}) => {
  const breadcrumbs = useMemo(() => getCarePackageMainRoute(additionalBreadcrumbs), [additionalBreadcrumbs]);

  return (
    <Container maxWidth="1080px" margin="10px auto 0" padding="0 60px">
      <Breadcrumbs values={breadcrumbs} />
    </Container>
  )
};

export default memo(DynamicBreadcrumbs);