import React, { useEffect, useState } from 'react';
import {
  formatDate,
  formatDocumentInfo,
  getButtonColourFromPackageStatus,
  getButtonTextFromPackageStatus,
  getTagColorFromStatus,
} from 'service';
import { CaretDownIcon } from 'components/Icons';
import { useRouter } from 'next/router';
import { getCorePackageRoute } from 'routes/RouteConstants';
import { useDocument } from 'api';
import { Button, Collapse, Container, Heading, HorizontalSeparator, Tag, VerticalSeparator } from '../../../HackneyDS';
import UrlFromFile from '../../../UrlFromFile';

const PackageRequest = ({ packageRequest }) => {
  const router = useRouter();
  const buttonClass = `${getButtonColourFromPackageStatus(packageRequest.packageStatus)} package-request-button`;
  const handleClick = () => router.push(getCorePackageRoute(packageRequest.packageId));

  const [file, setFile] = useState();

  const { data: href } = useDocument(packageRequest.assessmentFileId);

  useEffect(() => {
    if (href) {
      (async () => {
        const { assessmentFileId, assessmentFileName } = packageRequest;
        const formatFile = await formatDocumentInfo({
          href,
          fileName: assessmentFileName,
          fileId: assessmentFileId
        });
        setFile(formatFile);
      })();
    }
  }, [href]);

  return (
    <Container borderBottom="1px solid #BFC1C3" borderRight="1px solid #BFC1C3" borderTop="1px solid #BFC1C3"  borderLeft="1px solid #BFC1C3" background="#F8F8F8" padding="30px">
      <Container display="flex" alignItems="center">
        <Tag className="text-capitalize" outline color={getTagColorFromStatus(packageRequest.packageStatus)}>
          {packageRequest.packageStatus}
        </Tag>
        <VerticalSeparator width="10px" />
        <Heading size="l">Package request</Heading>
      </Container>
      <HorizontalSeparator height="20px" />
      <Container display="flex" justifyContent="space-between">
        <Container className="user-details">
          <Container>
            <p>Package</p>
            <p>{packageRequest.packageType}</p>
          </Container>
          <Container>
            <p>Care Plan</p>
            <UrlFromFile showOnlyLink file={file} />
          </Container>
          <Container>
            <p>Assigned</p>
            <p>{formatDate(packageRequest.dateAssigned)}</p>
          </Container>
        </Container>
        <Button onClick={handleClick} className={buttonClass}>
          {getButtonTextFromPackageStatus(packageRequest.packageStatus)}
        </Button>
      </Container>
      <HorizontalSeparator height="10px" />

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
            <p>{note.requestMoreInformation ? note.requestMoreInformation : 'No additional information submitted.'}</p>
          </>
        ))}
      </Collapse>
    </Container>
  );
};

export default PackageRequest;
