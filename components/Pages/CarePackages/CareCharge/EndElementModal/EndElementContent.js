import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { addWeeks, intervalToDuration, parseISO } from 'date-fns';
import { useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { endCareChargeReclaim } from '../../../../../api';
import { addNotification } from '../../../../../reducers/notificationsReducer';
import { CARE_CHARGES_ROUTE } from '../../../../../routes/RouteConstants';
import CareChargesInfoStatic from '../ModalComponents/CareChargesInfoStatic';
import CareChargesModalActions from '../ModalComponents/CareChargesModalActions';
import CareChargesInfoTitle from '../ModalComponents/CareChargesInfoTitle';
import CareChargesModalTitle from '../ModalComponents/CareChargesModalTitle';
import DatePick from '../../../../DatePick';

const EndElementContent = ({ data, control, headerText, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [endDate, setEndDate] = useState(null);

  const formStateDate = useWatch({ control, name: `${data.formKey}.startDate` });
  const formEndDate = useWatch({ control, name: `${data.formKey}.endDate` });
  const isLess12 = data.formKey?.includes('12');

  useEffect(() => {
    if (formEndDate) setEndDate(formEndDate);
  }, [formEndDate]);

  const maxDate = useMemo(() => {
    if (isLess12) return addWeeks(parseISO(formStateDate), 12);
    return null;
  }, [isLess12, formStateDate]);

  const duration = useMemo(() => {
    if (formStateDate && endDate) {
      return intervalToDuration({ start: parseISO(formStateDate), end: endDate });
    }
    return null;
  }, [formStateDate, endDate]);

  const dispatch = useDispatch();
  const router = useRouter();
  const { guid: carePackageId } = router.query;

  const onEnd = async () => {
    try {
      setIsLoading(true);
      await endCareChargeReclaim({ carePackageId, reclaimId: data.id, endDate });
      dispatch(addNotification({ text: 'Successfully ended!', className: 'success' }));
      router.push(CARE_CHARGES_ROUTE);
      onClose();
    } catch (error) {
      dispatch(addNotification({ text: error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CareChargesModalTitle title={headerText} />

      <CareChargesInfoTitle title="Elements to be ended" />

      <CareChargesInfoStatic data={data.data}>
        <div className="end-element__picker">
          <DatePick
            setDate={setEndDate}
            dateValue={endDate}
            label="End date"
            minDate={formStateDate}
            maxDate={maxDate}
          />

          {duration && (
            <p className="edit-element__end-date-distance">
              ({duration.months} {duration.months === 1 ? 'month' : 'months'} {duration.days}
              {duration.days === 1 ? ' day' : ' days'})
            </p>
          )}
        </div>
      </CareChargesInfoStatic>

      <CareChargesModalActions
        actions={[
          { title: 'End element', handler: onEnd, isLoading },
          { title: 'Cancel', handler: onClose, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default EndElementContent;
