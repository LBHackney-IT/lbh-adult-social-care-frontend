import React from 'react';
import Image from 'next/image';

const ClientSummary = ({
  children,
  client,
  hackneyId,
  age,
  packagesCount = null,
  preferredContact = null,
  canSpeakEnglish = null,
  dateOfBirth,
  sourcingCare,
  postcode,
}) => (
  <div className="client-summary-cont">
    <div className="columns is-flex-wrap-wrap">
      {children && <div className="column is-5 client-summary-title">{children}</div>}
      <div className="column client-prop">
        <span>Client</span>
        <div>{client}</div>
      </div>
      <div className="column client-prop">
        <span>Hackney ID</span>
        <div>#{hackneyId}</div>
      </div>
      <div className="column client-prop">
        <span>Age {age}</span>
        <div>{dateOfBirth}</div>
      </div>
      <div className="column client-prop">
        <span>Postcode</span>
        <div>{postcode}</div>
      </div>
      {sourcingCare && (
        <div className="column client-prop">
          <span>WHO IS SOURCING CARE</span>
          <Image width="300" height="52" src="/images/icons/hackney_logo.png" alt="" />
        </div>
      )}
      {(packagesCount !== null || preferredContact !== null || canSpeakEnglish !== null) && (
        <div className="more-info is-flex is-justify-content-space-between">
          <p className="column is-5 package-count">
            <span className="font-weight-bold">{packagesCount}</span>
            {`${packagesCount > 1 ? 'Packages' : 'Package'} to action`}
          </p>
          <div className="column client-prop">
            <span>PREFERRED CONTACT</span>
            <div>{preferredContact}</div>
          </div>
          <div className="column client-prop">
            <span>CAN SPEAK ENGLISH</span>
            <div>{canSpeakEnglish}</div>
          </div>
        </div>
      )}
    </div>
    {/* TODO Green Divider */}
  </div>
);

export default ClientSummary;
