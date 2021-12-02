import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Breadcrumbs,
  Button,
  CancelElementModal,
  Container,
  EditElementModal,
  EndElementModal,
  Loading,
  ProvisionalCareCharge,
  ResidentialSUContribution,
  TitleSubtitleHeader,
  UploadFile,
} from 'components';
import { currency } from 'constants/strings';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useToggle } from 'react-use';
import { formatDate, useGetFile, useRedirectIfPackageNotExist } from 'service';
import { careChargeAPIKeys, careChargeFormKeys, collectingReasonOptions } from 'constants/variables';
import {
  CARE_CHARGES_ROUTE,
  getServiceUserPackagesRoute,
  useServerSideProps
} from 'routes/RouteConstants';
import { useLookups, usePackageCareCharge, usePackageDetails } from 'api';
import { addNotification } from 'reducers/notificationsReducer';
import * as yup from 'yup';
import { addDays } from 'date-fns';

const { provisional, more12, less12 } = careChargeFormKeys;

export const getServerSideProps = useServerSideProps();

const useBreadcrumbs = (serviceUserId) => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  return useMemo(
    () => [
      { text: 'Home', href: '/' },
      { text: 'Care Charges', href: '/' },
      {
        text: 'Full Overview',
        href: getServiceUserPackagesRoute(serviceUserId),
      },
      { text: 'Financial assessment' },
    ],
    [packageId]
  );
};

const useModal = () => useToggle(false);

const defaultValues = {
  assessmentFileId: null,
  assessmentFileName: null,
  assessmentFile: null,
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

const costSchema = yup.number().typeError('Only numbers allowed').required('Required field');
const claimCollectorSchema = yup.string().required('Required field');
const startDateSchema = yup.mixed().required('Required field');

const CareCharge = () => {
  const { data: packageInfo, isLoading: packageInfoLoading } = useRedirectIfPackageNotExist();
  const breadcrumbs = useBreadcrumbs(packageInfo?.serviceUser?.id);

  const [isOpenEdit, toggleEdit] = useModal();
  const [isOpenCancel, toggleCancel] = useModal();
  const [isOpenEnd, toggleEnd] = useModal();

  const [editData, setEditData] = useState([]);
  const [cancelData, setCancelData] = useState({});
  const [endData, setEndData] = useState({});

  const [errors, setErrors] = useState({
    [provisional]: {
      cost: false,
      claimCollector: false,
    },
    [less12]: {
      cost: false,
      claimCollector: false,
      startDate: false,
    },
    [more12]: {
      cost: false,
      claimCollector: false,
      startDate: false,
    },
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { guid: routerPackageId } = router.query;

  const { data: detailsData, isLoading: detailsLoading } = usePackageDetails(routerPackageId);

  const { startDate, endDate } = detailsData || {};

  const coreStartDate = startDate ? new Date(startDate) : null;
  const coreEndDate = endDate ? new Date(endDate) : null;

  const [packageId, setPackageId] = useState(null);

  const { handleSubmit, control, formState, setValue, getValues, reset, watch } = useForm({ defaultValues });

  const [assessmentFileId, assessmentFileName, assessmentFile] = watch(['assessmentFileId', 'assessmentFileName', 'assessmentFile']);

  const checkNewFile = () => assessmentFile?.name !== assessmentFileName;

  const { endDate: less12EndDateString } = watch(less12) || {};

  const less12EndDate = less12EndDateString ? addDays(new Date(less12EndDateString), 1) : null;

  const { isLoading: fileLoading } = useGetFile({
    fileId: assessmentFileId,
    fileName: assessmentFileName,
    setter: (newFile) => setValue('assessmentFile', newFile),
  });

  const { actualReclaims, isLoading: careChargeLoading } = usePackageCareCharge(packageId);
  const { data: claimCollectors, isLoading: lookupsLoading } = useLookups('claimCollector');

  useEffect(() => {
    setPackageId(routerPackageId);
    if (packageId && packageInfo.settings?.isS117Client && packageInfo.settings?.isS117ClientConfirmed === false) {
      router.replace(CARE_CHARGES_ROUTE);
    }
  }, [packageInfo, routerPackageId]);

  useEffect(() => {
    if (!actualReclaims) return;

    if (!actualReclaims.length) {
      reset(defaultValues);
      return;
    }

    const provisionalData = actualReclaims.find((el) => el.subType === careChargeAPIKeys.provisional) ?? {};
    const less12Data = actualReclaims.find((el) => el.subType === careChargeAPIKeys.less12) ?? {};
    const more12Data = actualReclaims.find((el) => el.subType === careChargeAPIKeys.more12) ?? {};

    const someOfFileName = provisionalData.assessmentFileName || less12Data.assessmentFileName || more12Data.assessmentFileName;
    const someOfFileId = provisionalData.assessmentFileId || less12Data.assessmentFileId || more12Data.assessmentFileId;

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
        startDate: less12Data.startDate ? new Date(less12Data.startDate) : null,
        endDate: less12Data.endDate ? new Date(less12Data.endDate) : null,
      },
      [more12]: {
        cost: more12Data.cost ?? '',
        claimCollector: more12Data.claimCollector ? `${more12}-${more12Data.claimCollector}` : null,
        startDate: more12Data.startDate ? new Date(more12Data.startDate) : null,
        endDate: more12Data.endDate ? new Date(more12Data.endDate) : null,
        isOngoing: false,
      },
      assessmentFile: null,
      assessmentFileId: someOfFileId,
      assessmentFileName: someOfFileName,
    });
  }, [actualReclaims]);

  const goToPackages = useCallback(() => {
    router.push(getServiceUserPackagesRoute(packageInfo?.serviceUser?.id));
  }, [router, packageInfo]);

  const validateFields = async (fields) => {
    const schemas = {
      cost: costSchema,
      claimCollector: claimCollectorSchema,
      startDate: startDateSchema,
    };

    const validationResults = await Promise.all(
      fields.map(async ({ value, field, formKey }) => {
        let isValid = true;
        let errorMessage = null;

        try {
          await schemas[field].validate(value);
        } catch (error) {
          isValid = false;
          errorMessage = error.message;
        }

        return { isValid, errorMessage, field, formKey };
      })
    );

    const hasErrors = validationResults.some((result) => !result.isValid);

    const localErrors = validationResults.reduce((acc, { formKey, field, isValid, errorMessage }) => {
      if (acc[formKey]) {
        acc[formKey][field] = isValid ? null : errorMessage;
      } else {
        acc[formKey] = {
          [field]: isValid ? null : errorMessage,
        };
      }
      return acc;
    }, {});

    setErrors((prevState) => ({ ...prevState, ...localErrors }));

    return hasErrors;
  };

  const getReclaimId = (subType) => actualReclaims.find((el) => el.subType === subType)?.id;

  const createProvisionalData = () => {
    const { claimCollector, cost, description, claimReason } = getValues(provisional);
    const collectedByLabel = claimCollectors.find((el) => el.id === claimCollector)?.name;

    const collectingReasonLabel = collectingReasonOptions.find((el) => el.value === claimReason)?.text;

    return [
      { label: 'Provisional care charge (pre-assessement)', value: '' },
      { label: 'Cost per week', value: cost ? `${currency.euro}${cost}` : '' },
      {
        label: 'Collected by',
        value: <span className="text-capitalize">{collectedByLabel}</span>,
      },
      { label: 'Collecting reason', value: collectingReasonLabel },
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

    const includesFile = checkNewFile();

    const data = [];

    if (editedForms.includes(provisional) || (includesFile && form[careChargeFormKeys.provisional].cost))
      data.push({
        id: careChargeFormKeys.provisional,
        displayData: createProvisionalData(),
        submitData: {
          ...form[careChargeFormKeys.provisional],
          subType: careChargeAPIKeys.provisional,
        },
        reclaimId: getReclaimId(careChargeAPIKeys.provisional),
      });

    if (editedForms.includes(less12) || (includesFile && form[careChargeFormKeys.less12].cost)) {
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

    if (editedForms.includes(more12) || (includesFile && form[careChargeFormKeys.more12].cost)) {
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
    async (form) => {
      const fields = [];

      const isNewFile = checkNewFile();

      if (
        formState.dirtyFields[provisional] ||
        (isNewFile && form[provisional]?.cost && form[provisional]?.claimCollector)
      ) {
        fields.push(
          { formKey: provisional, field: 'cost', value: Number(form[provisional].cost) },
          { formKey: provisional, field: 'claimCollector', value: String(form[provisional].claimCollector) }
        );
      }

      if (
        formState.dirtyFields[less12] ||
        (isNewFile && form[less12]?.cost && form[less12]?.claimCollector && form[less12].startDate)
      ) {
        fields.push(
          { formKey: less12, field: 'cost', value: form[less12].cost },
          { formKey: less12, field: 'claimCollector', value: form[less12].claimCollector },
          { formKey: less12, field: 'startDate', value: form[less12].startDate }
        );
      }

      if (
        formState.dirtyFields[more12] ||
        (isNewFile && form[more12]?.cost && form[more12]?.claimCollector && form[more12].startDate)
      ) {
        fields.push(
          { formKey: more12, field: 'cost', value: form[more12].cost },
          { formKey: more12, field: 'claimCollector', value: form[more12].claimCollector },
          { formKey: more12, field: 'startDate', value: form[more12].startDate }
        );
      }

      // const hasErrors = await validateFields(fields);

      // if (hasErrors) {
      //   dispatch(addNotification({ text: 'Some validation errors above' }));
      //   return;
      // }

      if (formState.isDirty) onEdit(form);
      else goToPackages();
    },
    [formState.isDirty, onEdit, goToPackages]
  );

  const isLoading = fileLoading || packageInfoLoading || lookupsLoading || careChargeLoading || detailsLoading;

  return (
    <div className="care-charge">

      <Loading isLoading={isLoading} />

      <Container maxWidth="1080px" margin="10px auto 60px" padding="0 60px">
        <Breadcrumbs values={breadcrumbs} />

        <TitleSubtitleHeader subTitle="Care Charges" title="Add financial assessment" />

        <ProvisionalCareCharge
          errors={errors[provisional]}
          onCancel={() => onCancel(provisional)}
          onEnd={() => onEnd(provisional)}
          control={control}
        />

        <ResidentialSUContribution
          errors={errors[less12]}
          onCancel={() => onCancel(less12)}
          onEnd={() => onEnd(less12)}
          setValue={setValue}
          coreStartDate={coreStartDate}
          coreEndDate={coreEndDate}
          control={control}
        />

        <ResidentialSUContribution
          errors={errors[more12]}
          onCancel={() => onCancel(more12)}
          coreStartDate={less12EndDate}
          coreEndDate={coreEndDate}
          onEnd={() => onEnd(more12)}
          setValue={setValue}
          control={control}
          isMore12
        />

        <UploadFile isLoading={fileLoading} title="Upload FNC Assessment..." control={control} />

        <Container className="brokerage__actions">
          <Button secondary color="gray" onClick={router.back}>
            Back
          </Button>
          <Button disabled={isLoading} isLoading={isLoading} onClick={handleSubmit(onSubmit)}>Save and continue</Button>
        </Container>
      </Container>

      <EditElementModal
        fileInfo={{
          assessmentFile,
          assessmentFileId,
          assessmentFileName,
        }}
        isOpen={isOpenEdit}
        onClose={() => toggleEdit(false)}
        data={editData}
        coreStartDate={coreStartDate}
      />
      <CancelElementModal isOpen={isOpenCancel} onClose={() => toggleCancel(false)} data={cancelData} />
      <EndElementModal isOpen={isOpenEnd} onClose={() => toggleEnd(false)} data={endData} control={control} />
    </div>
  );
};

export default CareCharge;
