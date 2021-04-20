import React from 'react'
import { Button } from '../../../components/Button';

const DayCareSummary = () => {
  return (
    // <div className="container is-fluid">
    <div className="day-summary">
      <div className="day-summary-title">
        <label>Visitation</label>
        <div className="day-summary-line"></div>
      </div>

      <div className="has-text-black">
        <div className="columns">
          <div className="column">
            <div className="columns">
              <div className="column">
                <span className="level is-mobile">
                    <span className="level-item level-left has-text-weight-bold is-size-5">Visiting:</span>
                    <label className="level-item has-text-centered">Mon</label>
                    <label className="level-item">Tue</label>
                    <label className="level-item">Wed</label>
                    <label className="level-item">Thu</label>
                    <label className="level-item">Fri</label>
                    <label className="level-item">Sat</label>
                    <label className="level-item">Sun</label>
                  </span>
              </div>
              <div className="column">
                <div className="level">
                  <div className="level-item level-right">
                    <span className="is-uppercase has-text-weight-bold is-size-5">Transport needed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold mb-2">Need Addressing</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor. Aliquam suscipit laoreet pharetra. Aenean vestibulum ullamcorper enim, sed rhoncus sem tempor vitae. Sed dignissim ornare metus eu faucibus. Sed vel diam mi. Aenean a auctor felis, sit amet lacinia urna. Pellentesque bibendum dui a nulla faucibus, vel dignissim mi rutrum.</p>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <h3 className="has-text-weight-bold mb-2">Day Care Opportunities</h3>
            {/*<hr/>*/}
            <div className="opportunity-summary-line"/>
          </div>
          <div className="column"></div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="mb-3">
              <div className="columns is-mobile is-multiline">
                <div className="column is-6">
                  <h4 className="has-text-weight-bold mb-2">[Time] [daily / weekly / monthly]</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor. Aliquam suscipit laoreet pharetra. Aenean vestibulum ullamcorper enim, sed rhoncus sem tempor vitae. </p>
                  <div>
                    <Button linkBtn={true} className="mr-2">
                      Edit
                    </Button>

                    <Button linkBtn={true}>
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="column is-6">
                  <h4 className="has-text-weight-bold mb-2">[Time] [daily / weekly / monthly]</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor. Aliquam suscipit laoreet pharetra. Aenean vestibulum ullamcorper enim, sed rhoncus sem tempor vitae. </p>
                  <div>
                    <Button linkBtn={true} className="mr-2">
                      Edit
                    </Button>

                    <Button linkBtn={true}>
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="column is-6">
                  <h4 className="has-text-weight-bold mb-2">[Time] [daily / weekly / monthly]</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor. Aliquam suscipit laoreet pharetra. Aenean vestibulum ullamcorper enim, sed rhoncus sem tempor vitae. </p>
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
    </div>
    // </div>
  )
}

export default DayCareSummary;
