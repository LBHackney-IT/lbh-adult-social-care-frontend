import React from 'react';
import { getAgeFromDateString } from 'api/Utils/FuncUtils';
import { formatDate } from 'service/helpers';
import { Container, Heading, HorizontalSeparator, VerticalSeparator } from '../../HackneyDS';

const placeHolderBirthDate = new Date(1990, 10, 10);
const ServiceUserDetails = ({ serviceUserName, hackneyId, dateOfBirth, address, title = 'Service user details' }) => (
  <>
    {title && <Heading size="l">{title}</Heading>}
    <HorizontalSeparator height="20px" />
    <Container display="flex" className="brokerage__container">
      <Container>
        <Heading size="m">Client</Heading>
        <p>{serviceUserName}</p>
      </Container>
      <VerticalSeparator width="30px" />
      <Container>
        <Heading size="m">Hackney ID</Heading>
        <p>#{hackneyId}</p>
      </Container>
      <VerticalSeparator width="30px" />
      <Container>
        <Heading size="m">Age</Heading>
        <p>
          {formatDate(dateOfBirth || placeHolderBirthDate, 'dd/MM/yy')}
          {` (${getAgeFromDateString(dateOfBirth || placeHolderBirthDate)})`}
        </p>
      </Container>
      <VerticalSeparator width="30px" />
      <Container>
        <Heading size="m">Postcode</Heading>
        <p>{address}</p>
      </Container>
    </Container>
  </>
);

export default ServiceUserDetails;
