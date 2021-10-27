import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { useToggle } from 'react-use';
import { formatDate, getLoggedInUser } from 'service';
import { getServiceUserPackagesRoute } from 'routes/RouteConstants';
import {
  Button,
  Container,
  Breadcrumbs,
  BrokerageHeader,
  EndElementModal,
  EditElementModal,
  CancelElementModal,
  TitleSubtitleHeader,
  FinancialAssessment,
  ProvisionalCareCharge,
  ResidentialSUContribution,
} from 'components';
import { currency } from 'constants/strings';
import { collectedByOptions } from 'constants/variables';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
});

const useBreadcrumbs = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  return useMemo(
    () => [
      { text: 'Home', href: '/' },
      { text: 'Care charges', href: '/' },
      {
        text: 'Full Overview',
        href: getServiceUserPackagesRoute(packageId),
      },
      { text: 'Financial assessment' },
    ],
    [packageId]
  );
};

const useModal = () => useToggle(false);

const CareCharge = () => {
  const breadcrumbs = useBreadcrumbs();

  const [isOpenEdit, toggleEdit] = useModal();
  const [isOpenCancel, toggleCancel] = useModal();
  const [isOpenEnd, toggleEnd] = useModal();

  const [editData, setEditData] = useState([]);
  const [cancelData, setCancelData] = useState({});
  const [endData, setEndData] = useState({});

  const { handleSubmit, control, formState, setValue, getValues } = useForm({
    defaultValues: {
      provisional: {
        costPerWeek: '',
        collectedBy: '',
        reasonCollecting: '',
        notes: '',
      },
      residentialLess12: {
        value: '',
        claimedBy: '',
        startDate: null,
        endDate: null,
      },
      residentialMore12: {
        value: '',
        claimedBy: '',
        startDate: null,
        endDate: null,
        isOngoing: false,
      },
    },
  });

  const router = useRouter();
  const goToPackages = useCallback(() => {
    router.push(getServiceUserPackagesRoute('test'));
  }, [router]);

  const createProvisionalData = () => {
    const { collectedBy, costPerWeek, notes, reasonCollecting } = getValues('provisional');
    const collectedByLabel = collectedByOptions.find((el) => el.id === collectedBy)?.label;

    return [
      { label: 'Provisional care charge (pre-assessement)', value: '' },
      { label: 'Cost per week', value: costPerWeek ? `${currency.euro}${costPerWeek}` : '' },
      {
        label: 'Collected by',
        value: <span className="text-capitalize">{collectedByLabel}</span>,
      },
      { label: 'Collecting reason', value: reasonCollecting },
      { label: 'Notes', value: notes },
    ];
  };

  const createResidentialData = (formKey) => {
    const data = getValues(formKey);

    const claimedBy = data.claimedBy.split('-')[1];
    return [
      {
        label: 'Residential SU contribution',
        value: formKey === 'residentialLess12' ? 'Without Property 1-12 weeks' : 'Without Property 13+ weeks',
      },
      { label: 'Value', value: `${currency.euro}${data.value}` },
      { label: 'Start date', value: formatDate(data.startDate) },
      { label: 'End date', value: data.isOngoing ? 'Ongoing' : formatDate(data.endDate) },
      { label: 'Type', value: <span className="text-capitalize">{claimedBy}</span> },
    ];
  };

  const onEdit = () => {
    const editedForms = Object.keys(formState.dirtyFields);

    const data = [];

    if (editedForms.includes('provisional'))
      data.push({
        id: 'provisional',
        data: createProvisionalData(),
      });

    if (editedForms.includes('residentialLess12')) {
      data.push({
        id: 'residentialLess12',
        data: createResidentialData('residentialLess12'),
      });
    }

    if (editedForms.includes('residentialMore12')) {
      data.push({
        id: 'residentialMore12',
        data: createResidentialData('residentialMore12'),
      });
    }

    setEditData(data);

    toggleEdit();
  };

  const onCancel = (type) => {
    if (type === 'provisional') {
      setCancelData({ topItem: createProvisionalData() });
      toggleCancel();
      return;
    }

    const less12Data = createResidentialData('residentialLess12');
    const more12Data = createResidentialData('residentialMore12');

    const isMore12 = type === 'residentialMore12';

    setCancelData({
      topItem: isMore12 ? more12Data : less12Data,
      bottomItem: isMore12 ? less12Data : more12Data,
      checkboxLabel: isMore12 ? 'Cancel 1-12 contribution' : 'Cancel 13+ contribution',
    });

    toggleCancel();
  };

  const onEnd = (type) => {
    if (type === 'provisional') {
      setEndData({ data: createProvisionalData() });
    } else {
      setEndData({
        data: createResidentialData(type),
        formKey: type,
      });
    }

    toggleEnd();
  };

  const onSubmit = useCallback(() => {
    if (formState.isDirty) onEdit();
    else goToPackages();
  }, [formState.isDirty, onEdit, goToPackages]);

  return (
    <div className="care-charge">
      <BrokerageHeader />

      <Container maxWidth="1080px" margin="10px auto 60px" padding="0 60px">
        <Breadcrumbs values={breadcrumbs} />

        <TitleSubtitleHeader subTitle="Care Charges" title="Add financial assessment" />

        <ProvisionalCareCharge
          onCancel={() => onCancel('provisional')}
          onEnd={() => onEnd('provisional')}
          control={control}
        />

        <ResidentialSUContribution
          onCancel={() => onCancel('residentialLess12')}
          onEnd={() => onEnd('residentialLess12')}
          setValue={setValue}
          control={control}
        />

        <ResidentialSUContribution
          onCancel={() => onCancel('residentialMore12')}
          onEnd={() => onEnd('residentialMore12')}
          setValue={setValue}
          control={control}
          isMore12
        />

        <FinancialAssessment />

        <Container className="brokerage__actions">
          <Button className="brokerage__back-button">Back</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </Container>
      </Container>

      <EditElementModal isOpen={isOpenEdit} onClose={() => toggleEdit(false)} data={editData} />
      <CancelElementModal isOpen={isOpenCancel} onClose={() => toggleCancel(false)} data={cancelData} />
      <EndElementModal isOpen={isOpenEnd} onClose={() => toggleEnd(false)} data={endData} control={control} />
    </div>
  );
};

export default CareCharge;
