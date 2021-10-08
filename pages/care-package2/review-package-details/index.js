import SubmitForApprovalPopup from 'components/Brokerage/BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';
import React from 'react';

const ReviewPackageDetails = () => {
  const approvedByOptions = [
    { text: 'Furkan Kayar', value: 'aee45700-af9b-4ab5-bb43-535adbdcfb84' },
    { text: 'Duncan Okeno', value: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8' },
  ];
  const carePackageId = '35fb72a2-7008-4361-acd0-5cbbedee3ff9';

  const handleSubmit = () => {

  };

  return (
    <>
      <SubmitForApprovalPopup submit={handleSubmit} approvedByOptions={approvedByOptions}/>
    </>
  );
};
export default ReviewPackageDetails;