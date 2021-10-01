import React, { useState } from 'react';
import { Container } from '../../HackneyDS';
import { CollapseGreenDownIcon } from '../../Icons';
import Pagination from '../../Payments/Pagination';

const SupplierLookUpSelector = ({
  items,
  setSelectedItem,
  totalCount,
  pageSize = 10,
  totalPages,
}) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const changExpandedItems = id => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(item => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  return (
    <Container className="supplier-look-up-selector">
      {items.map(({ id, name, address, sites }) => {
        const isExpandedItem = expandedItems.includes(id);
        return (
          <>
            <Container className="brokerage__action-card">
              <p className="brokerage__action-card-name">{name}<span>{id}</span></p>
              <p className="brokerage__action-card-address">{address}</p>
              {sites ?
                <Container
                  onClick={() => changExpandedItems(id)}
                  className={`brokerage__action-card--actions${isExpandedItem ? ' expanded' : ''}`}
                  display="flex"
                  alignItems="center"
                >
                  <p>{sites.length} sites</p>
                  <p>{isExpandedItem ? 'Collapse' : 'Expand'}</p>
                  <CollapseGreenDownIcon/>
                </Container>
                : <p onClick={() => setSelectedItem(id)} className="link-button hackney-btn-green">Select</p>
              }
            </Container>
            {isExpandedItem &&
              <Container className='brokerage__action-card-inner-container'>
                {sites.map(({ name, id, address }) => (
                <Container className="brokerage__action-card">
                  <p className='brokerage__action-card-name'>{name} <span>{id}</span></p>
                  <p className='brokerage__action-card-address'>{address}</p>
                  <p onClick={() => setSelectedItem(id)} className="link-button hackney-btn-green">Select</p>
                </Container>
                ))}
              </Container>

            }
          </>
        );
      })}
      <Pagination
        currentPage={currentPage}
        changePagination={setCurrentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
      />
    </Container>
  );
};

export default SupplierLookUpSelector;