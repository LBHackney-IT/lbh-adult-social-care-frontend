import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cancelCareChargeReclaim, useSingleCorePackageInfo } from 'api';
import { addNotification } from 'reducers/notificationsReducer';
import { getServiceUserCareChargesRoute } from 'routes/RouteConstants';
import CareChargesModalActions from '../ModalComponents/CareChargesModalActions';
import CareChargesModalTitle from '../ModalComponents/CareChargesModalTitle';
import CareChargesInfoStatic from '../ModalComponents/CareChargesInfoStatic';
import { Checkbox } from '../../../../HackneyDS';
import Loading from '../../../../Loading';

const CancelElementContent = ({ data, headerText, onClose }) => {
  const [shouldCancelBottom, setShouldCancelBottom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showCheckbox = Boolean(data.bottomId);

  const dispatch = useDispatch();
  const router = useRouter();
  const { guid: carePackageId } = router.query;

  const { data: packageInfo } = useSingleCorePackageInfo(carePackageId);

  const onCancel = async () => {
    setIsLoading(true);

    await cancelCareChargeReclaim({ carePackageId, reclaimId: data.topId });

    if (shouldCancelBottom) {
      await cancelCareChargeReclaim({ carePackageId, reclaimId: data.bottomId });
    }

    setIsLoading(false);
    dispatch(addNotification({ text: 'Successfully cancelled!', className: 'success' }));
    onClose();
    router.push(getServiceUserCareChargesRoute(packageInfo?.serviceUser?.id));
  };

  return (
    <>
      <CareChargesModalTitle title={headerText} />

      <Loading isLoading={isLoading} />

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
          { title: 'Cancel element', handler: onCancel, isLoading, className: 'warning-button' },
          { title: 'Return', handler: onClose, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default CancelElementContent;
