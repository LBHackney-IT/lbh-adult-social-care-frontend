import React, { useEffect, useState } from 'react';
import { Container } from '../../HackneyDS/Layout/Container';
import { SingleCareChargeTable } from '../../CareCharges/SingleCareCharge/SingleCareChargeTable';
import { currency } from 'constants/strings';
import { Tag } from '../../HackneyDS';
import { format } from 'date-fns';
import { getNumberWithCommas } from 'service/helpers';

const NursingCareChargesStatic = ({ collectingCharges, tableData }) => {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (tableData?.length) {
      const costSum = tableData.reduce((sum, row) => row.cost + sum, 0);
      setTotalCost(costSum);
    }
  }, [tableData]);

  const [localColumns] = useState([
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <Tag color={value === 'Active' ? 'green' : 'gray'} className="tag-full-width">
          {value}
        </Tag>
      ),
    },
    {
      Header: 'Element',
      accessor: 'element',
      className: 'absorb-width',
    },
    {
      Header: 'Start date',
      accessor: 'startDate',
      Cell: ({ value }) => format(new Date(value), 'dd.MM.yyyy'),
    },
    {
      Header: 'End date',
      accessor: 'endDate',
      Cell: ({ value }) => (value ? format(new Date(value), 'dd.MM.yyyy') : 'Ongoing'),
    },
    {
      Header: 'Cost',
      accessor: 'cost',
      Cell: ({ value }) => (
        <span className="align-right">
          {value < 0 ? `-£${getNumberWithCommas(Math.abs(value))}` : `£${getNumberWithCommas(value)}`}
        </span>
      ),
    },
  ]);

  return (
    <>
      <SingleCareChargeTable hasFooter={false} data={tableData} columns={localColumns}/>
      <Container padding='20px' className='nursing-care-charges__total-cost' display='flex' justifyContent='flex-end'>
        <p className='font-weight-bold text-black'>
          Provider paid
          <span className='hackney-text-green ml-2 mr-5'> NET OFF </span>
          {currency.euro}{totalCost}
        </p>
      </Container>
      <p className='mt-4 mb-1 text-black'>Who is collecting these care charges</p>
      <p className='font-weight-bold mb-6 text-black'>{collectingCharges}</p>
    </>
  );
};

export default NursingCareChargesStatic;