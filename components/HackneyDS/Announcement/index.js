import React from 'react';
import { getSlot } from '../index';

export default function Announcement ({ children = [], className }) {
  const nodeList = Array.isArray(children) ? children : [children];

  return (
    <section className={`lbh-announcement lbh-announcement--site${className ? ` ${className}` : ''}`}>
      <h3 className="lbh-announcement__title">{getSlot(nodeList, 'title')}</h3>
      <div className="lbh-announcement__content">{getSlot(nodeList, 'content')}</div>
    </section>
  );
}
