import React from 'react';
import { Button } from '../Button';
import { uniqueID } from '../../service/helpers';

const Pagination = ({
  className,
  totalPages = 1,
  changePagination,
  actionButton,
  pageSize = 0,
  from = 0,
  to = 0,
  currentPage = 1,
  totalCount = 0,
}) => {
  if(totalCount === 0) {
    return <></>;
  }

  const onChangePagination = (item) => {
    changePagination(item);
  };

  const fromCalc = from || currentPage * pageSize - (pageSize - 1);
  const toCalc = to || currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize;

  return (
    <div className={`table-pagination${className ? ` ${className}` : ''}`}>
      {actionButton && (
        <Button disabled={actionButton.disabled} className={actionButton.className} onClick={actionButton.onClick}>
          {actionButton.text}
        </Button>
      )}

      <p className="table-pagination-info">Showing {`${fromCalc}-${toCalc} of ${totalCount} items`}</p>

      <div className="table-pagination-actions">
        {totalCount === 0 ? (
          <Button
            key={uniqueID()}
            onClick={() => onChangePagination(1)}
            className="table-pagination-button table-pagination-item-active"
          >
            1
          </Button>
        ) : (
          [...Array(Math.round(totalPages)).keys()].map((item) => {
            const currentPageClass = String(item + 1) === String(currentPage) ? ' table-pagination-item-active' : '';
            return (
              <Button
                key={uniqueID()}
                onClick={() => onChangePagination(item + 1)}
                className={`table-pagination-button${currentPageClass}`}
              >
                {item + 1}
              </Button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Pagination;
