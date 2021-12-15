import React from 'react';
import { getAssignPackageRoute, getHistoryRoute, getServiceUserPackagesRoute } from 'routes/RouteConstants';
import { Container, VerticalSeparator } from '../../HackneyDS';
import ServiceUserDetails from '../BrokerPortal/ServiceUserDetails';

const SearchResultList = ({ searchResults, pushRoute, createNewPackage }) =>
  searchResults.map((item) => (
    <Container
      onClick={() => item.hackneyId && pushRoute(getServiceUserPackagesRoute(item.id))}
      key={`${item.hackneyId || item.mosaicId}${item.firstName}${item.lastName}`}
      className="search-service-user__card"
    >
      <ServiceUserDetails
        hackneyId={item.hackneyId || item.mosaicId}
        dateOfBirth={item.dateOfBirth}
        serviceUserName={`${item.firstName} ${item.lastName}`}
        address={item.postCode || item.address?.postcode}
        activePackage={item.activePackage}
        title=""
      />
      <Container className="actions">
        <p
          style={!item.activePackageId && { opacity: 0.2, pointerEvents: 'none' }}
          onClick={() => pushRoute(getHistoryRoute(item.activePackageId))}
          className="link-button green"
        >
          View package history
        </p>
        <VerticalSeparator width={32} />
        <p onClick={() => pushRoute(getAssignPackageRoute(item.mosaicId))} className="link-button green">
          Allocate to broker
        </p>
        <VerticalSeparator width={32} />
        <p onClick={() => createNewPackage(item)} className="link-button green">
          Create new package
        </p>
      </Container>
    </Container>
  ));

export default SearchResultList;