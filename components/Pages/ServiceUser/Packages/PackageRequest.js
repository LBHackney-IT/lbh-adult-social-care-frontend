import React, { useState } from 'react';
import { Button, Container, Heading, HorizontalSeparator, Link, Tag, VerticalSeparator } from 'components/HackneyDS';
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
  const buttonClass = getButtonColourFromPackageStatus(packageRequest.packageStatus);

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
        {isExpanded && (
          <>
            <p>
              ’Twas brillig, and the slithy toves Did gyre and gimble in the wabe: All mimsy were the borogoves, And the
              mome raths outgrabe. “Beware the Jabberwock, my son! The jaws that bite, the claws that catch! Beware the
              Jubjub bird, and shun The frumious Bandersnatch!” He took his vorpal sword in hand; Long time the manxome
              foe he sought— So rested he by the Tumtum tree And stood awhile in thought. And, as in uffish thought he
              stood, The Jabberwock, with eyes of flame, Came whiffling through the tulgey wood, And burbled as it came!
              One, two! One, two! And through and through The vorpal blade went snicker-snack! He left it dead, and with
              its head He went galumphing back. “And hast thou slain the Jabberwock? Come to my arms, my beamish boy! O
              frabjous day! Callooh! Callay!” He chortled in his joy. ’Twas brillig, and the slithy toves Did gyre and
              gimble in the wabe: All mimsy were the borogoves, And the mome raths outgrabe.
            </p>
          </>
        )}
      </Container>
    </Container>
  );
};

export default PackageRequest;
