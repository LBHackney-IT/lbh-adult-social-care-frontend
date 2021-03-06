import React from 'react';
import {
  APPROVALS_ROUTE,
  BROKERAGE_ROUTE,
  CARE_CHARGES_ROUTE,
  FINANCE_ROUTE,
  LOGOUT_ROUTE,
} from 'routes/RouteConstants';
import { userRoles } from '../pages/api/accessMatrix';
import { Header } from './HackneyDS';

const initialLinks = [
  {
    href: BROKERAGE_ROUTE,
    text: 'Brokerage',
    visibility: [
      userRoles.ROLE_BROKERAGE,
      userRoles.ROLE_BROKERAGE_APPROVER,
      userRoles.ROLE_CARE_CHARGE_MANAGER,
      userRoles.ROLE_FINANCE,
      userRoles.ROLE_FINANCE_APPROVER,
    ],
  },
  {
    href: CARE_CHARGES_ROUTE,
    text: 'Care Charges',
    visibility: [userRoles.ROLE_BROKERAGE, userRoles.ROLE_CARE_CHARGE_MANAGER],
  },
  {
    href: APPROVALS_ROUTE,
    text: 'Approvals',
    visibility: [
      userRoles.ROLE_BROKERAGE,
      userRoles.ROLE_BROKERAGE_APPROVER,
      userRoles.ROLE_CARE_CHARGE_MANAGER,
      userRoles.ROLE_FINANCE,
      userRoles.ROLE_FINANCE_APPROVER,
    ],
  },
  {
    href: FINANCE_ROUTE,
    text: 'Finance',
    visibility: [userRoles.ROLE_FINANCE, userRoles.ROLE_FINANCE_APPROVER],
  },
];

export const NewHeader = ({ roles, noLinks }) => {
  const links = [];
  initialLinks.forEach((ele) => {
    const intersection = ele.visibility.filter((value) => roles.includes(value));
    if (intersection?.length > 0) {
      links.push(ele);
    }
  });
  const displayLinks = noLinks
    ? []
    : [
        ...links,
        {
          href: LOGOUT_ROUTE,
          text: 'Log out',
        },
      ];
  return <Header links={displayLinks} />;
};
