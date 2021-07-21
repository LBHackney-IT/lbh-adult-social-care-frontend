import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import Pagination from "../../components/Payments/Pagination";
import HackneyFooterInfo from "../../components/HackneyFooterInfo";
import SocialWorkerInputs from "../../components/SocialWorker/SocialWorkerInputs";
import {socialWorkerDashboardTableData} from "../../testData/testDataSocialWorker";
import SocialWorkerTable from "../../components/SocialWorker/SocialWorkerTable";
import useSWR from 'swr'

const serverSocialWorker = async () => {};

const SocialWorkerDashboardPage = () => {
  const { data } = useSWR('', serverSocialWorker);
  const [sorts] = useState([
    {name: 'client', text: 'Client'},
    {name: 'category', text: 'Category'},
    {name: 'dob', text: 'DOB'},
    {name: 'approver', text: 'Approver'},
    {name: 'submitted', text: 'Submitted\n(days ago)'},
    {name: 'status', text: 'Status'},
  ]);

  const router = useRouter();
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  const onClickTableRow = (rowItems) => {
    router.push(`${router.pathname}/${rowItems.id}`)
  };

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  return (
    <div className="social-worker-page">
      <SocialWorkerInputs />
      <SocialWorkerTable
        isIgnoreId={true}
        className='p-4'
        onClickTableRow={onClickTableRow}
        rows={socialWorkerDashboardTableData}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={1} to={50} itemsCount={10} totalCount={10} />
      <HackneyFooterInfo />
    </div>
  )
};

export default SocialWorkerDashboardPage;
