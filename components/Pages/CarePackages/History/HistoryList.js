import React, { memo } from 'react';

const testHistoryData = new Array(10).fill('').map(() => ({
  date: '06.06.2022',
  name: 'Remika',
  text: 'Cancelled care charges',
  description:
    Math.random() > 0.3
      ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer convallis' +
        ' vel elit sed interdum. Quisque sagittis, orci eu imperdiet porta, risus quam dignissim felis, id interdum' +
        ' justo nunc sed ligula. Phasellus urna orci, aliquet id tincidunt vel, viverra aliquet magna. Nam sagittis' +
        ' elementum nunc, sit amet dignissim tortor bibendum nec'
      : '',
}));

const HistoryList = () => (
  <div className="history__list">
    {/* todo: replace index with ID during integration */}
    {testHistoryData.map((item, index) => (
      <div key={index}>
        <p>{item.date}</p>

        <div>
          <span>{item.name}</span>
          <span className="history__list-dot">•</span>
          <span>{item.text}</span>
        </div>

        {item.description && <span>{item.description}</span>}
      </div>
    ))}
  </div>
);

export default memo(HistoryList);
