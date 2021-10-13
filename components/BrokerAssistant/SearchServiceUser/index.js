import { useState } from 'react';
import { BROKER_PORTAL_ROUTE, CARE_PACKAGE_ROUTE, LOGOUT_ROUTE } from '../../../routes/RouteConstants';
import { Button, Container, Header, Input } from '../../HackneyDS';
import Breadcrumbs from '../../Breadcrumbs';
import { useRouter } from 'next/router';
import DatePicker from '../../HackneyDS/DatePicker';
import ServiceUserDetails from '../../Brokerage/BrokerPortal/ServiceUserDetails';
import Pagination from '../../Payments/Pagination';
import Loading from '../../Loading';
import FormGroup from '../../HackneyDS/FormGroup';
import SearchResult from '../../SearchResult';

const SearchServiceUser = ({
  searchResults,
  pageNumber,
  setPageNumber,
  totalCount,
  totalPages,
}) => {
  const router = useRouter();
  const [initialFilters] = useState({
    postcode: '',
    firstName: '',
    lastName: '',
    hackneyId: '',
    dateOfBirth: null,
  });
  const [filters, setFilters] = useState({ ...initialFilters });
  const [searchFilters, setSearchFilters] = useState({ ...initialFilters });
  const [links] = useState([
    { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
    { text: 'Care Charges', href: CARE_PACKAGE_ROUTE },
    { text: 'Log Out', href: LOGOUT_ROUTE },
  ]);

  const changeFilters = (field, value) => {
    setFilters(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const allocateToBroker = (item) => {
    alert(item);
  };
  const viewPackageHistory = (item) => {
    alert(item);
  };

  const pushRoute = route => router.push(route);

  const [breadcrumbs] = useState([
    { text: 'Home', onClick: () => pushRoute('/') },
    { text: 'Broker Portal', onClick: () => pushRoute(BROKER_PACKAGE_ROUTE) },
    { text: 'Search for a service user' },
  ]);

  const onSearch = () => setSearchFilters({ ...filters });

  return (
    <Container className="search-service-user">
      <Header links={links}/>
      <Container padding="8px 60px 0 60px">
        <Breadcrumbs values={breadcrumbs}/>
        <Container padding="60px 0 0">
          <h3 className="search-service-user__title">Search for a service user</h3>
          <Container className="search-service-user__filters">
            <Input
              value={filters.firstName}
              onChangeValue={value => changeFilters('firstName', value)}
              label="First name"
            />
            <Input
              value={filters.lastName}
              onChangeValue={value => changeFilters('lastName', value)}
              label="Last name"
            />
            <Input
              value={filters.hackneyId}
              onChangeValue={value => changeFilters('hackneyId', value)}
              label="Hackney ID"
            />
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
        <Button className="search-service-user__button" handler={onSearch}>Search</Button>
        {searchResults === undefined && <Loading className="table-loading"/>}
        {searchResults &&
        <Container>
          <SearchResult count={searchResults.length}/>
          {searchResults.map(item => (
            <Container className="search-service-user__card">
              <ServiceUserDetails
                hackneyId={item.hackneyId}
                dateOfBirth={item.dateOfBirth}
                serviceUserName={item.userName}
                address={item.address}
                title=""
              />
              <Container className="actions">
                <p onClick={() => allocateToBroker(item)} className="link-button green">Allocate to broker</p>
                <p onClick={() => viewPackageHistory(item)} className="link-button green">View package history</p>
              </Container>
            </Container>
          ))}
          <Pagination
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={10}
            currentPage={pageNumber}
            changePagination={setPageNumber}
          />
        </Container>
        }
      </Container>
    </Container>
  );
};

export default SearchServiceUser;