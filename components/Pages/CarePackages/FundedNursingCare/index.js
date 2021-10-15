import React, { useState, useEffect } from 'react';
import { Button, Container, FileUpload, Label, RadioGroup, Select, Textarea } from '../../../HackneyDS';
import FormGroup from '../../../HackneyDS/FormGroup';
import UrlFromFile from '../../../UrlFromFile';
import { requiredSchema } from '../../../../constants/schemas';
import { isFunction } from '../../../../api/Utils/FuncUtils';
import { dateStringToDate } from '../../../../service/helpers';
import BrokerageTotalCost from '../BrokerageTotalCost';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import BrokeragePackageDates from '../BrokeragePackageDates';

const FundedNursingCare = ({
  carePackageId,
  collectedByOptions,
  activeFncPrice,
  carePackageReclaimFnc,
  createFundedNursingCare = () => {},
  updateFundedNursingCare = () => {},
  goBack = () => {},
}) => {
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
    dateFrom: '',
    dateTo: '',
    notes: '',
  });
  const [hasFNC, setHasFNC] = useState('yes');
  const [collectedBy, setCollectedBy] = useState();
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);
  const [isOngoing, setIsOngoing] = useState(false);

  const clickBack = () => {
    if (isFunction(goBack())) goBack();
  };

  const clickSave = async () => {
    const validFields = [
      {
        schema: requiredSchema.string,
        value: hasFNC,
        field: 'hasFNC',
      },
      {
        schema: requiredSchema.string,
        value: notes,
        field: 'notes',
      },
      {
        schema: requiredSchema.date,
        value: dates.dateFrom,
        field: 'dateFrom',
      },
    ];

    if (!isOngoing) {
      validFields.push({
        schema: requiredSchema.date,
        value: dates.dateTo,
        field: 'dateTo',
      });
    }

    let hasErrors = false;
    let localErrors = {};
    for await (let { schema, value, field } of validFields) {
      const isValid = await schema.isValid({ value });
      if (!isValid) {
        hasErrors = true;
        localErrors[field] = 'Required field';
      }
    }
    setErrors((prevState) => ({ ...prevState, ...localErrors }));

    if (hasErrors) return;

    const fundedNursingCareCreation = {
      carePackageId,
      cost: activeFncPrice,
      claimCollector: collectedBy,
      supplierId: 1, //To be removed
      status: 1, // Set active status ?
      type: 1, // Set type of reclaim ?
      startDate: dates.dateFrom,
      endDate: dates.dateTo,
      description: notes,
    };

    const fundedNursingCareUpdate = {
      id: carePackageReclaimFnc.id,
      cost: activeFncPrice,
      claimCollector: collectedBy,
      supplierId: 1, //To be removed
      status: 1, // Set active status ?
      type: 1, // Set type of reclaim ?
      startDate: dates.dateFrom,
      endDate: dates.dateTo,
      description: notes,
    };

    if (!carePackageReclaimFnc?.id) {
      createFundedNursingCare(carePackageId, fundedNursingCareCreation);
      return;
    }
    updateFundedNursingCare(carePackageId, fundedNursingCareUpdate);
  };

  const changeError = (field, value = '') => {
    setErrors((prevState) => ({ ...prevState, [field]: value }));
  };

  const changeDate = (field, value) => {
    changeError(field, '');
    setDates((prevState) => ({ ...prevState, [field]: value }));
  };

  const composeCarePackageReclaimFncData = () => {
    if (carePackageReclaimFnc) {
      setDates({
        dateFrom: dateStringToDate(carePackageReclaimFnc.startDate),
        dateTo: dateStringToDate(carePackageReclaimFnc.endDate),
      });
      if (!carePackageReclaimFnc.endDate) {
        setIsOngoing(true);
      }

      setNotes(carePackageReclaimFnc.description);
      setCollectedBy(carePackageReclaimFnc.claimCollector);
    }
  };

  useEffect(() => {
    composeCarePackageReclaimFncData();
  }, [carePackageReclaimFnc]);

  return (
    <Container className="brokerage__funded-nursing-care">
      <BrokerageHeader />
      <Container maxWidth="1080px" margin="0 auto" padding="60px">
        <TitleSubtitleHeader title='Build a care package' subTitle="Funded Nursing Care"/>
        <Container>
          <h3 className="brokerage__item-title">Funded Nursing Care</h3>
          <RadioGroup
            handle={(value) => {
              changeError('hasFNC');
              setHasFNC(value);
            }}
            inline
            error={errors.hasFNC}
            value={hasFNC}
            label="Has a FNC assessment been carried out?"
            items={[
              { id: 'yes', label: 'Yes' },
              { id: 'no', label: 'No' },
            ]}
          />
          <Label className="select-collected-by" htmlFor="collected-by">
            Collected by
          </Label>
          <Select
            id="collected-by"
            className="funded-nursing-care__select"
            options={collectedByOptions}
            value={collectedBy}
            onChangeValue={setCollectedBy}
          />
          <BrokeragePackageDates
            dates={dates}
            error={errors.dateFrom || errors.dateTo}
            setDates={changeDate}
            label="Funded Nursing Care Schedule..."
            setIsOngoing={(value) => {
              changeError('dateTo');
              setIsOngoing(value);
            }}
            isOngoing={isOngoing}
          />
          <FormGroup error={errors.notes}>
            <Label className="text-required-after label-textarea">Funded Nursing Care notes</Label>
            <Textarea
              handler={(value) => {
                changeError('notes');
                setNotes(value);
              }}
              value={notes}
            />
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
            <Button handler={clickBack} className="brokerage__back-button">
              Back
            </Button>
            <Button handler={clickSave}>Save and continue</Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default FundedNursingCare;