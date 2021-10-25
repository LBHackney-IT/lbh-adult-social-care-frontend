import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { useToggle } from 'react-use';
import { getLoggedInUser } from 'service';
import { getServiceUserPackagesRoute } from 'routes/RouteConstants';
import {
  Button,
  Container,
  Breadcrumbs,
  BrokerageHeader,
  EndElementModal,
  EditElementModal,
  CancelElementModal,
  TitleSubtitleHeader,
  FinancialAssessment,
  ProvisionalCareCharge,
  ResidentialSUContribution,
} from 'components';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
});

const collectedByOptions = [
  { id: 'hackney', label: 'Hackney council (gross)' },
  { id: 'supplier', label: 'Supplier (net)' },
];

const useBreadcrumbs = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  return useMemo(
    () => [
      { text: 'Home', href: '/' },
      { text: 'Care charges', href: '/' },
      {
        text: 'Full Overview',
        href: getServiceUserPackagesRoute(packageId),
      },
      { text: 'Financial assessment' },
    ],
    [packageId]
  );
};

const useModal = () => useToggle(false);

const CareCharge = () => {
  const breadcrumbs = useBreadcrumbs();

  const [isOpenEdit, toggleEdit] = useModal();
  const [isOpenCancel, toggleCancel] = useModal();
  const [isOpenEnd, toggleEnd] = useModal();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      provisional: {
        costPerWeek: '',
        collectedBy: collectedByOptions[0].id,
        reasonCollecting: null,
        notes: '',
      },
    },
  });

  const onSubmit = useCallback(
    (form) => {
      console.log('%c form =', 'color: lightblue', form);
      // toggleEdit();
    },
    [toggleEdit]
  );

  return (
    <div className="care-charge">
      <BrokerageHeader />

      <Container maxWidth="1080px" margin="10px auto 60px" padding="0 60px">
        <Breadcrumbs values={breadcrumbs} />

        <TitleSubtitleHeader subTitle="Care Charges" title="Add financial assessment" />

        <ProvisionalCareCharge
          collectedByOptions={collectedByOptions}
          onCancel={toggleCancel}
          control={control}
          onEnd={toggleEnd}
        />

        <ResidentialSUContribution weeks="1-12" onCancel={toggleCancel} onEnd={toggleEnd} />
        <ResidentialSUContribution weeks="13+" onCancel={toggleCancel} onEnd={toggleEnd} />

        <FinancialAssessment />

        <Container className="brokerage__actions">
          <Button className="brokerage__back-button">Back</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </Container>
      </Container>

      <EditElementModal isOpen={isOpenEdit} onClose={() => toggleEdit(false)} />
      <CancelElementModal isOpen={isOpenCancel} onClose={() => toggleCancel(false)} />
      <EndElementModal isOpen={isOpenEnd} onClose={() => toggleEnd(false)} />
    </div>
  );
};

export default CareCharge;
