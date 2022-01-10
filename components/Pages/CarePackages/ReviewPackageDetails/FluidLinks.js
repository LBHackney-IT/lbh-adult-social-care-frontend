import React from 'react';
import { Container, Link } from '../../../HackneyDS';

export const FluidLinks = ({ links }) => (
  <Container className="review-package-details__links">
    {links.map(({ text, href, hide }) => {
      if (hide) return null;

      return (
        <p key={text}>
          —{' '}
          <Link className="link-button" href={href}>
            {text}
          </Link>
        </p>
      );
    })}
  </Container>
);
