import SupplierDashboard from "../features/SupplierDashboard/SupplierDashboard";
import SupplierReturnsDashboard from "../features/SupplierDashboard/SupplierReturnsDashboard";
import SupplierReturns from "../features/SupplierReturns/SupplierReturns";
import WeekOfSupplierView from "../features/SupplierReturns/WeekOfSupplierView";
import SupplierReturn from "../features/SupplierReturns/SupplierReturn";
import Bill from "../features/Bills/Bill";
import AddBill from "../features/Bills/AddBill";
import Bills from "../features/Bills/Bills";
import PayRuns from "../features/PayRuns/PayRuns";
import PayRun from "../features/PayRuns/PayRun";
import CarePackage from "../features/CarePackages/CarePackage";
import ProposedPackages from "../features/ProposedPackages/ProposedPackages";
import HomeCareApproveBrokered from "../features/CarePackages/HomeCare/HomeCareApproveBrokered";
import HomeCareApprovePackage from "../features/CarePackages/HomeCare/HomeCareApprovePackage";
import HomeCare from "../features/CarePackages/HomeCare/HomeCare";
import DayCare from "../features/CarePackages/DayCare/DayCare";
import DayCareApprovePackage from "../features/CarePackages/DayCare/DayCareApprovePackage";
import DayCareApproveBrokered from "../features/CarePackages/DayCare/DayCareApproveBrokered";
import ResidentialCare from "../features/CarePackages/ResidentialCare/ResidentialCare";
import ResidentialCareApprovePackage from "../features/CarePackages/ResidentialCare/ResidentialCareApprovePackage";
import ResidentialCareApproveBrokered from "../features/CarePackages/ResidentialCare/ResidentialCareApproveBrokered";
import NursingCare from "../features/CarePackages/NursingCare/NursingCare";
import NursingCareApprovePackage from "../features/CarePackages/NursingCare/NursingCareApprovePackage";
import NursingCareApproveBrokered from "../features/CarePackages/NursingCare/NursingCareApproveBrokered";
import ClientHistory from "../features/ClientHistory/ClientHistory";
import {
  CARE_PACKAGE, CLIENT_HISTORY,
  DAY_CARE,
  DAY_CARE_APPROVE_BROKERED,
  DAY_CARE_APPROVE_PACKAGE,
  HOME_CARE,
  HOME_CARE_APPROVE_BROKERED,
  HOME_CARE_APPROVE_PACKAGE, NURSING_CARE, NURSING_CARE_APPROVE_BROKERED, NURSING_CARE_APPROVE_PACKAGE,
  PAYMENTS_ADD_BILL_ROUTE,
  PAYMENTS_BILL_ROUTE,
  PAYMENTS_BILLS_ROUTE,
  PAYMENTS_PAY_RUN_ROUTE,
  PAYMENTS_PAY_RUNS_ROUTE,
  PAYMENTS_RECLAIM_ROUTE,
  PAYMENTS_RECLAIMS_ROUTE,
  PAYMENTS_WEEK_OF_SUPPLIER_ROUTE,
  PROPOSED_PACKAGES, RESIDENTIAL_CARE, RESIDENTIAL_CARE_APPROVE_BROKERED, RESIDENTIAL_CARE_APPROVE_PACKAGE,
  SUPPLIER_DASHBOARD_ROUTE,
  SUPPLIER_RETURNS_DASHBOARD_ROUTE
} from "./RouteConstants";

const exactRoutes = [
  {path: SUPPLIER_DASHBOARD_ROUTE, component: SupplierDashboard},
  {path: SUPPLIER_RETURNS_DASHBOARD_ROUTE, component: SupplierReturnsDashboard},

  {path: PAYMENTS_RECLAIMS_ROUTE, component: SupplierReturns},
  {path: PAYMENTS_WEEK_OF_SUPPLIER_ROUTE, component: WeekOfSupplierView},
  {path: PAYMENTS_RECLAIM_ROUTE, component: SupplierReturn},
  {path: PAYMENTS_BILL_ROUTE, component: Bill},
  {path: PAYMENTS_ADD_BILL_ROUTE, component: AddBill},
  {path: PAYMENTS_BILLS_ROUTE, component: Bills},
  {path: PAYMENTS_PAY_RUNS_ROUTE, component: PayRuns},
  {path: PAYMENTS_PAY_RUN_ROUTE, component: PayRun},

  {path: CARE_PACKAGE, component: CarePackage},
  {path: PROPOSED_PACKAGES, component: ProposedPackages},

  {path: HOME_CARE_APPROVE_BROKERED, component: HomeCareApproveBrokered},
  {path: HOME_CARE_APPROVE_PACKAGE, component: HomeCareApprovePackage},
  {path: HOME_CARE_APPROVE_BROKERED, component: HomeCareApproveBrokered},
  {path: `${HOME_CARE}/:isImmediate/:isS117/:isFixedPeriod/:startDate/:endDate`, component: HomeCare},

  {path: `${DAY_CARE}/:isImmediate/:isS117/:isFixedPeriod/:startDate`, component: DayCare},
  {path: DAY_CARE_APPROVE_PACKAGE, component: DayCareApprovePackage},
  {path: DAY_CARE_APPROVE_BROKERED, component: DayCareApproveBrokered},

  {path: `${RESIDENTIAL_CARE}/:hasRespiteCare/:hasDischargePackage/` +
      `:isImmediateOrReEnablement/:typeOfStayId/:isS117/:startDate/:endDate`, component: ResidentialCare},
  {path: RESIDENTIAL_CARE_APPROVE_PACKAGE, component: ResidentialCareApprovePackage},
  {path: RESIDENTIAL_CARE_APPROVE_BROKERED, component: ResidentialCareApproveBrokered},

  {path: `${NURSING_CARE}/:isFixedPeriod/:startDate/:typeOfStayId/` +
      `:hasRespiteCare/:hasDischargePackage/:isThisAnImmediateService/:isThisUserUnderS117/:endDate`, component: NursingCare},
  {path: NURSING_CARE_APPROVE_PACKAGE, component: NursingCareApprovePackage},
  {path: NURSING_CARE_APPROVE_BROKERED, component: NursingCareApproveBrokered},

  {path: CLIENT_HISTORY, component: ClientHistory},
];

export {exactRoutes};
