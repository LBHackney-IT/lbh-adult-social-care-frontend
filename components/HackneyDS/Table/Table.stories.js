import { format } from 'date-fns';
import React from 'react';
import faker from 'faker';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { Table } from '.';
import { getNumberWithCommas } from '../../../service/helpers';
import { IndeterminateCheckbox } from './IndeterminateCheckbox';

const createTableData = (records) => {
  let tableData = [];
  const genders = ['female', 'male'];
  for (let index = 1; index < records + 1; index++) {
    const id = index;
    const joined = faker.date.past();
    const name = faker.name.findName();
    const gender = faker.random.arrayElement(genders);
    const age = faker.datatype.number(100);
    const total = faker.datatype.number(100000);
    tableData = [...tableData, { id, joined, name, gender, age, total }];
  }
  return tableData;
};

const columns = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Joined',
    accessor: 'joined',
    Cell: ({ value }) => format(new Date(value), 'd/MM/Y'),
  },
  {
    Header: 'Total',
    accessor: 'total',
    Cell: ({ value }) => `£${getNumberWithCommas(value)}`,
  },
];

const data = createTableData(100);

export default {
  title: 'Hackney Design System/ Table',
  component: Table,
  argTypes: {
    columns: {
      control: false,
    },
  },
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns,
  data,
  hasRowSelection: false,
};

const expandRowCallback = ({ row }) => (
  <pre
    style={{
      fontSize: '10px',
    }}
  >
    <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
  </pre>
);

const columns2 = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Joined',
    accessor: 'joined',
    Cell: ({ value }) => format(new Date(value), 'd/MM/Y'),
  },
  {
    Header: 'Total',
    accessor: 'total',
    Cell: ({ value }) => `£${getNumberWithCommas(value)}`,
  },
  {
    Header: () => null,
    id: 'expander',
    Cell: ({ row }) => (
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? <MdExpandLess size="24px" /> : <MdExpandMore size="24px" />}
      </span>
    ),
  },
];

export const WithExpansion = Template.bind({});
WithExpansion.args = {
  columns: columns2,
  data,
  expandRowCallback,
  hasRowSelection: false,
};

const columns3 = [
  {
    id: 'selection',
    Header: ({ getToggleAllRowsSelectedProps }) => <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} small />,
    Cell: ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} small />,
  },
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Joined',
    accessor: 'joined',
    Cell: ({ value }) => format(new Date(value), 'd/MM/Y'),
  },
  {
    Header: 'Total',
    accessor: 'total',
    Cell: ({ value }) => `£${getNumberWithCommas(value)}`,
  },
];

export const WithRowSelection = Template.bind({});
WithRowSelection.args = {
  columns: columns3,
  data,
};
