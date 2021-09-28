import { differenceInYears, format } from 'date-fns';
import React from 'react';
import { Heading, Label, HorizontalSeparator, VerticalSeparator, Container } from '../../../HackneyDS';
import { ClientStatus } from '../ClientStatus/ClientStatus';

export const ClientDetails = ({ clientDetails }) =>
  clientDetails ? (
    <Container alignItems='flex-end'>
      <Container display='flex' alignItems='center'>
        <Heading size="m">{clientDetails.name}</Heading>
        <VerticalSeparator width="16px" />
        <ClientStatus status="existing" />
      </Container>
      <HorizontalSeparator height="17px" />
      <Container display='flex'>
        <span>
          <Label>{`${format(clientDetails.birthday, 'dd.MM.yyyy')} (Age ${differenceInYears(
            new Date(),
            clientDetails.birthday
          )})`}</Label>
          <HorizontalSeparator height="8px" />
          <Label>{clientDetails.address}</Label>
        </span>
        <VerticalSeparator width="40px" />
        <span>
          <Heading size="s">Mosaic Id</Heading>
          <HorizontalSeparator height="8px" />
          <Label># {clientDetails.mosaicId}</Label>
        </span>
        <VerticalSeparator width="40px" />
        <span>
          <Heading size="s">Ceder Id</Heading>
          <HorizontalSeparator height="8px" />
          <Label># {clientDetails.cederId}</Label>
        </span>
      </Container>
    </Container>
  ) : null;
