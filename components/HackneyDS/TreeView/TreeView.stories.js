import React from 'react';
import { Container, Heading, HorizontalSeparator, Link } from '..';
import { TreeView } from './index';

export default {
  title: 'Hackney Design System/TreeView',
  component: TreeView,
  argTypes: {},
};

const Template = (args) => <TreeView {...args} />;

const testData = [
  {
    id: 1,
    supplierName: 'Abbeleigh House',
    address: '69 SQUIRRELS HEATH ROAD',
    postcode: 'RM3 0LS',
    cedarName: 'MASUMIN LTD T/A ABBELEIGH HOUSE',
    cedarReferenceNumber: '0',
    cedarId: 821915,
  },
  {
    id: 2,
    supplierName: 'Abbey Care Complex',
    address: '25/29, ABBEY ROAD',
    postcode: 'IG2 7NE',
    cedarName: 'ABBEY CARE COMPLEX',
    cedarReferenceNumber: '0',
    cedarId: 820656,
    children: [
      {
        id: 3,
        supplierName: 'Abbeyfield Society (The)',
        address: 'SOCIETY',
        postcode: 'RM9 6LH',
        cedarName: 'THE ABBEYFIELD EAST LONDON EXTRA CARE',
        cedarReferenceNumber: '0',
        cedarId: 822476,
      },
      {
        id: 4,
        supplierName: 'Acacia Lodge [Cedar Site 0]',
        address: '37 - 39 TORRINGTON PARK',
        postcode: 'N12 9TB',
        cedarName: 'ACACIA LODGE',
        cedarReferenceNumber: '0',
        cedarId: 820623,
      },
    ],
  },

  {
    id: 5,
    supplierName: 'Acorn Lodge',
    address: '15 ATHERDEN ROAD',
    postcode: 'E5 0QP',
    cedarName: 'ACORN LODGE',
    cedarReferenceNumber: '0',
    cedarId: 802546,
  },
  {
    id: 6,
    supplierName: 'Acorn Village Community',
    address: 'CLACTON ROAD',
    postcode: 'CO11 2NJ',
    cedarName: 'ACORN VILLAGE COMMUNITY',
    cedarReferenceNumber: '0',
    cedarId: 67090,
  },
  {
    id: 7,
    supplierName: 'Active Lives Ltd',
    address: 'CHOICES DAY CENTRES',
    postcode: 'CT1 1SL',
    cedarName: 'ACTIVE LIVES LTD',
    cedarReferenceNumber: '0',
    cedarId: 811367,
  },
  {
    id: 8,
    supplierName: 'Agudas Israel Housing Association Ltd',
    address: '206 LORDSHIP ROAD',
    postcode: 'N16 5ES',
    cedarName: 'AGUDAS ISRAEL HOUSING ASSOCIATION LTD',
    cedarReferenceNumber: '0',
    cedarId: 744616,
  },
  {
    id: 9,
    supplierName: 'Aitch Care Homes (London) Ltd',
    address: 'Q4, The Square',
    postcode: 'KT22 7TW',
    cedarName: 'ACHIEVE TOGETHER',
    cedarReferenceNumber: '0',
    cedarId: 811168,
  },
  {
    id: 10,
    supplierName: 'Albany Nursing Home',
    address: '11 - 12 ALBANY ROAD',
    postcode: 'E10 7EL',
    cedarName: 'ALBANY NURSING HOME',
    cedarReferenceNumber: '0',
    cedarId: 534229,
  },
];

export const Default = Template.bind({});
Default.args = {
  items: testData,
  renderItem: (item) => <SupplierItem item={item} isParent={item.children?.length > 0} />,
};

const SupplierItem = ({ item, isParent }) => (
  <Container>
    <Heading size="m">{item.supplierName}</Heading>
    <HorizontalSeparator height="5px" />
    {item.address}
    <HorizontalSeparator height="10px" />
    {!isParent && (
      <Link onClick={(e) => e.preventDefault()} noVisited>
        Select
      </Link>
    )}
  </Container>
);
