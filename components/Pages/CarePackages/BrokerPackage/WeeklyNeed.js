import React from 'react';
import { Container, Heading, HorizontalSeparator, Link } from 'components';
import { formatDate, getNumberWithCommas } from 'service';

export const WeeklyNeed = ({ need, removeNeed }) => {
  const handleClick = (e) => {
    e.preventDefault();
    removeNeed(need.id);
  };
  return (
    <Container
      padding="24px 16px"
      background="#FAFAFA"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      flex="1"
    >
      <Heading size="m">{`${formatDate(need.startDate)} - ${
        need.endDate ? formatDate(need.endDate) : 'Ongoing'
      }`}</Heading>
      <HorizontalSeparator height="5px" />£{getNumberWithCommas(need.cost)}
      <HorizontalSeparator height="10px" />
      <Link onClick={(e) => handleClick(e)} noVisited>
        Remove
      </Link>
    </Container>
  );
};
