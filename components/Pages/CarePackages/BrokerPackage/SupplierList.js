import React, { useEffect, useMemo, useState } from 'react';
import { Container, Loading, HorizontalSeparator, InsetText } from 'components';
import { useSuppliers } from 'api';
import AlternativePagination from 'components/AlternativePagination';
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
              searchResults.data?.map((result, index) => (
                <>
                  <SupplierListItem supplier={result} setValue={setValue} searchTerm={resultsFor} />
                  {index < searchResults.data.length - 1 && <HorizontalSeparator height="10px" />}
                </>
              ))
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
