import React from 'react';
import { Container } from 'components/HackneyDS';
import { formatDate } from 'service/helpers';
import { getAgeFromDateString } from 'api/Utils/FuncUtils';

const ServiceUserDetails = ({ serviceUserName, hackneyId, dateOfBirth, address }) => (
  <Container className='user-details brokerage__container'>
    <h3>Service user details</h3>
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
        {formatDate(dateOfBirth, 'dd/MM/yy')}
        {` (${getAgeFromDateString(dateOfBirth)})`}
      </p>
    </Container>
    <Container>
      <p>Postcode</p>
      <p>{address}</p>
    </Container>
  </Container>
);

export default ServiceUserDetails;