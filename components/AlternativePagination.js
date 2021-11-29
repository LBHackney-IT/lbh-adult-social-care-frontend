import React, { memo, useEffect } from 'react';
import { Button } from './HackneyDS';

const AlternativePagination = ({
  className,
  totalPages = 1,
  changePagination,
  actionButton,
  pageSize = 0,
  from = 0,
  to = 0,
  currentPage = 1,
  totalCount = 0,
  siblingCount = 2,
}) => {
  if (totalCount === 0) {
    return <></>;
  }

  const onChangePagination = (item) => {
    changePagination(item);
  };

  useEffect(() => {
    if (totalPages && currentPage > totalPages) {
      changePagination(1);
    }
  }, [totalPages]);

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
        {1 + siblingCount < currentPage && <Button onClick={() => onChangePagination(1)}>{1}</Button>}
        {totalCount === 0 ? (
          <Button key="page-1" onClick={() => onChangePagination(1)}>
            1
          </Button>
        ) : (
          [...Array(Math.round(totalPages)).keys()].map((item, index) => {
            const currentPageClass = String(item + 1) === String(currentPage) ? ' table-pagination-item-active' : '';
            if (index + 1 >= currentPage - siblingCount && index + 1 <= currentPage + siblingCount)
              return (
                <Button
                  key={`page-${item + 1}`}
                  onClick={() => onChangePagination(item + 1)}
                  className={`table-pagination-button${currentPageClass}`}
                >
                  {item + 1}
                </Button>
              );
            return null;
          })
        )}
        {Math.round(totalPages) > currentPage + siblingCount && (
          <Button onClick={() => onChangePagination(totalPages)}>{Math.round(totalPages)}</Button>
        )}
      </div>
    </div>
  );
};

export default memo(AlternativePagination);
