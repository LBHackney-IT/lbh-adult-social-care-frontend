import React from 'react';
import SummaryListItem from './SummaryListItem'

export const SummaryList = ({ summaryList, noBorder = false }) => {
  const noBorderClass = noBorder ? ' govuk-summary-list--no-border' : '';

  return (
    <dl className={`govuk-summary-list lbh-summary-list${noBorderClass}`}>
      {summaryList.map(({
        key,
        value,
        actions,
        noRowBorder,
        valueClassName = '',
        keyClassName = '',
        actionsClassName = '',
      }) => {
        const noRowBorderClass = noRowBorder ? ' govuk-summary-list__row--no-border' : '';
        return (
          <div key={key} className={`govuk-summary-list__row${noRowBorderClass}`}>
            <dt className={`govuk-summary-list__key ${keyClassName}`}>{key}</dt>
            <dd className={`govuk-summary-list__value ${valueClassName}`}>
              {Array.isArray(value) ? value.map(body => <p key={body} className='govuk-body'>{body}</p>) : value}
            </dd>
            {!actions ? <span className="govuk-summary-list__actions"/> :
              <dd className={`govuk-summary-list__actions ${actionsClassName}`}>
                <ul className="govuk-summary-list__actions-list">
                  {actions.map(({ name, href, handler }) => (
                      <SummaryListItem handler={handler} name={name} key={key} href={href} />
                    )
                  )}
                </ul>
              </dd>
            }
          </div>
        )
      })}
    </dl>
  )
};
