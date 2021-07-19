import React from "react";
import SortTable from "./SortTable";

const Table = ({
                    onClickTableRow,
                    rows,
                    rowsRules = {},
                    className = '',
                    sortBy,
                    sorts,
                  }) => {
  const clickRow = (item) => {
    if(onClickTableRow) {
      onClickTableRow(item);
    }
  };

  return (
    <div className={`table ${className}`}>
      <SortTable sortBy={sortBy} sorts={sorts} />
      {!rows.length ? <p>No Table Data</p> : rows.map(item => {
        return (
          <div key={item.id} onClick={() => clickRow(item)} className='table__row'>
            {Object.getOwnPropertyNames(item).map(rowItemName => {
              const currentRowRule = rowsRules[rowItemName] || '';

              if(currentRowRule?.hide) return <React.Fragment key={`${rowItemName}${item.id}`} />;

              const currentValue = currentRowRule?.value || item[rowItemName];
              const calculatedClassName = currentRowRule?.getClassName ? currentRowRule.getClassName(item[rowItemName]).toLowerCase() : '';

              return (
                <div onClick={(e) => {
                  const onPropClick = rowsRules[rowItemName].onClick;
                  if(!currentRowRule.onClick) return;
                  e.stopPropagation();
                  onPropClick(item, item[rowItemName]);
                }}
                     key={`${item[rowItemName]}${item.id}`}
                     className={`table__row-item ${calculatedClassName}`}
                >
                  <p>{currentValue}</p>
                </div>
              );
            })}
          </div>
        )
      })}
    </div>
  )
};

export default Table;
