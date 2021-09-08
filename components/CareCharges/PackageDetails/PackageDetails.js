import React from 'react';
import { Heading, Label, HorizontalSeparator, VerticalSeparator, Link, FileUpload } from '../../HackneyDS';

export const PackageDetails = ({ packageDetails }) =>
  packageDetails ? (
    <div>
      <div>
        <Heading size="s">Sourcing care</Heading>
        <HorizontalSeparator height="8px" />
        <div style={{display: 'flex'}}>
          <Label>{packageDetails.careSource} </Label>
          <VerticalSeparator width="5px" />
          <Link>Supplier</Link>
        </div>
      </div>
      <HorizontalSeparator height="16px" />
      <div style={{ display: 'flex' }}>
        <div>
          <Heading size="s">Start date</Heading>
          <HorizontalSeparator height="8px" />
          <Label>{packageDetails.careSource}</Label>
        </div>
        <VerticalSeparator width="20px" />
        <div>
          <Heading size="s">End date</Heading>
          <HorizontalSeparator height="8px" />
          <Label>{packageDetails.careSource}</Label>
        </div>
      </div>
      <HorizontalSeparator height="16px" />
      <div>
        <Heading size="s">Respite care</Heading>
        <HorizontalSeparator height="8px" />
        <Label>{packageDetails.respiteCare}</Label>
      </div>
      <HorizontalSeparator height="16px" />
      <div>
        <Heading size="s">Immediate package</Heading>
        <HorizontalSeparator height="8px" />
        <Label>{packageDetails.immediatePackage}</Label>
      </div>
      <HorizontalSeparator height="16px" />
      <div>
        <Heading size="s">Discharge package</Heading>
        <HorizontalSeparator height="8px" />
        <Label>{packageDetails.dischargePackage}</Label>
      </div>
      <HorizontalSeparator height="16px" />
      <div>
        <Heading size="s">Type of stay</Heading>
        <HorizontalSeparator height="8px" />
        <Label>{packageDetails.stayType}</Label>
      </div>
      <HorizontalSeparator height="16px" />
      <div>
        <Heading size="s">S117 Client</Heading>
        <HorizontalSeparator height="8px" />
        <Label>{packageDetails.s117}</Label>
      </div>
      <HorizontalSeparator height="16px" />
      <div>
        <Heading size="s">Attach document</Heading>
        <HorizontalSeparator height="8px" />
        <FileUpload />
      </div>
    </div>
  ) : null;
