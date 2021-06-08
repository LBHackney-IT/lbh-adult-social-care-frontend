import React from "react";
import { useRouter } from "next/router";
import {Button} from "../Button";
import {uniqueID} from "../../service/helpers";

const Pagination = ({ classes, actionButton, itemsCount, from, to, currentPage, totalCount }) => {
  const router = useRouter();
  const finalPage = currentPage !== undefined ? currentPage : router.query.page;

  const changePagination = page => {
    router.push(`${router.pathname}?page=${page}`);
  };

  return (
    <div className={`table-pagination${classes ? ` ${classes}` : ''}`}>
      {actionButton && <Button className={actionButton.classes} onClick={actionButton.onClick}>{actionButton.text}</Button> }
      <p className='table-pagination-info'>Showing {itemsCount === 0 ? 0 : `${from}-${itemsCount} of ${totalCount}`}</p>
      <div className='table-pagination-actions'>
        {[...Array(totalCount / to).keys()].map(item => {
          const currentPageClass = String(item+1) === String(finalPage) ? ' table-pagination-item-active' : '';
          return (
            <Button key={uniqueID()}
              onClick={() => changePagination(item+1)}
              className={`table-pagination-button${currentPageClass}`}
            >
              {item+1}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
