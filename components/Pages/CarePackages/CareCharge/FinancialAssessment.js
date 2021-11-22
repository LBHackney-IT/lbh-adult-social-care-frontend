import React, { memo } from 'react';
import { Container, FormGroup, Heading, HorizontalSeparator, UploadGreenButton } from 'components/HackneyDS';
import { Controller } from 'react-hook-form';
import { TEXT_FILE_EXTENSIONS } from 'constants/variables';

const FinancialAssessment = ({ control }) => (
  <div className="financial-assessment">
    <Container>
      <Heading size="m">Upload FNC Assessment...</Heading>
      <HorizontalSeparator height={24} />
      <Controller
        name="assessmentFileUrl"
        control={control}
        render={({ field }) => (
          <FormGroup>
            <UploadGreenButton extensions={TEXT_FILE_EXTENSIONS} file={field.value} setFile={field.onChange} />
          </FormGroup>
        )}
      />
    </Container>
  </div>
);

export default memo(FinancialAssessment);
