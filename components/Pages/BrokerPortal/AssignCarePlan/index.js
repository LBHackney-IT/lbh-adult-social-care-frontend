import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Announcement, Button, Container, Select, Textarea, Breadcrumbs } from '../../../HackneyDS';
import FormGroup from '../../../HackneyDS/FormGroup';
import { requiredSchema } from '../../../../constants/schemas';
import BrokerageHeader from '../../CarePackages/BrokerageHeader/BrokerageHeader';
import TitleSubtitleHeader from '../../CarePackages/TitleSubtitleHeader';
import ServiceUserDetails from '../ServiceUserDetails';
import { BROKER_PORTAL_ROUTE, CARE_PACKAGE_ROUTE } from '../../../../routes/RouteConstants';

const breadcrumbs = [
  { text: 'Home', href: CARE_PACKAGE_ROUTE },
  { text: 'Broker portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Assign and attach a care plan' },
];

const AssignCarePlan = ({ brokerOptions, packageTypeOptions, userDetails }) => {
  const [assignedCarePlan, setAssignedCarePlan] = useState(false);

  const [packageType, setPackageType] = useState();
  const [broker, setBroker] = useState();
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({
    broker: '',
    packageType: '',
  });

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

    setAssignedCarePlan(true);
  };

  const changeError = (field, value = '') => {
    setErrors((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <Container className="assign-care-plan">
      <BrokerageHeader />

      <Container maxWidth="1080px" margin="0 auto 60px" padding="10px 60px 0">
        <Breadcrumbs values={breadcrumbs} />

        {assignedCarePlan ? (
          <Container className="brokerage__container-main">
            <Announcement className="success mb">
              <div slot="title">Success!</div>
              <div slot="content">Care plan assigned to {broker}</div>
            </Announcement>

            <Button className="mt-60" handler={() => router.replace(BROKER_PORTAL_ROUTE)}>
              Back to Broker Portal
            </Button>
          </Container>
        ) : (
          <Container className="brokerage__container-main">
            <TitleSubtitleHeader title="Assign a care plan to brokerage" subTitle="Assign and attach a care plan" />

            <ServiceUserDetails
              address={userDetails.postcode}
              serviceUserName={userDetails.client}
              dateOfBirth={userDetails.dateOfBirth}
              hackneyId={userDetails.hackneyId}
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

              {/* Feature temporarily postponed */}

              {/* <Container className="brokerage__container"> */}
              {/*  <h3>Support plan and care package</h3> */}
              {/*  <UploadGreenButton label="Upload social worker care plan" file={file} setFile={setFile} /> */}
              {/* </Container> */}

              <div className="assign-care-plan__notes">
                <h3>Add notes</h3>
                <Textarea handler={setNotes} value={notes} rows={3} />
              </div>

              <Container className="brokerage__actions">
                <Button handler={clickSave}>Assign care plan</Button>
              </Container>
            </Container>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default AssignCarePlan;
