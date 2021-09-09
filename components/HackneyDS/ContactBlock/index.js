import React from 'react';
import dynamic from "next/dynamic";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '../../Icons';

const Map = dynamic(() => import("./LeafletMap"), { ssr: false });

export const ContactBlock = ({
  withMap = false,
  mapMarkers,
  initialCoords = [51.545386, -0.057069],
  serviceName,
  openingTimes,
  email,
  telephones,
  addresses,
  notes,
}) => {
  return (
    <section className="lbh-contact">
      <h2 className="lbh-heading-large-light lbh-contact__title">
        {serviceName}
      </h2>
      <div className="lbh-contact__social">
        <h4 className="lbh-heading-h4 lbh-contact__social-title">Follow us on:</h4>
        <a
          className="lbh-contact__social-link lbh-contact__social-link--twitter"
          href="https://twitter.com/hackneycouncil?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
          title="Follow us on Twitter"
          target="_blank"
          rel="noreferrer"
        >
          <span className="lbh-contact__social-link-text">Twitter</span>
          <span className="lbh-contact__social-link-icon">
        <TwitterIcon />
      </span>
        </a>
        <a
          className="lbh-contact__social-link lbh-contact__social-link--facebook"
          href="https://en-gb.facebook.com/hackneycouncil/"
          title="Follow us on Facebook"
          target="_blank" rel="noreferrer"
        >
          <span className="lbh-contact__social-link-text">Facebook</span>
          <span className="lbh-contact__social-link-icon">
        <FacebookIcon />
      </span>
        </a>
        <a
          className="lbh-contact__social-link lbh-contact__social-link--youtube"
          href="https://www.youtube.com/user/hackneycouncil"
          title="Follow us on YouTube"
          target="_blank" rel="noreferrer"
        >
          <span className="lbh-contact__social-link-text">YouTube</span>
          <span className="lbh-contact__social-link-icon">
        <YoutubeIcon />
      </span>
        </a>
        <a
          className="lbh-contact__social-link lbh-contact__social-link--instagram"
          href="https://www.instagram.com/hackneycouncil/?hl=en"
          title="Follow us on Instagram"
          target="_blank" rel="noreferrer"
        >
          <span className="lbh-contact__social-link-text">Instagram</span>
          <span className="lbh-contact__social-link-icon">
        <InstagramIcon />
      </span>
        </a>
      </div>
      <div className="lbh-contact__details">
        {addresses && <div className="lbh-contact__block">
          <h4
            className="lbh-heading-h4 lbh-contact__block-title lbh-contact__block-title--address"
          >
            Address
          </h4>
          <div className="lbh-contact__address">
            {addresses.map(address => (
              <span>{address}</span>
            ))}
          </div>
        </div>}
        {telephones && <div className="lbh-contact__block">
          <h4
            className="lbh-heading-h4 lbh-contact__block-title lbh-contact__block-title--telephone"
          >
            Telephone
          </h4>
          <ul className="lbh-contact__list">
            {telephones.map(phone => (
              <li className="lbh-contact__list-item">
                <a href={`tel:${phone}`} className="lbh-contact__telephone" title={`Call us on ${phone}`}>
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>}
        {email && <div className="lbh-contact__block">
          <h4
            className="lbh-heading-h4 lbh-contact__block-title lbh-contact__block-title--email"
          >
            Email
          </h4>
          <ul className="lbh-contact__list">
            <li className="lbh-contact__list-item">
              <a
                href="mailto:iamanemail@hackney.gov.uk"
                className="lbh-contact__email"
                title="Email us on iamanemail@hackney.gov.uk"
              >{email}</a
              >
            </li>
            <li className="lbh-contact__list-item">
              <a
                href="mailto:iamanemail@hackney.gov.uk"
                className="lbh-contact__email"
                title="Email us on iamanemail@hackney.gov.uk"
              >{email}</a
              >
            </li>
          </ul>
        </div>}
        {openingTimes && <div className="lbh-contact__block">
          <h4
            className="lbh-heading-h4 lbh-contact__block-title lbh-contact__block-title--opening-times"
          >
            Opening times
          </h4>
          <ul className="lbh-contact__list">
            {openingTimes.map(time => (
              <li className="lbh-contact__list-item">{time}</li>
            ))}
          </ul>
        </div>}
        {notes && <div className="lbh-contact__block">
          <h4 className="lbh-heading-h4 lbh-contact__block-title lbh-contact__block-title--notes">
            Notes
          </h4>
          <ul className="lbh-contact__list">
            {notes.map(note => <li className="lbh-contact__list-item">{note}</li>)}
          </ul>
        </div>}
      </div>
      {withMap && <Map mapMarkers={mapMarkers} initialCoords={initialCoords} />}
    </section>
  )
}
