import * as yup from 'yup';
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

const newOneOffAdditionalNeedSchema = yup.object().shape({
  startDate: yup.string().typeError('Please select a start date').required('Please select a start date'),
  endDate: yup.string().typeError('Please select an end date').required('Please select an end date'),
  cost: yup.number().typeError('Please enter a cost').required('Please enter a cost').min(1, 'Please enter a cost'),
});

const newWeeklyAdditionalNeedSchema = yup.object().shape({
  startDate: yup.string().typeError('Please select a start date').required('Please select a start date'),
  cost: yup.number().typeError('Please enter a cost').required('Please enter a cost').min(1, 'Please enter a cost'),
});

export const getFNCDateValidationSchema = ({ detailsData }) => yup.object().shape({
  detailsDateTo: null,
  isOngoing: yup.boolean(),
  dateFrom: yup
    .date()
    .typeError('Please select a date from')
    .required()
    .test('dateFrom', 'Date from less then core date start', (dateFrom) => (
      compareDescendingDMY(dateFrom, detailsData.startDate) !== dateDescending.asc
    ))
    .test('dateFrom', 'Date from more then core date end', (dateFrom) => {
      if (detailsData.endDate) {
        return compareDescendingDMY(dateFrom, detailsData.endDate) !== dateDescending.desc;
      }
      return true;
    }),
  dateTo: yup
    .mixed()
    .when('isOngoing', {
      is: false,
      then: yup
        .date()
        .typeError('Please select a date to')
        .required()
        .test('dateTo', '(Date to) less then (date from)', (dateTo, { parent }) => (
          compareDescendingDMY(parent?.dateFrom, dateTo) !== dateDescending.desc
        ))
        .test('dateTo', 'Date to should be less or equal then core end date', (value) => {
          if (detailsData.endDate) {
            return compareDescendingDMY(value, detailsData.endDate) !== dateDescending.desc;
          }
          return true;
        }),
    })
});

export const fncClaimCollectorSchema = yup.object().shape({
  claimCollector: yup
    .number()
    .typeError('Required field')
    .required('Required field')
});

export const assignPackageSchema = yup.object().shape({
  brokerId: yup.string().typeError('Please choose a Broker').required().min(2, 'Please choose a Broker'),
  packageType: yup
    .number()
    .typeError('Please select a package type')
    .required()
    .min(1, 'Please select a package type'),
  file: yup
    .mixed()
    .test('fileInfo', '', (value) => {
      if (!value?.size || (value?.size && TEXT_FILE_EXTENSIONS.some(fileType => value.type.includes(fileType)))) {
        return true;
      }
    })
});

export const getBrokerCareChargeSchema = (isOngoing) =>
  yup.object().shape({
    collectedBy: yup
      .string()
      .typeError('Please choose collected by option')
      .required('Please choose collected by option'),
    dates: yup
      .mixed()
      .test('dates', 'Please set care charges schedule', (dates) => dates.startDate)
      .test('dates', 'Please set end date', (value) => !(value.startDate && !isOngoing && !value.endDate))
      .test(
        'dates',
        'Start date should me more then end date',
        ({ startDate, endDate }) => !(
          startDate &&
          !isOngoing &&
          endDate &&
          startDate > endDate
        )),
    reasonCollecting: yup
      .mixed()
      .test('reasonCollected', 'Reason collected is required', (value, { parent }) => {
        if (parent.collectedBy === 'hackney') return value;

        return true;
      }),
    cost: yup
      .number()
      .typeError('Please select a package type')
      .required()
      .min(1, 'Please select a package type'),
  })

export const formValidationSchema = {
  carePackageCorePackageSchema,
  carePackageBrokerPackageSchema,
  newOneOffAdditionalNeedSchema,
  newWeeklyAdditionalNeedSchema,
};
