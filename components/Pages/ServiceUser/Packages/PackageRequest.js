import React, { useState } from 'react';
import { Button, Container, Heading, HorizontalSeparator, Link, Tag, VerticalSeparator } from 'components/HackneyDS';
import { getCorePackageRoute } from 'routes/RouteConstants';
import { CaretDownIcon } from 'components/Icons';
import { formatDate } from 'service/helpers';
import { useRouter } from 'next/router';

const tagColors = {
  New: 'green',
  'In Progress': 'yellow',
  'Waiting For Approval': 'blue',
  'Not Approved': 'red',
  Ended: 'red',
  Cancelled: 'red',
  Approved: 'gray',
};

export const PackageRequest = () => {
  const router = useRouter();
  const { dateAssigned, packageId, packageStatus, packageType } = router.query;

  const [isExpanded, setExpanded] = useState(false);

  const handleClick = () => {
    router.push(getCorePackageRoute(packageId));
  };

  return (
    <Container border="1px solid #BFC1C3" background="#F8F8F8" padding="30px">
      <Container display="flex" alignItems="center">
        <Tag className="text-capitalize outline" color={tagColors[packageStatus]}>
          {packageStatus}
        </Tag>
        <VerticalSeparator width="10px" />
        <Heading size="l">Package request</Heading>
      </Container>
      <HorizontalSeparator height="20px" />
      <Container display="flex" justifyContent="space-between">
        <Container className="user-details">
          <Container>
            <p>Package</p>
            <p>{packageType}</p>
          </Container>
          <Container>
            <p>Care Plan</p>
            <Link>View</Link>
          </Container>
          <Container>
            <p>Assigned</p>
            <p>{formatDate(dateAssigned)}</p>
          </Container>
        </Container>
        <Button handler={handleClick}>Create Package</Button>
      </Container>
      <HorizontalSeparator height="10px" />
      <Container>
        <Container
          display="flex"
          className={`review-package-details__accordion-info${isExpanded ? ' accordion-opened' : ''}`}
        >
          <p onClick={() => setExpanded(!isExpanded)} className="link-button">
            Notes
          </p>
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
