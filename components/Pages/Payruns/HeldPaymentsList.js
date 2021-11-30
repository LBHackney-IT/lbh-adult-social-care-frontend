import React from 'react';
import { Collapse, Container, HorizontalSeparator } from 'components';
import { CaretDownIcon } from 'components/Icons';
import { HeldPaymentHeader } from './HeldPaymentHeader';
import { PayRunItem } from './SinglePayRun/PayRunItem';

export const HeldPaymentsList = ({ data, searchTerm, update }) => (
  <Container>
    {data.map((payRun, index) => (
      <>
        <Container background="#FAFAFA" padding="32px 16px" key={payRun.payRunId}>
          <Collapse
            title={<HeldPaymentHeader payRun={payRun} searchTerm={searchTerm} />}
            IconComponent={CaretDownIcon}
            expandText=""
            collapseText=""
            isButtonClickOnly
          >
            <HorizontalSeparator height="40px" />
            <PayRunItem
              item={payRun.payRunInvoice}
              key={payRun.payRunId}
              searchTerm={searchTerm}
              padding="0"
              payRunId={payRun.payRunId}
              isHeld
              updateData={update}
            />
          </Collapse>
        </Container>
        {index < data.length - 1 && <HorizontalSeparator height="16px" />}
      </>
    ))}
  </Container>
);
