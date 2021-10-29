import React from 'react';
import { Button } from '../../../../HackneyDS';

const CareChargesModalActions = ({ actions = [] }) => (
  <div className="care-charges-modal__actions">
    {actions.map(({ handler, title, className, isLoading }) =>
      handler ? (
        <Button key={title} onClick={handler} isLoading={isLoading} className={className}>
          {title}
        </Button>
      ) : (
        <React.Fragment key={title} />
      )
    )}
  </div>
);

export default CareChargesModalActions;
