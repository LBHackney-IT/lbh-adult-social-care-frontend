import React, { useEffect, useState } from 'react';
import { Button, Container, Link, RadioGroup } from '../../HackneyDS';
import DropZone from '../../DropZone';
import faker from 'faker';
import { FundedNursingCareTable } from './FundedNursingCareTable';

const testTableData = [
  {
    status: 'Active',
    collectedBy: 'Residential Care / wk',
    weeklyCost: '187.60',
    startDate: faker.date.past(20),
    endDate: null,
    notes: `Lorem ipsum dolor sit amet,
     consectetur adipiscing elit. Nullam ut nulla
     tristique nulla dapibus rhoncus a eu tortor.
     Aliquam suscipit laoreet pharetra. Aenean
     vestibulum ullamcorper enim, sed rhoncus
     sem tempor vitae. Sed dignissim ornare
     metus eu faucibus. Sed vel diam mi.
     Aenean a auctor felis, sit amet lacinia urna.
     Pellentesque bibendum dui a nulla faucibus,
     vel dignissim mi rutrum.`
  },
];

const FundedNursingCare = ({
  hasFNCAssessment,
  setHasFNCAssessment,
  uploadFNCAssessment,
  setUploadFNCAssessment,
  tableData = testTableData,
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
        <h2 className="hackney-text-black font-weight-bold pt-5 font-size-19px">Funded Nursing Care (FNC)</h2>
      </div>
      <div className='is-flex is-flex-wrap-wrap funded-nursing-care'>
        <RadioGroup
          name='has-FNC-assessment'
          value={hasFNCAssessment}
          items={[
            { labelHeading: 'Yes', id: 'yes' },
            { labelHeading: 'In Progress', id: 'in-progress' },
            { labelHeading: 'No', id: 'no' },
          ]}
          handle={setHasFNCAssessment}
          inline
          title='Has a FNC assessment been carried out?'
          small
        />
        {hasFNCAssessment !== 'no' &&
          <Container width='100%'>
            <h3 className='font-weight-bold'>Upload FNC assessment</h3>
            {fileName ?
              <Container display='flex'>
                <Link className='link-button text-blue' href={urlFile || fileLink}>{fileName}</Link>
                <p className='link-button text-black ml-3' onClick={() => setUploadFNCAssessment(null)}>Remove</p>
              </Container>
              : <DropZone getFiles={getFiles}/>
            }
          </Container>
        }
      </div>
      <FundedNursingCareTable data={tableData}/>
      <div className="is-flex is-justify-content-flex-end is-align-content-center is-align-items-center">
        <Button handler={() => alert('Edit FNC')} className='outline green'>Edit FNC</Button>
      </div>
    </div>
  );
};

export default FundedNursingCare;