import React, { useState } from 'react';
import { Container, FormGroup, Heading, Hint, HorizontalSeparator, InsetText, Link } from 'components';
import { getNumberWithCommas } from 'service';
import { WeeklyNeed } from './WeeklyNeed';
import { NewWeeklyNeed } from './NewWeeklyNeed';

export const WeeklyAdditionalNeeds = ({ setValue, weeklyNeeds }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const total = weeklyNeeds?.map((need) => need.cost).reduce((partialSum, a) => parseFloat(partialSum) + parseFloat(a), 0) || 0;
  const handleClick = (e) => {
    e.preventDefault();
    setIsAddingNew(true);
  };
  
  const updateDetails = (newDetail) => {
    setValue('details', [...weeklyNeeds, newDetail], { shouldDirty: true });
    setIsAddingNew(false);
  };
  
  const removeNeed = (id) => {
    const newNeeds = weeklyNeeds.filter((need) => need.id !== id);
    setValue('details', newNeeds, { shouldDirty: true });
  };
  
  return (
    <Container>
      <FormGroup label="Additional needs">
        <Container display="flex" justifyContent="stretch" flexDirection="column">
          {!weeklyNeeds ||
            (weeklyNeeds.length === 0 && !isAddingNew && (
              <>
                <InsetText>No additional needs</InsetText>
                <HorizontalSeparator height="20px" />
              </>
            ))}
          {weeklyNeeds?.map((need) => (
            <>
              <WeeklyNeed need={need} removeNeed={removeNeed} />
              <HorizontalSeparator height="10px" />
            </>
          ))}
          {isAddingNew ? (
            <>
              <HorizontalSeparator height="20px" />
              <NewWeeklyNeed cancel={() => setIsAddingNew(false)} updateDetails={updateDetails} />
            </>
          ) : (
            <Container alignSelf="flex-start">
              <Link onClick={(e) => handleClick(e)} noVisited>
                Add additional need
              </Link>
            </Container>
          )}
          <HorizontalSeparator height="48px" />
          <Container
            borderTop="1px solid #bfc1c3"
            borderBottom="1px solid #bfc1c3"
            padding="24px 0"
            display="flex"
            justifyContent="space-between"
          >
            <Hint>Additional needs</Hint>
            <Heading size="m">£{getNumberWithCommas(total)}</Heading>
          </Container>
        </Container>
      </FormGroup>
    </Container>
  );
};
