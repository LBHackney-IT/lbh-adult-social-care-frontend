import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'
import Layout from '../../../../components/Layout/Layout';
import DayCareApprovalTitle from '../../../../components/DayCare/DayCareApprovalTitle';
import ApprovalClientSummary from '../../../../components/ApprovalClientSummary';
import PackageCostBox from '../../../../components/DayCare/PackageCostBox';
import DayCarePackageBreakdown from '../../../../components/DayCare/DayCarePackageBreakdown';
import DayCarePackageElementCostings from '../../../../components/DayCare/DayCarePackageElementCostings';
import PackageApprovalHistorySummary from '../../../../components/PackageApprovalHistorySummary';
import TitleHeader from '../../../../components/TitleHeader';
import DayCareSummary from '../../../../components/DayCare/DayCareSummary';
import TextArea from '../../../../components/TextArea';
import {
  approveDayCarePackageContents,
  dayCarePackageContentsRequestClarification,
  dayCarePackageRejectContents,
} from '../../../../api/CarePackages/DayCareApi';
import { getSelectedDate } from '../../../../api/Utils/CommonOptions';
import { getEnGBFormattedDate } from '../../../../api/Utils/FuncUtils';
import withSession from '../../../../lib/session';
import { getErrorResponse, getUserSession } from '../../../../service/helpers';
import fieldValidator from '../../../../service/inputValidator';
import useDayCareApi from '../../../../api/SWR/useDayCareApi'
import { formatApprovalHistory, formatDayCareOpportunities } from '../../../../service/formatItems';
import { addNotification } from '../../../../reducers/notificationsReducer';

// start before render
export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return { props: {} };
});

const DayCareApprovePackage = () => {
  // Parameters
  const router = useRouter();
  const dayCarePackageId = router.query.id;
  const dispatch = useDispatch();
  const [daysSelected, setDaysSelected] = useState([]);
  const [approvalHistoryEntries, setApprovalHistoryEntries] = useState([]);
  const [opportunityEntries, setOpportunityEntries] = useState([]);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(undefined);

  const { data: dayCarePackage } = useDayCareApi.approvalDetails(dayCarePackageId);

  useEffect(() => {
    if(dayCarePackage) {
      const newApprovalHistoryItems = formatApprovalHistory(dayCarePackage?.packageApprovalHistory);
      setApprovalHistoryEntries(newApprovalHistoryItems);

      const newOpportunityEntries = formatDayCareOpportunities(dayCarePackage?.packageDetails?.dayCareOpportunities);
      setOpportunityEntries(newOpportunityEntries);
      setDaysSelected(getSelectedDate(dayCarePackage));
    }

  }, [dayCarePackage]);

  const [errorFields, setErrorFields] = useState({
    requestInformationText: '',
  });

  const changeErrorFields = (field) => {
    setErrorFields({
      ...errorFields,
      [field]: '',
    });
  };

  const updateErrorFields = (errors) => {
    setErrorFields({
      ...errorFields,
      ...getErrorResponse(errors),
    });
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  }

  const handleRejectPackage = () => {
    dayCarePackageRejectContents(dayCarePackageId)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => pushNotification(error));
  };
  const handleRequestMoreInformation = () => {
    const { validFields, hasErrors } = fieldValidator([
      { name: 'requestInformationText', value: requestInformationText, rules: ['empty'] },
    ]);
    if (hasErrors) {
      setErrorFields(validFields);
      return;
    }
    dayCarePackageContentsRequestClarification(dayCarePackageId, requestInformationText)
      .then(() => {
        setDisplayMoreInfoForm(false);
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        updateErrorFields(error);
      });
  };
  const handleApprovePackageContents = () => {
    approveDayCarePackageContents(dayCarePackageId)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        updateErrorFields(error);
      });
  };
  return (
    <Layout headerTitle="DAY CARE APPROVAL">
      <div className="hackney-text-black font-size-12px">
        <DayCareApprovalTitle
          termTimeConsiderationOption={dayCarePackage?.packageDetails.termTimeConsiderationOptionName}
          isFixedPeriodOrOngoing={dayCarePackage?.packageDetails.isFixedPeriodOrOngoing}
        />
        <ApprovalClientSummary />

        <div className="columns">
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">STARTS</p>
                    <p className="font-size-14px">{getEnGBFormattedDate(dayCarePackage?.packageDetails.startDate)}</p>
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
                    <p className="font-weight-bold hackney-text-green">ENDS</p>
                    <p className="font-size-14px">
                      {dayCarePackage?.packageDetails.endDate !== null
                        ? getEnGBFormattedDate(dayCarePackage?.packageDetails.endDate)
                        : 'Ongoing'}
                    </p>
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
                    <p className="font-weight-bold hackney-text-green">DAYS/WEEK</p>
                    <p className="font-size-14px">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column" />
          <div className="column" />
        </div>

        <div className="columns">
          <div className="column">
            <div className="is-flex is-flex-wrap-wrap">
              <PackageCostBox
                title="COST OF CARE / WK"
                cost={dayCarePackage?.costSummary.costOfCarePerWeek}
                costType="ESTIMATE"
              />

              <PackageCostBox title="ANP / WK" cost={dayCarePackage?.costSummary.anpPerWeek} costType="ESTIMATE" />

              <PackageCostBox
                title="TRANSPORT / WK"
                cost={dayCarePackage?.costSummary.transportCostPerWeek}
                costType="ESTIMATE"
              />

              <PackageCostBox
                title="TOTAL / WK"
                cost={dayCarePackage?.costSummary.totalCostPerWeek}
                costType="ESTIMATE"
              />
            </div>
          </div>
        </div>

        <DayCarePackageBreakdown dayCareTime="12h" transportTime="4h/week" dayOpportunitiesTotalTime="3h" />
        <DayCarePackageElementCostings />

        <PackageApprovalHistorySummary approvalHistoryEntries={approvalHistoryEntries} />

        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-4">
              <TitleHeader>Package Details</TitleHeader>
              <DayCareSummary
                opportunityEntries={opportunityEntries}
                needToAddress={dayCarePackage?.packageDetails.needToAddress}
                transportNeeded={dayCarePackage?.packageDetails.transportNeeded}
                daysSelected={daysSelected}
                deleteOpportunity={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="level mt-3">
              <div className="level-left" />
              <div className="level-right">
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-light" onClick={handleRejectPackage}>
                    Deny
                  </button>
                </div>
                <div className="level-item  mr-2">
                  <button
                    onClick={() => setDisplayMoreInfoForm(!displayMoreInfoForm)}
                    className="button hackney-btn-light"
                    type="button"
                  >
                    {displayMoreInfoForm ? 'Hide Request more information' : 'Request More Information'}
                  </button>
                </div>
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-green" onClick={handleApprovePackageContents}>
                    Approve to be brokered
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {displayMoreInfoForm && (
          <div className="columns">
            <div className="column">
              <div className="mt-1">
                <p className="font-size-16px font-weight-bold">Request more information</p>
                <TextArea
                  label=""
                  rows={5}
                  placeholder="Add details..."
                  onChange={setRequestInformationText}
                  error={errorFields.requestInformationText}
                  setError={() => changeErrorFields('requestInformationText')}
                />
                <button className="button hackney-btn-green" onClick={handleRequestMoreInformation}>
                  Request more information
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DayCareApprovePackage;
