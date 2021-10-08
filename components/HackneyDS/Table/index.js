import React from 'react';
import { useTable, useExpanded, useRowSelect } from 'react-table';

export const Table = ({ hasHeader = true, columns, data, expandRowCallback, setSelectedRows, hasFooter, headerClassName='', bodyClassName='', footerClassName='', cellClassName=''}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    rows,
    footerGroups,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    useExpanded,
    useRowSelect
  );

  React.useEffect(() => {
    if (setSelectedRows) setSelectedRows(selectedFlatRows);
  }, [setSelectedRows, selectedRowIds]);

  const renderRowSubComponent = React.useCallback(expandRowCallback, []);

  return (
    <table className="govuk-table lbh-table" {...getTableProps()}>
      {hasHeader && <thead className={`govuk-table__head ${headerClassName}`}>
        {headerGroups.map((headerGroup) => (
          <tr className="govuk-table__row" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                scope="col"
                {...column.getHeaderProps([{ className: `govuk-table__header ${column.className}` }])}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>}
      <tbody className={`govuk-table__body ${bodyClassName}`} {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <React.Fragment key={index}>
              <tr className="govuk-table__row" {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className={`govuk-table__cell ${cellClassName}`} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
              {row.isExpanded && renderRowSubComponent && (
                <tr className="govuk-table__row">
                  <td className="govuk-table__cell" colSpan={visibleColumns.length}>
                    {renderRowSubComponent({ row })}
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
      {hasFooter && (
        <tfoot className={`govuk-table__head ${footerClassName}`}>
          {footerGroups.map((group) => (
            <tr className="govuk-table__row" {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td className="govuk-table__footer" {...column.getFooterProps()}>
                  {column.render('Footer')}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      )}
    </table>
  );
};
