import { Button, Container, Dialog, Heading, HorizontalSeparator, Textarea } from 'components';
import DatePick from 'components/DatePick';
import React, { memo, useEffect } from 'react';
import { formatDate } from 'service';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { formValidationSchema } from 'service/formValidationSchema';
import { packageTypesByNumber } from 'constants/variables';

const EndDetailsModal = ({ isOpen, onClose, endPackage, packageData }) => {
  if (!isOpen) return null;

  const onSubmit = (data) => {
    endPackage(data);
    onClose();
  };

  useEffect(() => {
    if (packageData?.endDate) setValue(packageData.endDate);
  }, [packageData]);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValidationSchema.endPackageSchema),
    defaultValues: {
      notes: '',
      endDate: null,
    },
  });

  const endDate = watch('endDate');

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <form>
        <Container display="flex" flexDirection="column">
          <Heading size="l">End current package</Heading>
          <HorizontalSeparator height="30px" />
          <Container>
            <Container display="grid" gridTemplateColumns="1fr 1fr 2fr">
              <Container>
                <Heading size="s">Start date</Heading>
                {formatDate(packageData?.startDate)}
              </Container>
              <Container>
                <Heading size="s">End date</Heading>
                {formatDate(endDate)}
              </Container>
              <Container>
                <Heading size="s">Package Type</Heading>
                <p style={{ textTransform: 'capitalize' }}>{packageTypesByNumber[packageData.packageType]} package</p>
              </Container>
            </Container>
            <HorizontalSeparator height="15px" />

            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <Container>
                  <Heading size="s">Select an end date for this package</Heading>
                  <HorizontalSeparator height={8} />
                  <DatePick error={errors.endDate?.message} dateValue={field.value} setDate={field.onChange} />
                </Container>
              )}
            />
            <HorizontalSeparator height={20} />
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <Container>
                  <Heading size="s">Add notes</Heading>
                  <HorizontalSeparator height={8} />
                  <Textarea value={field.value} handler={field.onChange} />
                </Container>
              )}
            />
          </Container>
          <HorizontalSeparator height={24} />
          <Container display="flex" justifyContent="space-between">
            <Button onClick={onClose} outline secondary color="gray" largeButton>
              Cancel
            </Button>

            <Button onClick={handleSubmit(onSubmit)} largeButton>
              End package
            </Button>
          </Container>
        </Container>
      </form>
    </Dialog>
  );
};

export default memo(EndDetailsModal);
