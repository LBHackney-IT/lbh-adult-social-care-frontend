import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import withSession from 'lib/session';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useToggle } from 'react-use';
import { formatDate, getLoggedInUser } from 'service';
import { careChargeAPIKeys, careChargeFormKeys } from 'constants/variables';
import { CARE_CHARGES_ROUTE, getServiceUserPackagesRoute } from 'routes/RouteConstants';
import { useLookups, usePackageCareCharge, useSingleCorePackageInfo } from 'api';

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

  const { data } = useSingleCorePackageInfo(packageId);

  return useMemo(
    () => [
      { text: 'Home', href: '/' },
      { text: 'Care charges', href: '/' },
      {
        text: 'Full Overview',
        href: getServiceUserPackagesRoute(data?.serviceUser?.id),
      },
      { text: 'Financial assessment' },
    ],
    [packageId]
  );
};

const useModal = () => useToggle(false);

const defaultValues = {
  [provisional]: {
    cost: '',
    claimCollector: '',
    claimReason: '',
    description: '',
  },
  [less12]: {
    cost: '',
    claimCollector: '',
    startDate: null,
    endDate: null,
  },
  [more12]: {
    cost: '',
    claimCollector: '',
    startDate: null,
    endDate: null,
    isOngoing: false,
  },
};

const CareCharge = () => {
  const breadcrumbs = useBreadcrumbs();

  const [isOpenEdit, toggleEdit] = useModal();
  const [isOpenCancel, toggleCancel] = useModal();
  const [isOpenEnd, toggleEnd] = useModal();

  const [editData, setEditData] = useState([]);
  const [cancelData, setCancelData] = useState({});
  const [endData, setEndData] = useState({});

  const router = useRouter();
  const { guid: packageId } = router.query;

  const { actualReclaims } = usePackageCareCharge(packageId);
  const { data: claimCollectors } = useLookups('claimCollector');
  const { data: packageInfo } = useSingleCorePackageInfo(packageId);

  useEffect(() => {
    if (packageInfo.settings?.isS117Client) router.replace(CARE_CHARGES_ROUTE);
  }, [packageInfo]);

  const { handleSubmit, control, formState, setValue, getValues, reset } = useForm({ defaultValues });

  useEffect(() => {
    if (!actualReclaims) return;

    if (actualReclaims.length) {
      const provisionalData = actualReclaims.find((el) => el.subType === careChargeAPIKeys.provisional) ?? {};
      const less12Data = actualReclaims.find((el) => el.subType === careChargeAPIKeys.less12) ?? {};
      const more12Data = actualReclaims.find((el) => el.subType === careChargeAPIKeys.more12) ?? {};

      reset({
        [provisional]: {
          cost: provisionalData.cost ?? '',
          claimCollector: provisionalData.claimCollector,
          claimReason: provisionalData.claimReason,
          description: provisionalData.description ?? '',
        },
        [less12]: {
          cost: less12Data.cost ?? '',
          claimCollector: less12Data.claimCollector ? `${less12}-${less12Data.claimCollector}` : null,
          startDate: less12Data.startDate,
          endDate: less12Data.endDate,
        },
        [more12]: {
          cost: more12Data.cost ?? '',
          claimCollector: more12Data.claimCollector ? `${more12}-${more12Data.claimCollector}` : null,
          startDate: more12Data.startDate,
          endDate: more12Data.endDate,
          isOngoing: false,
        },
      });
    } else {
      reset(defaultValues);
    }
  }, [actualReclaims]);

  const goToPackages = useCallback(() => {
    router.push(getServiceUserPackagesRoute(packageInfo?.serviceUser?.id));
  }, [router, packageInfo]);

  const getReclaimId = (subType) => actualReclaims.find((el) => el.subType === subType)?.id;

  const createProvisionalData = () => {
    const { claimCollector, cost, description, claimReason } = getValues(provisional);
    const collectedByLabel = claimCollectors.find((el) => el.id === claimCollector)?.name;

    return [
      { label: 'Provisional care charge (pre-assessement)', value: '' },
      { label: 'Cost per week', value: cost ? `${currency.euro}${cost}` : '' },
      {
        label: 'Collected by',
        value: <span className="text-capitalize">{collectedByLabel}</span>,
      },
      { label: 'Collecting reason', value: claimReason },
      { label: 'Notes', value: description },
    ];
  };

  const createResidentialData = (formKey) => {
    const data = getValues(formKey);

    const claimCollector = data.claimCollector?.split('-')[1];
    const claimCollectorName = claimCollectors.find((el) => el.id === Number(claimCollector))?.name;

    return [
      {
        label: 'Residential SU contribution',
        value: formKey === less12 ? 'Without Property 1-12 weeks' : 'Without Property 13+ weeks',
      },
      { label: 'Value', value: data.cost ? `${currency.euro}${data.cost}` : '' },
      { label: 'Start date', value: formatDate(data.startDate) },
      { label: 'End date', value: data.isOngoing ? 'Ongoing' : formatDate(data.endDate) },
      { label: 'Type', value: <span className="text-capitalize">{claimCollectorName}</span> },
    ];
  };

  const onEdit = (form) => {
    const editedForms = Object.keys(formState.dirtyFields);

    const data = [];

    if (editedForms.includes(provisional))
      data.push({
        id: careChargeFormKeys.provisional,
        displayData: createProvisionalData(),
        submitData: {
          ...form[careChargeFormKeys.provisional],
          subType: careChargeAPIKeys.provisional,
        },
        reclaimId: getReclaimId(careChargeAPIKeys.provisional),
      });

    if (editedForms.includes(less12)) {
      data.push({
        id: careChargeFormKeys.less12,
        displayData: createResidentialData(less12),
        submitData: {
          ...form[careChargeFormKeys.less12],
          subType: careChargeAPIKeys.less12,
        },
        reclaimId: getReclaimId(careChargeAPIKeys.less12),
      });
    }

    if (editedForms.includes(more12)) {
      data.push({
        id: careChargeFormKeys.more12,
        displayData: createResidentialData(more12),
        submitData: {
          ...form[careChargeFormKeys.more12],
          subType: careChargeAPIKeys.more12,
        },
        reclaimId: getReclaimId(careChargeAPIKeys.more12),
      });
    }

    setEditData(data);

    toggleEdit();
  };

  const onCancel = (type) => {
    if (type === provisional) {
      setCancelData({
        topItem: createProvisionalData(),
        topId: getReclaimId(careChargeAPIKeys.provisional),
      });
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
      topId: getReclaimId(isMore12 ? careChargeAPIKeys.more12 : careChargeAPIKeys.less12),
      bottomId: getReclaimId(isMore12 ? careChargeAPIKeys.less12 : careChargeAPIKeys.more12),
    });

    toggleCancel();
  };

  const onEnd = (type) => {
    if (type === provisional) {
      setEndData({
        id: getReclaimId(careChargeAPIKeys.provisional),
        data: createProvisionalData(),
      });
    } else {
      setEndData({
        id: getReclaimId(type === less12 ? careChargeAPIKeys.less12 : careChargeAPIKeys.more12),
        data: createResidentialData(type),
        formKey: type,
      });
    }

    toggleEnd();
  };

  const onSubmit = useCallback(
    (form) => {
      if (formState.isDirty) onEdit(form);
      else goToPackages();
    },
    [formState.isDirty, onEdit, goToPackages]
  );

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
          <Button className="brokerage__back-button" onClick={router.back}>
            Back
          </Button>
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
