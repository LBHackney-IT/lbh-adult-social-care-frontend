import React, { useState } from 'react';

export const Pagination = ({ totalCount, currentPage, showOnlyCurrentPage, pageSize, onPageChange, siblingCount }) => {
  if (!totalCount) return null;

  const [activePage, setActivePage] = useState(currentPage);
  const firstResultOnPage = activePage * pageSize - pageSize + 1;
  const lastResultOnPage = activePage * pageSize;
  const pageCount = Math.ceil(totalCount / pageSize);
  const pageArray = Array.from(Array(pageCount));

  const handlePageChange = (newPage) => {
    if (newPage !== 0 && newPage <= pageCount) {
      setActivePage(newPage);
      if (onPageChange) onPageChange(newPage);
    }
  };

  return (
    <nav className="lbh-pagination">
      <div className="lbh-pagination__summary">{`Showing ${firstResultOnPage}—${
        lastResultOnPage > totalCount ? totalCount : lastResultOnPage
      } of ${totalCount} results`}</div>
      <ul className="lbh-pagination__list">
        <li
          className={`lbh-pagination__item${activePage - 1 === 0 ? '--disabled' : ''}`}
          onClick={() => handlePageChange(activePage - 1)}
        >
          <a className="lbh-pagination__link" aria-label="Previous page">
            <span aria-hidden="true" role="presentation">
              &laquo;
            </span>
            Previous
          </a>
        </li>
        {showOnlyCurrentPage && (
          <li className="lbh-pagination__item">
            <a className="lbh-pagination__link--current" aria-label="Page 1">
              {activePage}
            </a>
          </li>
        )}
        {pageArray.map((p, index) => {
          if (index + 1 >= activePage - siblingCount && index + 1 <= activePage + siblingCount)
            return (
              <li
                key={`${p}`}
                className="lbh-pagination__item"
                onClick={() => handlePageChange(index + 1)}
              >
                <a className={`lbh-pagination__link${activePage === index + 1 ? '--current' : ''}`} aria-label="Page 1">
                  {index + 1}
                </a>
              </li>
            );
          return null;
        })}
        <li
          className={`lbh-pagination__item${activePage === pageCount ? '--disabled' : ''}`}
          onClick={() => handlePageChange(activePage + 1)}
        >
          <a className="lbh-pagination__link" aria-label="Next page">
            Next
            <span aria-hidden="true" role="presentation">
              &raquo;
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
