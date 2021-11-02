import React, { useMemo, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { Button, Container, Dialog, RadioGroup } from '../../../HackneyDS';
import DatePick from '../../../DatePick';

const regularCyclesOptions = [
  {
    label: <p>Residential Recurring <span className="lbh-primary-color">(3 releases)</span></p>,
    id: 'residential-recurring'
  },
  { label: 'Direct Payments', id: 'direct-payments' },
];

const hocAndReleasesOptions = [
  { label: 'Residential released holds', id: 'residential-released-holds' },
  { label: 'Direct payments released holds', id: 'direct-payments-released-holds' },
];

const CreatePayrunModal = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [regularCycle, setRegularCycle] = useState('');
  const [hocAndReleases, setHocAndReleases] = useState('');
  const [payRunToDate, setPayRunToDate] = useState(null);
  const [minDate] = useState(new Date());

  const daysLastCycle = useMemo(() => {
    if (payRunToDate) {
      differenceInDays(new Date(), payRunToDate);
    }
  }, [payRunToDate]);

  const createDraftPayRun = () => console.log('Create Draft Pay Run');

  return (
    <>
      <Button onClick={() => setIsOpened(true)}>New Pay Run</Button>
      <Dialog noBorder isOpen={isOpened} onClose={() => setIsOpened(false)} className="new-payrun-modal">
        <h3>Create pay run</h3>
        <Container display="flex">
          <Container className="create-pay-run__radios">
            <p>Regular Cycles:</p>
            <p>NB - pay cycles will always include released holds.</p>
            <RadioGroup handle={setRegularCycle} value={regularCycle} items={regularCyclesOptions} />
          </Container>
          <DatePick
            startDate={payRunToDate}
            setDate={setPayRunToDate}
            minDate={minDate}
            dateValue={payRunToDate}
            label="Pay run to:"
          />
          <p><span className="lbh-primary-color">{daysLastCycle || 'XX'}</span></p>
        </Container>
        <Container className="create-pay-run__radios">
          <p>Regular Cycles:</p>
          <p>NB - pay cycles will always include released holds.</p>
          <RadioGroup value={hocAndReleases} handle={setHocAndReleases} items={hocAndReleasesOptions} />
        </Container>
        <Container display='flex'>
          <Button outline color='gray' secondary>Cancel</Button>
          <Button square onClick={createDraftPayRun}>Create Draft Pay Run</Button>
        </Container>
      </Dialog>
    </>
  );
};

export default CreatePayrunModal;