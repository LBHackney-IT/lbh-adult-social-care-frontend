import React, { memo, useEffect, useState } from 'react';
import Button from '../Button';
import { Input } from '../Input';
import { ArrowLeftIcon } from '../../Icons';

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
  siblingCount = 5,
}) => {
  if (totalCount === 0) {
    return <></>;
  }

  const [search, setSearch] = useState(null);
  const [placeholder, setPlaceholder] = useState('');

  const onChangePagination = (item) => {
    changePagination(item);
  };

  const onChangeSearchPageNumber = (value) => {
    if (!value) return setSearch(null);

    let newValue = value;

    if (value < 2) newValue = 1;
    if (value > totalPages - 1) newValue = totalPages;

    setSearch(newValue);
  };

  const onBlurSearch = () => {
    if (!search) setSearch(placeholder);

    onChangePagination(search || placeholder);
  };

  useEffect(() => {
    if (totalPages && currentPage > totalPages) {
      changePagination(1);
    }
  }, [totalPages]);

  useEffect(() => {
    if (search) {
      setPlaceholder(search);
    }
  }, [search]);

  useEffect(() => {
    setSearch(currentPage > 1 && currentPage < totalPages ? currentPage : null);
  }, [currentPage]);

  const fromCalc = from || currentPage * pageSize - (pageSize - 1);
  const toCalc = to || currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize;

  const numbersArray = [...Array(totalPages).keys()];
  const hasSibling = totalPages > siblingCount;
  const pagesArray = hasSibling ? [0, 'search', totalPages - 1] : numbersArray;

  return (
    <div className={`table-pagination${className ? ` ${className}` : ''}`}>
      {actionButton && (
        <Button disabled={actionButton.disabled} className={actionButton.className} onClick={actionButton.onClick}>
          {actionButton.text}
        </Button>
      )}

      <p className="table-pagination-info">Showing {`${fromCalc}-${toCalc} of ${totalCount} items`}</p>

      <div className="table-pagination-actions">
        {hasSibling && currentPage - 1 !== pagesArray[0] && (
          <Button onClick={() => onChangePagination(currentPage - 1)} className="table-pagination-button">
            <ArrowLeftIcon />
          </Button>
        )}
        {pagesArray.map((item) => {
          if (item === 'search') {
            return (
              <Input
                onFocus={() => setSearch('')}
                onBlur={onBlurSearch}
                pressEnter={() => onChangePagination(search)}
                placeholder={placeholder}
                className={`pagination-search${placeholder === currentPage ? ' filled' : ''}`}
                onChangeValue={onChangeSearchPageNumber}
                type="number"
                value={search}
              />
            );
          }

          const currentPageClass = String(item + 1) === String(currentPage) ? ' table-pagination-item-active' : '';
          return (
            <Button
              key={`page-${item + 1}`}
              onClick={() => onChangePagination(item + 1)}
              className={`table-pagination-button${currentPageClass}`}
            >
              {item + 1}
            </Button>
          );
        })}
        {hasSibling && currentPage !== totalPages && (
          <Button onClick={() => onChangePagination(++currentPage)} className="table-pagination-button arrow">
            <ArrowLeftIcon className="icon-animation-rotation" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(AlternativePagination);
