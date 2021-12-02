import React, { useEffect, useMemo, useState } from 'react';
import { Button, Container, HorizontalSeparator, Link, Loading, Select } from 'components';
import { getPayrunCedarFile } from 'api';
import { updatePayrunAsPaid } from 'api/PayRuns';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { approvePayRun, deletePayRun, rejectPayRun, submitPayRun } from 'api/PayRun';

const containerProps = {
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  alignItems: 'center',
};

export const InsightButtons = ({ payRunId, status, isCedarFileDownloaded, update, isLoading, hasInvoices }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFileDownloaded, setIsFileDownloaded] = useState(isCedarFileDownloaded);

  useEffect(() => {
    if (isCedarFileDownloaded) setIsFileDownloaded(isCedarFileDownloaded);
  }, [isCedarFileDownloaded]);

  const dispatch = useDispatch();
  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleSubmit = async () => {
    try {
      await submitPayRun(payRunId);
      pushNotification(`Payrun has been approved`, 'success');
      update();
    } catch (error) {
      pushNotification(error, 'error');
    }
  };

  const handleApprove = async () => {
    try {
      await approvePayRun(payRunId);
      pushNotification(`Payrun has been approved`, 'success');
      update();
    } catch (error) {
      pushNotification(error, 'error');
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    try {
      await rejectPayRun(payRunId);
      pushNotification(`Payrun has been rejected`, 'success');
      update();
    } catch (error) {
      pushNotification(error, 'error');
    }
  };

  const handleArchive = async (e) => {
    e.preventDefault();
    try {
      await deletePayRun(payRunId);
      pushNotification(`Payrun has been archived`, 'success');
      update();
    } catch (error) {
      pushNotification(error, 'error');
    }
  };
  const handleMarkAsPaid = async () => {
    try {
      await updatePayrunAsPaid(payRunId);
      pushNotification(`Payrun successfully marked as paid`, 'success');
      update();
    } catch (e) {
      pushNotification(e, 'error');
    }
  };

  const downloadFileComponent = useMemo(() => (
    <Button
      link
      download={`${payRunId} Cedar File.xlsx`}
      isLoading={isDownloading}
      style={isFileDownloaded && { background: 'none', boxShadow: 'none' }}
      className={isFileDownloaded ? 'link-button blue' : ''}
      onClick={(async (event) => {
        setIsDownloading(true);
        event.preventDefault();
        const blob = await getPayrunCedarFile(payRunId);
        event.target.href = window.URL.createObjectURL(blob);
        event.target.click();
        setIsDownloading(false);
        setIsFileDownloaded(true);
      })}
    >
      {isFileDownloaded ? 'Download again' : 'Download'}
    </Button>
  ), [isFileDownloaded, payRunId]);

  const hasDownloadFile = status > 4 && hasInvoices;

  return isDownloading || isLoading ? (
    <Container display="flex" flexDirection="column" alignSelf="center">
      <Loading className="centered-container" isLoading={isLoading} />
    </Container>
  ) : (
    <>
      {[1, 2, 3].includes(status) && (
        <Container {...containerProps}>
          <Button onClick={handleSubmit}>Submit</Button>
          <HorizontalSeparator height="10px" />
          <Container alignSelf="center">
            <Link onClick={handleArchive} noVisited>
              Archive
            </Link>
          </Container>
        </Container>
      )}
      {status === 4 && (
        <Container {...containerProps}>
          <Button onClick={handleApprove}>Approve</Button>
          <HorizontalSeparator height="10px" />
          <Container alignSelf="center">
            <Link onClick={handleReject} noVisited>
              Reject
            </Link>
          </Container>
          <HorizontalSeparator height="10px" />
          <Container alignSelf="center">
            <Link onClick={handleArchive} noVisited>
              Archive
            </Link>
          </Container>
        </Container>
      )}
      {status === 5 && !isFileDownloaded && (
        <Container {...containerProps}>
          {hasDownloadFile && (
            <>
              {downloadFileComponent}
              <HorizontalSeparator height="3px" />
            </>
          )}
          <p>CEDAR .dat file</p>
          <HorizontalSeparator height="10px" />
          <Container alignSelf="center">
            <Link onClick={handleArchive} noVisited>
              Archive
            </Link>
          </Container>
        </Container>
      )}
      {status === 5 && isFileDownloaded && (
        <Container {...containerProps}>
          <Button onClick={handleMarkAsPaid}>Mark as paid</Button>
          <HorizontalSeparator height="10px" />
          <Container alignSelf="center">{downloadFileComponent}</Container>
          <HorizontalSeparator height="10px" />
        </Container>
      )}
      {[6, 7].includes(status) && (
        <Container {...containerProps}>
          <Select
            style={{ background: 'rgba(0, 102, 79, 0.1)', color: 'rgb(82, 90, 91)', border: 'none' }}
            IconComponent={null}
            onChangeValue={null}
            emptyElement={{ text: 'Paid', value: 1 }}
            value={{ text: 'Paid', value: 1 }}
            disabled
          />
          <p style={{ fontSize: '10px', textAlign: 'center', fontStyle: 'italic' }}>
            Marked paid by John Smith
            <br />
            12.01.2021
          </p>
          {hasDownloadFile && (
            <>
              <HorizontalSeparator height="10px" />
              <Container alignSelf="center">{downloadFileComponent}</Container>
            </>
          )}
        </Container>
      )}
      {status === 8 && (
        <Container {...containerProps}>
          <Select
            style={{ background: 'rgb(222, 224, 226)', color: 'rgb(82, 90, 91)', border: 'none' }}
            IconComponent={null}
            onChangeValue={null}
            emptyElement={{ text: 'Archived', value: 1 }}
            value={{ text: 'Archived', value: 1 }}
            disabled
          />
          <p style={{ fontSize: '10px', textAlign: 'center', fontStyle: 'italic' }}>
            Marked paid by John Smith
            <br />
            12.01.2021
          </p>
          {hasDownloadFile && (
            <>
              <HorizontalSeparator height="10px" />
              <Container alignSelf="center">{downloadFileComponent}</Container>
            </>
          )}
        </Container>
      )}
    </>
  );
};
