import React from 'react';
import Image from 'next/image';
import { ArrowLeftGreenIcon } from './Icons';
import { useRouter } from 'next/router';

const NavClientSummary = ({
  children,
  hackneyId,
  showBackButton = true,
  packagesCount = null,
  preferredContact = null,
  canSpeakEnglish = null,
  dateOfBirth,
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
          <label className="client-fullName">James Kenter</label>
        </div>
        <div className="client-prop">
          <label>HACKNEY ID</label>
          <div>{hackneyId}</div>
        </div>
        <div className="client-prop">
          <label>DOB</label>
          <div>{dateOfBirth}</div>
        </div>
        <div className="client-prop">
          <label>POSTCODE</label>
          <div>{postcode}</div>
        </div>
        {sourcingCare && (
          <div className="client-prop">
            <label>WHO IS SOURCING CARE</label>
            <Image width="300" height="52" src="/images/icons/hackney_logo.png" alt="" />
          </div>
        )}
        {(packagesCount !== null || preferredContact !== null || canSpeakEnglish !== null) && (
          <div className="more-info is-flex is-justify-content-space-between">
            <p className="is-5 package-count">
              <span className="font-weight-bold">{packagesCount}</span>
              {`${packagesCount > 1 ? 'Packages' : 'Package'} to action`}
            </p>
            <div className="client-prop">
              <label>PREFERRED CONTACT</label>
              <div>{preferredContact}</div>
            </div>
            <div className="client-prop">
              <label>CAN SPEAK ENGLISH</label>
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
