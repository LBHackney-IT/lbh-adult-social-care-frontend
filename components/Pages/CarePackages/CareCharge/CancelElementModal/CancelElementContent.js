import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cancelCareChargeReclaim } from '../../../../../api';
import { addNotification } from '../../../../../reducers/notificationsReducer';
import { CARE_CHARGES_ROUTE } from '../../../../../routes/RouteConstants';
import CareChargesModalActions from '../CareChargesModalActions';
import CareChargesModalTitle from '../CareChargesModalTitle';
import CareChargesInfoStatic from '../CareChargesInfoStatic';
import { Checkbox } from '../../../../HackneyDS';

const CancelElementContent = ({ data, headerText, onClose }) => {
  const [shouldCancelBottom, setShouldCancelBottom] = useState(false);

  const showCheckbox = Boolean(data.bottomId);

  const dispatch = useDispatch();
  const router = useRouter();
  const { guid: carePackageId } = router.query;

  const onCancel = async () => {
    await cancelCareChargeReclaim({ carePackageId, reclaimId: data.topId });

    if (shouldCancelBottom) {
      await cancelCareChargeReclaim({ carePackageId, reclaimId: data.bottomId });
    }

    dispatch(addNotification({ text: 'Successfully cancelled!', className: 'success' }));
    onClose();
    router.push(CARE_CHARGES_ROUTE);
  };

  return (
    <>
      <CareChargesModalTitle title={headerText} />

      <div>
        <CareChargesInfoStatic data={data.topItem} />
      </div>

      {showCheckbox && (
        <>
          <Checkbox
            small
            className="care-charges-modal__cancel-checkbox"
            onChangeValue={setShouldCancelBottom}
            value={shouldCancelBottom}
            id="cancelContribution"
            label={data.checkboxLabel}
          />

          <div className={shouldCancelBottom ? '' : 'opacity-3'}>
            <CareChargesInfoStatic data={data.bottomItem} />
          </div>
        </>
      )}

      <p className="text-warning has-text-weight-bold">
        Warning: This will cancel the element, all
        <br />
        transactions will be reversed
      </p>

      <CareChargesModalActions
        actions={[
          { title: 'Cancel element', handler: onCancel, className: 'warning-button' },
          { title: 'Return', handler: onClose, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default CancelElementContent;
