import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDraftPayRun } from 'api/PayRun';
import { addNotification } from 'reducers/notificationsReducer';
import { Dialog, Tab, Tabs } from '../../../HackneyDS';
import { Loading } from '../../../index';
import RegularCycles from './RegularCycles';
import AdHocAndReleases from './AdHocAndReleases';

const tabs = ['Regular cycles', 'Ad Hoc and Releases'];

const CreateDraftPayRun = ({ isOpened, setIsOpened }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setIsOpened(false);
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

  return (
    <>
      <Loading isLoading={isLoading} />
      <Dialog noBorder isOpen={isOpened} onClose={closeModal} className="create-pay-run__modal">
        <h3>Create pay run</h3>
        <Tabs tabs={tabs}>
          <Tab>
            <RegularCycles
              closeModal={closeModal}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onCreateDraftPayRun={onCreateDraftPayRun}
            />
          </Tab>
          <Tab>
            <AdHocAndReleases
              closeModal={closeModal}
              isLoading={isLoading}
              onCreateDraftPayRun={onCreateDraftPayRun}
            />
          </Tab>
        </Tabs>
      </Dialog>
    </>
  );
};

export default CreateDraftPayRun;