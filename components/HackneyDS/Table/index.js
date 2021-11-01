import React from 'react';
import { useTable, useExpanded, useRowSelect } from 'react-table';

export const Table = ({
  hasHeader = true,
  rowsHaveHeader,
  columns,
  data,
  expandRowCallback,
  setSelectedRows,
  fixedTable,
  hasFooter,
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  cellClassName = '',
  onRowClick,
}) => {
  if(!data?.length) return <p className='lbh-table__no-results'>No results found</p>;

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
    <table className={`govuk-table lbh-table${fixedTable ? ' fixed-table' : ''}`} {...getTableProps()}>
      {hasHeader && (
        <thead className={`govuk-table__head ${headerClassName}`}>
          {headerGroups.map((headerGroup) => (
            <tr className="govuk-table__row" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  scope="col"
                  {...column.getHeaderProps([{ className: `govuk-table__header ${column.className || ''}` }])}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      )}
      <tbody className={`govuk-table__body ${bodyClassName}`} {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);

          const rowElement = row.cells.map((cell) => (
            <td className={`govuk-table__cell ${cellClassName}`} {...cell.getCellProps()}>
              {cell.render('Cell')}
            </td>
          ));
          return (
            <React.Fragment key={index}>
              <tr
                onClick={onRowClick ? () => onRowClick(row.original) : () => {}}
                className={`govuk-table__row${rowsHaveHeader ? ' with-row-header' : ''}`}
                {...row.getRowProps()}
              >
                {rowsHaveHeader ? (
                  <td colSpan={row.cells.length}>
                    <table>
                      <tr className="govuk-table__row-header">
                        <td colSpan={row.cells.length}>{rowsHaveHeader({ ...row.original })}</td>
                      </tr>
                      <tr>{rowElement}</tr>
                    </table>
                  </td>
                ) : (
                  rowElement
                )}
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
