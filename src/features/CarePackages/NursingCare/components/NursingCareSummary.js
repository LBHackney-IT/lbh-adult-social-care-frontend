import React from 'react';
import { Button } from '../../../components/Button';

const NursingCareSummary = ({}) => {
  return (
    <div className="day-summary has-text-black">
      <div className="columns is-mobile">
        <div className="column">
          <div>
            <span className="has-text-weight-bold mr-2 package-summary-title">Nursing Care</span>
            <span>03/07/2021 - 03/09/2021</span>
          </div>
        </div>
      </div>

      <div className="columns is-mobile mb-3">
        <div className="column">
          <div className="border-bottom"/>
        </div>
      </div>

      <div className="columns is-mobile mb-3">
        <div className="column">
          <p className="has-text-weight-bold package-summary-sub-title mb-2">Need Addressing</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor. Aliquam suscipit laoreet pharetra. Aenean vestibulum ullamcorper enim, sed rhoncus sem tempor vitae. Sed dignissim ornare metus eu faucibus. Sed vel diam mi. Aenean a auctor felis, sit amet lacinia urna. Pellentesque bibendum dui a nulla faucibus, vel dignissim mi rutrum.
          </p>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <p className="font-weight-bold package-summary-sub-title mb-2">Additional needs</p>
          <div className="border-bottom"/>
        </div>
        <div className="column"/>
      </div>

      <div className="columns">
        <div className="column">
          <div className="mb-3">
            <div className="columns is-multiline">

              <div className="column is-half">
                <p
                  className="has-text-weight-bold additional-need-title mb-2">3 Hours per week</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor. Aliquam suscipit laoreet pharetra. Aenean vestibulum ullamcorper enim, sed rhoncus sem tempor vitae.
                </p>
                <div>
                  <Button linkBtn={true} className="mr-2">
                    Edit
                  </Button>

                  <Button linkBtn={true}>
                    Remove
                  </Button>
                </div>
              </div>

              <div className="column is-half">
                <h4
                  className="has-text-weight-bold additional-need-title mb-2">3 Hours per week</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor. Aliquam suscipit laoreet pharetra. Aenean vestibulum ullamcorper enim, sed rhoncus sem tempor vitae.
                </p>
                <div>
                  <Button linkBtn={true} className="mr-2">
                    Edit
                  </Button>

                  <Button linkBtn={true}>
                    Remove
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default NursingCareSummary;
