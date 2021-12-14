import React, { memo } from 'react';
import { Container, FormGroup, Heading, HorizontalSeparator, UploadGreenButton } from 'components/HackneyDS';
import { Controller } from 'react-hook-form';
import { TEXT_FILE_EXTENSIONS } from 'constants/variables';

const UploadFile = ({ control, isLoading, title, name = 'assessmentFile' }) => (
    <div className="financial-assessment">
      <Container>
        <HorizontalSeparator height={24} />
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <FormGroup label={<Heading size="m">{title}</Heading>}>
              <UploadGreenButton isLoading={isLoading} extensions={TEXT_FILE_EXTENSIONS} fileInfo={field.value} setFile={field.onChange} />
            </FormGroup>
          )}
        />
      </Container>
    </div>
  )

export default memo(UploadFile);
