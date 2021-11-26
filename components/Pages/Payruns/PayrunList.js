import React from 'react';
import { Container, Heading, HorizontalSeparator, VerticalSeparator } from 'components';
import { getNumberWithCommas } from 'service';
import { format } from 'date-fns';
import { getPayrunStatusBackgroundColor, getPayrunStatusColor } from 'service/getPayrunStatusColor';
import { useRouter } from 'next/router';
import { getSinglePayrunRoute } from 'routes/RouteConstants';
import { getHighlightedSearchQuery } from 'service/getHighlightedSearchQuery';
import { COLORS } from 'constants/strings';

const statusesName = {
  'Waiting for Approval': 'Waiting For Approval',
  'Ready for review': 'Waiting For Review',
  'Paid with hold': 'Paid With Hold',
  'In progress': 'In Progress',
};

export const PayrunList = ({ searchTerm, data }) => {
  const router = useRouter();
  const gotToPayrun = (payRunId) => {
    router.push(getSinglePayrunRoute(payRunId));
  };
  const handleId = (id) => getHighlightedSearchQuery(id, searchTerm);
  return (
    <Container>
      {data.map((d, index) => (
        <>
          <Container
            background={COLORS.white}
            padding="32px 16px"
            key={d.payRunId}
            cursor="pointer"
            onClick={() => gotToPayrun(d.payRunId)}
          >
            <Container display="flex" justifyContent="space-between" alignItems="flex-end">
              <Container minWidth="320px">
                <Container display="flex" alignItems="center">
                  <Heading size="s">Payrun ID: </Heading>
                  <VerticalSeparator width="10px" />
                  {handleId(d.payRunId)}
                </Container>
                <Container display="flex" alignItems="center">
                  <Heading size="s">Created: </Heading>
                  <VerticalSeparator width="10px" />
                  {format(new Date(d.dateCreated), 'dd/MM/yy')}
                </Container>
                <Container display="flex" alignItems="center">
                  <Heading size="s">Type: </Heading>
                  <VerticalSeparator width="10px" />
                  {d.payRunTypeName}
                </Container>
              </Container>
              <Container display="flex" flexDirection="column" justifyContent="flex-end" minWidth="80px">
                <Heading size="s">Paid</Heading>£{getNumberWithCommas(d.totalAmountPaid)}
              </Container>
              <Container display="flex" flexDirection="column" justifyContent="flex-end" minWidth="80px">
                <Heading size="s">Held</Heading>£{getNumberWithCommas(d.totalAmountHeld)}
              </Container>
              <Container
                width="200px"
                padding="10px 0"
                background={getPayrunStatusBackgroundColor(d.payRunStatusName)}
                color={getPayrunStatusColor(d.payRunStatusName)}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="5px"
              >
                {statusesName[d.payRunStatusName] || d.payRunStatusName}
              </Container>
            </Container>
          </Container>
          {index < data.length - 1 && <HorizontalSeparator height="16px" />}
        </>
      ))}
    </Container>
  );
};
