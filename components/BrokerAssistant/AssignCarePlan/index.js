import React, { useState } from 'react';
import { Announcement, Button, Container, Select, Textarea, UploadGreenButton } from '../../HackneyDS';
import FormGroup from '../../HackneyDS/FormGroup';
import { requiredSchema } from '../../../constants/schemas';
import BrokerageHeader from '../../Brokerage/BrokerageHeader/BrokerageHeader';
import TitleSubtitleHeader from '../../Brokerage/TitleSubtitleHeader';
import ServiceUserDetails from '../../Brokerage/BrokerPortal/ServiceUserDetails';
import Breadcrumbs from '../../Breadcrumbs';
import { useRouter } from 'next/router';
import { BROKER_PORTAL_ROUTE, CARE_PACKAGE_ROUTE } from '../../../routes/RouteConstants';

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
        field: 'broker'
      },
      {
        schema: requiredSchema.string,
        value: packageType,
        field: 'packageType'
      },
    ];

    let hasErrors = false;
    let localErrors = {};
    for await (let { schema, value, field } of validFields) {
      const isValid = await schema.isValid({ value });
      if (!isValid) {
        hasErrors = true;
        localErrors[field] = 'Required field';
      }
    }
    setErrors(prevState => ({ ...prevState, ...localErrors }));

    if (hasErrors) return;

    alert('Assign care plan');
    setAssignedCarePlan(true);
  };

  const changeError = (field, value = '') => {
    setErrors(prevState => ({ ...prevState, [field]: value }));
  };

  return (
    <Container className="assign-care-plan">
      <BrokerageHeader serviceName="" links={[
        { href: 'broker-portal', text: 'Broker portal' },
        { href: 'care-charges', text: 'Care charges' },
        { href: 'approvals', text: 'Approvals' },
        { href: 'finance', text: 'Finance' },
        { href: 'logout', text: 'Log Out' },
      ]}/>
      <Container className="px-60 pt-10">
        <Breadcrumbs values={breadcrumbs}/>
      </Container>
      {
        assignedCarePlan ?
          <Container className='brokerage__container-main'>
            <Announcement className="success mb">
              <div slot="title">Success!</div>
              <div slot="content">Care plan assigned to {broker}</div>
            </Announcement>
            <Button className='mt-60' handler={() => router.replace('broker-portal')}>Back to Broker Portal</Button>
          </Container>
          :
          <Container className="brokerage__container-main">
            <TitleSubtitleHeader
              title="Assign a care plan to brokerage"
              subTitle="Assign and attach a care plan"
            />
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
                <UploadGreenButton label="Upload social worker care plan" file={file} setFile={setFile}/>
              </Container>
              <FormGroup label="Add notes">
                <Textarea handler={setNotes} value={notes}/>
              </FormGroup>
              <Container className="brokerage__actions">
                <Button handler={clickSave}>Assign care plan</Button>
              </Container>
            </Container>
          </Container>
      }
    </Container>
  );
};

export default AssignCarePlan;