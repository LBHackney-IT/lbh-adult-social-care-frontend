import React, { useState } from 'react';
import { Button, Container, Heading, HorizontalSeparator, Link, Tag, VerticalSeparator } from 'components';
import {
  formatDate,
  getButtonTextFromPackageStatus,
  getTagColorFromStatus,
  getButtonColourFromPackageStatus,
} from 'service';
import { CaretDownIcon } from 'components/Icons';
import { useRouter } from 'next/router';
import { getCorePackageRoute } from 'routes/RouteConstants';

const PackageRequest = ({ packageRequest }) => {
  const router = useRouter();
  const [isExpanded, setExpanded] = useState(false);
  const buttonClass = `${getButtonColourFromPackageStatus(packageRequest.packageStatus)} package-request-button`;
  const handleClick = () => router.push(getCorePackageRoute(packageRequest.packageId));
  return (
    <Container borderBottom="1px solid #BFC1C3" border="1px solid #BFC1C3" background="#F8F8F8" padding="30px">
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
            <Link>View</Link>
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

      <Container>
        <Container display="flex" alignItems="center" cursor="pointer">
          <p onClick={() => setExpanded(!isExpanded)} className="link-button">
            {isExpanded ? 'Hide' : 'Collapse'}
          </p>
          <VerticalSeparator width="5px" />
          <CaretDownIcon />
        </Container>
        {packageRequest.notes.map((note) => (
          <>
            {isExpanded && (
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
            )}
          </>
        ))}
      </Container>
    </Container>
  );
};

export default PackageRequest;
