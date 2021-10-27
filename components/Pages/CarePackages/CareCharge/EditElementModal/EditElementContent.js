import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { getServiceUserPackagesRoute } from 'routes/RouteConstants';
import CareChargesInfoStatic from '../CareChargesInfoStatic';
import CareChargesModalTitle from '../ModalComponents/CareChargesModalTitle';
import CareChargesInfoTitle from '../ModalComponents/CareChargesInfoTitle';
import CareChargesModalActions from '../ModalComponents/CareChargesModalActions';

const EditElementContent = ({ data, headerText, onClose }) => {
  const router = useRouter();

  const goToPackages = useCallback(() => {
    router.push(getServiceUserPackagesRoute('test'));
  }, [router]);

  const onConfirm = () => goToPackages();

  return (
    <>
      <CareChargesModalTitle title={headerText} />

      <CareChargesInfoTitle title="PREVIOUS ELEMENT" />
      {/* <CareChargesInfoStatic activeElements={activeElements} /> */}

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
