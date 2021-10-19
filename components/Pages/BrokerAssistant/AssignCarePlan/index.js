import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Select,
  Textarea,
  FormGroup,
  Container,
  Breadcrumbs,
  Announcement,
  UploadGreenButton,
} from '../../../HackneyDS';
import { requiredSchema } from '../../../../constants/schemas';
import BrokerageHeader from '../../CarePackages/BrokerageHeader';
import TitleSubtitleHeader from '../../CarePackages/TitleSubtitleHeader';
import ServiceUserDetails from '../../BrokerPortal/ServiceUserDetails';
import { BROKER_PORTAL_ROUTE, CARE_PACKAGE_ROUTE } from '../../../../routes/RouteConstants';

const breadcrumbs = [
  { text: 'Home', href: CARE_PACKAGE_ROUTE },
  { text: 'Broker portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Assign and attach a care plan' },
];

const AssignCarePlan = ({ brokerOptions, packageTypeOptions, userDetails }) => {
  const [errors, setErrors] = useState({
    broker: '',
    packageType: '',
  });
  const [packageType, setPackageType] = useState();
  const [broker, setBroker] = useState();
  const [assignedCarePlan, setAssignedCarePlan] = useState(false);
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);
  const router = useRouter();

  const clickSave = async () => {
    const validFields = [
      {
        schema: requiredSchema.string,
        value: broker,
        field: 'broker',
      },
      {
        schema: requiredSchema.string,
        value: packageType,
        field: 'packageType',
      },
    ];

    let hasErrors = false;
    const localErrors = {};
    for await (const { schema, value, field } of validFields) {
      const isValid = await schema.isValid({ value });
      if (!isValid) {
        hasErrors = true;
        localErrors[field] = 'Required field';
      }
    }
    setErrors((prevState) => ({ ...prevState, ...localErrors }));

    if (hasErrors) return;

    alert('Assign care plan');
    setAssignedCarePlan(true);
  };

  const changeError = (field, value = '') => {
    setErrors((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <Container className="assign-care-plan">
      <BrokerageHeader />
      <Container className="px-60 pt-10">
        <Breadcrumbs values={breadcrumbs} />
      </Container>
      {assignedCarePlan ? (
        <Container padding="60px" className="brokerage__container-main">
          <Announcement className="success mb">
            <div slot="title">Success!</div>
            <div slot="content">Care plan assigned to {broker}</div>
          </Announcement>
          <Button className="mt-60" onClick={() => router.replace(BROKER_PORTAL_ROUTE)}>
            Back to Broker Portal
          </Button>
        </Container>
      ) : (
        <Container padding="0 60px" className="brokerage__container-main">
          <TitleSubtitleHeader title="Assign a care plan to brokerage" subTitle="Assign and attach a care plan" />
          <ServiceUserDetails
            address={userDetails.address}
            serviceUserName={userDetails.userName}
            dateOfBirth={userDetails.dateOfBirth}
            hackneyId={userDetails.hackneyId}
          />
          <Container>
            <Container className="brokerage__container">
              <h3>Assign broker</h3>
              <FormGroup error={errors.broker} required label="Select broker">
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
                  id="select-broker"
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
            <FormGroup label="Add notes">
              <Textarea handler={setNotes} value={notes} />
            </FormGroup>
            <Container className="brokerage__actions">
              <Button onClick={clickSave}>Assign care plan</Button>
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default AssignCarePlan;
