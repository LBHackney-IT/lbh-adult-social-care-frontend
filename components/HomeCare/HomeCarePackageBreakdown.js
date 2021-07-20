import React from 'react';

const HomeCarePackageBreakdown = () => (
  <div className="columns is-multiline">
    <div className="column is-full">
      <p className="font-weight-bold hackney-text-green">PACKAGE BREAKDOWN</p>
      <div className="level font-size-14px">
        <div className="level-left">
          <div className="level-item">
            <p className="is-5">
              <span className="font-weight-bold">Personal Care:</span> 12h
            </p>
          </div>
          <div className="level-item">
            <p className="is-5">
              <span className="font-weight-bold">Escort:</span> 4h
            </p>
          </div>
          <div className="level-item">
            <p className="is-5">
              <span className="font-weight-bold">Domestic:</span> 3h
            </p>
          </div>
          <div className="level-item">
            <p className="is-5">
              <span className="font-weight-bold">Waking Nights:</span> 7h
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomeCarePackageBreakdown;
