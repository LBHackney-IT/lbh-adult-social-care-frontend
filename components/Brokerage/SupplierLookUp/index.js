import React, { useState } from 'react';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container } from '../../HackneyDS';
import BrokeragePackageDates from '../BrokeragePackageDates';
import BrokerageSearchSupplier from './BrokerageSearchSupplier';
import BrokerageContainerHeader from '../BrokerageContainerHeader';

export const SupplierLookUp = ({ searchResults }) => {
  const [isOngoing, setIsOngoing] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const [packageDates, setPackageDates] = useState({
    dateFrom: null,
    dateTo: null,
  });

  const clickBack = () => {
    alert('Click back');
  };

  const clickSave = () => {
    alert('Click save');
  };

  return (
    <div className="supplier-look-up brokerage">
      <BrokerageHeader/>
      <Container className="brokerage__container-main">
        <BrokerageContainerHeader title="Broker package"/>
        <Container>
          <h3 className="brokerage__item-title">Nursing Care</h3>
          <BrokeragePackageDates
            dates={packageDates}
            label="Package dates"
            setDates={(field, date) => setPackageDates(prevState => ({ ...prevState, [field]: date }))}
            isOngoing={isOngoing}
            setIsOngoing={setIsOngoing}
          />
        </Container>
        <BrokerageSearchSupplier searchResults={searchResults} setSelectedItem={setSelectedItem}/>
        <Container className="brokerage__actions">
          <Button handler={clickBack} className="brokerage__back-button">Back</Button>
          <Button handler={clickSave}>Save and continue</Button>
        </Container>
      </Container>
    </div>
  );
};