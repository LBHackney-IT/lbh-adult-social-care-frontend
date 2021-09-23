import { Container } from '../HackneyDS/Layout/Container';
import { formatDate } from '../../service/helpers';
import { getAgeFromDateString } from '../../api/Utils/FuncUtils';
import React from 'react';

const CorePackageUserDetails = ({ client, hackneyId, dateOfBirth, postcode }) => (
  <Container className='user-details remove-approvals__default-container'>
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
        {formatDate(dateOfBirth, '/')}
        {getAgeFromDateString(dateOfBirth)}
      </p>
    </Container>
    <Container>
      <p>Postcode</p>
      <p>{postcode}</p>
    </Container>
  </Container>
);

export default CorePackageUserDetails;