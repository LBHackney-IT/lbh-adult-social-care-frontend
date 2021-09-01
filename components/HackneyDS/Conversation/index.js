import React from 'react';
import { format } from 'date-fns';

export default function Conversation({ conversation = [], hasDetails = true }) {
  return (
    <ul className="lbh-conversation">
      {conversation.map(({
        inBound,
        message,
        messageFromId,
        createdAt,
        userName,
      }) => {
        const isInBoundClass = inBound ? ' lbh-conversation__message--inbound' : '';
        return (
          <li className={`lbh-conversation__message${isInBoundClass}`}>
            <span className="govuk-visually-hidden">{messageFromId ? 'Sent: ' : 'Received: '}</span>
            <p className="lbh-body">{message}</p>
            <>
              {hasDetails &&
                <details className="lbh-conversation__details">
                  <summary className="lbh-conversation__summary">
                    <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
                      <path d="M2 2L8.5 8L15 2" stroke="white" strokeWidth="2"/>
                    </svg>
                    <span className="govuk-visually-hidden">Details</span>
                  </summary>
                  <div className="lbh-conversation__metadata">
                    <p className="lbh-body-xs">
                      Sent
                      {` 
                        ${format(createdAt, 'M')} 
                        ${format(createdAt, 'MMM')} 
                        ${format(createdAt, 'yyyy')} 
                        ${format(createdAt, 'p').toLowerCase()} 
                      ` }
                      by <strong>{userName}</strong>
                    </p>
                  </div>
                </details>
              }
              {isInBoundClass ?
                <svg
                  className="lbh-conversation__root"
                  width="12"
                  height="12"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path d="M0 21V0.5H20.5L0 21Z" fill="white"/>
                </svg> :
                <svg
                  className="lbh-conversation__root"
                  width="12"
                  height="12"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path d="M20.5 21V0.5H0L20.5 21Z" fill="#00664F"/>
                </svg>
              }
            </>
          </li>
        )
      })}
      {!!conversation?.length &&
        <li className="lbh-body-xs lbh-conversation__no-older">
          Showing oldest messages
        </li>
      }
    </ul>
  );
}