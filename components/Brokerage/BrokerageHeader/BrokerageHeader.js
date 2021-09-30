import React from 'react';
import { Header } from '../../HackneyDS';

const BrokerageHeader = () => {
  return (
    <Header bottomLines={false}>
      <p slot='service-name'>Adult Social Care</p>
      <a href='#' slot='link'>Submitted Forms</a>
      <a href='#' slot='link'>New Package</a>
      <a href='#' slot='link'>Logout</a>
    </Header>
  );
};

export default BrokerageHeader;