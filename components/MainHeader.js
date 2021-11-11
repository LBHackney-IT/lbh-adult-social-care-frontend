import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from './HackneyDS';
import { selectHeader } from '../reducers/headerReducer';

const MainHeader = () => {
  const { visible, links, fixed, className } = useSelector(selectHeader);
  if (!visible) return null;

  return <Header links={links} className={className} fixed={fixed} />
}

export default MainHeader;