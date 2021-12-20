import React from 'react';
import { Container, FormGroup, Heading, Hint, HorizontalSeparator, InsetText, Link } from 'components';
import { formatNumberToCurrency } from 'service';
import { WeeklyNeed } from './WeeklyNeed';

export const AdditionalNeeds = ({ setValue, weeklyNeeds, setIsAddingNew }) => {
  const total =
    weeklyNeeds?.map((need) => need.cost).reduce((partialSum, a) => parseFloat(partialSum) + parseFloat(a), 0) || 0;

  const ongoingTotal =
    weeklyNeeds
      ?.filter((need) => need.costPeriod === 2)
      ?.map((need) => need.cost)
      .reduce((partialSum, a) => parseFloat(partialSum) + parseFloat(a), 0) || 0;
  const oneOffTotal =
    weeklyNeeds
      ?.filter((need) => need.costPeriod === 3)
      ?.map((need) => need.cost)
      .reduce((partialSum, a) => parseFloat(partialSum) + parseFloat(a), 0) || 0;

  const handleClick = (e) => {
    e.preventDefault();
    setIsAddingNew(true);
  };

  const removeNeed = (id) => {
    const newNeeds = weeklyNeeds.filter((need) => need.id !== id);
    setValue('details', newNeeds, { shouldDirty: true });
  };

  return (
    <Container>
      <FormGroup label="Additional needs">
        <Container display="flex" justifyContent="stretch" flexDirection="column">
          {!weeklyNeeds?.length && (
            <>
              <InsetText>No additional needs</InsetText>
              <HorizontalSeparator height="20px" />
            </>
          )}
          {weeklyNeeds?.map((need) => (
            <>
              <WeeklyNeed need={need} removeNeed={removeNeed} />
              <HorizontalSeparator height="10px" />
            </>
          ))}

          <Container alignSelf="flex-start">
            <Link onClick={(e) => handleClick(e)} noVisited>
              Add additional need
            </Link>
          </Container>

          <HorizontalSeparator height="48px" />
          <Container
            borderTop="1px solid #bfc1c3"
            borderBottom="1px solid #bfc1c3"
            display="flex"
            flexDirection="column"
            justifyContent="stretch"
          >
            <Container
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom="1px solid #bfc1c3"
              padding="10px 0"
            >
              <Hint>Weekly</Hint>
              <Hint size="m">{formatNumberToCurrency(ongoingTotal)}</Hint>
            </Container>
            <Container
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom="1px solid #bfc1c3"
              padding="10px 0"
            >
              <Hint>One-off</Hint>
              <Hint size="m">{formatNumberToCurrency(oneOffTotal)}</Hint>
            </Container>
            <Container display="flex" alignItems="center" justifyContent="space-between" padding="10px 0">
              <Heading size="m">Additional needs total</Heading>
              <Heading size="m">{formatNumberToCurrency(total)}</Heading>
            </Container>
          </Container>
        </Container>
      </FormGroup>
    </Container>
  );
};
