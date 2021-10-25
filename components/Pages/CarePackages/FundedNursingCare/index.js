import React, { useState, useEffect } from 'react';
import { isFunction } from 'api';
import { compareDescendingDMY, dateStringToDate } from 'service';
import { dateDescending } from 'constants/variables';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import * as yup from 'yup';
import {
  Button,
  FormGroup,
  Container,
  FileUpload,
  Label,
  RadioGroup,
  Select,
  Textarea,
  Announcement
} from '../../../HackneyDS';
import Loading from '../../../Loading';
import UrlFromFile from '../../../UrlFromFile';
import BrokerageTotalCost from '../BrokerageTotalCost';
import BrokerageHeader from '../BrokerageHeader';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import BrokeragePackageDates from '../BrokeragePackageDates';

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
  loading,
}) => {
  const dispatch = useDispatch();
  const [collectedByType] = useState({
    hackney: 'gross',
    supplier: 'net',
  });
  const [dates, setDates] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
  });
  const [errors, setErrors] = useState({
    hasFNC: '',
    collectedBy: '',
    dateFrom: '',
    dateTo: '',
    notes: '',
  });
  const [hasFNC, setHasFNC] = useState('');
  const [hasPreviousFnc] = useState(false); // todo for new design
  const [collectedBy, setCollectedBy] = useState();
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);
  const [isOngoing, setIsOngoing] = useState(true);

  const clickBack = () => {
    if (isFunction(goBack())) goBack();
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  }

  const clickSave = async () => {
    const { dateFrom, dateTo } = dates;

    const schema = yup.object().shape({
      collectedBy: yup.number().typeError('Required field').required('Required field'),
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
          if(detailsData.endDate) {
            return compareDescendingDMY(dateFrom, detailsData.endDate) !== dateDescending.desc
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
              if(detailsData.endDate) {
                return compareDescendingDMY(value, detailsData.endDate) !== dateDescending.desc
              }
              return true
            }),
        })
    });

    let localErrors = {};
    let hasErrors = false;

    try {
      await schema.validate(
        { detailsDateTo: detailsData.endDate, isOngoing, dateFrom, dateTo, collectedBy },
        { abortEarly: false }
      );
    } catch (errorValidation) {
      const newErrors = errorValidation?.inner?.map(error => ([error.path, error.message ]));
      if(newErrors) {
        hasErrors = true;
        localErrors = Object.fromEntries(newErrors);
        setErrors(prevState => ({ ...prevState, ...localErrors }));
      }
    }

    setErrors((prevState) => ({ ...prevState, ...localErrors }));

    if (hasErrors) {
      return pushNotification('Some errors above');
    }

    const fundedNursingCareCreation = {
      carePackageId,
      cost: activeFncPrice,
      claimCollector: collectedBy,
      supplierId: 1, // To be removed
      status: 1, // Set active status ?
      type: 1, // Set type of reclaim ?
      startDate: dateFrom,
      endDate: isOngoing ? null : dateTo,
      description: notes,
    };

    const fundedNursingCareUpdate = {
      id: carePackageReclaimFnc.id,
      cost: activeFncPrice,
      claimCollector: collectedBy,
      supplierId: 1, // To be removed
      status: 1, // Set active status ?
      type: 1, // Set type of reclaim ?
      startDate: dateFrom,
      endDate: isOngoing ? null : dateTo,
      description: notes,
    };

    if (!carePackageReclaimFnc?.id) {
      return createFundedNursingCare(carePackageId, fundedNursingCareCreation);
    }
    return updateFundedNursingCare(carePackageId, fundedNursingCareUpdate);
  };

  const changeError = (field, value = '') => {
    setErrors((prevState) => ({ ...prevState, [field]: value }));
  };

  const onSelectCollectedBy = (value) => {
    setCollectedBy(value);
    changeError('collectedBy');
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

    setNotes(carePackageReclaimFnc.description || '');
    setCollectedBy(carePackageReclaimFnc.claimCollector || '');
  }, [carePackageReclaimFnc, detailsData]);

  return (
    <Container className="brokerage__funded-nursing-care">
      <Loading isLoading={loading} />
      <BrokerageHeader />
      <Container maxWidth="1080px" margin="0 auto 60px" padding="0 60px">
        <TitleSubtitleHeader title="Build a care package" subTitle="Funded Nursing Care" />
        <Container>
          <h3 className="brokerage__item-title">Funded Nursing Care</h3>
          {hasPreviousFnc && (
            <Announcement className="actions mb-5">
              <div slot="title">FNC charge has previously been added. </div>
              <div slot="content">
                <p className='mb-3'>Would you like to use previous FNC?</p>
                <Container className='button-group'>
                  <Button onClick={loadPreviousFnc}>Yes, use previous FNC</Button>
                  <Button className='background-secondary' onClick={addNewFnc}>No, add new FNC</Button>
                </Container>
              </div>
            </Announcement>
          )}
          <RadioGroup
            handle={(value) => {
              changeError('hasFNC');
              setHasFNC(value);
            }}
            inline
            className='has-fnc-radio-group'
            error={errors.hasFNC}
            value={hasFNC}
            label="Has a FNC assessment been carried out?"
            items={[
              { id: 'yes', label: 'Yes' },
              { id: 'no', label: 'No' },
            ]}
          />
          <FormGroup className='select-collected-by' required label='Collected by' error={errors.collectedBy}>
            <Select
              error={errors.collectedBy}
              disabledEmptyComponent
              emptyElement={{ text: 'Please select', value: '' }}
              id="collected-by"
              className="funded-nursing-care__select"
              options={collectedByOptions}
              value={collectedBy}
              onChangeValue={onSelectCollectedBy}
            />
          </FormGroup>

          <BrokeragePackageDates
            dates={dates}
            error={errors.dateFrom || errors.dateTo}
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
          <FormGroup error={errors.notes}>
            <Label className="label-textarea">Funded Nursing Care notes</Label>
            <Textarea handler={setNotes} value={notes}/>
          </FormGroup>
          <FormGroup className="upload-fnc-assessment" label="Upload FNC Assessment...">
            <UrlFromFile file={file} removeFile={setFile} />
            {!file && (
              <FormGroup className="file-upload-form">
                <FileUpload getFile={setFile} label={<div>Upload file</div>} />
              </FormGroup>
            )}
          </FormGroup>
          <BrokerageTotalCost
            name={`Funded per week ${collectedByType[collectedBy] ? `(${collectedByType[collectedBy]})` : ''}`}
            className="brokerage__border-cost"
            value={activeFncPrice}
          />
          <Container className="brokerage__actions">
            <Button onClick={clickBack} className="brokerage__back-button">
              Back
            </Button>
            <Button onClick={skipAndContinue} className='background-yellow'>Skip and continue</Button>
            <Button disabled={loading} isLoading={loading} onClick={clickSave}>
              Save and continue
            </Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default FundedNursingCare;
