import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import {Button} from "../../components/Button";
import {uniqueID} from "../../../service/helpers";

const Pagination = ({ itemsCount, from, to, currentPage, totalCount }) => {
  const pushRoute = useHistory().push;
  const location = useLocation();

  //NOTTESTEDCODE
  const changePagination = page => {
    console.log(location);
    pushRoute(`${location.pathname}?page=${page}`);
  };

  return (
    <div className='pay-runs__table-pagination'>
      <p>Showing {itemsCount === 0 ? 0 : `${from}-${itemsCount} of ${totalCount}`}</p>
      <div className='pay-runs__table-pagination-actions'>
        {[...Array(totalCount / to).keys()].map(item => {
          const currentPageClass = item === currentPage ? ' pay-runs__table-pagination-item-active' : '';
          return (
            <Button
              key={uniqueID()}
              onClick={() => changePagination(item+1)}
              className={`pay-runs__table-pagination-button${currentPageClass}`}>
              {item+1}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
