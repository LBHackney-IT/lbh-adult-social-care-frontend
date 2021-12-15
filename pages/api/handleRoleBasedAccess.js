export const handleRoleBasedAccess = (roles, url) => {
  const roleAccessMatrix = {
    '/broker-referral': ['Brokerage Approver', 'Brokerage', 'Care Charge Manager', 'Finance Approver', 'Finance'],
    '/care-charges': ['Brokerage', 'Care Charge Manager'],
  };
  console.log(url);
  // const rolesWithAccess = roleAccessMatrix[url];
  // const intersection = rolesWithAccess.filter((value) => roles.includes(value));
  // return intersection?.length > 0;

  return true;
};
