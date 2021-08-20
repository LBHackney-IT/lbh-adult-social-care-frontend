import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeftGreenIcon } from './Icons';

const NavClientSummary = ({
  title,
  hackneyId,
  showBackButton = true,
  packagesCount = null,
  preferredContact = null,
  canSpeakEnglish = null,
  dateOfBirth,
  age,
  whoIsSourcing,
  postcode,
  className = '',
  client,
}) => {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <div className={`client-summary-cont nav-client-summary ${className}`}>
      {showBackButton && (
        <div onClick={goBack} className="nav-back-button">
          <ArrowLeftGreenIcon />
          <p>Back</p>
        </div>
      )}
      <div className="is-flex-wrap-wrap">
        {title && <div className="is-5 client-summary-title">{title}</div>}
        {client && <div className="client-prop">
          <p className="client-fullName">{client}</p>
        </div>}
        {hackneyId && <div className="client-prop">
          <p>HACKNEY ID:</p>
          <div>{hackneyId}</div>
        </div>}
        {age && <div className="client-prop">
          <p>Age:</p>
          <div>{age}</div>
        </div>}
        {dateOfBirth && <div className="client-prop">
          <p>DOB:</p>
          <div>{dateOfBirth}</div>
        </div>}
        {postcode && <div className="client-prop">
          <p>POSTCODE:</p>
          <div>{postcode}</div>
        </div>}
        {whoIsSourcing && (
          <div className="client-prop">
            <p>WHO IS SOURCING CARE:</p>
            <Image width="122" height="30" src="/images/icons/hackney_logo.png" alt="" />
          </div>
        )}
        {(packagesCount !== null || preferredContact !== null || canSpeakEnglish !== null) && (
          <div className="more-info is-flex-wrap-wrap is-flex is-justify-content-space-between">
            <p className="is-5 package-count">
              <span className="font-weight-bold">{packagesCount}</span>
              {`${packagesCount > 1 ? 'Packages' : 'Package'} to action`}
            </p>
            <div className="client-prop">
              <p>PREFERRED CONTACT:</p>
              <div>{preferredContact}</div>
            </div>
            <div className="client-prop">
              <p>CAN SPEAK ENGLISH:</p>
              <div>{canSpeakEnglish}</div>
            </div>
          </div>
        )}
      </div>
      {/* TODO Green Divider */}
    </div>
  );
};

export default NavClientSummary;
