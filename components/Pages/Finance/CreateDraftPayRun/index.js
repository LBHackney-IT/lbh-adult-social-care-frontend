import React, { useMemo, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createDraftPayRun } from 'api/PayRun';
import { addNotification } from 'reducers/notificationsReducer';
import { Button, Container, Dialog, HorizontalSeparator } from '../../../HackneyDS';
import { Loading } from '../../../index';
import CreatePayRunInfo from './CreatePayRunInfo';
import { incrementDate } from '../../../../service';

const regularCyclesOptions = [
  { divider: <h4>Regular Cycles:</h4> },
  {
    label: <p>Residential Recurring <span className="lbh-primary-color">(3 releases)</span></p>,
    id: 1
  },
  { label: 'Direct Payments', id: 2 },
];

const adHocAndReleasesOptions = [
  { divider: <h4>Ad Hoc and Releases</h4> },
  { label: 'Residential released holds', id: 3 },
  { label: 'Direct payments released holds', id: 4 },
];

const lastCycleDate = new Date();

const defaultValues = {
  paidUpToDate: null,
  regularCycles: null,
  adHocAndReleases: null,
  startDate: null,
  endDate: null,
};

const maxDate = new Date();

const CreateDraftPayRun = ({ isOpened, setIsOpened }) => {
  const dispatch = useDispatch();
  const [paidUpToDate, setPaidUpToDate] = useState(null);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [payRunType, setPayRunType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isRegularCycles = payRunType === 'regularCycles';
  const isAdHocAndReleases = payRunType === 'adHocAndReleases';

  const schema = yup.object().shape({
    regularCycles: yup
      .mixed()
      .test('regularCycles', 'Required field', (value) => {
        if (isAdHocAndReleases) return true;

        return value;
      }),
    adHocAndReleases: yup
      .mixed()
      .test('adHocAndReleases', 'Required field', (value) => {
        if (isRegularCycles) return true;

        return value;
      }),
    paidUpToDate: yup
      .mixed()
      .test('paidUpToDate', 'Paid up date is required', (value) => {
        if (isAdHocAndReleases || !payRunType) return true;

        return value;
      }),
    startDate: yup
      .mixed()
      .test('startDate', 'Start date is required', (value) => {
        if (isRegularCycles || !payRunType) return true;

        return value;
      }),
    endDate: yup
      .mixed()
      .test('endDate', 'End date is required', (value) => {

        if (isRegularCycles || !payRunType) return true;

        return value;
      }),
  });

  const daysLastCycle = useMemo(() => {
    if (paidUpToDate) {
      return differenceInDays(
        new Date(lastCycleDate.getFullYear(), lastCycleDate.getMonth(), lastCycleDate.getDate()),
        new Date(paidUpToDate.getFullYear(), paidUpToDate.getMonth(), paidUpToDate.getDate()),
      );
    }
    return null;
  }, [paidUpToDate]);

  const closeModal = () => {
    resetAll();
    setIsOpened(false);
  };

  const resetAll = () => {
    reset();
    setPaidUpToDate(null);
    setPayRunType('');
    setDate({
      startDate: null,
      endDate: null,
    });
  };

  const onCreateDraftPayRun = async (data) => {
    setIsLoading(true);
    try {
      await createDraftPayRun(data);
      closeModal();
    } catch (e) {
      const isExistingPayRun = e.includes('already exists!');
      const errorText = isExistingPayRun ? `${e} First it has to be (approved or deleted or archived)` : e;
      dispatch(addNotification({
        text: errorText,
        className: isExistingPayRun ? 'warning' : 'error',
        time: isExistingPayRun ? 15000 : 3000
      }));
    }
    setIsLoading(false);
  };


  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onChangeDate = (field, value) => setDate(prevState => ({ ...prevState, [field]: value }));

  return (
    <>
      <Dialog noBorder isOpen={isOpened} onClose={closeModal} className="create-pay-run__modal">
        <Loading isLoading={isLoading} />
        <h3>Create pay run</h3>
        <form onSubmit={handleSubmit(onCreateDraftPayRun)}>
          <HorizontalSeparator height={20} />
          <CreatePayRunInfo
            payRunType={payRunType}
            maxDate={maxDate}
            disableDatePicker={isAdHocAndReleases || !payRunType}
            startDateLabel="Pay run to:"
            setPayRunType={() => {
              if (isAdHocAndReleases || !payRunType) resetAll();
              setPayRunType('regularCycles');
            }}
            fieldStart="paidUpToDate"
            minDate={incrementDate({ weeks: -4 })}
            startDate={paidUpToDate}
            onChangeDate={(field, value) => setPaidUpToDate(value)}
            options={regularCyclesOptions}
            control={control}
            dateText={
              <p>
                <span className="font-weight-bold lbh-primary-color">
                  {daysLastCycle ?? 'XX'}
                </span> days since last cycle
              </p>
            }
            setPaidUpToDate={setPaidUpToDate}
            errors={errors}
          />

          <CreatePayRunInfo
            name="adHocAndReleases"
            payRunType={payRunType}
            disableDatePicker={isRegularCycles || !payRunType}
            onChangeDate={onChangeDate}
            startDate={date.startDate}
            endDate={date.endDate}
            setPayRunType={() => {
              if (isRegularCycles || !payRunType) resetAll();
              setPayRunType('adHocAndReleases');
            }}
            maxDate={maxDate}
            options={adHocAndReleasesOptions}
            control={control}
            setPaidUpToDate={setPaidUpToDate}
            errors={errors}
          />
          <Container className="create-pay-run__actions" display="flex">
            <Button onClick={closeModal} borderRadius={0} outline color="gray" secondary>Cancel</Button>
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              className="disable-shadow"
              borderRadius={0}
            >
              Create Draft Pay Run
            </Button>
          </Container>
        </form>
      </Dialog>
    </>
  );
};

export default CreateDraftPayRun;