import { format } from 'date-fns';
import faker from 'faker';
import React from 'react';
import { Table, Heading, Label, HorizontalSeparator, VerticalSeparator, Container } from '../../HackneyDS';
import { ClientStatus } from '../SingleCareCharge/ClientStatus/ClientStatus';

const generateCareChargeTableData = (count) => {
  const status = ['new', 'existing'];
  const tableData = [];
  for (let index = 0; index < count; index++) {
    const rowData = {
      clientName: faker.name.findName(),
      clientStatus: status[Math.round(Math.random())],
      dateOfBirth: faker.date.past(100),
      address: `${faker.address.streetAddress()}, ${faker.address.zipCode()}`,
      mosaicId: Math.floor(Math.random() * 1000000),
      cederId: faker.random.alphaNumeric(7),
      packageType: 'Residential Care',
      startDate: faker.date.past(5),
      lastModified: faker.date.past(1),
      author: faker.name.findName(),
    };
    tableData.push(rowData);
  }
  return tableData;
};

export const CareChargeTable = () => {
  const data = generateCareChargeTableData(100);
  const columns = [
    {
      accessor: 'dateOfBirth',
      Cell: ({ row }) => (
        <>
          <Container display="flex" alignItems="center">
            <Heading size="m" color="#00664F">
              {row.original.clientName}
            </Heading>
            <VerticalSeparator width="10px" />
            <ClientStatus status={row.original.clientStatus} />
          </Container>
          <HorizontalSeparator height="12px" />
          <Label>{format(row.original.dateOfBirth, 'dd.MM.yyyy')}</Label>
          <HorizontalSeparator height="5px" />
          <Label>{row.original.address}</Label>
        </>
      ),
    },
    {
      accessor: 'mosaicId',
      Cell: ({ value }) => (
        <span>
          <Heading size="s">Mosaic ID</Heading>
          <HorizontalSeparator height="5px" />
          <Label># {value}</Label>
        </span>
      ),
    },
    {
      accessor: 'packageType',
      Cell: ({ value }) => (
        <>
          <Heading size="s">Package</Heading>
          <HorizontalSeparator height="5px" />
          <Label>{value}</Label>
        </>
      ),
    },
    {
      accessor: 'startDate',
      Cell: ({ value }) => (
        <>
          <Heading size="s">Start date</Heading>
          <HorizontalSeparator height="5px" />
          <Label>{format(value, 'dd.MM.yyyy')}</Label>
        </>
      ),
    },
    {
      accessor: 'lastModified',
      Cell: ({ value }) => (
        <>
          <Heading size="s">Last modified</Heading>
          <HorizontalSeparator height="5px" />
          <Label>{format(value, 'dd.MM.yyyy')}</Label>
        </>
      ),
    },
    {
      accessor: 'author',
      Cell: ({ value }) => (
        <>
          <Heading size="s">By</Heading>
          <HorizontalSeparator height="5px" />
          <Label>{value}</Label>
        </>
      ),
    },
  ];
  return <Table data={data} columns={columns} cellClassName="bottom-aligned" hasHeader={false} noHeader />;
};
