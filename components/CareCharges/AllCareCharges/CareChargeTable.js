import { format } from 'date-fns';
import faker from 'faker';
import React from 'react';
import { Table, Heading, Label, HorizontalSeparator, VerticalSeparator, Container } from '../../HackneyDS';
import { ClientStatus } from '../SingleCareCharge/ClientStatus/ClientStatus';

export const CareChargeTable = () => {
  const data = [
    {
      clientName: faker.name.findName(),
      clientStatus: 'new',
      dateOfBirth: faker.date.past(100),
      address: faker.address.streetAddress(),
      mosaicId: faker.random.alphaNumeric(6),
      cederId: faker.random.alphaNumeric(7),
      packageType: 'Residential Care',
      startDate: faker.date.past(5),
      lastModified: faker.date.past(1),
      author: faker.name.findName(),
    },
    {
      clientName: faker.name.findName(),
      clientStatus: 'new',
      dateOfBirth: faker.date.past(100),
      address: faker.address.streetAddress(),
      mosaicId: faker.random.alphaNumeric(6),
      cederId: faker.random.alphaNumeric(7),
      packageType: 'Residential Care',
      startDate: faker.date.past(5),
      lastModified: faker.date.past(1),
      author: faker.name.findName(),
    },
  ];
  const columns = [
    {
      accessor: 'dateOfBirth',
      Cell: (props) => (
        <>
          <Container display="flex" alignItems='center'>
            <Heading size="m" color="#00664F">
              {props.row.original.clientName}
            </Heading>
            <VerticalSeparator width="10px"/>
            <ClientStatus status="new" />
          </Container>
          <HorizontalSeparator height="20px" />
          <Label>{format(props.row.original.dateOfBirth, 'dd.MM.yyyy')}</Label>
          <HorizontalSeparator height="5px" />
          <Label>{props.row.original.address}</Label>
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
  return <Table data={data} columns={columns} cellClassName="bottom-aligned" />;
};
