import React from 'react';
import {
  formatDate,
  getButtonColourFromPackageStatus,
  getButtonTextFromPackageStatus,
  getTagColorFromStatus,
} from 'service';
import { CaretDownIcon } from 'components/Icons';
import { useRouter } from 'next/router';
import { getCorePackageRoute } from 'routes/RouteConstants';
import { getDocumentRequest } from 'api';
import { Button, Collapse, Container, Heading, HorizontalSeparator, Tag, VerticalSeparator, } from '../../../HackneyDS';
import ViewDocument from '../../../ViewDocument';

const PackageRequest = ({ packageRequest }) => {
  const { socialWorkerCarePlanFileId: documentId, socialWorkerCarePlanFileName: documentName } = packageRequest;
  const router = useRouter();
  const buttonClass = `${getButtonColourFromPackageStatus(packageRequest.packageStatus)} package-request-button`;
  const handleClick = () => router.push(getCorePackageRoute(packageRequest.packageId));

  return (
    <Container
      borderBottom="1px solid #BFC1C3"
      borderRight="1px solid #BFC1C3"
      borderTop="1px solid #BFC1C3"
      borderLeft="1px solid #BFC1C3"
      background="#F8F8F8"
      padding="30px"
    >
      <Container display="flex" alignItems="center">
        <Tag className="text-capitalize" outline color={getTagColorFromStatus(packageRequest.packageStatus)}>
          {packageRequest.packageStatus}
        </Tag>
        <VerticalSeparator width="10px" />
        <Heading size="l">Package request</Heading>
      </Container>
      <HorizontalSeparator height="20px" />
      <Container display="flex" justifyContent="space-between">
        <Container display="flex">
          <Container>
            <Heading size="m">Package</Heading>
            <p>{packageRequest.packageType}</p>
          </Container>
          <VerticalSeparator width="20px" />
          <Container>
            <Heading size="m">Care Plan</Heading>
            <ViewDocument
              noFile={!(documentId && documentName)}
              downloadFileName={documentName}
              getDocumentRequest={() => getDocumentRequest(documentId)}
            />
          </Container>
          <VerticalSeparator width="20px" />
          <Container>
            <Heading size="m">Assigned</Heading>
            <p>{formatDate(packageRequest.dateAssigned)}</p>
          </Container>
        </Container>
        <Button onClick={handleClick} className={buttonClass}>
          {getButtonTextFromPackageStatus(packageRequest.packageStatus)}
        </Button>
      </Container>
      <HorizontalSeparator height="10px" />
      {packageRequest?.notes && packageRequest?.notes.length > 0 && (
        <Collapse IconComponent={CaretDownIcon}>
          {packageRequest.notes.map((note) => (
            <>
              <HorizontalSeparator height="10px" />
              <Container display="flex" alignItems="center">
                <Heading size="m">{note.creatorName}</Heading>
                <VerticalSeparator width="20px" />
                {note.description}
                <VerticalSeparator width="20px" />
                {formatDate(note.dateCreated)}
              </Container>
              <p>
                {note.requestMoreInformation ? note.requestMoreInformation : 'No additional information submitted.'}
              </p>
            </>
          ))}
        </Collapse>
      )}
    </Container>
  );
};

export default PackageRequest;
