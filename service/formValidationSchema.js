import * as yup from 'yup';
import { addDays, differenceInWeeks, isAfter, isBefore, isSameDay, subDays } from 'date-fns';
import { compareDescendingDMY } from './helpers';
import { dateDescending, TEXT_FILE_EXTENSIONS } from '../constants/variables';

const carePackageCorePackageSchema = yup.object().shape({
  packageType: yup.number().typeError('Please select a package type').required().min(1, 'Please select a package type'),
  primarySupportReasonId: yup
    .number()
    .typeError('Please select a primary support reason')
    .required()
    .min(1, 'Please select a primary support reason'),
  packageScheduling: yup.number().required().min(1, 'Please select a package scheduling option'),
});

const carePackageBrokerPackageSchema = yup.object().shape({
  startDate: yup
    .string()
    .typeError('Please select a start date for the package')
    .required('Please select a start date'),
  supplierId: yup
    .number()
    .typeError('Please search for and select a supplier')
    .required('Please search for and select a supplier'),
  coreCost: yup
    .number()
    .typeError('Please enter a weekly cost for the package')
    .required('Please enter a weekly cost for the package')
    .min(1, 'Please enter a weekly cost for the package'),
});

const carePackageFNCSchema = yup.object().shape({
  startDate: yup
    .string()
    .typeError('Please select a start date for the package')
    .required('Please select a start date'),
  claimCollector: yup
    .number()
    .typeError('Please select a claims collector')
    .required('Required field')
    .min(1, 'Please select a claims collector'),
  hasAssessmentBeenCarried: yup
    .mixed()
    .test(
      'hasAssessmentBeenCarried',
      'Please select an option',
      (value, { parent }) => !(parent?.id && value === null)
    ),
});

const carePackageBrokerCareChargesSchema = yup.object().shape({
  startDate: yup.string().typeError('Please select a start date').required('Please select a start date'),
  claimCollector: yup
    .number()
    .typeError('Please select a claims collector')
    .required('Please select a claims collector')
    .min(1, 'Please select a claims collector'),
  cost: yup.number().typeError('Please enter a cost').required('Please enter a cost').min(1, 'Please enter a cost'),
});

const newOneOffAdditionalNeedSchema = yup.object().shape({
  startDate: yup.string().typeError('Please select a start date').required('Please select a start date'),
  endDate: yup.string().typeError('Please select an end date').required('Please select an end date'),
  cost: yup.number().typeError('Please enter a cost').required('Please enter a cost').min(1, 'Please enter a cost'),
});

const newWeeklyAdditionalNeedSchema = yup.object().shape({
  startDate: yup.string().typeError('Please select a start date').required('Please select a start date'),
  cost: yup.number().typeError('Please enter a cost').required('Please enter a cost').min(1, 'Please enter a cost'),
});

export const assignPackageSchema = yup.object().shape({
  brokerId: yup.string().typeError('Please choose a Broker').required().min(2, 'Please choose a Broker'),
  packageType: yup.number().typeError('Please select a package type').required().min(1, 'Please select a package type'),
  file: yup.mixed().test('fileInfo', '', (value) => {
    if (!value?.size || (value?.size && TEXT_FILE_EXTENSIONS.some((fileType) => value.type.includes(fileType)))) {
      return true;
    }
  }),
});

export const getFNCDateValidationSchema = ({ detailsData }) =>
  yup.object().shape({
    detailsDateTo: null,
    isOngoing: yup.boolean(),
    dateFrom: yup
      .date()
      .typeError('Please select a date from')
      .required()
      .test(
        'dateFrom',
        'Date from less then core date start',
        (dateFrom) => compareDescendingDMY(dateFrom, detailsData.startDate) !== dateDescending.asc
      )
      .test('dateFrom', 'Date from more then core date end', (dateFrom) => {
        if (detailsData.endDate) {
          return compareDescendingDMY(dateFrom, detailsData.endDate) !== dateDescending.desc;
        }
        return true;
      }),
    dateTo: yup.mixed().when('isOngoing', {
      is: false,
      then: yup
        .date()
        .typeError('Please select a date to')
        .required()
        .test(
          'dateTo',
          '(Date to) less then (date from)',
          (dateTo, { parent }) => compareDescendingDMY(parent?.dateFrom, dateTo) !== dateDescending.desc
        )
        .test('dateTo', 'Date to should be less or equal then core end date', (value) => {
          if (detailsData.endDate) {
            return compareDescendingDMY(value, detailsData.endDate) !== dateDescending.desc;
          }
          return true;
        }),
    }),
  });

const careChargeAssessmentSchema = yup.object().shape({
  provisional: yup.lazy((value) => {
    if (value && value?.checkValidation) {
      return yup.object().shape({
        startDate: yup
          .string()
          .typeError('Please select a start date')
          .required('Please select a start date')
          .test('startDate', 'Provisional start date must be on or after package start date', (startDate, schema) => {
            if (schema) {
              const { from } = schema;
              const entireSchema = from[1].value;
              if (entireSchema?.packageStart && startDate) {
                return isAfter(addDays(new Date(startDate), 1), new Date(entireSchema?.packageStart));
              }
            }
            return true;
          }),
        claimCollector: yup
          .number()
          .typeError('Please select a claims collector')
          .required('Please select a claims collector')
          .min(1, 'Please select a claims collector'),
        cost: yup
          .number()
          .typeError('Please enter a cost')
          .required('Please enter a cost')
          .min(1, 'Please enter a cost'),
      });
    }
    return yup.mixed().notRequired();
  }),
  residential12: yup.lazy((value) => {
    if (value && value?.checkValidation) {
      return yup.object().shape({
        startDate: yup
          .string()
          .typeError('Please select a start date')
          .required('Please select a start date')
          .test(
            'startDate',
            'Residential 1 - 12 Weeks start date must be on or after package start date',
            (startDate, schema) => {
              if (schema) {
                const { from } = schema;
                const entireSchema = from[1].value;
                if (entireSchema?.packageStart && startDate) {
                  return isAfter(addDays(new Date(startDate), 1), new Date(entireSchema?.packageStart));
                }
              }
              return true;
            }
          ),
        endDate: yup
          .string()
          .typeError('Please select an end date')
          .required('Please select a end date')
          .test('endDate', 'Start and End date are not 12 weeks apart', (endDate, schema) => {
            if (schema) {
              const { from } = schema;
              const entireSchema = from[1].value;
              if (entireSchema?.residential12?.startDate && endDate) {
                const dif = differenceInWeeks(new Date(endDate), new Date(entireSchema?.residential12?.startDate));
                return dif === 12 || isSameDay(new Date(entireSchema?.packageEnd), new Date(endDate));
              }
            }
            return true;
          }),
        claimCollector: yup
          .number()
          .typeError('Please select a claims collector')
          .required('Please select a claims collector')
          .min(1, 'Please select a claims collector'),
        cost: yup
          .number()
          .typeError('Please enter a cost')
          .required('Please enter a cost')
          .min(1, 'Please enter a cost'),
      });
    }
    return yup.mixed().notRequired();
  }),
  residential13: yup.lazy((value) => {
    if (value && value?.checkValidation) {
      return yup.object().shape({
        startDate: yup.string().typeError('Please select a start date').required('Please select a start date'),
        claimCollector: yup
          .number()
          .typeError('Please select a claims collector')
          .required('Please select a claims collector')
          .min(1, 'Please select a claims collector'),
        cost: yup
          .number()
          .typeError('Please enter a cost')
          .required('Please enter a cost')
          .min(1, 'Please enter a cost'),
      });
    }
    return yup.mixed().notRequired();
  }),
});

export const fncClaimCollectorSchema = yup.object().shape({
  claimCollector: yup.number().typeError('Required field').required('Required field'),
});

const newPayRunRegularCyclesSchema = yup.object().shape({
  paidUpToDate: yup.string().typeError('Please select a date').required('Please select a date'),
  type: yup.number().typeError('Please enter a cost').required('Please enter a cost').min(1, 'Please enter a cost'),
});

const endPackageSchema = yup.object().shape({
  endDate: yup.string().typeError('Please select a date').required('Please select a date'),
});

const adHochAndReleasesSchema = yup.object().shape({
  paidUpToDate: yup.string().typeError('Please select a date').required('Please select a date'),
  type: yup.number().typeError('Please enter a cost').required('Please enter a cost').min(1, 'Please enter a cost'),
});

export const formValidationSchema = {
  carePackageCorePackageSchema,
  carePackageBrokerPackageSchema,
  carePackageFNCSchema,
  carePackageBrokerCareChargesSchema,
  newOneOffAdditionalNeedSchema,
  newWeeklyAdditionalNeedSchema,
  newPayRunRegularCyclesSchema,
  adHochAndReleasesSchema,
  careChargeAssessmentSchema,
  endPackageSchema,
};
