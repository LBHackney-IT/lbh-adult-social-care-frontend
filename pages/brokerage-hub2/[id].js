import PackageUserDetails from 'components/Brokerage/PackageUserDetails';
import { Button, Container, Heading, Hint, HorizontalSeparator, Link, VerticalSeparator } from 'components/HackneyDS';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';

const PackageRequestPage = () => {
  const router = useRouter();
  const packageData = router.query;
  console.log(packageData);

  return (
    <Container padding="60px">
      <PackageUserDetails
        dateOfBirth={packageData.dateOfBirth}
        postcode={packageData.address}
        hackneyId={packageData.hackneyId}
        client={packageData.serviceUserName}
      />
      <Container padding="24px" background="#F8F8F8">
        <Heading size="l">New Package Request</Heading>
        <HorizontalSeparator height="20px" />
        <Container display="flex">
          <Container>
            <Heading size="m">Package</Heading>
            <HorizontalSeparator height="5px" />
            <Hint>{packageData.packageType}</Hint>
          </Container>
          <VerticalSeparator width="60px" />
          <Container>
            <Heading size="m">Care Plan</Heading>
            <HorizontalSeparator height="5px" />
            <Link href='https://nudgedigital.slack.com/files/U01388KUH1A/F02EC73NV0S/care_act_assessment.pdf'>View</Link>
          </Container>
          <VerticalSeparator width="60px" />
          <Container>
            <Heading size="m">Assigned</Heading>
            <HorizontalSeparator height="5px" />
            <Hint>{packageData.dateAssigned}</Hint>
          </Container>
        </Container>
        <Button>Create package</Button>
      </Container>
    </Container>
  );
};
export default PackageRequestPage;
