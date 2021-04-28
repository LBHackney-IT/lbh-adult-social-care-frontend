import Layout from "../../Layout/Layout";
import React from "react";
import { HackneyLogo } from "../../components/Icons";
import TitleHeader from "../../components/TitleHeader";
import { Button } from "../../components/Button";
import TextArea from "../../components/TextArea";
import WeekCarePicker from "./components/WeekCarePicker";
import { getServiceTypeCareTimes } from "./HomeCareServiceHelper";
import { PERSONAL_CARE_MODE } from "./HomeCarePickerHelper";

const HomeCareApproval = ({ history }) => {
  const { times, secondaryTimes } = getServiceTypeCareTimes(PERSONAL_CARE_MODE);
  return (
    <Layout headerTitle="HOME CARE APPROVAL">
      <div className="hackney-text-black font-size-12px">
        <div className="columns">
          <div className="column">
            <p className="font-weight-bold">
              <span className="font-size-24px mr-4">Homecare Care</span>
              <span className="font-size-19px">03/07/2021 - 03/09/2021</span>
            </p>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">
                      CLIENT
                    </p>
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
                    <p className="font-weight-bold hackney-text-green">
                      HACKNEY ID
                    </p>
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
                    <p className="font-weight-bold hackney-text-green">
                      AGE 91
                    </p>
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
                    <p className="font-weight-bold hackney-text-green">
                      POSTCODE
                    </p>
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
                    <p className="font-weight-bold hackney-text-green">
                      WHO IS SOURCING CARE
                    </p>
                    <p className="font-size-14px">
                      <HackneyLogo />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">
                      HOURS PER WEEK
                    </p>
                    <p className="font-size-14px">18</p>
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
                    <p className="font-weight-bold hackney-text-green">
                      COST OF CARE
                    </p>
                    <p className="font-size-14px">£1,982</p>
                    <p className="font-weight-bold hackney-text-green">
                      ESTIMATE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column" />
          <div className="column" />
          <div className="column" />
        </div>

        <div className="columns is-multiline">
          <div className="column is-full">
            <p className="font-weight-bold hackney-text-green">
              PACKAGE BREAKDOWN
            </p>
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

        <div className="columns is-multiline">
          <div className="column">
            <p className="font-weight-bold hackney-text-green">
              APPROVAL HISTORY
            </p>
            <div className="font-size-14px">
              <div className="columns">
                <p className="column is-2 font-weight-bold">03/12/2021</p>
                <p className="column is-8">
                  Package requested by Martin Workman · Social Worker
                </p>
              </div>
              <div className="columns">
                <p className="column is-2 font-weight-bold">05/12/2021</p>
                <p className="column is-8">
                  <span>
                    Futher information requested by Amecie Steadman · Approver
                  </span>
                  <br />
                  <span className="font-italic">
                    "There appears to be more support than needed in the morning
                    for Mr Stephens, please amend or call me to discuss" More
                  </span>
                </p>
              </div>
              <div className="columns">
                <p className="column is-2 font-weight-bold">06/12/2021</p>
                <p className="column is-8">
                  Package re-submitted by Martin Workman · Social Worker
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <TitleHeader>Package Details</TitleHeader>

            <div className="day-summary">
              <div className="day-summary-title">
                <label>Monday</label>
                <div className="day-summary-line" />
              </div>

              <div className="columns is-multiline">
                <div className="column is-full">
                  <h3 className="has-text-weight-bold mb-2 font-size-16px">
                    8am - 10am
                  </h3>
                  <div className="border-bottom border-dotted" />
                </div>
                <div className="column is-full">
                  <div className="columns">
                    <div className="column">
                      <h3 className="hackney-text-green font-weight-bold font-size-24px">
                        Personal Care
                      </h3>
                    </div>
                    <div className="column">
                      <div className="level">
                        <div className="level-left" />
                        <div className="level-right">
                          <div className="level-item has-text-centered-tablet">
                            <div>
                              <p className="hackney-text-secondary">
                                Primary Carer
                              </p>
                              <p className="font-weight-bold font-size-14px">
                                2h
                              </p>
                            </div>
                          </div>
                          <div className="level-item has-text-centered-tablet">
                            <div>
                              <p className="hackney-text-secondary">
                                Secondary Carer
                              </p>
                              <p className="font-weight-bold font-size-14px">
                                30m
                              </p>
                            </div>
                          </div>
                          <div className="level-item has-text-centered-tablet">
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
                      <h3 className="font-weight-bold font-size-16px">
                        Need Addressing
                      </h3>
                      <p className="font-size-14px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam ut nulla tristique nulla dapibus rhoncus a eu
                        tortor. Aliquam suscipit laoreet pharetra. Aenean
                        vestibulum ullamcorper enim, sed rhoncus sem tempor
                        vitae. Sed dignissim ornare metus eu faucibus. Sed vel
                        diam mi. Aenean a auctor felis, sit amet lacinia urna.
                        Pellentesque bibendum dui a nulla faucibus, vel
                        dignissim mi rutrum. More...
                      </p>
                      <div>
                        <Button linkBtn={true} className="mr-2">
                          Edit
                        </Button>

                        <Button linkBtn={true}>Remove</Button>
                      </div>
                    </div>
                    <div className="column">
                      <h3 className="font-weight-bold font-size-16px">
                        What should be done
                      </h3>
                      <p className="font-size-14px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam ut nulla tristique nulla dapibus rhoncus a eu
                        tortor. Aliquam suscipit laoreet pharetra. Aenean
                        vestibulum ullamcorper enim, sed rhoncus sem tempor
                        vitae. Sed dignissim ornare metus eu faucibus. Sed vel
                        diam mi. Aenean a auctor felis, sit amet lacinia urna.
                        Pellentesque bibendum dui a nulla faucibus, vel
                        dignissim mi rutrum. More...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns is-multiline">
                <div className="column is-full">
                  <h3 className="has-text-weight-bold mb-2 font-size-16px">
                    12pm-2pm
                  </h3>
                  <div className="border-bottom border-dotted" />
                </div>
                <div className="column is-full">
                  <div className="columns">
                    <div className="column">
                      <h3 className="hackney-text-green font-weight-bold font-size-24px">
                        Personal Care
                      </h3>
                    </div>
                    <div className="column">
                      <div className="level">
                        <div className="level-left" />
                        <div className="level-right">
                          <div className="level-item has-text-centered-tablet">
                            <div>
                              <p className="hackney-text-secondary">
                                Primary Carer
                              </p>
                              <p className="font-weight-bold font-size-14px">
                                2h
                              </p>
                            </div>
                          </div>
                          <div className="level-item has-text-centered-tablet">
                            <div>
                              <p className="hackney-text-secondary">
                                Secondary Carer
                              </p>
                              <p className="font-weight-bold font-size-14px">
                                30m
                              </p>
                            </div>
                          </div>
                          <div className="level-item has-text-centered-tablet">
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
                      <h3 className="font-weight-bold font-size-16px">
                        Need Addressing
                      </h3>
                      <p className="font-size-14px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam ut nulla tristique nulla dapibus rhoncus a eu
                        tortor. Aliquam suscipit laoreet pharetra. Aenean
                        vestibulum ullamcorper enim, sed rhoncus sem tempor
                        vitae. Sed dignissim ornare metus eu faucibus. Sed vel
                        diam mi. Aenean a auctor felis, sit amet lacinia urna.
                        Pellentesque bibendum dui a nulla faucibus, vel
                        dignissim mi rutrum. More...
                      </p>
                      <div>
                        <Button linkBtn={true} className="mr-2">
                          Edit
                        </Button>

                        <Button linkBtn={true}>Remove</Button>
                      </div>
                    </div>
                    <div className="column">
                      <h3 className="font-weight-bold font-size-16px">
                        What should be done
                      </h3>
                      <p className="font-size-14px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam ut nulla tristique nulla dapibus rhoncus a eu
                        tortor. Aliquam suscipit laoreet pharetra. Aenean
                        vestibulum ullamcorper enim, sed rhoncus sem tempor
                        vitae. Sed dignissim ornare metus eu faucibus. Sed vel
                        diam mi. Aenean a auctor felis, sit amet lacinia urna.
                        Pellentesque bibendum dui a nulla faucibus, vel
                        dignissim mi rutrum. More...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns is-multiline">
                <div className="column is-full">
                  <h3 className="has-text-weight-bold mb-2 font-size-16px">
                    Night
                  </h3>
                  <div className="border-bottom border-dotted" />
                </div>
                <div className="column is-full">
                  <div className="columns">
                    <div className="column">
                      <h3 className="hackney-text-green font-weight-bold font-size-24px">
                        Night Owl
                      </h3>
                    </div>
                    <div className="column">
                      <div className="level">
                        <div className="level-left" />
                        <div className="level-right">
                          <div className="level-item has-text-centered-tablet">
                            <div>
                              <p className="hackney-text-secondary">
                                Primary Carer
                              </p>
                              <p className="font-weight-bold font-size-14px">
                                2h
                              </p>
                            </div>
                          </div>
                          <div className="level-item has-text-centered-tablet">
                            <div>
                              <p className="hackney-text-secondary">
                                Secondary Carer
                              </p>
                              <p className="font-weight-bold font-size-14px">
                                30m
                              </p>
                            </div>
                          </div>
                          <div className="level-item has-text-centered-tablet">
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
                      <h3 className="font-weight-bold font-size-16px">
                        Need Addressing
                      </h3>
                      <p className="font-size-14px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam ut nulla tristique nulla dapibus rhoncus a eu
                        tortor. Aliquam suscipit laoreet pharetra. Aenean
                        vestibulum ullamcorper enim, sed rhoncus sem tempor
                        vitae. Sed dignissim ornare metus eu faucibus. Sed vel
                        diam mi. Aenean a auctor felis, sit amet lacinia urna.
                        Pellentesque bibendum dui a nulla faucibus, vel
                        dignissim mi rutrum. More...
                      </p>
                      <div>
                        <Button linkBtn={true} className="mr-2">
                          Edit
                        </Button>

                        <Button linkBtn={true}>Remove</Button>
                      </div>
                    </div>
                    <div className="column">
                      <h3 className="font-weight-bold font-size-16px">
                        What should be done
                      </h3>
                      <p className="font-size-14px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam ut nulla tristique nulla dapibus rhoncus a eu
                        tortor. Aliquam suscipit laoreet pharetra. Aenean
                        vestibulum ullamcorper enim, sed rhoncus sem tempor
                        vitae. Sed dignissim ornare metus eu faucibus. Sed vel
                        diam mi. Aenean a auctor felis, sit amet lacinia urna.
                        Pellentesque bibendum dui a nulla faucibus, vel
                        dignissim mi rutrum. More...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="day-summary">
              <div className="day-summary-title">
                <label>Tuesday</label>
                <div className="day-summary-line" />
              </div>

              <div className="columns is-multiline">
                <div className="column is-full">
                  <h3 className="has-text-weight-bold mb-2 font-size-16px">
                    8am - 10am
                  </h3>
                  <div className="border-bottom border-dotted" />
                </div>
                <div className="column is-full">
                  <div className="columns">
                    <div className="column">
                      <h3 className="hackney-text-green font-weight-bold font-size-24px">
                        Personal Care
                      </h3>
                    </div>
                    <div className="column">
                      <div className="level">
                        <div className="level-left" />
                        <div className="level-right">
                          <div className="level-item has-text-centered-tablet">
                            <div>
                              <p className="hackney-text-secondary">
                                Primary Carer
                              </p>
                              <p className="font-weight-bold font-size-14px">
                                2h
                              </p>
                            </div>
                          </div>
                          <div className="level-item has-text-centered-tablet">
                            <div>
                              <p className="hackney-text-secondary">
                                Secondary Carer
                              </p>
                              <p className="font-weight-bold font-size-14px">
                                30m
                              </p>
                            </div>
                          </div>
                          <div className="level-item has-text-centered-tablet">
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
                      <h3 className="font-weight-bold font-size-16px">
                        Need Addressing
                      </h3>
                      <p className="font-size-14px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam ut nulla tristique nulla dapibus rhoncus a eu
                        tortor. Aliquam suscipit laoreet pharetra. Aenean
                        vestibulum ullamcorper enim, sed rhoncus sem tempor
                        vitae. Sed dignissim ornare metus eu faucibus. Sed vel
                        diam mi. Aenean a auctor felis, sit amet lacinia urna.
                        Pellentesque bibendum dui a nulla faucibus, vel
                        dignissim mi rutrum. More...
                      </p>
                      <div>
                        <Button linkBtn={true} className="mr-2">
                          Edit
                        </Button>

                        <Button linkBtn={true}>Remove</Button>
                      </div>
                    </div>
                    <div className="column">
                      <h3 className="font-weight-bold font-size-16px">
                        What should be done
                      </h3>
                      <p className="font-size-14px">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam ut nulla tristique nulla dapibus rhoncus a eu
                        tortor. Aliquam suscipit laoreet pharetra. Aenean
                        vestibulum ullamcorper enim, sed rhoncus sem tempor
                        vitae. Sed dignissim ornare metus eu faucibus. Sed vel
                        diam mi. Aenean a auctor felis, sit amet lacinia urna.
                        Pellentesque bibendum dui a nulla faucibus, vel
                        dignissim mi rutrum. More...
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

        <div className="columns">
          <div className="column">
            <div className="level">
              <div className="level-left" />
              <div className="level-right">
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-light">Deny</button>
                </div>
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-light">
                    Request more information
                  </button>
                </div>
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-green">
                    Approve to be brokered
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <WeekCarePicker
                primaryCareTimes={times}
                secondaryCareTimes={secondaryTimes}
              />
            </div>

            <div className="mt-1">
              <p className="font-size-16px font-weight-bold">
                Request more information
              </p>
              <TextArea label="" rows={5} placeholder="Add details..." />
              <button className="button hackney-btn-green">
                Request more information
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeCareApproval;
