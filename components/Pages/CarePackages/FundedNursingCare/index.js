import React, { useEffect, useMemo, useState } from 'react';
import { isFunction, useDocument } from 'api';
import { dateStringToDate, formatDocumentInfo } from 'service';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { getFormData } from 'service/getFormData';
import { fncClaimCollectorSchema, getFNCDateValidationSchema } from 'service/formValidationSchema';
import {
  Announcement,
  Button,
  Container,
  FormGroup,
  HorizontalSeparator,
  Label,
  RadioGroup,
  Select,
  Textarea,
  VerticalSeparator
} from '../../../HackneyDS';
import Loading from '../../../Loading';
import BrokerageTotalCost from '../BrokerageTotalCost';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import BrokeragePackageDates from '../BrokeragePackageDates';
import DynamicBreadcrumbs from '../../DynamicBreadcrumbs';
import UploadFile from '../CareCharge/UploadFile';

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

  const schema = useMemo(() => fncClaimCollectorSchema, [detailsData]);

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
      fileInfo: undefined,
    },
  });
  const onSubmit = (data) => clickSave(data);

  const [claimCollector, fileInfo] = watch(['claimCollector', 'fileInfo']);

  const { data: href, isLoading: documentLoading } = useDocument(fileInfo?.fileId);

  const clickBack = () => {
    if (isFunction(goBack())) goBack();
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const clickSave = async (data) => {
    const { dateFrom, dateTo } = dates;

    const dateSchema = getFNCDateValidationSchema(detailsData);

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
      startDate: dateFrom.toJSON(),
    };

    delete newData.fileInfo;

    const { file, updated, fileId } = fileInfo || {};
    if (file) {
      if (updated) {
        newData.assessmentFile = file;
      } else {
        newData.assessmentFileId = fileId;
      }
    }

    if (!isOngoing) newData.endDate = dateTo.toJSON();

    if (carePackageReclaimFnc?.id) {
      newData.id = carePackageReclaimFnc.id;
    } else {
      newData.carePackageId = carePackageId;
    }

    const request = carePackageReclaimFnc?.id ? updateFundedNursingCare : createFundedNursingCare;

    await request(carePackageId, getFormData(newData));
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
    (async () => {
      setDates({
        dateFrom: dateStringToDate(carePackageReclaimFnc.startDate || detailsData.startDate),
        dateTo: dateStringToDate(carePackageReclaimFnc.endDate || detailsData.endDate),
      });

      if (carePackageReclaimFnc?.endDate || detailsData.endDate) {
        setIsOngoing(false);
      }

      let fileData;

      if (carePackageReclaimFnc.assessmentFileName) {
        fileData = !fileInfo?.updated && await formatDocumentInfo({
          href,
          fileName: carePackageReclaimFnc.assessmentFileName,
          fileId: carePackageReclaimFnc.assessmentFileId
        });
        setHasFNC('yes');
      }

      const { description = '', claimCollector: responseClaimCollector = '' } = carePackageReclaimFnc;

      reset({ description, claimCollector: responseClaimCollector, fileInfo: fileData });
    })();
  }, [carePackageReclaimFnc, detailsData, href]);

  return (
    <Container className="brokerage__funded-nursing-care">
      <Loading isLoading={isLoading || documentLoading} />
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
                  <Container display="flex">
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
              <UploadFile title="Upload FNC Assessment..." control={control} />
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
            <Button type="submit" disabled={isLoading || documentLoading} isLoading={isLoading || documentLoading}>
              Save and continue
            </Button>
          </Container>
        </form>
      </Container>
    </Container>
  );
};

export default FundedNursingCare;
