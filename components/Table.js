import React from 'react';
import SortTable from './SortTable';
import Checkbox from './Checkbox';

const Table = ({ onClickTableRow, rows, rowsRules = {}, className = '', sortBy, sorts }) => {
  const clickRow = (item) => {
    if (onClickTableRow) {
      onClickTableRow(item);
    }
  };

  return (
    <div className={`table ${className}`}>
      <SortTable sortBy={sortBy} sorts={sorts} />
      {!rows.length ? (
        <p>No Table Data</p>
      ) : (
        rows.map((item) => {
          return (
            <div key={item.id} onClick={() => clickRow(item)} className="table__row">
              <div onClick={() => clickRow(item)} className="table__row-column-items">
                {Object.getOwnPropertyNames(item).map((rowItemName) => {
                  const currentRowRule = rowsRules[rowItemName] || '';

                  if (currentRowRule?.component)
                    return <React.Fragment key={`${rowItemName}${item.id}`}>{currentRowRule.component}</React.Fragment>;
                  if (currentRowRule?.hide) return <React.Fragment key={`${rowItemName}${item.id}`} />;

                  const currentValue =
                    (currentRowRule?.value !== undefined && currentRowRule.value) ||
                    (currentRowRule?.fieldName && item[currentRowRule.fieldName]) ||
                    item[rowItemName];
                  const calculatedClassName = currentRowRule?.getClassName
                    ? currentRowRule.getClassName(item[rowItemName]).toLowerCase()
                    : '';

                  if (currentRowRule?.type === 'checkbox')
                    return (
                      <Checkbox
                        key={`${rowItemName}${item.id}`}
                        onChange={currentRowRule.onChange}
                        checked={currentValue}
                      />
                    );

                  return (
                    <div
                      onClick={(e) => {
                        const onPropClick = rowsRules[rowItemName].onClick;
                        if (!currentRowRule.onClick) return;
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
            </div>
          );
        })
      )}
    </div>
  );
};

export default Table;

// EXAMPLE
//const rowsRules = {
//     typeOfCare: {
//       getClassName: () => 'link-button',
//       onClick: (item, prop) => console.log(item, prop),
//       fieldName: 'customObjectFieldName',
//     },
//     id: {
//       hide: true,
//     },
//     stage: {
//       component: <SomeComponent />
//       getClassName: (value) => `${value} table__row-item-status`,
//     },
//     owner: {
//       value: customValue
//       getClassName: (value) => `${value} table__row-item-status border-radius-0`,
//     },
//   }
