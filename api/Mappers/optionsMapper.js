import { getEnGBFormattedDate } from '../Utils/FuncUtils';
import React from 'react';

const optionsMapper = (fields, data = []) => {
  return data.map((item) => {
    const mapObject = {};
    for (const field in fields) {
      mapObject[field] = item[fields[field]];
    }
    return mapObject;
  });
};

const mapTypeOfCareIdOptions = (options) =>
  options.map((option) => ({
    text: `${option.optionName} (${option.optionPeriod})`,
    value: option.typeOfStayOptionId,
  }));

const mapCarePackageApprovalHistory = (approvalHistoryItems) =>
  approvalHistoryItems.map((historyItem) => ({
    eventDate: getEnGBFormattedDate(historyItem.dateCreated),
    eventMessage: `${historyItem.logText}. ${historyItem.creatorRole}`,
    eventSubMessage: historyItem.logSubText,
  })) || [];

const mapPackageSchedulingOptions = (schedulingOptions = []) =>
  schedulingOptions.map((option) => ({
    id: option.id,
    label: (
      <>
        <p>
          {option.optionName} <br />
          <span>({option.optionPeriod})</span>
        </p>
      </>
    ),
  })) || [];

const mapServiceUserBasicInfo = (userResponse) => ({
  id: userResponse?.id,
  dateOfBirth: getEnGBFormattedDate(userResponse?.dateOfBirth || new Date()),
  client: `${userResponse?.firstName} ${userResponse?.lastName}`,
  hackneyId: userResponse?.hackneyId,
  postcode: userResponse?.postCode,
});

export default optionsMapper;

export { mapCarePackageApprovalHistory, mapTypeOfCareIdOptions, mapPackageSchedulingOptions, mapServiceUserBasicInfo };
