import React from 'react';
import { Container, Heading, HorizontalSeparator, VerticalSeparator } from 'components';
import { getNumberWithCommas } from 'service';
import { format } from 'date-fns';
import { getPayrunStatusBackgroundColor, getPayrunStatusColor } from 'service/getPayrunStatusColor';
import { useRouter } from 'next/router';
import { getSinglePayrunRoute } from 'routes/RouteConstants';

const statussName = {
  'Waiting for Approval': 'Awaiting Approval',
  'Ready for review': 'Ready for Review',
  'Paid with hold': 'Paid with Hold',
};

export const PayrunList = ({ data }) => {
  const router = useRouter();
  const gotToPayrun = (payRunId) => {
    router.push(getSinglePayrunRoute(payRunId));
  }
  return (
    <Container>
      {data.map((d, index) => (
        <>
          <Container background="#FAFAFA" padding="32px 16px" key={d.payRunId} cursor='pointer' onClick={() => gotToPayrun(d.payRunId)}>
            <Container display="flex" justifyContent="space-between" alignItems="flex-end">
              <Container minWidth='320px'>
                <Container display="flex" alignItems="center">
                  <Heading size="s">Payrun ID: </Heading>
                  <VerticalSeparator width="10px" />
                  {d.payRunId}
                </Container>
                <Container display="flex" alignItems="center">
                  <Heading size="s">Date: </Heading>
                  <VerticalSeparator width="10px" />
                  {format(new Date(d.dateCreated), 'dd/MM/yy')}
                </Container>
                <Container display="flex" alignItems="center">
                  <Heading size="s">Type: </Heading>
                  <VerticalSeparator width="10px" />
                  {d.payRunTypeName}
                </Container>
              </Container>
              <Container display="flex" flexDirection="column" justifyContent="flex-end" minWidth='80px'>
                <Heading size="s">Paid</Heading>£{getNumberWithCommas(d.totalAmountPaid)}
              </Container>
              <Container display="flex" flexDirection="column" justifyContent="flex-end" minWidth='80px'>
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
