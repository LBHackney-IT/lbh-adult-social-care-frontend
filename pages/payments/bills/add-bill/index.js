import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from 'components/Breadcrumbs';
import AddBillTable from 'components/Bills/AddBillTable';
import AddBillAttachedFiles from 'components/Bills/AddBillAttachedFiles';
import AddBillInvoiceDetails from 'components/Bills/AddBillInvoiceDetails';
import AddBillInvoiceFor from 'components/Bills/AddBillInvoiceFor';
import AddBillTotalInfo from 'components/Bills/AddBillTotalInfo';
import withSession from 'lib/session';
import { getUserSession } from 'service/helpers';
import formValidator from 'service/formValidator';
import { addBillPackageInfoTestData } from '../../../../testData/billsTestData';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const AddBill = () => {
  const router = useRouter();
  const [sorts] = useState([
    { name: 'item', text: 'Item' },
    { name: 'description', text: 'Description' },
    { name: 'qty', text: 'Qty' },
    { name: 'unitPrice', text: 'Unit Price' },
    { name: 'costCentre', text: 'Cost Centre' },
    { name: 'taxRate', text: 'Tax Rate' },
    { name: 'amountExVAT', text: 'Amount Ex VAT' },
  ]);
  const [addBillInfo, setAddBillInfo] = useState({});
  const [packageIdTimer, setPackageIdTimer] = useState(null);
  const [inputs, setInputs] = useState({
    packageId: '',
    serviceFrom: null,
    serviceTo: null,
    invoiceDate: null,
    invoiceDue: null,
    invRef: '',
  });

  const [inputsError, setInputsError] = useState({
    packageId: [],
    serviceFrom: [],
    serviceTo: [],
    invoiceDate: [],
    invoiceDue: [],
    invRef: [],
  });

  const invoiceInputs = {
    packageId: {
      value: inputs.packageId,
      error: inputsError.packageId,
      onChange: (value) => onSetPackageId(value, 'packageId'),
    },
    serviceFrom: {
      value: inputs.serviceFrom,
      error: inputsError.serviceFrom,
      onChange: (value) => changeInputs(value, 'serviceFrom'),
    },
    serviceTo: {
      value: inputs.serviceTo,
      error: inputsError.serviceTo,
      onChange: (value) => changeInputs(value, 'serviceTo'),
    },
  };

  const detailsInputs = {
    invRef: {
      value: inputs.invRef,
      error: inputsError.invRef,
      onChange: (value) => changeInputs(value, 'invRef'),
    },
    invoiceDate: {
      value: inputs.invoiceDate,
      error: inputsError.invoiceDate,
      onChange: (value) => changeInputs(value, 'invoiceDate'),
    },
    invoiceDue: {
      value: inputs.invoiceDue,
      error: inputsError.invoiceDue,
      onChange: (value) => changeInputs(value, 'invoiceDue'),
    },
  };

  const [breadcrumbs] = useState([{ text: 'Bills', onClick: () => router.back() }, { text: 'Add Id' }]);

  const addBill = () => {
    const form = {};
    const allInputs = { ...invoiceInputs, ...detailsInputs };
    for (const name in allInputs) {
      form[name] = allInputs[name];
    }
    const { validFields, hasError } = formValidator({ form });
    if (hasError) {
      setInputsError(validFields);
    }
  };

  const changeInputs = (value, field) => {
    setInputs({
      ...inputs,
      [field]: value,
    });
    setInputsError({
      ...inputsError,
      [field]: null,
    });
  };

  const onSetPackageId = async (value) => {
    changeInputs(value, 'packageId');
    if (packageIdTimer) {
      clearTimeout(packageIdTimer);
    }
    const timer = setTimeout(() => {
      // emit request
      setAddBillInfo(addBillPackageInfoTestData);
    }, 500);
    setPackageIdTimer(timer);
  };

  return (
    <div className="add-bill">
      <Breadcrumbs values={breadcrumbs} />
      <div className="add-bill__main">
        <AddBillInvoiceFor inputs={invoiceInputs} />
        <AddBillInvoiceDetails inputs={detailsInputs} />
        <AddBillTable isIgnoreId rows={addBillInfo?.invoices} sorts={sorts} />
        <div className="is-flex is-justify-content-space-between add-bill__footer">
          <AddBillAttachedFiles attachedFiles={addBillInfo?.attachedFiles} />
          <AddBillTotalInfo addBillInfo={addBillInfo} addBill={addBill} />
        </div>
      </div>
    </div>
  );
};

export default AddBill;
