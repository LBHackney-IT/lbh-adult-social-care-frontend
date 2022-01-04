import { roleAccessMatrix } from './accessMatrix';

export const handleRoleBasedAccess = (roles, url) => {
  const rolesWithAccess = roleAccessMatrix[url];
  const intersection = rolesWithAccess?.filter((value) => roles.includes(value));
  console.log('intersection', intersection);
  return intersection?.length > 0;
};
