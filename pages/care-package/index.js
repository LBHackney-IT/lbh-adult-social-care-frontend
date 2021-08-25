import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import withSession from '../../lib/session';
import { getUserSession } from '../../service/helpers';
import CareSetup from '../../components/Setup/CareSetup';
import {
  DAY_CARE_ROUTE,
  HOME_CARE_ROUTE,
  NURSING_CARE_ROUTE,
  RESIDENTIAL_CARE_ROUTE
} from '../../routes/RouteConstants';
import useResidentialCareApi from '../../api/SWR/useResidentialCareApi';
import useNursingCareApi from '../../api/SWR/useNursingCareApi';
import { selectNursingTypeOfStayOptions, selectResidentialTypeOfStayOptions } from '../../reducers/carePackageSlice'

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };
  return { props: {} };
});

const CarePackage = ({ history }) => {
  const typeOfStayResidentialOptions = useSelector(selectResidentialTypeOfStayOptions);
  const typeOfStayNursingOptions = useSelector(selectNursingTypeOfStayOptions);
  const [initialValues] = useState({
    isImmediateOrReEnablement: '',
    isS117: '',
    isFixedPeriod: false,
    typeOfStayId: '',
    hasDischargePackage: '',
    hasRespiteCare: '',
    startDate: new Date(),
    endDate: new Date(),
    careTypes: '',
    isImmediate: '',
    isRespiteCare: '',
    isDischargePackage: '',
  });

  const [values, setValues] = useState({...initialValues});
  const [errors, setErrors] = useState({
    ...initialValues,
    startDate: '',
    endDate: '',
  });

  const [careTypes] = useState([
    {
      text: 'Home care',
      value: 0,
      fields: [
        'isImmediate',
        'isS117',
        'isFixedPeriod',
        'startDate',
        'endDate',
      ],
      route: HOME_CARE_ROUTE,
      labels: {
        isImmediate: 'Is this an immediate service or a re-enablement package?',
        isS117: 'Is this user under S117 of the Mental Health Act?'
      },
    },
    {
      text: 'Day care',
      value: 1,
      fields: [
        'isImmediate',
        'isS117',
        'isFixedPeriod',
        'startDate',
        'endDate',
      ],
      labels: {
        isImmediate: 'Is this an immediate service or a re-enablement package?',
        isS117: 'Is this user under S117 of the Mental Health Act?',
      },
      route: DAY_CARE_ROUTE,
    },
    {
      text: 'Residential care',
      value: 2,
      fields: [
        'hasRespiteCare',
        'hasDischargePackage',
        'isImmediateOrReEnablement',
        'typeOfStayId',
        'isS117',
        'isFixedPeriod',
        'startDate',
        'endDate',
      ],
      optionFields: {
        typeOfStayId: typeOfStayResidentialOptions,
      },
      labels: {
        hasRespiteCare: 'Respite care?',
        hasDiscardChanges: 'Discharge package?',
        isImmediate: 'Is this an immediate service or a re-enablement package?',
        isS117: 'Is this user under S117 of the Mental Health Act?',
        isImmediateOrReEnablement: 'Immediate / re-enablement package?',
        typeOfStayId: 'What type of stay is this?',
      },
      route: RESIDENTIAL_CARE_ROUTE,
    },
    {
      text: 'Nursing care',
      value: 3,
      fields: [
        'isFixedPeriod',
        'startDate',
        'typeOfStayId',
        'isRespiteCare',
        'isDischargePackage',
        'isImmediateOrReEnablement',
        'isS117',
        'endDate',
        'isImmediate',
      ],
      optionFields: {
        typeOfStayId: typeOfStayNursingOptions,
      },
      labels: {
        isRespiteCare: 'Respite care?',
        isDischargePackage: 'Discharge package?',
        isImmediate: 'Is this an immediate service or a re-enablement package?',
        isS117: 'Is this user under S117 of the Mental Health Act?',
        isImmediateOrReEnablement: 'Immediate / re-enablement package?',
        typeOfStayId: 'What type of stay is this?',
      },
      route: NURSING_CARE_ROUTE,
    },
  ]);
  const [selectedCareType, setSelectedCareType] = useState(3);

  const residentialTypeOfStayOptions = useResidentialCareApi.typeOfStayOptions();
  const nursingCareTypeOfStayOptions = useNursingCareApi.typeOfStayOptions();

  const changeCareType = (option) => {
    setSelectedCareType(option);
    setValues({...initialValues});
    setErrors({
      ...initialValues,
      startDate: '',
      endDate: '',
    });
  };

  return (
    <Layout showBackButton={false} clientSummaryInfo={{
      client: "James Stephens",
      hackneyId: "786288",
      age: "91",
      dateOfBirth: "09/12/1972",
      postcode: "E9 6EY",
      title: 'Rapid D2A',
    }}>
      <div className="mt-5 mb-5 care-packages-setup">
        <CareSetup
          values={values}
          setValues={(field, value) => {
            setValues((prevValues) => ({
              ...prevValues,
              [field]: value,
            }))
          }}
          history={history}
          careTypes={careTypes.slice(2)}
          errors={errors}
          setErrors={setErrors}
          selectedCareType={selectedCareType}
          setSelectedCareType={changeCareType}
        />
      </div>
    </Layout>
  );
};

export default CarePackage;
