import React, { useState } from 'react';

export const Tabs = ({ initialTab = 0, children, title, tabs }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  return (
    <div className="js-enabled govuk-tabs lbh-tabs" data-module="govuk-tabs">
      {title && <h2 className="govuk-tabs__title">{title}</h2>}
      <ul className="govuk-tabs__list">
        {tabs.map((tab, index) => (
          <li
            key={index}
            role="presentation"
            className={`govuk-tabs__list-item govuk-tabs__list-item${index === activeTab ? '--selected' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            <a tabIndex="0" role="tab" className="govuk-tabs__tab">
              {tabs[index]}
            </a>
          </li>
        ))}
      </ul>
      {React.Children.map(children, (child, index) => React.cloneElement(child, { id: index, activeTab }))}
    </div>
  );
};
