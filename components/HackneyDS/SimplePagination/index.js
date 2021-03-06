import React from 'react';

export const SimplePagination = ({
  previousText = 'Previous page',
  nextText = 'Next page',
  totalCount,
  currentPage,
  showPageNumber,
  changePage,
  titles,
}) => {
  const previousTitleIndex = currentPage > totalCount ? totalCount - 2 : currentPage - 2;
  const previousCount = currentPage - 1 > totalCount ? totalCount : currentPage - 1;
  const nextCount = currentPage + 1 >= totalCount ? totalCount - 1 : currentPage + 1;

  const onChangePage = (e, page) => {
    if (changePage) {
      e.preventDefault();
      changePage(page);
    }
  };

  return (
    <nav className="lbh-simple-pagination">
      {currentPage > 1 && (
        <a
          onClick={(e) => onChangePage(e, currentPage - 1)}
          className="lbh-simple-pagination__link"
          href={currentPage - 1}
        >
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
            <path d="M10 1L2 9.5L10 18" strokeWidth="2" />
          </svg>
          {previousText}
          <span className="lbh-simple-pagination__title">
            {showPageNumber ? `${previousCount} of ${totalCount}` : titles[previousTitleIndex] || titles[0]}
          </span>
        </a>
      )}
      {currentPage < totalCount && (
        <a
          onClick={(e) => onChangePage(e, currentPage + 1)}
          className="lbh-simple-pagination__link lbh-simple-pagination__link--next"
          href={currentPage + 1}
        >
          {nextText}
          <span className="lbh-simple-pagination__title">
            {showPageNumber ? `${nextCount} of ${totalCount}` : titles[currentPage] || titles[0]}
          </span>
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
            <path d="M1 18L9 9.5L1 1" strokeWidth="2" />
          </svg>
        </a>
      )}
    </nav>
  );
};
