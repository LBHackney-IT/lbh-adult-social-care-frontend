import React from 'react';

const removeExcessiveWhitespace = (str) => str?.replace(/\s+/g, ' ');

export const getHighlightedSearchQuery = (text, highlightText = '') => {
  const results = removeExcessiveWhitespace(text)?.split(
    new RegExp(`(${removeExcessiveWhitespace(highlightText)})`, 'gi')
  );
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
