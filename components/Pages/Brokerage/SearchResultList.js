import React from 'react';
import { getAssignPackageRoute, getHistoryRoute } from 'routes/RouteConstants';
import { Container, VerticalSeparator } from '../../HackneyDS';
import ServiceUserDetails from '../BrokerPortal/ServiceUserDetails';

const SearchResultList = ({ searchResults, createNewPackage }) => {

  const onCreateNewPackage = (item) => (e) => {
    e.preventDefault();
    createNewPackage(item);
  };

  return searchResults.map((item) => (
    <Container
      key={`${item.mosaicId}${item.firstName}${item.lastName}`}
      className="search-service-user__card"
    >
      <ServiceUserDetails
        hackneyId={item.mosaicId}
        dateOfBirth={item.dateOfBirth}
        serviceUserName={`${item.firstName} ${item.lastName}`}
        address={item.address?.postcode}
        activePackage={item.activePackage}
        title=""
      />
      <Container className="actions">
        <a
          style={(!item.activePackageId && { opacity: 0.2, pointerEvents: 'none' }) || {}}
          href={item.activePackageId && getHistoryRoute(item.activePackageId)}
          className="link-button green"
        >
          View package history
        </a>
        <VerticalSeparator width={32} />
        <a href={getAssignPackageRoute(item.mosaicId)} className="link-button green">
          Allocate to broker
        </a>
        <VerticalSeparator width={32} />
        <a onClick={onCreateNewPackage(item)} className="link-button green">
          Create new package
        </a>
      </Container>
    </Container>
  ));
};

export default SearchResultList;