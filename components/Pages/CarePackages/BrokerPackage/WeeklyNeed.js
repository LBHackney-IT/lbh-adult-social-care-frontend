import React from 'react';
import { Container, Heading, HorizontalSeparator, Link, Tag, VerticalSeparator } from 'components';
import { formatDate, getNumberWithCommas } from 'service';

export const WeeklyNeed = ({ need, removeNeed }) => {
  const handleClick = (e) => {
    e.preventDefault();
    removeNeed(need.id);
  };
  return (
    <Container padding="24px 16px" background="#FAFAFA" display="flex" flexDirection="column" flex="1">
      <Container display="flex" alignItems="center" justifyContent="space-between">
        <Container display="flex" alignItems="center">
          {need.endDate ? (
            <Tag outline color="green">
              One-off
            </Tag>
          ) : (
            <Tag outline color="blue">
              Weekly
            </Tag>
          )}
          <VerticalSeparator width="10px" />
          <Heading size="m">£{getNumberWithCommas(need.cost)}</Heading>
        </Container>
        <Link onClick={(e) => handleClick(e)} noVisited>
          Remove
        </Link>
      </Container>
      <HorizontalSeparator height="10px" />
      <Container>
        {need.endDate
          ? `${formatDate(need.startDate)} - ${formatDate(need.endDate)}`
          : `From ${formatDate(need.startDate)}`}
      </Container>
    </Container>
  );
};
