import React from 'react';

const DayCarePackageBreakdown = ({
  dayCareTime = '12h',
  transportTime = '4h/week',
  dayOpportunitiesTotalTime = '3h',
}) => (
  <div className="columns is-multiline">
    <div className="column is-full">
      <p className="font-weight-bold hackney-text-green">PACKAGE BREAKDOWN</p>
      <div className="level font-size-14px">
        <div className="level-left">
          <div className="level-item">
            <p className="is-5">
              <span className="font-weight-bold">Day Care:</span> {dayCareTime}
            </p>
          </div>
          <div className="level-item">
            <p className="is-5">
              <span className="font-weight-bold">Transport:</span> {transportTime}
            </p>
          </div>
          <div className="level-item">
            <p className="is-5">
              <span className="font-weight-bold">Day opportunities (Total):</span> {dayOpportunitiesTotalTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DayCarePackageBreakdown;
