import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import {Button} from "../../components/Button";
import {uniqueID} from "../../../service/helpers";

const Pagination = ({ classes, actionButton, itemsCount, from, to, currentPage, totalCount }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pushRoute = useHistory().push;
  const finalPage = currentPage !== undefined ? currentPage : query.get('page');

  const changePagination = page => {
    pushRoute(`${location.pathname}?page=${page}`);
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
