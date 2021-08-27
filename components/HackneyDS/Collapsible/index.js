import React, { useReducer } from 'react';

export default function Collapsible({ children, collapsed = false }) {
  const [isCollapsed, changeCollapsed] = useReducer((state) => !state, collapsed);

  const getHeader = () => children?.find((el) => el.props.slot === 'title');
  const getContent = () => children?.find((el) => el.props.slot === 'content');

  return (
    <section className="lbh-collapsible" data-module="lbh-collapsible">
      <button
        type="button"
        aria-expanded={isCollapsed}
        data-behavior="lbh-collapsible-toggle"
        className="lbh-collapsible__button"
        onClick={changeCollapsed}
      >
        <h2 className="lbh-collapsible__heading">{getHeader()}</h2>
        <svg width="17" height="10" viewBox="0 0 17 10">
          <path d="M2 1.5L8.5 7.5L15 1.5" strokeWidth="3" />
        </svg>
      </button>
      {!isCollapsed && (
        <div className="lbh-collapsible__content" data-behavior="lbh-collapsible-content">
          {getContent()}
        </div>
      )}
    </section>
  );
}
