import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import {Button} from "../../components/Button";
import {uniqueID} from "../../../service/helpers";

const Pagination = ({ itemsCount, from, to, currentPage, totalCount }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pushRoute = useHistory().push;
  const finalPage = currentPage !== undefined ? currentPage : query.get('page');

  //NOTTESTEDCODE
  const changePagination = page => {
    pushRoute(`${location.pathname}?page=${page}`);
  };

  return (
    <div className='pay-runs__table-pagination'>
      <p className='pay-runs__table-pagination-info'>Showing {itemsCount === 0 ? 0 : `${from}-${itemsCount} of ${totalCount}`}</p>
      <div className='pay-runs__table-pagination-actions'>
        {[...Array(totalCount / to).keys()].map(item => {
          const currentPageClass = item+1 == finalPage ? ' pay-runs__table-pagination-item-active' : '';
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
