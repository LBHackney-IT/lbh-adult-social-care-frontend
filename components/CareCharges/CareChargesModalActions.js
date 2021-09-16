import React from 'react';
import { Button } from '../HackneyDS';

const CareChargesModalActions = ({ actions = [] }) => {
  return (
    <div className='care-charges-modal__actions'>
      {actions.map(({ handler, title, className }) => (
        handler ? <Button key={title} handler={handler} className={className}>
          {title}
        </Button> : <React.Fragment key={title}></React.Fragment>
      ))}
    </div>
  );
};

export default CareChargesModalActions;