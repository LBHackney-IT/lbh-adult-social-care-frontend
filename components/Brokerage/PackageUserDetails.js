import { Container } from '../HackneyDS';
import { formatDate } from '../../service/helpers';
import { getAgeFromDateString } from '../../api/Utils/FuncUtils';
import React from 'react';

const PackageUserDetails = ({ client, hackneyId, dateOfBirth, postcode }) => (
  <Container className='user-details brokerage__container'>
    <h3>Service user details</h3>
    <Container>
      <p>Client</p>
      <p>{client}</p>
    </Container>
    <Container>
      <p>Hackney ID</p>
      <p>#{hackneyId}</p>
    </Container>
    <Container>
      <p>Age</p>
      <p>
        {formatDate(dateOfBirth, 'dd/MM/yy')}
        {` (${getAgeFromDateString(dateOfBirth)}`}
      </p>
    </Container>
    <Container>
      <p>Postcode</p>
      <p>{postcode}</p>
    </Container>
  </Container>
);

export default PackageUserDetails;