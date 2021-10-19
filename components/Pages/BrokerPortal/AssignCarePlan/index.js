import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignToBroker } from '../../../../api/CarePackages/CarePackage';
import useCarePackageApi from '../../../../api/SWR/CarePackage/useCarePackageApi';
import { requiredSchema } from '../../../../constants/schemas';
import { addNotification } from '../../../../reducers/notificationsReducer';
import { BROKER_PORTAL_ROUTE, CARE_PACKAGE_ROUTE } from '../../../../routes/RouteConstants';
import { Announcement, Breadcrumbs, Button, Container, Select, Textarea } from '../../../HackneyDS';
import FormGroup from '../../../HackneyDS/FormGroup';
import BrokerageHeader from '../../CarePackages/BrokerageHeader/BrokerageHeader';
import TitleSubtitleHeader from '../../CarePackages/TitleSubtitleHeader';
import ServiceUserDetails from '../ServiceUserDetails';

const breadcrumbs = [
  { text: 'Home', href: CARE_PACKAGE_ROUTE },
  { text: 'Broker portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Assign and attach a care plan' },
];

const AssignCarePlan = ({ brokerOptions, packageTypeOptions, userDetails }) => {
  const [assignedCarePlan, setAssignedCarePlan] = useState(false);

  const [packageType, setPackageType] = useState(null);
  const [broker, setBroker] = useState(null);
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState({
    broker: '',
    packageType: '',
  });

  const dispatch = useDispatch();

  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data: packageInfo } = useCarePackageApi.singlePackageInfo(packageId);

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

  const clickSave = async () => {
    const fields = [
      { value: broker, field: 'broker' },
      { value: packageType, field: 'packageType' },
    ];

    const hasErrors = await validateFields(fields);
    if (hasErrors) return;

    const formData = new FormData();

    formData.append('HackneyUserId', packageInfo.serviceUser.hackneyId);
    formData.append('BrokerId', broker);
    formData.append('PackageType', packageType);
    formData.append('Notes', notes);

    try {
      await assignToBroker({ data: formData });
      dispatch(addNotification({ text: 'Success', className: 'success' }));
      setAssignedCarePlan(true);
    } catch (error) {
      dispatch(addNotification({ text: error, className: 'error' }));
    }
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
