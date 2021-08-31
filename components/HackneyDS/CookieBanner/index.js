import React from 'react';
import Button from '../Button';

export default function CookieBanner({ 'policy-link': policyLink, handler = () => {} }) {
  return (
    <section className="lbh-cookie-banner" data-module="lbh-cookie-banner">
      <div className="lbh-container lbh-cookie-banner__content-wrapper">
        <div className="lbh-cookie-banner__content">
          <p>
            We use cookies to ensure you have the best experience. For full details see our{' '}
            <a href={policyLink}>Cookie policy</a>.
          </p>
        </div>
        <div className="lbh-cookie-banner__button-wrapper">
          <Button className="lbh-cookie-banner__button" secondary handler={handler}>
            Accept and close
          </Button>
        </div>
      </div>
    </section>
  );
}
