import React from 'react';
import { Button } from '../Button';
import DaySummary from './DaySummary';

const SummaryDataList = ({ slicedText, summaryData, edit, remove, confirmPackage = true }) => (
  <>
    {summaryData.map((summaryItem) => (
      <DaySummary
        slicedText={slicedText}
        edit={edit}
        remove={remove}
        key={summaryItem.id}
        daySummaryItem={summaryItem}
      />
    ))}
    {confirmPackage && (
      <div className="mt-5 level">
        <div className="level-item level-right">
          <Button onClick={() => alert('Confirm Package')}>Confirm Package</Button>
        </div>
      </div>
    )}
  </>
);

export default SummaryDataList;
