import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import CreatePayRunInfo from './CreatePayRunInfo';
import { Button, Container } from '../../../HackneyDS';

const adHocAndReleasesOptions = [
  { divider: <h4>Ad Hoc and Releases</h4> },
  { label: 'Residential released holds', id: 3 },
  { label: 'Direct payments released holds', id: 4 },
];

const defaultValues = {
  adHocAndReleases: null,
  startDate: null,
  paidUpToDate: null,
};

const schema = yup.object().shape({
  adHocAndReleases: yup.number().typeError('Required field').required('Required field'),
  startDate: yup.date().typeError('Required field').required('Required field'),
  paidUpToDate: yup.date().typeError('Required field').required('Required field'),
});

const AdHocAndReleases = ({ onCreateDraftPayRun, isLoading, closeModal }) => {
  const [date, setDate] = useState({
    startDate: null,
    paidUpToDate: null,
  });

  const onChangeDate = (field, value) => setDate((prevState) => ({ ...prevState, [field]: value }));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onCreateDraftPayRun)}>
      <CreatePayRunInfo
        name="adHocAndReleases"
        onChangeDate={onChangeDate}
        startDate={date.startDate}
        startDateLabel="From"
        paidUpToDate={date.paidUpToDate}
        options={adHocAndReleasesOptions}
        control={control}
        errors={errors}
      />
      <Container className="create-pay-run__actions" display="flex">
        <Button onClick={closeModal} borderRadius={0} outline color="gray" secondary>
          Cancel
        </Button>
        <Button isLoading={isLoading} disabled={isLoading} type="submit" className="disable-shadow" borderRadius={0}>
          Create Draft Pay Run
        </Button>
      </Container>
    </form>
  );
};

export default AdHocAndReleases;
