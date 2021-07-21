import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../Button';
import { uniqueID } from '../../service/helpers';

const Pagination = ({ classes, changePagination, actionButton, pathname, itemsCount = 0, from = 0, currentPage = 1, totalCount = 0 }) => {
  const router = useRouter();
  const finalPage = currentPage !== undefined ? currentPage : router.query.page;

  const localChangePagination = (page) => {
    const pageQuery = `?page=${page}`;
    router.push(pathname ? `${pathname}${pageQuery}` : `${router.pathname}${pageQuery}`);
  };

  const onChangePagination = (item) => {
    if(changePagination) {
      changePagination(item + 1)
    } else {
      localChangePagination(item + 1)
    }
  }

  useEffect(() => {
    router.replace(`${router.pathname}?page=1`);
  }, []);

  return (
    <div className={`table-pagination${classes ? ` ${classes}` : ''}`}>
      {actionButton && (
        <Button disabled className={actionButton.classes} onClick={actionButton.onClick}>
          {actionButton.text}
        </Button>
      )}
      <p className="table-pagination-info">Showing {itemsCount === 0 ? 0 : `${from}-${itemsCount} of ${totalCount}`}</p>
      <div className="table-pagination-actions">
        {totalCount === 0 ?
          <Button
            key={uniqueID()}
            onClick={() => onChangePagination(1)}
            className="table-pagination-button table-pagination-item-active"
          >
            1
          </Button>
            :
          [...Array(Math.round(totalCount / itemsCount)).keys()].map((item) => {
          const currentPageClass = String(item + 1) === String(finalPage) ? ' table-pagination-item-active' : '';
          return (
            <Button
              key={uniqueID()}
              onClick={() => onChangePagination(item+1)}
              className={`table-pagination-button${currentPageClass}`}
            >
              {item + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
