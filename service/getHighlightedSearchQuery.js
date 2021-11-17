import React from 'react';

export const getHighlightedSearchQuery = (text, highlightText) => {
  const results = text.split(new RegExp(`(${highlightText})`, 'gi'));
  return (
    <>
      {results.map((result) => (
        <span
          key={result}
          style={
            result.toLowerCase() === highlightText.toLowerCase()
              ? { fontWeight: '800', background: '#f7c242', color: '#000' }
              : {}
          }
        >
          {result}
        </span>
      ))}
    </>
  );
};
