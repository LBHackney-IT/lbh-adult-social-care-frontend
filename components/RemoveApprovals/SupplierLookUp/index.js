import React, { useState } from 'react';
import RemoveApprovalsHeader from '../RemoveApprovalsHeader/RemoveApprovalsHeader';
import { Button, Container } from '../../HackneyDS';
import RemoveApprovalsPackageDates from '../RemoveApprovalsPackageDates';
import RemoveApprovalsSearchSupplier from './RemoveApprovalsSearchSupplier';

export const SupplierLookUp = ({ searchResults }) => {
  const [isOngoing, setIsOngoing] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const [packageDates, setPackageDates] = useState({
    dateFrom: null,
    dateTo: null,
    dayFrom: {
      label: 'From',
    },
    dayTo: {
      label: 'To',
    }
  });

  const clickBack = () => {
    alert('Click back');
  };

  const clickSave = () => {
    alert('Click save');
  };

  return (
    <div className="supplier-look-up">
      <RemoveApprovalsHeader/>
      <Container className="remove-approvals__container">
        <Container className="remove-approvals__container-header remove-approvals__default-container">
          <p>Build a care package</p>
          <h2>Broker package</h2>
        </Container>
        <Container>
          <h3 className='remove-approvals__item-title'>Nursing Care</h3>
          <RemoveApprovalsPackageDates
            dates={packageDates}
            setDates={setPackageDates}
            isOngoing={isOngoing}
            setIsOngoing={setIsOngoing}
          />
        </Container>
        <RemoveApprovalsSearchSupplier
          searchResults={searchResults}
          setSelectedItem={setSelectedItem}
        />
      </Container>
      <Container>
        <Button handler={clickBack} className="lbh-gray-button">Back</Button>
        <Button handler={clickSave}>Save and continue</Button>
      </Container>
    </div>
  );
};