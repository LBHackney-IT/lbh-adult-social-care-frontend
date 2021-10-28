import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { getServiceUserPackagesRoute } from 'routes/RouteConstants';
import { useLookups, usePackageCareCharge, useSinglePackageInfo } from 'api';
import { currency } from 'constants/strings';
import { careChargeAPIKeys } from 'constants/variables';
import { formatDate } from 'service';
import CareChargesInfoStatic from '../CareChargesInfoStatic';
import CareChargesModalTitle from '../ModalComponents/CareChargesModalTitle';
import CareChargesInfoTitle from '../ModalComponents/CareChargesInfoTitle';
import CareChargesModalActions from '../ModalComponents/CareChargesModalActions';

const EditElementContent = ({ data, headerText, onClose }) => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data: packageInfo } = useSinglePackageInfo(packageId);
  const { data: careChargeData } = usePackageCareCharge(packageId);
  const { data: claimCollectors } = useLookups('claimCollector');

  const previousData = useMemo(() => {
    const ids = data.map((el) => el.id);

    const initialData = ids.reduce((acc, id) => {
      const reclaim = careChargeData.find((charge) => charge.id === id);
      acc.push(reclaim);
      return acc;
    }, []);

    return initialData.map((reclaim) => {
      const { cost, subType, claimCollector, claimReason, description, startDate, endDate } = reclaim;
      const collectedByLabel = claimCollectors.find((el) => el.id === claimCollector)?.name;

      if (subType === careChargeAPIKeys.provisional) {
        return {
          id: reclaim.id,
          data: [
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
        data: [
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
  }, [careChargeData, data]);

  const goToPackages = useCallback(() => {
    router.push(getServiceUserPackagesRoute(packageInfo?.serviceUser?.id));
  }, [router, packageInfo]);

  const onConfirm = () => goToPackages();

  return (
    <>
      <CareChargesModalTitle title={headerText} />

      <CareChargesInfoTitle title="PREVIOUS ELEMENT" />
      {previousData.map((el) => (
        <CareChargesInfoStatic key={el.id} data={el.data} />
      ))}

      <CareChargesInfoTitle title="NEW ELEMENT" />
      {data.map((el) => (
        <CareChargesInfoStatic key={el.id} data={el.data} />
      ))}

      <CareChargesModalActions
        actions={[
          { title: 'Confirm', handler: onConfirm },
          { title: 'Edit', handler: onClose, className: 'without-background' },
          { title: 'Cancel', handler: goToPackages, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default EditElementContent;
