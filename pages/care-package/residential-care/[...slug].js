import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from 'components/Layout/Layout';
import TextArea from 'components/TextArea';
import Dropdown from 'components/Dropdown';
import AdditionalNeeds, {
  getInitialAdditionalNeedsArray,
} from 'components/CarePackages/AdditionalNeedsEntries';
import {
  createResidentialCarePackage,
  createResidentialCarePackageReclaim,
  getResidentialCareAdditionalNeedsCostOptions,
} from 'api/CarePackages/ResidentialCareApi';
import TitleHeader from 'components/TitleHeader';
import { Button } from 'components/Button';
import { CARE_PACKAGE_ROUTE } from 'routes/RouteConstants';
import { formatCareDatePeriod, getUserSession } from 'service/helpers'
import withSession from 'lib/session';
import PackageReclaims from 'components/CarePackages/PackageReclaims';
import { addNotification } from 'reducers/notificationsReducer';
import formValidator from 'service/formValidator';
import useResidentialCareApi from 'api/SWR/useResidentialCareApi'
import CareSummary from 'components/ProposedPackages/CareSummary'
import { getEnGBFormattedDate } from '../../../api/Utils/FuncUtils'

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
  const [additionalNeedsCostOptions, setAdditionalNeedsCostOptions] = useState([]);
  const [errors, setErrors] = useState([]);

  const [needToAddress, setNeedToAddress] = useState(undefined);
  const [selectedCareHomeType, setSelectedCareHomeType] = useState(1);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(getInitialAdditionalNeedsArray());

  // Package reclaim
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);
  const { data: careHomeOptions } = useResidentialCareApi.homeTypeOptions();

  const retrieveResidentialCareAdditionalNeedsCostOptions = () => {
    const options = getResidentialCareAdditionalNeedsCostOptions();
    setAdditionalNeedsCostOptions(options);
  };

  useEffect(() => {
    if (additionalNeedsCostOptions.length === 0 || additionalNeedsCostOptions.length === 1) {
      retrieveResidentialCareAdditionalNeedsCostOptions();
    }
  }, [additionalNeedsCostOptions]);

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
    const defaultErrors = formValidator({
      form: {
        needToAddress,
        selectedCareHomeType,
      },
    });

    if (defaultErrors.hasErrors) {
      setErrorFields(defaultErrors.validFields);
    }

    const additionalNeedsTimedArr = [];

    const additionalNeedsError = additionalNeedsEntries.map(({
      selectedCost,
      selectedCostText,
      needToAddress: needToAddressEntry,
    }) => {
      const valid = formValidator({
        form: {
          selectedCost,
          selectedCostText,
          needToAddress: needToAddressEntry,
        },
      });

      additionalNeedsTimedArr.push(valid.validFields);
      return valid.hasErrors;
    });
    setAdditionalNeedsEntriesErrors(additionalNeedsTimedArr);

    const packageReclaimsTimedArr = [];
    const packageReclaimsFieldsError = packagesReclaimed.map(({
      from,
      category,
      type,
      notes,
      amount,
    }) => {
      const valid = formValidator({ form: { from, category, type, notes, amount } });
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
      additionalNeedsPaymentTypeId: item.selectedCost,
      startDate: item.selectedCost === 3 ? new Date(item.selectedPeriod.startDate).toJSON() : null,
      endDate: item.selectedCost === 3 ? new Date(item.selectedPeriod.endDate).toJSON() : null,
      needToAddress: item.needToAddress,
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

    const pushNotification = (text, className = 'error') => {
      dispatch(addNotification({ text, className }));
    };

    createResidentialCarePackage(residentialCarePackageToCreate)
      .catch((error) => {
        pushNotification(error);
        setErrors([...errors, `Create package failed. ${error.message}`]);
        throw new Error();
      })
      .then(({ id }) => {
        const requests = packagesReclaimed.map((el) =>
          createResidentialCarePackageReclaim(id, {
            residentialCarePackageId: id,
            reclaimFromId: el.from,
            reclaimCategoryId: el.category,
            reclaimAmountOptionId: el.type,
            notes: el.notes,
            amount: el.amount,
          })
        );
        return Promise.all(requests);
      })
      .catch((error) => {
        pushNotification(error);
        setErrors([...errors, `Create reclaims failed. ${error.message}`]);
      })
      .then(() => {
        pushNotification('Package saved', 'success');
        router.push(`${CARE_PACKAGE_ROUTE}`);
      });
  };

  const periodDate = formatCareDatePeriod(startDate, endDate);

  return (
    <Layout
      clientSummaryInfo={{
        client: "James Stephens",
        hackneyId: "786288",
        age: "91",
        dateOfBirth: "09/12/1972",
        postcode: "E9 6EY",
        title: `BUILD A CARE PACKAGE\nResidential Care ${periodDate.startDate} - ${periodDate.endDate}`,
      }}
    >
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
            options={careHomeOptions}
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
        <CareSummary
          careType='Residential Care'
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
