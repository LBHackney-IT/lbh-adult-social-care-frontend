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
import PackageReclaims from '../../../components/CarePackages/PackageReclaims';
import { addNotification } from '../../../reducers/notificationsReducer';

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
  typeOfStayId = parseInt(typeOfStayId) ?? null;
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

  const formIsValid = () => {
    const errors = [];

    setErrors(errors);
    // Form is valid if the errors array has no items
    return errors.length === 0;
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
        dispatch(addNotification({ text: `Create package failed. ${error.message}` }));
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
          <TextArea label="Need to Address" rows={5} placeholder="Add details..." onChange={setNeedToAddress} />
        </div>
        <div className="column">
          <Dropdown
            label="Type of care home"
            options={careHomeTypes}
            selectedValue={selectedCareHomeType}
            onOptionSelect={(option) => setSelectedCareHomeType(option)}
            buttonStyle={{ width: '240px' }}
          />
        </div>
      </div>
      <div className="mt-4">
        <AdditionalNeeds
          costOptions={additionalNeedsCostOptions}
          entries={additionalNeedsEntries}
          setAdditionalNeedsState={setAdditionalNeedsEntries}
        />
      </div>

      <PackageReclaims
        errors={errors}
        setErrors={setErrors}
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
