import { FundedNursingCare } from './FundedNursingCare';
import React, { useState } from 'react';
import faker from 'faker';

export default {
  title: 'Pages/CarePackages/FundedNursingCare',
  component: FundedNursingCare,
  argTypes: {
    FundedNursingCare: {},
  },
};

const Template = (args) => {
  const [hasFNCAssessment, setHasFNCAssessment] = useState(hasFNCAssessment || '');
  const [uploadFNCAssessment, setUploadFNCAssessment] = useState(null);

  const getFiles = (files) => setUploadFNCAssessment(files);

  return (
    <FundedNursingCare
      {...args}
      getFiles={getFiles}
      setHasFNCAssessment={setHasFNCAssessment}
      hasFNCAssessment={hasFNCAssessment}
      setUploadFNCAssessment={setUploadFNCAssessment}
      uploadFNCAssessment={uploadFNCAssessment}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  hasFNCAssessment: 'yes',
  tableData: [{
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
  }],
};