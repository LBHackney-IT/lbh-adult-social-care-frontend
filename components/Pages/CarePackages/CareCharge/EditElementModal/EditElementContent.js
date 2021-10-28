import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getServiceUserPackagesRoute } from 'routes/RouteConstants';
import {
  useLookups,
  usePackageCareCharge,
  updateCareChargeReclaim,
  createCareChargeReclaim,
  useSingleCorePackageInfo,
} from 'api';
import { currency } from 'constants/strings';
import { careChargeAPIKeys } from 'constants/variables';
import { formatDate } from 'service';
import { addNotification } from 'reducers/notificationsReducer';
import CareChargesInfoStatic from '../CareChargesInfoStatic';
import CareChargesModalTitle from '../ModalComponents/CareChargesModalTitle';
import CareChargesInfoTitle from '../ModalComponents/CareChargesInfoTitle';
import CareChargesModalActions from '../ModalComponents/CareChargesModalActions';

const EditElementContent = ({ data, headerText, onClose }) => {
  const [isLoading, toggleLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data: packageInfo } = useSingleCorePackageInfo(packageId);
  const { actualReclaims } = usePackageCareCharge(packageId);
  const { data: claimCollectors } = useLookups('claimCollector');

  const previousData = useMemo(() => {
    const ids = data.map((el) => el.reclaimId).filter((id) => id);

    if (ids.length === 0) return null;

    const initialData = ids.reduce((acc, id) => {
      const reclaim = actualReclaims.find((charge) => charge.id === id);
      acc.push(reclaim);
      return acc;
    }, []);

    return initialData.map((reclaim) => {
      const { cost, subType, claimCollector, claimReason, description, startDate, endDate } = reclaim;
      const collectedByLabel = claimCollectors.find((el) => el.id === claimCollector)?.name;

      if (subType === careChargeAPIKeys.provisional) {
        return {
          id: reclaim.id,
          displayData: [
            { label: 'Provisional care charge (pre-assessement)', value: '' },
            { label: 'Cost per week', value: cost ? `${currency.euro}${cost}` : '' },
            {
              label: 'Collected by',
              value: <span className="text-capitalize">{collectedByLabel}</span>,
            },
            { label: 'Collecting reason', value: claimReason },
            { label: 'Notes', value: description },
          ],
        };
      }

      return {
        id: reclaim.id,
        displayData: [
          {
            label: 'Residential SU contribution',
            value: subType === careChargeAPIKeys.less12 ? 'Without Property 1-12 weeks' : 'Without Property 13+ weeks',
          },
          { label: 'Value', value: cost ? `${currency.euro}${cost}` : '' },
          { label: 'Start date', value: formatDate(startDate) },
          { label: 'End date', value: formatDate(endDate) },
          { label: 'Type', value: <span className="text-capitalize">{collectedByLabel}</span> },
        ],
      };
    });
  }, [actualReclaims, data]);

  const goToPackages = useCallback(() => {
    router.push(getServiceUserPackagesRoute(packageInfo?.serviceUser?.id));
  }, [router, packageInfo]);

  const onConfirm = async () => {
    const createData = data.filter((el) => !el.reclaimId).map((el) => el.submitData);
    const editData = data.filter((el) => el.reclaimId).map((el) => ({ ...el.submitData, id: el.reclaimId }));

    const getClaimCollectorId = (claimCollector) => {
      // claimCollector for less12/more12 looks like 'residentialLess12-1', so need to remove part before dash
      if (String(claimCollector)?.includes('-')) {
        return claimCollector?.split('-')[1];
      }
      return claimCollector;
    };

    const requests = [];

    toggleLoading(true);

    if (createData.length > 0) {
      createData.forEach((reclaim) => {
        requests.push(
          createCareChargeReclaim(packageId, {
            ...reclaim,
            carePackageId: packageId,
            claimCollector: getClaimCollectorId(reclaim.claimCollector),
            endDate: reclaim.isOngoing ? undefined : reclaim.endDate,
          })
        );
      });
    }

    if (editData.length > 0) {
      editData.forEach((reclaim) => {
        requests.push(
          updateCareChargeReclaim(packageId, {
            ...reclaim,
            claimCollector: getClaimCollectorId(reclaim.claimCollector),
            endDate: reclaim.isOngoing ? undefined : reclaim.endDate,
          })
        );
      });
    }

    try {
      await Promise.all(requests);
      dispatch(addNotification({ text: 'Success!', className: 'success' }));
      onClose();
      goToPackages();
    } catch (error) {
      dispatch(addNotification({ text: error }));
      onClose();
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <>
      <CareChargesModalTitle title={headerText} />

      {previousData && (
        <>
          <CareChargesInfoTitle title="PREVIOUS ELEMENT" />
          {previousData.map((el) => (
            <CareChargesInfoStatic key={el.id} data={el.displayData} />
          ))}
        </>
      )}

      <CareChargesInfoTitle title="NEW ELEMENT" />
      {data.map((el) => (
        <CareChargesInfoStatic key={el.id} data={el.displayData} />
      ))}

      <CareChargesModalActions
        actions={[
          { title: 'Confirm', handler: onConfirm, isLoading },
          { title: 'Edit', handler: onClose, className: 'without-background' },
          { title: 'Cancel', handler: goToPackages, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default EditElementContent;
