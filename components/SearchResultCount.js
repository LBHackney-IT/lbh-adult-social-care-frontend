import React from 'react';

const SearchResultCount = ({ count }) => {
  return (
    <p className="search-result-count">
      Showing {count} results
    </p>
  );
};

export default SearchResultCount;