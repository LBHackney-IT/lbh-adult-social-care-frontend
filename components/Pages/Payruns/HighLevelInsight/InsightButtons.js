import React, { useState } from 'react';
import { Button, Container, HorizontalSeparator, Link, Loading, Select } from 'components';
import { getPayrunCedarFile } from 'api';
import { updatePayrunAsPaid } from 'api/PayRuns';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { submitPayRun, approvePayRun, deletePayRun, rejectPayRun } from 'api/PayRun';

export const InsightButtons = ({ payRunId, status, isCedarFileDownloaded, update, isLoading }) => {
  const [isDownload, setDownload] = useState(false);
  const { data, mutate, isLoading: isDownloading } = getPayrunCedarFile(isDownload ? payRunId : null);

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

  const handleDownload = (e) => {
    e.preventDefault();
    setDownload(true);
    mutate();
    update();
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

  return isLoading || (isDownload && isDownloading) ? (
    <Container display="flex" flexDirection="column" alignSelf="center">
      <Loading className="loading" isLoading={isLoading} />
    </Container>
  ) : (
    <>
      {[1, 2, 3].includes(status) && (
        <Container display="flex" flexDirection="column" alignSelf="center">
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
        <Container display="flex" flexDirection="column" alignSelf="center">
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
      {status === 5 && !isCedarFileDownloaded && (
        <Container display="flex" flexDirection="column" alignSelf="center">
          <Button onClick={handleDownload} isLoading={isDownload && isDownloading} disabled={isDownload && isDownloading}>
            Download
          </Button>
          <HorizontalSeparator height="3px" />
          <p>CEDAR .dat file</p>
          <HorizontalSeparator height="10px" />
          <Container alignSelf="center">
            <Link onClick={handleArchive} noVisited>
              Archive
            </Link>
          </Container>
        </Container>
      )}
      {status === 5 && isCedarFileDownloaded && (
        <Container display="flex" flexDirection="column" alignSelf="center">
          <Button onClick={handleMarkAsPaid}>Mark as paid</Button>
          <HorizontalSeparator height="10px" />
          <Container alignSelf="center">
            <Link onClick={handleDownload} noVisited>
              Download again
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
      {[6, 7].includes(status) && (
        <Container display="flex" flexDirection="column" alignSelf="center">
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
          <HorizontalSeparator height="10px" />
          <Container alignSelf="center">
            <Link onClick={handleDownload} noVisited>
              Download again
            </Link>
          </Container>
        </Container>
      )}
      {status === 8 && (
        <Container display="flex" flexDirection="column" alignSelf="center">
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
          <HorizontalSeparator height="10px" />
          <Container alignSelf="center">
            <Link onClick={handleDownload} noVisited>
              Download again
            </Link>
          </Container>
        </Container>
      )}
    </>
  );
};
