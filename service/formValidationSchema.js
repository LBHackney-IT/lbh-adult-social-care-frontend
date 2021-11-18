import * as yup from 'yup';

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
  supplierId: yup.number().typeError('Please search for and select a supplier').required(),
  coreCost: yup
    .number()
    .typeError('Please enter a weekly cost for the package')
    .required()
    .min(1, 'Please enter a weekly cost for the package'),
});

export const formValidationSchema = { carePackageCorePackageSchema, carePackageBrokerPackageSchema };

// isOngoing: false,
// endDate: null,
// startDate: null,
// supplierId: null,
// coreCost: null,
// details: [],
