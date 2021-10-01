import React, { useEffect, useState } from 'react';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container } from '../../HackneyDS';
import BrokeragePackageDates from '../BrokeragePackageDates';
import BrokerageSearchSupplier from './BrokerageSearchSupplier';

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

  useEffect(() => {
    if (selectedItem) {
      alert(selectedItem);
    }
  }, [selectedItem]);

  return (
    <div className="supplier-look-up brokerage">
      <BrokerageHeader/>
      <Container className="brokerage__container-main">
        <Container className="brokerage__container-header brokerage__container">
          <p>Build a care package</p>
          <h2>Broker package</h2>
        </Container>
        <Container>
          <h3 className="brokerage__item-title">Nursing Care</h3>
          <BrokeragePackageDates
            dates={packageDates}
            label='Package dates'
            setDates={setPackageDates}
            isOngoing={isOngoing}
            setIsOngoing={setIsOngoing}
          />
        </Container>
        <BrokerageSearchSupplier
          searchResults={searchResults}
          setSelectedItem={setSelectedItem}
        />
        <Container className='brokerage__actions'>
          <Button handler={clickBack} className="brokerage__back-button">Back</Button>
          <Button handler={clickSave}>Save and continue</Button>
        </Container>
      </Container>
    </div>
  );
};