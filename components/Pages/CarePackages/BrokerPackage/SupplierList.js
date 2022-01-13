import React, { useEffect, useMemo, useState } from 'react';
import { Container, Loading, HorizontalSeparator, InsetText } from 'components';
import { useSuppliers } from 'api';
import AlternativePagination from 'components/AlternativePagination';
import { TreeView } from 'components/HackneyDS/TreeView';
import { SupplierListItem } from './SupplierListItem';

export const SupplierList = ({ searchTerm, newSearch, setNewSearch, setValue }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [resultsFor, setResultsFor] = useState(searchTerm);
  const params = useMemo(() => ({ supplierName: resultsFor, pageNumber }), [resultsFor, pageNumber]);
  const { data: searchResults, isLoading: suppliersLoading } = useSuppliers({
    params,
    shouldFetch: resultsFor,
  });

  useEffect(() => {
    if (newSearch) {
      setResultsFor(searchTerm);
      setNewSearch(false);
    }
  }, [newSearch]);

  const renderSupplyItem = (item) => (
    <SupplierListItem
      supplier={item}
      setValue={setValue}
      searchTerm={resultsFor}
      isParent={item?.children?.length > 0}
    />
  );

  return (
    <Container display="flex" flexDirection="column" alignSelf="stretch">
      <Loading className="loading" isLoading={suppliersLoading} />
      {!suppliersLoading && (
        <>
          <p>
            Showing results for <strong>{resultsFor}</strong>
          </p>
          <HorizontalSeparator height="10px" />
          <Container display="flex" flexDirection="column">
            {searchResults.data.length ? (
              <TreeView
                items={searchResults.data}
                renderItem={renderSupplyItem}
                renderChildren={(item) => item?.subSuppliers ?? []}
              />
            ) : (
              <InsetText>
                No results for <strong>{resultsFor}</strong> found
              </InsetText>
            )}
            <HorizontalSeparator height="10px" />
            <AlternativePagination
              pageSize={searchResults.pagingMetaData.pageSize}
              totalCount={searchResults.pagingMetaData.totalCount}
              totalPages={searchResults.pagingMetaData.totalPages}
              currentPage={pageNumber}
              changePagination={setPageNumber}
            />
          </Container>
        </>
      )}
    </Container>
  );
};
