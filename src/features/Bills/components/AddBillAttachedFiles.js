import React from "react";

const AddBillAttachedFiles = ({ attachedFiles = [] }) => {
  return (
    <div className='attached-files'>
      <p className='attached-files__title'>Attached Files</p>
      <div className='attached-files__container'>
        {attachedFiles.map(item => <p key={item.id} className='attached-files__text'>{item.name}</p>)}
      </div>
    </div>
  );
};

export default AddBillAttachedFiles;
