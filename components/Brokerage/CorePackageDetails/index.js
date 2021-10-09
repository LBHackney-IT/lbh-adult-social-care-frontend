import React, { useEffect, useState } from 'react';
import { object, string } from 'yup';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Checkbox, Container, ErrorMessage, RadioGroup } from '../../HackneyDS';
import CorePackageSelectors from './CorePackageSelectors';
import ServiceUserDetails from '../BrokerageHub/ServiceUserDetails';

const CorePackageDetails = ({
  userDetails,
  supportReasonOptions,
  checkboxOptions,
  packageTypeOptions,
  packageScheduleOptions,
  saveCorePackage = () => {},
  defaultValues = {
    supportReason: '',
    packageType: '',
    furtherDetails: [],
    packageSchedule: null,
  },
}) => {
  const [supportReason, setSupportReason] = useState(defaultValues.supportReason);
  const [packageType, setPackageType] = useState(defaultValues.packageType);
  const [furtherDetails, setFurtherDetails] = useState(defaultValues.furtherDetails);
  const [packageSchedule, setPackageSchedule] = useState(defaultValues.packageSchedule);
  const [errors, setErrors] = useState({
    packageType: '',
    supportReason: '',
  });

  const changeCheckbox = (id) => {
    if (furtherDetails.includes(id)) {
      setFurtherDetails((prevState) => prevState.filter((item) => item !== id));
    } else {
      setFurtherDetails([...furtherDetails, id]);
    }
  };

  const changeError = (field, value = '') => {
    setErrors((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const saveAndContinue = async () => {
    const schemaPackageType = object().shape({
      packageType: string().required(),
    });

    const schemaSupportReason = object().shape({
      supportReason: string().required(),
    });

    const validPackageType = await schemaPackageType.isValid({ packageType });
    const validSupportReason = await schemaSupportReason.isValid({ supportReason });

    const hasErrors = [validPackageType, validSupportReason].some((item) => !item);

    if (hasErrors) {
      setErrors({
        packageType: !validPackageType && 'Required field',
        supportReason: !validSupportReason && 'Required field',
      });
      return;
    }

    const currentSettings = {};
    furtherDetails.forEach((setting) => {
      currentSettings[setting] = true;
    });

    const allSettings = checkboxOptions.map((cb) => cb.id);
    const missingSettings = allSettings.filter((x) => !currentSettings[x]);
    missingSettings.forEach((setting) => {
      currentSettings[setting] = false;
    });

    const packageToCreate = {
      packageScheduling: packageSchedule,
      primarySupportReasonId: supportReason,
      packageType,
      ...currentSettings,
    };

    saveCorePackage(packageToCreate);
  };

  useEffect(() => {
    if (supportReasonOptions) {
      if (defaultValues.supportReason !== '') {
        setSupportReason(defaultValues.supportReason);
      } else {
        setSupportReason(supportReasonOptions[0]?.value);
      }
    }
  }, [defaultValues, supportReasonOptions]);

  useEffect(() => {
    if (packageTypeOptions) {
      if (defaultValues.packageType !== '') {
        setPackageType(defaultValues.packageType);
      } else {
        setPackageType(packageTypeOptions[0]?.value);
      }
    }
  }, [defaultValues, packageTypeOptions]);

  useEffect(() => {
    if (packageType !== defaultValues.packageType) setPackageType(defaultValues.packageType);
    if (packageSchedule !== defaultValues.packageSchedule) setPackageSchedule(defaultValues.packageSchedule);
    if (furtherDetails.length !== defaultValues.furtherDetails.length) setFurtherDetails(defaultValues.furtherDetails);
  }, [defaultValues]);

  return (
    <div className="core-package-details brokerage">
      <BrokerageHeader />
      <Container className="brokerage__container-main">
        <Container className="brokerage__container-header brokerage__container">
          <p>Build a care package</p>
          <h2>Core package details</h2>
        </Container>
        <ServiceUserDetails
          dateOfBirth={userDetails?.dateOfBirth}
          address={userDetails?.postcode}
          hackneyId={userDetails?.hackneyId}
          serviceUserName={userDetails?.client}
        />
        <CorePackageSelectors
          packageTypeOptions={packageTypeOptions}
          packageType={packageType}
          changeError={changeError}
          errors={errors}
          setPackageType={setPackageType}
          setSupportReason={setSupportReason}
          supportReason={supportReason}
          supportReasonOptions={supportReasonOptions}
        />
        <RadioGroup
          className="core-package-details__radio-group"
          items={packageScheduleOptions}
          value={packageSchedule}
          handle={setPackageSchedule}
          label="Packaging scheduling"
        />
        <Container>
          <h3 className="core-package-details__further-title">Further details</h3>
          <p className="core-package-details__further-sub-title">Select all that apply</p>
          <Container className="core-package-details__checkboxes">
            {checkboxOptions.map((item) => (
              <Checkbox
                key={item.id}
                value={furtherDetails.includes(item.id)}
                handler={() => changeCheckbox(item.id)}
                id={item.id}
                label={item.label}
              />
            ))}
          </Container>
        </Container>
        {Object.values(errors).some((error) => !!error) && <ErrorMessage>There is some errors above</ErrorMessage>}
        <Button className="core-package-details__button" handler={saveAndContinue}>
          Save and continue
        </Button>
      </Container>
    </div>
  );
};

export default CorePackageDetails;
