import React from 'react';

export const Tab = ({ children, activeTab, id }) => {
  const active = activeTab.toString();
  const newId = id.toString();
  const isVisible = active === newId ? '' : '--hidden';
  return active === newId ? (
    <section className={`govuk-tabs__panel${isVisible}`} id="past-day">
      {children}
    </section>
  ) : null;
};
