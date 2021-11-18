import React, { useState } from 'react';
import { Container, AlternativePagination } from '../../../HackneyDS';
import { CollapseGreenDownIcon } from '../../../Icons';
import BrokerageSupplierCard from '../BrokerageSupplierCard';

const SupplierLookUpSelector = ({
  items,
  setSelectedItem,
  totalCount,
  pageSize = 10,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const changExpandedItems = (id) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  return (
    <Container className="supplier-look-up-selector">
      {items?.map((item) => {
        const { id, supplierName, address, sites } = item;
        const isExpandedItem = expandedItems.includes(id);
        return (
          <React.Fragment key={id}>
            <Container className="brokerage__supplier-card">
              <p className="brokerage__supplier-card-name">
                {supplierName}
                <span>{id}</span>
              </p>
              <p className="brokerage__supplier-card-address">{address}</p>
              {sites ? (
                <Container
                  onClick={() => changExpandedItems(id)}
                  className={`brokerage__supplier-card--actions${isExpandedItem ? ' expanded' : ''}`}
                  display="flex"
                  alignItems="center"
                >
                  <p>{sites.length} sites</p>
                  <p>{isExpandedItem ? 'Collapse' : 'Expand'}</p>
                  <CollapseGreenDownIcon />
                </Container>
              ) : (
                <p onClick={() => setSelectedItem(item)} className="link-button hackney-btn-green">
                  Select
                </p>
              )}
            </Container>
            {isExpandedItem && (
              <Container className="brokerage__supplier-card-inner-container">
                {sites.map((site) => (
                  <BrokerageSupplierCard key={site.id} cardInfo={site} setSelectedItem={setSelectedItem} />
                ))}
              </Container>
            )}
          </React.Fragment>
        );
      })}
      <AlternativePagination
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
