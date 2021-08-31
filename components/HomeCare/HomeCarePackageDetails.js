import React from 'react';
import TitleHeader from '../TitleHeader';
import { Button } from '../Button';

const HomeCarePackageDetails = () => (
  <div className="columns">
    <div className="column">
      <TitleHeader>Package Details</TitleHeader>

      <div className="day-summary">
        <div className="day-summary-title">
          <span>Monday</span>
          <div className="day-summary-line" />
        </div>

        <div className="columns is-multiline">
          <div className="column is-full">
            <h3 className="has-text-weight-bold mb-2 font-size-16px">8am - 10am</h3>
            <div className="border-bottom border-dotted" />
          </div>
          <div className="column is-full">
            <div className="columns">
              <div className="column">
                <h3 className="hackney-text-green font-weight-bold font-size-24px">Personal Care</h3>
              </div>
              <div className="column">
                <div className="level">
                  <div className="level-left" />
                  <div className="is-flex is-flex-wrap-wrap">
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div>
                        <p className="hackney-text-secondary">Primary Carer</p>
                        <p className="font-weight-bold font-size-14px">2h</p>
                      </div>
                    </div>
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div>
                        <p className="hackney-text-secondary">Secondary Carer</p>
                        <p className="font-weight-bold font-size-14px">30m</p>
                      </div>
                    </div>
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div className="hackney-text-green font-weight-bold">
                        <p>Total hrs</p>
                        <p className="font-size-14px">2.5</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-full">
            <div className="columns">
              <div className="column">
                <h3 className="font-weight-bold font-size-16px">Need Addressing</h3>
                <p className="font-size-14px">
                  There are several things to consider, we will need to address x, y and z. There are various things
                  which will need action on as soon as possible. There are several things to consider, we will need to
                  address x, y and z. There are various things which will need action on as soon as possible.
                </p>
                <div>
                  <Button linkBtn className="mr-2">
                    Edit
                  </Button>

                  <Button linkBtn>Remove</Button>
                </div>
              </div>
              <div className="column">
                <h3 className="font-weight-bold font-size-16px">What should be done</h3>
                <p className="font-size-14px">
                  The following tasks should be completed: do five lots of x, then do twenty lots of z, then do thirty
                  lots of y. The following tasks should be completed: do five lots of x, then do twenty lots of z, then
                  do thirty lots of y. The following tasks should be completed: do five lots of x, then do twenty lots
                  of z, then do thirty lots of y.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="columns is-multiline">
          <div className="column is-full">
            <h3 className="has-text-weight-bold mb-2 font-size-16px">12pm-2pm</h3>
            <div className="border-bottom border-dotted" />
          </div>
          <div className="column is-full">
            <div className="columns">
              <div className="column">
                <h3 className="hackney-text-green font-weight-bold font-size-24px">Personal Care</h3>
              </div>
              <div className="column">
                <div className="level">
                  <div className="level-left" />
                  <div className="is-flex is-flex-wrap-wrap">
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div>
                        <p className="hackney-text-secondary">Primary Carer</p>
                        <p className="font-weight-bold font-size-14px">2h</p>
                      </div>
                    </div>
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div>
                        <p className="hackney-text-secondary">Secondary Carer</p>
                        <p className="font-weight-bold font-size-14px">30m</p>
                      </div>
                    </div>
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div className="hackney-text-green font-weight-bold">
                        <p>Total hrs</p>
                        <p className="font-size-14px">2.5</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-full">
            <div className="columns">
              <div className="column">
                <h3 className="font-weight-bold font-size-16px">Need Addressing</h3>
                <p className="font-size-14px">
                  There are several things to consider, we will need to address x, y and z. There are various things
                  which will need action on as soon as possible. There are several things to consider, we will need to
                  address x, y and z. There are various things which will need action on as soon as possible.
                </p>
                <div>
                  <Button linkBtn className="mr-2">
                    Edit
                  </Button>

                  <Button linkBtn>Remove</Button>
                </div>
              </div>
              <div className="column">
                <h3 className="font-weight-bold font-size-16px">What should be done</h3>
                <p className="font-size-14px">
                  The following tasks should be completed: do five lots of x, then do twenty lots of z, then do thirty
                  lots of y. The following tasks should be completed: do five lots of x, then do twenty lots of z, then
                  do thirty lots of y. The following tasks should be completed: do five lots of x, then do twenty lots
                  of z, then do thirty lots of y.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="columns is-multiline">
          <div className="column is-full">
            <h3 className="has-text-weight-bold mb-2 font-size-16px">Night</h3>
            <div className="border-bottom border-dotted" />
          </div>
          <div className="column is-full">
            <div className="columns">
              <div className="column">
                <h3 className="hackney-text-green font-weight-bold font-size-24px">Night Owl</h3>
              </div>
              <div className="column">
                <div className="level">
                  <div className="level-left" />
                  <div className="is-flex is-flex-wrap-wrap">
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div>
                        <p className="hackney-text-secondary">Primary Carer</p>
                        <p className="font-weight-bold font-size-14px">2h</p>
                      </div>
                    </div>
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div>
                        <p className="hackney-text-secondary">Secondary Carer</p>
                        <p className="font-weight-bold font-size-14px">30m</p>
                      </div>
                    </div>
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div className="hackney-text-green font-weight-bold">
                        <p>Total hrs</p>
                        <p className="font-size-14px">2.5</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-full">
            <div className="columns">
              <div className="column">
                <h3 className="font-weight-bold font-size-16px">Need Addressing</h3>
                <p className="font-size-14px">
                  There are several things to consider, we will need to address x, y and z. There are various things
                  which will need action on as soon as possible. There are several things to consider, we will need to
                  address x, y and z. There are various things which will need action on as soon as possible.
                </p>
                <div>
                  <Button linkBtn className="mr-2">
                    Edit
                  </Button>

                  <Button linkBtn>Remove</Button>
                </div>
              </div>
              <div className="column">
                <h3 className="font-weight-bold font-size-16px">What should be done</h3>
                <p className="font-size-14px">
                  The following tasks should be completed: do five lots of x, then do twenty lots of z, then do thirty
                  lots of y. The following tasks should be completed: do five lots of x, then do twenty lots of z, then
                  do thirty lots of y. The following tasks should be completed: do five lots of x, then do twenty lots
                  of z, then do thirty lots of y.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="day-summary">
        <div className="day-summary-title">
          <span>Tuesday</span>
          <div className="day-summary-line" />
        </div>

        <div className="columns is-multiline">
          <div className="column is-full">
            <h3 className="has-text-weight-bold mb-2 font-size-16px">8am - 10am</h3>
            <div className="border-bottom border-dotted" />
          </div>
          <div className="column is-full">
            <div className="columns">
              <div className="column">
                <h3 className="hackney-text-green font-weight-bold font-size-24px">Personal Care</h3>
              </div>
              <div className="column">
                <div className="level">
                  <div className="level-left" />
                  <div className="is-flex is-flex-wrap-wrap">
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div>
                        <p className="hackney-text-secondary">Primary Carer</p>
                        <p className="font-weight-bold font-size-14px">2h</p>
                      </div>
                    </div>
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div>
                        <p className="hackney-text-secondary">Secondary Carer</p>
                        <p className="font-weight-bold font-size-14px">30m</p>
                      </div>
                    </div>
                    <div className="is-flex is-flex-wrap-wrap mr-5 has-text-centered-tablet">
                      <div className="hackney-text-green font-weight-bold">
                        <p>Total hrs</p>
                        <p className="font-size-14px">2.5</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-full">
            <div className="columns">
              <div className="column">
                <h3 className="font-weight-bold font-size-16px">Need Addressing</h3>
                <p className="font-size-14px">
                  There are several things to consider, we will need to address x, y and z. There are various things
                  which will need action on as soon as possible. There are several things to consider, we will need to
                  address x, y and z. There are various things which will need action on as soon as possible.
                </p>
                <div>
                  <Button linkBtn className="mr-2">
                    Edit
                  </Button>

                  <Button linkBtn>Remove</Button>
                </div>
              </div>
              <div className="column">
                <h3 className="font-weight-bold font-size-16px">What should be done</h3>
                <p className="font-size-14px">
                  The following tasks should be completed: do five lots of x, then do twenty lots of z, then do thirty
                  lots of y. The following tasks should be completed: do five lots of x, then do twenty lots of z, then
                  do thirty lots of y. The following tasks should be completed: do five lots of x, then do twenty lots
                  of z, then do thirty lots of y.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="border-bottom" />
      </div>
    </div>
  </div>
);

export default HomeCarePackageDetails;
