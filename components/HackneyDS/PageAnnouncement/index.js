import React from 'react';
import { getSlot } from '../utils';

export default function PageAnnouncement({ children = [], warning, info }) {
  const generalClassList = `${warning ? ' lbh-page-announcement--warning' : ''}${
    info ? ' lbh-page-announcement--info' : ''
  }`;

  return (
    <section className={`lbh-page-announcement${generalClassList}`}>
      <h3 className="lbh-page-announcement__title">{getSlot(children, 'title')}</h3>
      <div className="lbh-page-announcement__content">{getSlot(children, 'content')}</div>
    </section>
  );
}
