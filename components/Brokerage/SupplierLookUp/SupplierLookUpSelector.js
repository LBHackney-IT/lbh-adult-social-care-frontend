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
  const [collapsedItems, setCollapsedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const changeCollapsedItems = id => {
    if (collapsedItems.includes(id)) {
      setSelectedItem(collapsedItems.filter(item => item !== id));
    } else {
      setSelectedItem([...collapsedItems, id]);
    }
  };

  return (
    <Container className="supplier-look-up-selector">
      {items.map(({ id, name, address, sites }) => {
        return (
          <Container className='brokerage__action-card'>
            <p>{name} <span>{id}</span></p>
            <p>{address}</p>
            {sites ?
              <Container>
                <p>{sites.length} sites</p>
                <Container>
                  <p onClick={() => changeCollapsedItems(id)}>Collapse</p>
                  <CollapseGreenDownIcon/>
                </Container>
              </Container>
              : <p onClick={() => setSelectedItem(id)} className="link-button hackney-btn-green">Select</p>
            }
            {collapsedItems.includes(id) &&
            sites.map(site => (
              <Container>
                <p>{site.name} <span>{site.id}</span></p>
                <p>{site.address}</p>
                <p onClick={() => setSelectedItem(site.id)} className="link-button hackney-btn-green">Select</p>
              </Container>
            ))
            }
          </Container>
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