import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ClientSummary from '../../../components/ClientSummary';
import Layout from '../../../components/Layout/Layout';
import CareTitle from '../../../components/CarePackages/CareTitle';
import TextArea from '../../../components/TextArea';
import Dropdown from '../../../components/Dropdown';
import { getEnGBFormattedDate } from '../../../api/Utils/FuncUtils';
import AdditionalNeeds, {
  getInitialAdditionalNeedsArray,
} from '../../../components/CarePackages/AdditionalNeedsEntries';
import {
  createResidentialCarePackage,
  getResidentialCareAdditionalNeedsCostOptions,
  getTypeOfResidentialCareHomeOptions,
} from '../../../api/CarePackages/ResidentialCareApi';
import TitleHeader from '../../../components/TitleHeader';
import ResidentialCareSummary from '../../../components/ResidentialCare/ResidentialCareSummary';
import { Button } from '../../../components/Button';
import { CARE_PACKAGE_ROUTE } from '../../../routes/RouteConstants';
import { getUserSession } from '../../../service/helpers';
import withSession from '../../../lib/session';
import PackageReclaims from '../../../components/CarePackages/PackageReclaims';
import { addNotification } from '../../../reducers/notificationsReducer';
import fieldValidator from '../../../service/inputValidator';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const ResidentialCare = () => {
  const dispatch = useDispatch();
  const isTrueParse = (myValue) => myValue === 'true';
  const notNullString = (myValue) => myValue !== 'null' && myValue !== 'undefined';

  // Parameters
  const router = useRouter();
  const [typeOfStayText] = router.query.slug; // get query params
  let [
    hasRespiteCare,
    hasDischargePackage,
    isImmediateOrReEnablement,
    typeOfStayId,
    isS117,
    isFixedPeriod,
    startDate,
    endDate,
  ] = router.query.slug; // get query params
  hasRespiteCare = isTrueParse(hasRespiteCare) || false;
  hasDischargePackage = isTrueParse(hasDischargePackage) || false;
  isImmediateOrReEnablement = isTrueParse(isImmediateOrReEnablement) || false;
  typeOfStayId = parseInt(typeOfStayId, 10) ?? null;
  isS117 = isTrueParse(isS117) || false;
  startDate = startDate ?? null;
  endDate = endDate && notNullString(endDate) ? endDate : undefined;

  // State
  const [careHomeTypes, setCareHomeTypes] = useState([]);
  const [additionalNeedsCostOptions, setAdditionalNeedsCostOptions] = useState([]);
  const [errors, setErrors] = useState([]);

  const [needToAddress, setNeedToAddress] = useState(undefined);
  const [selectedCareHomeType, setSelectedCareHomeType] = useState(1);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(getInitialAdditionalNeedsArray());

  // Package reclaim
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);

  const retrieveTypeOfResidentialCareHomeOptions = () => {
    getTypeOfResidentialCareHomeOptions()
      .then((res) => {
        const options = res.map((option) => ({
          text: option.typeOfCareHomeName,
          value: option.typeOfCareHomeId,
        }));
        setCareHomeTypes(options);
      })
      .catch((error) => {
        setErrors([...errors, `Retrieve residential care home type options failed. ${error.message}`]);
      });
  };

  const retrieveResidentialCareAdditionalNeedsCostOptions = () => {
    const options = getResidentialCareAdditionalNeedsCostOptions();
    setAdditionalNeedsCostOptions(options);
  };

  useEffect(() => {
    if (careHomeTypes.length === 0 || careHomeTypes.length === 1) {
      retrieveTypeOfResidentialCareHomeOptions();
    }
    if (additionalNeedsCostOptions.length === 0 || additionalNeedsCostOptions.length === 1) {
      retrieveResidentialCareAdditionalNeedsCostOptions();
    }
  }, [careHomeTypes, additionalNeedsCostOptions]);

  const [errorFields, setErrorFields] = useState({
    needToAddress: '',
    selectedNursingHomeType: '',
  });
  const [additionalNeedsEntriesErrors, setAdditionalNeedsEntriesErrors] = useState([]);
  const [packageReclaimedError, setPackageReclaimedError] = useState([]);

  const changeErrorField = (field) => {
    setErrorFields({ ...errorFields, [field]: '' });
  };

  const formIsValid = () => {
    const defaultErrors = fieldValidator([
      { name: 'needToAddress', value: needToAddress, rules: ['empty'] },
      { name: 'selectedCareHomeType', value: selectedCareHomeType, rules: ['empty'] },
    ]);

    if (defaultErrors.hasErrors) {
      setErrorFields(defaultErrors.validFields);
    }

    const additionalNeedsTimedArr = [];

    const additionalNeedsError = additionalNeedsEntries.map((item) => {
      const valid = fieldValidator([
        { name: 'selectedCost', value: item.selectedCost, rules: ['empty'] },
        { name: 'selectedCostText', value: item.selectedCostText, rules: ['empty'] },
        { name: 'needToAddress', value: item.needToAddress, rules: ['empty'] },
      ]);

      additionalNeedsTimedArr.push(valid.validFields);
      return valid.hasErrors;
    });
    setAdditionalNeedsEntriesErrors(additionalNeedsTimedArr);

    const packageReclaimsTimedArr = [];
    const packageReclaimsFieldsError = packagesReclaimed.map((item) => {
      const valid = fieldValidator([
        { name: 'from', value: item.from, rules: ['empty'] },
        { name: 'category', value: item.category, rules: ['empty'] },
        { name: 'type', value: item.type, rules: ['empty'] },
        { name: 'notes', value: item.notes, rules: ['empty'] },
        { name: 'amount', value: item.amount, rules: ['empty'] },
      ]);
      packageReclaimsTimedArr.push(valid.validFields);
      return valid.hasErrors;
    });
    setPackageReclaimedError(packageReclaimsTimedArr);

    return !(
      defaultErrors.hasErrors ||
      additionalNeedsError.some((item) => item) ||
      packageReclaimsFieldsError.some((item) => item)
    );
  };

  const handleSavePackage = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;

    const residentialCareAdditionalNeeds = additionalNeedsEntries.map((item) => ({
      isWeeklyCost: item.selectedCost === 1,
      isOneOffCost: item.selectedCost === 2,
      isFixedPeriod: item.selectedCost === 3,
      startDate: item.selectedCost === 3 ? new Date(item.selectedPeriod.startDate).toJSON() : null,
      endDate: item.selectedCost === 3 ? new Date(item.selectedPeriod.endDate).toJSON() : null,
      needToAddress: item.needToAddress,
      creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
    }));

    const packageReclaims = packagesReclaimed.map((reclaim) => ({
      ReclaimFromId: reclaim.from,
      ReclaimCategoryId: reclaim.category,
      ReclaimAmountOptionId: reclaim.type,
      Notes: reclaim.notes,
      Amount: reclaim.amount,
    }));

    const residentialCarePackageToCreate = {
      isFixedPeriod: JSON.parse(isFixedPeriod),
      clientId: 'aee45700-af9b-4ab5-bb43-535adbdcfb80',
      startDate: startDate ? new Date(startDate).toJSON() : null,
      endDate: endDate ? new Date(endDate).toJSON() : null,
      hasRespiteCare,
      hasDischargePackage,
      isThisAnImmediateService: isImmediateOrReEnablement,
      isThisUserUnderS117: isS117,
      residentialCareTypeOfStayId: typeOfStayId,
      needToAddress,
      typeOfResidentialCareHomeId: selectedCareHomeType,
      creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
      residentialCareAdditionalNeeds,
      packageReclaims,
    };

    createResidentialCarePackage(residentialCarePackageToCreate)
      .then(() => {
        dispatch(addNotification({ text: 'Package saved', className: 'success' }));
        router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        dispatch(addNotification({ text: `Create package failed. ${error.message ?? ''}` }));
        setErrors([...errors, `Create package failed. ${error.message}`]);
      });
  };

  return (
    <Layout headerTitle="BUILD A CARE PACKAGE">
      <ClientSummary client="James Stephens" hackneyId="786288" age="91" dateOfBirth="09/12/1972" postcode="E9 6EY">
        Care Package
      </ClientSummary>
      <div className="mt-5 mb-5">
        <CareTitle startDate={startDate} endDate={endDate}>
          Residential Care
        </CareTitle>
      </div>
      <div className="mt-4 columns">
        <div className="column">
          <TextArea
            label="Need to Address"
            rows={5}
            placeholder="Add details..."
            onChange={setNeedToAddress}
            error={errorFields.needToAddress}
            setError={() => changeErrorField('needToAddress')}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Type of care home"
            options={careHomeTypes}
            selectedValue={selectedCareHomeType}
            onOptionSelect={(option) => setSelectedCareHomeType(option)}
            buttonStyle={{ width: '240px' }}
            error={errorFields.selectedCareHomeType}
            setError={() => changeErrorField('selectedCareHomeType')}
          />
        </div>
      </div>
      <div className="mt-4">
        <AdditionalNeeds
          costOptions={additionalNeedsCostOptions}
          entries={additionalNeedsEntries}
          setAdditionalNeedsState={setAdditionalNeedsEntries}
          error={additionalNeedsEntriesErrors}
          setError={setAdditionalNeedsEntriesErrors}
        />
      </div>

      <PackageReclaims
        errors={errors}
        setErrors={setErrors}
        error={packageReclaimedError}
        setError={setPackageReclaimedError}
        packagesReclaimed={packagesReclaimed}
        setPackagesReclaimed={setPackagesReclaimed}
      />

      <div className="mt-4 mb-4">
        <TitleHeader className="mb-5">Package Details</TitleHeader>
        <ResidentialCareSummary
          startDate={startDate}
          endDate={getEnGBFormattedDate(endDate)}
          typeOfStayText={typeOfStayText}
          needToAddress={needToAddress}
          additionalNeedsEntries={additionalNeedsEntries}
          setAdditionalNeedsEntries={setAdditionalNeedsEntries}
        />
      </div>

      <div className="level mt-4">
        <div className="level-item level-right">
          <Button onClick={handleSavePackage}>Confirm Package</Button>
        </div>
      </div>
    </Layout>
  );
};

export default ResidentialCare;
