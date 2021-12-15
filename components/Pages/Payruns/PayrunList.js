import React from 'react';
import { Container, Heading, HorizontalSeparator, VerticalSeparator } from 'components';
import { getNumberWithPreSign } from 'service';
import { format } from 'date-fns';
import { getPayrunStatusBackgroundColor, getPayrunStatusColor } from 'service/getPayrunStatusColor';
import { useRouter } from 'next/router';
import { getSinglePayrunRoute } from 'routes/RouteConstants';
import { getHighlightedSearchQuery } from 'service/getHighlightedSearchQuery';

const statussName = {
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
            background="#FAFAFA"
            padding="24px 16px"
            key={d.payRunId}
            cursor="pointer"
            onClick={() => gotToPayrun(d.payRunId)}
          >
            <Container display="flex" alignItems="center">
              <Heading size="s">Pay Run Number: </Heading>
              <VerticalSeparator width="10px" />
              {handleId(d.payRunNumber)}
            </Container>
            <Container display="grid" gridTemplateColumns="2.2fr 1fr 1fr 1.2fr">
              <Container>
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
                <Heading size="s">Paid</Heading>{getNumberWithPreSign(d.totalAmountPaid)}
              </Container>
              <Container display="flex" flexDirection="column" justifyContent="flex-end" minWidth="80px">
                <Heading size="s">Held</Heading>{getNumberWithPreSign(d.totalAmountHeld)}
              </Container>
              <Container
                padding="10px 0"
                background={getPayrunStatusBackgroundColor(d.payRunStatusName)}
                color={getPayrunStatusColor(d.payRunStatusName)}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="5px"
              >
                {statussName[d.payRunStatusName] || d.payRunStatusName}
              </Container>
            </Container>
          </Container>
          {index < data.length - 1 && <HorizontalSeparator height="16px" />}
        </>
      ))}
    </Container>
  );
};
