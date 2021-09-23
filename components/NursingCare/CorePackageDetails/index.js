import React, { useEffect, useState } from 'react';
import BuildCarePackageHeader from '../../BuildCarePackage/BuildCarePackageHeader';
import { Button, Checkbox, Container, ErrorMessage, HorizontalSeparator, RadioGroup, Select } from '../../HackneyDS';
import { formatDate } from '../../../service/helpers';
import { getAgeFromDateString } from '../../../api/Utils/FuncUtils';
import { object, string } from 'yup';

export const CorePackageDetails = ({
  userDetails,
  packageScheduleOptions,
  supportReasonOptions,
  checkboxOptions,
  packageTypeOptions,
}) => {
  const [supportReason, setSupportReason] = useState('');
  const [packageType, setPackageType] = useState('');
  const [packageSchedule, setPackageSchedule] = useState('');
  const [furtherDetails, setFurtherDetails] = useState([]);
  const [errors, setErrors] = useState({
    packageType: '',
    supportReason: '',
    packageSchedule: '',
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

    const schemaPackageSchedule = object().shape({
      packageSchedule: string().required(),
    });

    const validPackageType = await schemaPackageType.isValid({ packageType });
    const validSupportReason = await schemaSupportReason.isValid({ supportReason });
    const validPackageSchedule = await schemaPackageSchedule.isValid({ packageSchedule });

    const hasErrors = [validPackageType, validSupportReason, validPackageSchedule].some(item => !item);

    if (hasErrors) {
      setErrors({
        packageType: !validPackageType && 'Required field',
        supportReason: !validSupportReason && 'Required field',
        packageSchedule: !validPackageSchedule && 'Required field',
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
        <Container className='user-details remove-approvals__default-container'>
          <h3>Service user details</h3>
          <Container>
            <p>Client</p>
            <p>{userDetails.client}</p>
          </Container>
          <Container>
            <p>Hackney ID</p>
            <p>#{userDetails.hackneyId}</p>
          </Container>
          <Container>
            <p>Age</p>
            <p>
              {formatDate(userDetails.dateOfBirth, '/')}
              {getAgeFromDateString(userDetails.dateOfBirth)}
            </p>
          </Container>
          <Container>
            <p>Postcode</p>
            <p>{userDetails.postcode}</p>
          </Container>
        </Container>
        <Container className=' remove-approvals__default-container'>
          <h3>Package type</h3>
          <Container display='flex' flexDirection='column'>
            <Select
              error={errors.packageType}
              onChange={({ target: { value } }) => {
                setPackageType(value);
                changeError('packageType');
              }}
              value={packageType.value}
              options={packageTypeOptions}
            />
            <Select
              error={errors.supportReason}
              onChange={({ target: { value } }) => {
                setSupportReason(value);
                changeError('supportReason');
              }}
              value={supportReason.value}
              options={supportReasonOptions}
            />
          </Container>
        </Container>
        <Container>
          <RadioGroup
            error={errors.packageSchedule}
            label='Packaging scheduling'
            value={packageSchedule}
            handle={value => {
              setPackageSchedule(value);
              changeError('packageSchedule');
            }}
            items={packageScheduleOptions}
          />
          <HorizontalSeparator/>
          <HorizontalSeparator/>
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