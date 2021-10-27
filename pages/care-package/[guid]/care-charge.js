import {
  Breadcrumbs,
  BrokerageHeader,
  Button,
  CancelElementModal,
  Container,
  EditElementModal,
  EndElementModal,
  FinancialAssessment,
  ProvisionalCareCharge,
  ResidentialSUContribution,
  TitleSubtitleHeader,
} from 'components';
import { currency } from 'constants/strings';
import { careChargeFormKeys, collectedByOptions } from 'constants/variables';
import withSession from 'lib/session';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { getServiceUserPackagesRoute } from 'routes/RouteConstants';
import { formatDate, getLoggedInUser } from 'service';

const { provisional, more12, less12 } = careChargeFormKeys;

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
      [provisional]: {
        costPerWeek: '',
        collectedBy: '',
        reasonCollecting: '',
        reasonCollectingOther: '',
      },
      [less12]: {
        value: '',
        claimedBy: '',
        startDate: null,
        endDate: null,
      },
      [more12]: {
        value: '',
        claimedBy: '',
        startDate: null,
        endDate: null,
        isOngoing: false,
      },
    },
  });

  const goToPackages = useCallback(() => {
    router.push(getServiceUserPackagesRoute('test'));
  }, [router]);

  const createProvisionalData = () => {
    const { collectedBy, costPerWeek, notes, reasonCollecting } = getValues(provisional);
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
        value: formKey === less12 ? 'Without Property 1-12 weeks' : 'Without Property 13+ weeks',
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

    if (editedForms.includes(provisional)) data.push({ id: provisional, data: createProvisionalData() });

    if (editedForms.includes(less12)) {
      data.push({ id: less12, data: createResidentialData(less12) });
    }

    if (editedForms.includes(more12)) {
      data.push({ id: more12, data: createResidentialData(more12) });
    }

    setEditData(data);

    toggleEdit();
  };

  const onCancel = (type) => {
    if (type === provisional) {
      setCancelData({ topItem: createProvisionalData() });
      toggleCancel();
      return;
    }

    const less12Data = createResidentialData(less12);
    const more12Data = createResidentialData(more12);

    const isMore12 = type === more12;

    setCancelData({
      topItem: isMore12 ? more12Data : less12Data,
      bottomItem: isMore12 ? less12Data : more12Data,
      checkboxLabel: isMore12 ? 'Cancel 1-12 contribution' : 'Cancel 13+ contribution',
    });

    toggleCancel();
  };

  const onEnd = (type) => {
    if (type === provisional) {
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
          onCancel={() => onCancel(provisional)}
          onEnd={() => onEnd(provisional)}
          control={control}
        />

        <ResidentialSUContribution
          onCancel={() => onCancel(less12)}
          onEnd={() => onEnd(less12)}
          setValue={setValue}
          control={control}
        />

        <ResidentialSUContribution
          onCancel={() => onCancel(more12)}
          onEnd={() => onEnd(more12)}
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
