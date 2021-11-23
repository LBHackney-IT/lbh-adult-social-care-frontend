import React, { useEffect, useMemo, useState } from 'react';
import { isFunction } from 'api';
import { compareDescendingDMY, dateStringToDate } from 'service';
import { dateDescending, TEXT_FILE_EXTENSIONS } from 'constants/variables';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { getFormData } from 'service/getFormData';
import {
  Announcement,
  Button,
  Container,
  FormGroup,
  Heading,
  HorizontalSeparator,
  Label,
  RadioGroup,
  Select,
  Textarea,
  UploadGreenButton,
  VerticalSeparator
} from '../../../HackneyDS';
import Loading from '../../../Loading';
import BrokerageTotalCost from '../BrokerageTotalCost';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import BrokeragePackageDates from '../BrokeragePackageDates';
import DynamicBreadcrumbs from '../../DynamicBreadcrumbs';

const collectedByType = {
  hackney: 'gross',
  supplier: 'net',
};

const FundedNursingCare = ({
  carePackageId,
  collectedByOptions,
  skipAndContinue,
  activeFncPrice,
  carePackageReclaimFnc,
  createFundedNursingCare = () => {},
  updateFundedNursingCare = () => {},
  goBack = () => {},
  detailsData,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [dates, setDates] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });
  const [dateErrors, setDateErrors] = useState({
    dateFrom: '',
    dateTo: '',
  });
  const [hasFNC, setHasFNC] = useState();
  const [hasPreviousFnc] = useState(false); // todo for new design
  const [isOngoing, setIsOngoing] = useState(true);

  const clickBack = () => {
    if (isFunction(goBack())) goBack();
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const clickSave = async (data) => {
    const { dateFrom, dateTo } = dates;

    const dateSchema = yup.object().shape({
      detailsDateTo: null,
      isOngoing: yup.boolean(),
      dateFrom: yup
        .date()
        .typeError('Please select a date from')
        .required()
        .test('dateFrom', 'Date from less then core date start', () => (
          compareDescendingDMY(dateFrom, detailsData.startDate) !== dateDescending.asc
        ))
        .test('dateFrom', 'Date from more then core date end', () => {
          if (detailsData.endDate) {
            return compareDescendingDMY(dateFrom, detailsData.endDate) !== dateDescending.desc;
          }
          return true;
        }),
      dateTo: yup
        .mixed()
        .when('isOngoing', {
          is: false,
          then: yup
            .date()
            .typeError('Please select a date to')
            .required()
            .test('dateTo', '(Date to) less then (date from)', () => (
              compareDescendingDMY(dateFrom, dateTo) !== dateDescending.desc
            ))
            .test('dateTo', 'Date to should be less or equal then core end date', (value) => {
              if (detailsData.endDate) {
                return compareDescendingDMY(value, detailsData.endDate) !== dateDescending.desc;
              }
              return true;
            }),
        })
    });

    let localErrors = {};
    let hasErrors = false;

    try {
      await dateSchema.validate(
        { detailsDateTo: detailsData.endDate, isOngoing, dateFrom, dateTo },
        { abortEarly: false }
      );
    } catch (errorValidation) {
      const newErrors = errorValidation?.inner?.map(error => ([error.path, error.message]));
      if (newErrors) {
        hasErrors = true;
        localErrors = Object.fromEntries(newErrors);
        setDateErrors(prevState => ({ ...prevState, ...localErrors }));
      }
    }

    setDateErrors((prevState) => ({ ...prevState, ...localErrors }));

    if (hasErrors) {
      return pushNotification('Some errors above');
    }

    const newData = {
      ...data,
      cost: activeFncPrice,
      startDate: dateFrom,
      endDate: isOngoing ? null : dateTo,
    };

    if (!carePackageReclaimFnc?.id) {
      newData.carePackageId = carePackageId;
    } else {
      newData.id = carePackageReclaimFnc.id;
    }

    const requestData = hasFNC && newData.assessmentFileUrl ? getFormData(newData) : newData;

    const request = carePackageReclaimFnc?.id ? updateFundedNursingCare : createFundedNursingCare;

    await request(carePackageId, requestData);
  };

  const changeError = (field, value = '') => {
    setDateErrors((prevState) => ({ ...prevState, [field]: value }));
  };

  const changeDate = (field, value) => {
    changeError(field, '');
    setDates((prevState) => ({ ...prevState, [field]: value }));
  };

  const loadPreviousFnc = () => alert('load previous fnc');
  const addNewFnc = () => alert('add new fnc');

  useEffect(() => {
    setDates({
      dateFrom: dateStringToDate(carePackageReclaimFnc.startDate || detailsData.startDate),
      dateTo: dateStringToDate(carePackageReclaimFnc.endDate || detailsData.endDate),
    });

    if (carePackageReclaimFnc?.endDate || detailsData.endDate) {
      setIsOngoing(false);
    }

    let assessmentFileUrl = null;

    if (carePackageReclaimFnc.socialWorkerCarePlanFileId) {
      assessmentFileUrl = {
        name: carePackageReclaimFnc.socialWorkerCarePlanFileId,
        fileId: carePackageReclaimFnc.socialWorkerCarePlanFileName
      };
    }

    const { description = '', claimCollector = '' } = carePackageReclaimFnc;

    reset({ description, claimCollector, assessmentFileUrl });
  }, [carePackageReclaimFnc, detailsData]);

  const schema = useMemo(() => (
    yup.object().shape({
      claimCollector: yup
        .number()
        .typeError('Required field')
        .required('Required field')
    })
  ), [detailsData]);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      claimCollector: '',
      description: '',
    },
  });
  const onSubmit = (data) => clickSave(data);

  const claimCollector = watch('claimCollector');

  return (
    <Container className="brokerage__funded-nursing-care">
      <Loading isLoading={isLoading} />
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto 60px" padding="0 60px">
        <TitleSubtitleHeader title="Build a care package" subTitle="Funded Nursing Care" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="brokerage__item-title">Funded Nursing Care</h3>
          {hasPreviousFnc && (
            <>
              <Announcement isError>
                <div slot="title">FNC charge has previously been added.</div>
                <div slot="content">
                  <p className="mb-3">Would you like to use previous FNC?</p>
                  <Container display='flex'>
                    <Button onClick={loadPreviousFnc}>Yes, use previous FNC</Button>
                    <VerticalSeparator width={8} />
                    <Button secondary onClick={addNewFnc}>No, add new FNC</Button>
                  </Container>
                </div>
              </Announcement>
              <HorizontalSeparator height={32} />
            </>
          )}
          <RadioGroup
            handle={setHasFNC}
            inline
            className="has-fnc-radio-group"
            value={hasFNC}
            label="Has a FNC assessment been carried out?"
            items={[
              { id: 'yes', label: 'Yes' },
              { id: 'no', label: 'No' },
            ]}
          />
          <Controller
            name="claimCollector"
            control={control}
            render={({ field }) => (
              <FormGroup
                className="select-collected-by"
                required
                label="Collected by"
                error={errors.claimCollector?.message}
              >
                <Select
                  error={errors.claimCollector?.message}
                  disabledEmptyComponent
                  emptyElement={{ text: 'Please select', value: '' }}
                  id="collected-by"
                  className="funded-nursing-care__select"
                  options={collectedByOptions}
                  value={field.value}
                  onChangeValue={field.onChange}
                />
              </FormGroup>
            )}
          />

          <BrokeragePackageDates
            dates={dates}
            error={dateErrors.dateFrom || dateErrors.dateTo}
            setDates={changeDate}
            startMinDate={dateStringToDate(detailsData.startDate)}
            startMaxDate={dateStringToDate(detailsData.endDate)}
            endMaxDate={dateStringToDate(detailsData.endDate)}
            label="Funded Nursing Care Schedule..."
            setIsOngoing={(value) => {
              changeError('dateTo');
              setIsOngoing(value);
            }}
            isOngoing={isOngoing}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormGroup error={errors.description?.message}>
                <Label className="label-textarea">Funded Nursing Care notes</Label>
                <Textarea handler={field.onChange} value={field.value} />
              </FormGroup>
            )}
          />
          {hasFNC === 'yes' && (
            <>
              <HorizontalSeparator height={32} />
              <Container>
                <Heading size="m">Upload FNC Assessment...</Heading>
                <HorizontalSeparator height={24} />
                <Controller
                  name="assessmentFileUrl"
                  control={control}
                  render={({ field }) => (
                    <FormGroup error={errors.assessmentFileUrl?.message}>
                      <UploadGreenButton extensions={TEXT_FILE_EXTENSIONS} file={field.value} setFile={field.onChange} />
                    </FormGroup>
                  )}
                />
              </Container>
            </>
          )}
          <HorizontalSeparator height={50} />
          <BrokerageTotalCost
            name={`Funded per week ${collectedByType[claimCollector] ? `(${collectedByType[claimCollector]})` : ''}`}
            className="brokerage__border-cost"
            value={activeFncPrice}
          />
          <Container className="brokerage__actions">
            <Button onClick={clickBack} secondary color="gray">
              Back
            </Button>
            <Button onClick={skipAndContinue} className="secondary-yellow">Skip and continue</Button>
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              Save and continue
            </Button>
          </Container>
        </form>
      </Container>
    </Container>
  );
};

export default FundedNursingCare;
