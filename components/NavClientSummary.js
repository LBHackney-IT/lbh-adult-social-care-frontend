import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowLeftGreenIcon } from './Icons';

const NavClientSummary = ({
  children,
  hackneyId,
  showBackButton = true,
  packagesCount = null,
  preferredContact = null,
  canSpeakEnglish = null,
  dateOfBirth,
  age,
  sourcingCare,
  postcode,
}) => {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <div className="client-summary-cont">
      {showBackButton && (
        <div onClick={goBack} className="nav-back-button">
          <ArrowLeftGreenIcon />
          <p>Back</p>
        </div>
      )}
      <div className="is-flex-wrap-wrap">
        {children && <div className="is-5 client-summary-title">{children}</div>}
        <div className="client-prop">
          <p className="client-fullName">James Kenter</p>
        </div>
        <div className="client-prop">
          <p>HACKNEY ID:</p>
          <div>{hackneyId}</div>
        </div>
        <div className="client-prop">
          <p>Age:</p>
          <div>{age}</div>
        </div>
        <div className="client-prop">
          <p>DOB:</p>
          <div>{dateOfBirth}</div>
        </div>
        <div className="client-prop">
          <p>POSTCODE:</p>
          <div>{postcode}</div>
        </div>
        {sourcingCare && (
          <div className="client-prop">
            <p>WHO IS SOURCING CARE:</p>
            <Image width="300" height="52" src="/images/icons/hackney_logo.png" alt="" />
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
