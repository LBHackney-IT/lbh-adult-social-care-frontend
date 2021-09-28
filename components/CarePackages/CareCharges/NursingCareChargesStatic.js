import React, { useEffect, useState } from 'react';
import { Container } from '../../HackneyDS/Layout/Container';
import { SingleCareChargeTable } from '../../CareCharges/SingleCareCharge/SingleCareChargeTable';
import { currency } from '../../../constants/strings';
import { Tag } from '../../HackneyDS';
import { format } from 'date-fns';
import { formatStatus, getNumberWithCommas } from '../../../service/helpers';

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
      Cell: ({ value, row: { original } }) => (
        <p>
          {value}
          {original?.creditRiskAdjustment &&
            <>
              <br/>
              <span className='hackney-text-green font-weight-bold font-size-12px'>
                {formatStatus(original.creditRiskAdjustment).toUpperCase()}
              </span>
            </>
          }
        </p>
      ),
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
          <span className='hackney-text-green'> NET OFF </span>
          {currency.euro}{totalCost}
        </p>
      </Container>
      <p className='text-black font-size-16px'>Who is collecting these care charges</p>
      <p className='font-weight-bold text-black font-size-14px'>{formatStatus(collectingCharges, '-', true)}</p>
    </>
  );
};

export default NursingCareChargesStatic;