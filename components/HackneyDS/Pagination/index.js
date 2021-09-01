import React from 'react';

export default function Pagination({ meta = {}, action }) {
  const { currentPage, from, lastPage, to, total } = meta;
  const currentPageClassList = ' lbh-pagination__link--current';
  const isPageCurrent = (n) => n + 1 === currentPage;
  const go = {
    next() {
      if (lastPage - currentPage) action(currentPage + 1);
    },
    prev() {
      if (currentPage - 1) action(currentPage - 1);
    },
    to(idx) {
      if (!isPageCurrent(idx)) action(idx + 1);
    },
  };

  return (
    <nav className="lbh-pagination">
      <div className="lbh-pagination__summary">{`Showing ${from}—${to} of ${total} results`}</div>
      <ul className="lbh-pagination">
        <li className="lbh-pagination__item">
          <a className="lbh-pagination__link" onClick={() => go.prev()}>
            &laquo; Previous
          </a>
        </li>
        {Array.from(Array(lastPage).keys()).map((item, idx) => (
          <li className="lbh-pagination__item" key={'page' + idx}>
            <span
              className={`lbh-pagination__link${isPageCurrent(idx) ? currentPageClassList : ''}`}
              onClick={() => go.to(idx)}
            >
              {idx + 1}
            </span>
          </li>
        ))}
        <li className="lbh-pagination__item">
          <a className="lbh-pagination__link" onClick={() => go.next()}>
            Next &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
}
