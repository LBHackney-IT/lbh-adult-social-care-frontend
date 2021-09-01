import React from 'react';
import { useTable, usePagination, useExpanded } from 'react-table';

export const Table = ({ columns, data, expandRowCallback }) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, visibleColumns, rows } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    useExpanded,
    usePagination
  );

  const renderRowSubComponent = React.useCallback(expandRowCallback, []);

  return (
    <table className="govuk-table lbh-table" {...getTableProps()}>
      <thead className="govuk-table__head">
        {headerGroups.map((headerGroup) => (
          <tr className="govuk-table__row" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th scope="col" className="govuk-table__header" {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="govuk-table__body" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <>
              <tr className="govuk-table__row" {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="govuk-table__cell" {...cell.getCellProps()}>
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
            </>
          );
        })}
      </tbody>
    </table>
  );
};
