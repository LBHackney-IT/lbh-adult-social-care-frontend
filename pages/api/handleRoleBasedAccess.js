import { roleAccessMatrix } from './accessMatrix';

export const handleRoleBasedAccess = (roles, url) => {
  const rolesWithAccess = roleAccessMatrix[url];
  const intersection = rolesWithAccess?.filter((value) => roles.includes(value));
  return intersection?.length > 0;
};
