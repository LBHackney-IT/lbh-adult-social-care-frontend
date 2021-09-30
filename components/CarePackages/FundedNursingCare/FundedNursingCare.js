import React, { useEffect, useState } from 'react';
import { Button, Container, Link, RadioGroup } from '../../HackneyDS';
import DropZone from '../../DropZone';
import { FundedNursingCareTable } from './FundedNursingCareTable';

export const FundedNursingCare = ({
  hasFNCAssessment,
  setHasFNCAssessment,
  uploadFNCAssessment,
  setUploadFNCAssessment,
  tableData,
  getFiles,
}) => {
  const [urlFile, setUrlFile] = useState(null);

  useEffect(() => {
    if(uploadFNCAssessment && uploadFNCAssessment[0]) {
      setUrlFile(window.URL.revokeObjectURL(uploadFNCAssessment));
    }
  }, [uploadFNCAssessment]);

  const fileName = uploadFNCAssessment && (uploadFNCAssessment?.name || uploadFNCAssessment[0]?.name);

  const fileLink = uploadFNCAssessment?.url;

  return (
    <div className='funded-nursing-care'>
      <div className="row-container is-align-items-center residential_care__additional-payment-one-off">
        <h2 className="font-weight-bold pt-5 font-size-19px">Funded Nursing Care (FNC)</h2>
      </div>
      <div className='is-flex is-flex-wrap-wrap'>
        <RadioGroup
          className='has-fnc-assessment'
          name='has-FNC-assessment'
          value={hasFNCAssessment}
          items={[
            { labelHeading: 'Yes', id: 'yes' },
            { labelHeading: 'In Progress', id: 'in-progress' },
            { labelHeading: 'No', id: 'no' },
          ]}
          handle={setHasFNCAssessment}
          inline
          label='Has a FNC assessment been carried out?'
          small
        />
        {hasFNCAssessment !== 'no' &&
          <Container className='funded-nursing-care__upload-fnc' width='100%'>
            <h3>Upload FNC assessment</h3>
            {fileName ?
              <Container display='flex'>
                <Link className='file-link link-button text-blue' href={urlFile || fileLink}>{fileName}</Link>
                <p className='link-button text-black' onClick={() => setUploadFNCAssessment(null)}>Remove</p>
              </Container>
              : <DropZone getFiles={getFiles}/>
            }
          </Container>
        }
      </div>
      <FundedNursingCareTable data={tableData}/>
      <Button handler={() => alert('Edit FNC')} className='outline green edit-fnc-button'>Edit FNC</Button>
    </div>
  );
};