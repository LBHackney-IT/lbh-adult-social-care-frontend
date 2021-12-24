import React, { useState } from 'react';

export const Tabs = ({ callback, initialTab = 0, children, title, tabs }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const handleClick = (index) => {
    setActiveTab(index);
    if (callback) callback(index);
  };
  return (
    <div className="js-enabled govuk-tabs lbh-tabs" data-module="govuk-tabs">
      {title && <h2 className="govuk-tabs__title">{title}</h2>}
      <ul className="govuk-tabs__list">
        {tabs.map((tab, index) => (
          <li
            key={tab}
            role="presentation"
            className={`govuk-tabs__list-item govuk-tabs__list-item${index === activeTab ? '--selected' : ''}`}
            onClick={() => handleClick(index)}
            onKeyPress={(e) => {
              if (e.key === "Enter" ) handleClick(index)
            }}
          >
            <a tabIndex="0" role="tab" className="govuk-tabs__tab">
              {tab}
            </a>
          </li>
        ))}
      </ul>
      {React.Children.map(children, (child, index) => React.cloneElement(child, { id: index, activeTab }))}
    </div>
  );
};
