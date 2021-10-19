import React from 'react';
import { getAgeFromDateString } from '../../../api';
import { formatDate } from '../../../service/helpers';
import { Container } from '../../HackneyDS';

const placeHolderBirthDate = new Date(1990, 10, 10);
const ServiceUserDetails = ({ serviceUserName, hackneyId, dateOfBirth, address, title = 'Service user details' }) => (
  <Container className="user-details brokerage__container">
    {title && <h3>{title}</h3>}
    <Container>
      <p>Client</p>
      <p>{serviceUserName}</p>
    </Container>
    <Container>
      <p>Hackney ID</p>
      <p>#{hackneyId}</p>
    </Container>
    <Container>
      <p>Age</p>
      <p>
        {formatDate(dateOfBirth || placeHolderBirthDate, 'dd/MM/yy')}
        {` (${getAgeFromDateString(dateOfBirth || placeHolderBirthDate)})`}
      </p>
    </Container>
    <Container>
      <p>Postcode</p>
      <p>{address}</p>
    </Container>
  </Container>
);

export default ServiceUserDetails;
