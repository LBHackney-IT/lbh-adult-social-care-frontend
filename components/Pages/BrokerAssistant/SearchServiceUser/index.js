import { useState } from 'react';
import { BROKER_PORTAL_ROUTE, CARE_PACKAGE_ROUTE, LOGOUT_ROUTE } from '../../../../routes/RouteConstants';
import { Button, Container, Header, Input, Breadcrumbs, DatePicker, FormGroup } from '../../../HackneyDS';
import ServiceUserDetails from '../../BrokerPortal/ServiceUserDetails';
import AlternativePagination from '../../../AlternativePagination';
import SearchResult from '../../../SearchResult';
import Loading from '../../../Loading';

const links = [
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Care Charges', href: CARE_PACKAGE_ROUTE },
  { text: 'Log Out', href: LOGOUT_ROUTE },
];

const breadcrumbs = [
  { text: 'Home', href: '/' },
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Search for a service user' },
];

const initialFilters = {
  postcode: '',
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: null,
};

const inputs = [
  { label: 'First name', key: 'firstName' },
  { label: 'Last name', key: 'lastName' },
  { label: 'Hackney ID', key: 'hackneyId' },
  { label: 'Date of birth', key: 'dateOfBirth' },
];

const SearchServiceUser = ({ searchResults, pageNumber, setPageNumber, totalCount, totalPages, pushRoute }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [searchFilters, setSearchFilters] = useState(initialFilters);

  const changeFilters = (field, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const onSearch = () => setSearchFilters({ ...filters });

  return (
    <Container className="search-service-user">
      <Header links={links} />
      <Container maxWidth="1080px" margin="0 auto" padding="10px 60px 0">
        <Breadcrumbs values={breadcrumbs} />
        <Container padding="60px 0 0">
          <h3 className="search-service-user__title">Search for a service user</h3>
          <Container className="search-service-user__filters">
            {inputs.map(({ key, label }) => (
              <Input
                key={key}
                value={filters[key]}
                onChangeValue={(value) => changeFilters(key, value)}
                label={label}
              />
            ))}
            <FormGroup>
              <DatePicker
                setDate={(value) => changeFilters('dateOfBirth', value)}
                date={filters.dateOfBirth}
                label="Date of birth"
              />
            </FormGroup>
            <Input
              label="Postcode"
              value={filters.postcode}
              onChangeValue={(value) => changeFilters('postcode', value)}
            />
          </Container>
        </Container>
        <Button className="search-service-user__button" onClick={onSearch}>
          Search
        </Button>
        {searchResults === undefined && <Loading className="table-loading" />}
        {searchResults && (
          <Container>
            <SearchResult count={searchResults.length} />
            {searchResults.map((item) => (
              <Container className="search-service-user__card">
                <ServiceUserDetails
                  hackneyId={item.hackneyId}
                  dateOfBirth={item.dateOfBirth}
                  serviceUserName={item.userName}
                  address={item.address}
                  title=""
                />
                <Container className="actions">
                  <p onClick={() => pushRoute(item)} className="link-button green">
                    Allocate to broker
                  </p>
                  <p onClick={() => pushRoute(item)} className="link-button green">
                    View package history
                  </p>
                </Container>
              </Container>
            ))}
            <AlternativePagination
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={10}
              currentPage={pageNumber}
              changePagination={setPageNumber}
            />
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default SearchServiceUser;
