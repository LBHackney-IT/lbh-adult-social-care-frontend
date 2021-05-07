// import { format } from "date-fns";

const LOGIN = "/login";
const CARE_PACKAGE = "/care-package";
const PROPOSED_PACKAGES = "/proposed-packages";
const HOME_CARE = `${CARE_PACKAGE}/home-care`;
const HOME_CARE_APPROVE_PACKAGE = `${HOME_CARE}/approve-package`;
const HOME_CARE_APPROVE_BROKERED = `${HOME_CARE}/approve-brokered`;
const NURSING_CARE = `${CARE_PACKAGE}/nursing-care`;
const RESIDENTIAL_CARE = `${CARE_PACKAGE}/residential-care`;
const DAY_CARE = `${CARE_PACKAGE}/day-care`;
const CLIENT_HISTORY = "/client-history";

export {
  LOGIN,
  HOME_CARE,
  HOME_CARE_APPROVE_PACKAGE,
  HOME_CARE_APPROVE_BROKERED,
  DAY_CARE,
  NURSING_CARE,
  RESIDENTIAL_CARE,
  CLIENT_HISTORY,
  CARE_PACKAGE,
  PROPOSED_PACKAGES,
};
