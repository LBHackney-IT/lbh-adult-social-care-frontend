import React from 'react';
import { formatDate } from 'service';
import { getAgeFromDateString } from 'api';
import { Container } from '../../HackneyDS';

const PackageUserDetails = ({ firstName, lastName, hackneyId, dateOfBirth, postCode }) => (
  <Container className="user-details brokerage__container">
    <h3>Service user details</h3>
    <Container>
      <p>Client</p>
      <p>
        {firstName} {lastName}
      </p>
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
    {postCode && (
      <Container>
        <p>Postcode</p>
        <p>{postCode}</p>
      </Container>
    )}
  </Container>
);

export default PackageUserDetails;
