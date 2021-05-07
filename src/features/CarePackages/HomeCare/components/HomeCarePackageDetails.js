import TitleHeader from "../../../components/TitleHeader";
import { Button } from "../../../components/Button";
import React from "react";

const HomeCarePackageDetails = () => {
  return (
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
                          <p className="font-weight-bold font-size-14px">2h</p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered-tablet">
                        <div>
                          <p className="hackney-text-secondary">
                            Secondary Carer
                          </p>
                          <p className="font-weight-bold font-size-14px">30m</p>
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
                    Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor.
                    Aliquam suscipit laoreet pharetra. Aenean vestibulum
                    ullamcorper enim, sed rhoncus sem tempor vitae. Sed
                    dignissim ornare metus eu faucibus. Sed vel diam mi. Aenean
                    a auctor felis, sit amet lacinia urna. Pellentesque bibendum
                    dui a nulla faucibus, vel dignissim mi rutrum. More...
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
                    Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor.
                    Aliquam suscipit laoreet pharetra. Aenean vestibulum
                    ullamcorper enim, sed rhoncus sem tempor vitae. Sed
                    dignissim ornare metus eu faucibus. Sed vel diam mi. Aenean
                    a auctor felis, sit amet lacinia urna. Pellentesque bibendum
                    dui a nulla faucibus, vel dignissim mi rutrum. More...
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
                          <p className="font-weight-bold font-size-14px">2h</p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered-tablet">
                        <div>
                          <p className="hackney-text-secondary">
                            Secondary Carer
                          </p>
                          <p className="font-weight-bold font-size-14px">30m</p>
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
                    Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor.
                    Aliquam suscipit laoreet pharetra. Aenean vestibulum
                    ullamcorper enim, sed rhoncus sem tempor vitae. Sed
                    dignissim ornare metus eu faucibus. Sed vel diam mi. Aenean
                    a auctor felis, sit amet lacinia urna. Pellentesque bibendum
                    dui a nulla faucibus, vel dignissim mi rutrum. More...
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
                    Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor.
                    Aliquam suscipit laoreet pharetra. Aenean vestibulum
                    ullamcorper enim, sed rhoncus sem tempor vitae. Sed
                    dignissim ornare metus eu faucibus. Sed vel diam mi. Aenean
                    a auctor felis, sit amet lacinia urna. Pellentesque bibendum
                    dui a nulla faucibus, vel dignissim mi rutrum. More...
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
                          <p className="font-weight-bold font-size-14px">2h</p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered-tablet">
                        <div>
                          <p className="hackney-text-secondary">
                            Secondary Carer
                          </p>
                          <p className="font-weight-bold font-size-14px">30m</p>
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
                    Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor.
                    Aliquam suscipit laoreet pharetra. Aenean vestibulum
                    ullamcorper enim, sed rhoncus sem tempor vitae. Sed
                    dignissim ornare metus eu faucibus. Sed vel diam mi. Aenean
                    a auctor felis, sit amet lacinia urna. Pellentesque bibendum
                    dui a nulla faucibus, vel dignissim mi rutrum. More...
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
                    Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor.
                    Aliquam suscipit laoreet pharetra. Aenean vestibulum
                    ullamcorper enim, sed rhoncus sem tempor vitae. Sed
                    dignissim ornare metus eu faucibus. Sed vel diam mi. Aenean
                    a auctor felis, sit amet lacinia urna. Pellentesque bibendum
                    dui a nulla faucibus, vel dignissim mi rutrum. More...
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
                          <p className="font-weight-bold font-size-14px">2h</p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered-tablet">
                        <div>
                          <p className="hackney-text-secondary">
                            Secondary Carer
                          </p>
                          <p className="font-weight-bold font-size-14px">30m</p>
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
                    Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor.
                    Aliquam suscipit laoreet pharetra. Aenean vestibulum
                    ullamcorper enim, sed rhoncus sem tempor vitae. Sed
                    dignissim ornare metus eu faucibus. Sed vel diam mi. Aenean
                    a auctor felis, sit amet lacinia urna. Pellentesque bibendum
                    dui a nulla faucibus, vel dignissim mi rutrum. More...
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
                    Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor.
                    Aliquam suscipit laoreet pharetra. Aenean vestibulum
                    ullamcorper enim, sed rhoncus sem tempor vitae. Sed
                    dignissim ornare metus eu faucibus. Sed vel diam mi. Aenean
                    a auctor felis, sit amet lacinia urna. Pellentesque bibendum
                    dui a nulla faucibus, vel dignissim mi rutrum. More...
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
};

export default HomeCarePackageDetails;
