import React, { useState } from 'react';
import {
  formatDate,
  getButtonTextFromPackageStatus,
  getTagColorFromStatus,
  getButtonColourFromPackageStatus,
  useGetFile,
} from 'service';
import { CaretDownIcon } from 'components/Icons';
import { useRouter } from 'next/router';
import { getCorePackageRoute } from 'routes/RouteConstants';
import {
  Button,
  Container,
  Collapse,
  Heading,
  HorizontalSeparator,
  Tag,
  VerticalSeparator,
} from '../../../HackneyDS';
import UrlFromFile from '../../../UrlFromFile';

const PackageRequest = ({ packageRequest }) => {
  const router = useRouter();
  const buttonClass = `${getButtonColourFromPackageStatus(packageRequest.packageStatus)} package-request-button`;
  const handleClick = () => router.push(getCorePackageRoute(packageRequest.packageId));

  const [file, setFile] = useState();

  const { isLoading: fileLoading } = useGetFile({
    fileId: packageRequest.socialWorkerCarePlanFileId,
    fileName: packageRequest.socialWorkerCarePlanFileName,
    setter: (newFile) => setFile(newFile),
  });

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
            <UrlFromFile isLoading={fileLoading} showOnlyLink file={file} />
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
      {packageRequest?.notes && packageRequest.notes.length && (
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
