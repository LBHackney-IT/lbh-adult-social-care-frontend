import React, { useReducer, useMemo } from 'react';

const Accordion = ({ expandAll, children = [] }) => {
  const [mappedChildren, changeOpen] = useReducer(
    changeExpand,
    children.map((node) => {
      const nodeContent = [...node.props.children];
      nodeContent.key = node.key;
      nodeContent.getHeader = () => node.props.children?.find((el) => el.props.slot === 'header');
      nodeContent.getContent = () => node.props.children?.find((el) => el.props.slot === 'content');
      nodeContent.isExpanded = node.props.expanded ?? false;
      return nodeContent;
    })
  );
  const isAllExpands = !mappedChildren.find((el) => !el.isExpanded);

  const expandAllLabel = useMemo(() => (isAllExpands ? 'Close All' : 'Open All'), [isAllExpands]);

  const toggleExpandAll = () => {
    changeOpen(isAllExpands);
  };

  function changeExpand(state, action) {
    if (typeof action === 'boolean') {
      return state.map((el) => {
        el.isExpanded = !action;
        return el;
      });
    }
    const changedEl = state.find((el) => el === action);
    changedEl.isExpanded = !changedEl.isExpanded;
    return [...state];
  }

  return (
    <div className="govuk-accordion lbh-accordion js-enabled">
      {expandAll && (
        <button type="button" className="govuk-accordion__open-all" onClick={toggleExpandAll}>
          {expandAllLabel}
        </button>
      )}
      {mappedChildren.map((el) => (
        <div
          key={el.key}
          className={`govuk-accordion__section${(el.isExpanded || '') && ' govuk-accordion__section--expanded'}`}
        >
          <div className="govuk-accordion__section-header">
            <h5 className="govuk-accordion__section-heading">
              <button className="js-enabled govuk-accordion__section-button" onClick={() => changeOpen(el)}>
                {el.getHeader()}
                <span className="govuk-accordion__icon" />
              </button>
            </h5>
          </div>
          {el.isExpanded && (
            <div className="govuk-accordion__section-content">
              <ul className="lbh-list lbh-list--bullet">
                <li>{el.getContent()}</li>
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
