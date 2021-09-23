import React, { useEffect, useState } from 'react';
import BuildCarePackageHeader from '../BuildCarePackage/BuildCarePackageHeader';
import { Button, Checkbox, Container, ErrorMessage } from '../HackneyDS';
import { object, string } from 'yup';
import CorePackageUserDetails from './CorePackageUserDetails';
import CorePackageSelectors from './CorePackageSelectors';

export const CorePackageDetails = ({
  userDetails,
  supportReasonOptions,
  checkboxOptions,
  packageTypeOptions,
}) => {
  const [supportReason, setSupportReason] = useState('');
  const [packageType, setPackageType] = useState('');
  const [furtherDetails, setFurtherDetails] = useState([]);
  const [errors, setErrors] = useState({
    packageType: '',
    supportReason: '',
  });

  const changeCheckbox = (id) => {
    if (furtherDetails.includes(id)) {
      setFurtherDetails(prevState => prevState.filter(item => item !== id));
    } else {
      setFurtherDetails([...furtherDetails, id]);
    }
  };

  const changeError = (field, value = '') => {
    setErrors(prevState => ({
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

    const hasErrors = [validPackageType, validSupportReason, validPackageSchedule].some(item => !item);

    if (hasErrors) {
      setErrors({
        packageType: !validPackageType && 'Required field',
        supportReason: !validSupportReason && 'Required field',
      });
      return;
    }

    console.log('save and continue');
  };

  useEffect(() => {
    if (supportReasonOptions) {
      setSupportReason(supportReasonOptions[0]?.value);
    }
  }, [supportReasonOptions]);

  useEffect(() => {
    if (packageTypeOptions) {
      setPackageType(packageTypeOptions[0]?.value);
    }
  }, [packageTypeOptions]);

  return (
    <div className='core-package-details'>
      <BuildCarePackageHeader/>
      <Container className='remove-approvals__container'>
        <Container className='remove-approvals-header remove-approvals__default-container'>
          <p>Build a care package</p>
          <h2>Core package details</h2>
        </Container>
        <CorePackageUserDetails {...userDetails} />
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
        <Container>
          <h3 className='core-package-details__further-title'>Further details</h3>
          <p className='core-package-details__further-sub-title'>Select all that apply</p>
          <Container className='core-package-details__checkboxes'>
            {checkboxOptions.map(item => (
              <Checkbox
                key={item.id}
                value={item.id}
                handler={() => changeCheckbox(item.id)}
                checked={furtherDetails.includes(item.id)}
                id={item.id}
              >
                {item.label}
              </Checkbox>
            ))}
          </Container>

        </Container>
        {Object.values(errors).some(error => !!error) &&
        <ErrorMessage>There is some errors above</ErrorMessage>
        }
        <Button handler={saveAndContinue}>Save and continue</Button>
      </Container>
    </div>
  );
};