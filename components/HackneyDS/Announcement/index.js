import React from 'react';

export default function Announcement({ children = [] }) {
  const nodeList = Array.isArray(children) ? children : [children];
  const getSlot = (name) => nodeList.find((el) => el.props.slot === name);
  return (
    <section className="lbh-announcement lbh-announcement--site">
      <div className="lbh-container">
        <h3 className="lbh-announcement__title">{getSlot('title')}</h3>
        <div className="lbh-announcement__content">{getSlot('content')}</div>
      </div>
    </section>
  );
}
