import React, {useState} from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import AddBillTable from "../../../../components/Bills/AddBillTable";
import AddBillAttachedFiles from "../../../../components/Bills/AddBillAttachedFiles";
import AddBillInvoiceDetails from "../../../../components/Bills/AddBillInvoiceDetails";
import AddBillInvoiceFor from "../../../../components/Bills/AddBillInvoiceFor";
import AddBillTotalInfo from "../../../../components/Bills/AddBillTotalInfo";
import { addBillPackageInfoTestData } from "../../../../testData/billsTestData";
import withSession from "../../../../lib/session";
import {getUserSession} from "../../../../service/helpers";
import {useRouter} from "next/router";

export const getServerSideProps = withSession(async function({ req }) {
  const user = getUserSession({ req });
  if(user.redirect) {
    return {
      props: { user },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
});

const AddBill = () => {
  const router = useRouter();
  const [sorts] = useState([
    {name: 'item', text: 'Item'},
    {name: 'description', text: 'Description'},
    {name: 'qty', text: 'Qty'},
    {name: 'unitPrice', text: 'Unit Price'},
    {name: 'costCentre', text: 'Cost Centre'},
    {name: 'taxRate', text: 'Tax Rate'},
    {name: 'amountExVAT', text: 'Amount Ex VAT'},
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

  const invoiceInputs = {
    packageId: {
      value: inputs.packageId,
      onChange: (value) => onSetPackageId(value),
    },
    serviceFrom: {
      value: inputs.serviceFrom,
      onChange: (value) => changeInputs(value, 'serviceFrom'),
    },
    serviceTo: {
      value: inputs.serviceTo,
      onChange: (value) => changeInputs(value, 'serviceTo'),
    },
  }

  const detailsInputs = {
    invRef: {
      value: inputs.invRef,
      onChange: (value) => changeInputs(value, 'invRef'),
    },
    invoiceDate: {
      value: inputs.invoiceDate,
      onChange: (value) => changeInputs(value, 'invoiceDate'),
    },
    invoiceDue: {
      value: inputs.invoiceDue,
      onChange: (value) => changeInputs(value, 'invoiceDue'),
    },
  }

  const [breadcrumbs] = useState([
    {text: 'Bills', onClick: () => router.back()},
    {text: 'Add Id'},
  ]);

  const addBill = () => {
    console.log('add bill');
  };

  const changeInputs = (value, field) => {
    setInputs({
      ...inputs,
      [field]: value,
    });
  };

  const onSetPackageId = async (value) => {
    changeInputs(value, 'packageId');
    if(packageIdTimer) {
      clearTimeout(packageIdTimer);
    }
    const timer = setTimeout(() => {
      //emit request
      setAddBillInfo(addBillPackageInfoTestData)
    }, 500);
    setPackageIdTimer(timer);
  }

  return (
    <div className='add-bill'>
      <Breadcrumbs values={breadcrumbs} />
      <div className='add-bill__main'>
        <AddBillInvoiceFor inputs={invoiceInputs} />
        <AddBillInvoiceDetails inputs={detailsInputs} />
        <AddBillTable
          isIgnoreId={true}
          rows={addBillInfo?.invoices}
          sorts={sorts}
        />
        <div className='is-flex is-justify-content-space-between add-bill__footer'>
          <AddBillAttachedFiles attachedFiles={addBillInfo?.attachedFiles} />
          <AddBillTotalInfo addBillInfo={addBillInfo} addBill={addBill} />
        </div>
      </div>
    </div>
  )
};

export default AddBill;
