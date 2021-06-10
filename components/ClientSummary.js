import React from "react";
import Image from "next/image";

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
}) => {
  return (
    <div className="client-summary-cont">
      <div className="columns is-flex-wrap-wrap">
        {children && <div className="column is-5 client-summary-title">{children}</div>}
        <div className="column client-prop">
          <label>Client</label>
          <div>{client}</div>
        </div>
        <div className="column client-prop">
          <label>Hackney ID</label>
          <div>#{hackneyId}</div>
        </div>
        <div className="column client-prop">
          <label>Age {age}</label>
          <div>{dateOfBirth}</div>
        </div>
        <div className="column client-prop">
          <label>Postcode</label>
          <div>{postcode}</div>
        </div>
        {
          sourcingCare &&
            <div className="column client-prop">
              <label>WHO IS SOURCING CARE</label>
              <Image width="300" height="52" src='/images/icons/hackney_logo.png' alt='' />
            </div>
        }
        {
          (packagesCount !== null || preferredContact !== null || canSpeakEnglish !== null) &&
          <div className='more-info is-flex is-justify-content-space-between'>
            <p className='column is-5 package-count'>
              <span className='font-weight-bold'>{packagesCount}</span>
              {`${packagesCount > 1 ? 'Packages' : 'Package'} to action`}
            </p>
            <div className="column client-prop">
              <label>PREFERRED CONTACT</label>
              <div>{preferredContact}</div>
            </div>
            <div className="column client-prop">
              <label>CAN SPEAK ENGLISH</label>
              <div>{canSpeakEnglish}</div>
            </div>
          </div>
        }
      </div>
      {/* TODO Green Divider */}
    </div>
  );
};

export default ClientSummary;
