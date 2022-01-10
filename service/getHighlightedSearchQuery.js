import React from 'react';

export const getHighlightedSearchQuery = (text, highlightText = '') => {
  const results = text?.split(new RegExp(`(${highlightText})`, 'gi'));
  return (
    <>
      {results?.map((result, i) => (
        <span
          // NOTE No good value for the key, as chars from the string might not be unique
          // eslint-disable-next-line react/no-array-index-key
          key={`${i}`}
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
