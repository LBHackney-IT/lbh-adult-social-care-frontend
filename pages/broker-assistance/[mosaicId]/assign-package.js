import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  Button,
  Select,
  Textarea,
  Container,
  FormGroup,
  Breadcrumbs,
  Announcement,
  BrokerageHeader,
  UploadGreenButton,
  ServiceUserDetails,
  TitleSubtitleHeader,
} from 'components';
import { requiredSchema } from 'constants/schemas';
import { BROKER_ASSISTANCE_ROUTE } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { usePackageGetAll, assignToBroker, useServiceUser, useBrokers } from 'api';

const breadcrumbs = [
  { text: 'Home', href: BROKER_ASSISTANCE_ROUTE },
  { text: 'Broker Assistance', href: BROKER_ASSISTANCE_ROUTE },
  { text: 'Assign and attach a care plan' },
];

const AssignPackage = () => {
  const [assignedCarePlan, setAssignedCarePlan] = useState(false);

  const [packageType, setPackageType] = useState('');
  const [broker, setBroker] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState({
    broker: '',
    packageType: '',
  });

  const dispatch = useDispatch();

  const router = useRouter();
  const { mosaicId } = router.query;

  const { data: serviceUser } = useServiceUser(mosaicId);
  const { options: packageTypeOptions } = usePackageGetAll();
  const { options: brokerOptions } = useBrokers();

  const validateFields = async (fields) => {
    const validationResults = await Promise.all(
      fields.map(async ({ field, value }) => ({
        isValid: await requiredSchema.string.isValid({ value }),
        field,
      }))
    );

    const hasErrors = validationResults.some((result) => !result.isValid);

    const localErrors = validationResults.reduce((acc, { field, isValid }) => {
      if (!isValid) acc[field] = 'Required field';
      return acc;
    }, {});

    setErrors((prevState) => ({ ...prevState, ...localErrors }));

    return hasErrors;
  };

  const onSubmit = async () => {
    const fields = [
      { value: broker, field: 'broker' },
      { value: packageType, field: 'packageType' },
    ];

    const hasErrors = await validateFields(fields);
    if (hasErrors) return;

    const formData = new FormData();

    formData.append('HackneyUserId', mosaicId);
    formData.append('BrokerId', broker);
    formData.append('PackageType', packageType);
    formData.append('Notes', notes);

    try {
      await assignToBroker({ data: formData });
      setAssignedCarePlan(true);
    } catch (error) {
      dispatch(addNotification({ text: error, className: 'error' }));
    }
  };

  const changeError = (field, value = '') => {
    setErrors((prevState) => ({ ...prevState, [field]: value }));
  };

  const brokerName = brokerOptions?.find((el) => el.value === broker)?.text;

  return (
    <Container className="assign-care-plan">
      <BrokerageHeader />

      <Container maxWidth="1080px" margin="0 auto 60px" padding="10px 60px 0">
        <Breadcrumbs values={breadcrumbs} />

        {assignedCarePlan ? (
          <Container margin="60px 0 0" className="brokerage__container-main">
            <Announcement className="success mb">
              <div slot="title">Success!</div>
              <div slot="content">Care plan assigned to {brokerName}</div>
            </Announcement>

            <Button className="mt-60" onClick={() => router.replace(BROKER_ASSISTANCE_ROUTE)}>
              Back to Broker Assistance
            </Button>
          </Container>
        ) : (
          <Container className="brokerage__container-main">
            <TitleSubtitleHeader title="Assign a care plan to brokerage" subTitle="Assign and attach a care plan" />

            <ServiceUserDetails
              address={serviceUser.postCode}
              serviceUserName={`${serviceUser.firstName ?? ''} ${serviceUser.lastName ?? ''}`}
              dateOfBirth={serviceUser.dateOfBirth}
              hackneyId={mosaicId}
            />

            <Container>
              <Container className="brokerage__container">
                <h3>Assign broker</h3>

                <FormGroup error={errors.broker} required label="Select broker" className="assign-care-plan__select">
                  <Select
                    id="select-broker"
                    options={brokerOptions}
                    value={broker}
                    onChangeValue={(value) => {
                      changeError('broker');
                      setBroker(value);
                    }}
                  />
                </FormGroup>

                <FormGroup error={errors.packageType} required label="What package type?">
                  <Select
                    id="select-package"
                    options={packageTypeOptions}
                    value={packageType}
                    onChangeValue={(value) => {
                      changeError('packageType');
                      setPackageType(value);
                    }}
                  />
                </FormGroup>
              </Container>

              <Container className="brokerage__container">
                <h3>Support plan and care package</h3>
                <UploadGreenButton label="Upload social worker care plan" file={file} setFile={setFile} />
              </Container>

              <div className="assign-care-plan__notes">
                <h3>Add notes</h3>
                <Textarea handler={setNotes} value={notes} rows={3} />
              </div>

              <Container className="brokerage__actions">
                <Button onClick={onSubmit}>Assign care plan</Button>
              </Container>
            </Container>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default AssignPackage;
