import React from 'react';
import { HackneyLogo } from './Icons';

const ApprovalClientSummary = () => (
  <div className="columns">
    <div className="column">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div>
              <p className="font-weight-bold hackney-text-green">CLIENT</p>
              <p className="font-size-14px">James Stephens</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div>
              <p className="font-weight-bold hackney-text-green">HACKNEY ID</p>
              <p className="font-size-14px">#786288</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div>
              <p className="font-weight-bold hackney-text-green">AGE 91</p>
              <p className="font-size-14px">09/12/1972</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div>
              <p className="font-weight-bold hackney-text-green">POSTCODE</p>
              <p className="font-size-14px">E9 6EY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div>
              <p className="font-weight-bold hackney-text-green">WHO IS SOURCING CARE</p>
              <p className="font-size-14px">
                <HackneyLogo />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ApprovalClientSummary;
