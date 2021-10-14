import React from 'react';
import { Button } from '../../../HackneyDS';

const CareChargesModalActions = ({ actions = [] }) => {
  return (
    <div className='care-charges-modal__actions'>
      {actions.map(({ handler, title, className }, index) => (
        handler ? <Button key={title} handler={handler} className={className}>
          {title}
        </Button> : <React.Fragment key={title || index} />
      ))}
    </div>
  );
};

export default CareChargesModalActions;