import React from 'react';
import { Button } from '../HackneyDS';

const CareChargesModalActions = ({ actions = []}) => {
  return (
    <div className='care-charges-modal__actions'>
      {actions.map(({ handler, title, className }) => (
        handler ? <Button handler={handler} className={className}>
          {title}
        </Button> : <></>
      ))}
    </div>
  )
};

export default CareChargesModalActions;