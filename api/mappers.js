import React from 'react';
import { getEnGBFormattedDate } from './Utils/FuncUtils';

export const optionsMapper = (fields, data = []) =>
  data.map((item) => {
    const mapObject = {};
    for (const field in fields) {
      mapObject[field] = item[fields[field]];
    }
    return mapObject;
  });

export const mapTypeOfCareIdOptions = (options) =>
  options.map((option) => ({
    text: `${option.optionName} (${option.optionPeriod})`,
    value: option.typeOfStayOptionId,
  }));

export const mapCarePackageApprovalHistory = (approvalHistoryItems) =>
  approvalHistoryItems.map((historyItem) => ({
    eventDate: getEnGBFormattedDate(historyItem.dateCreated),
    eventMessage: `${historyItem.logText}. ${historyItem.creatorRole}`,
    eventSubMessage: historyItem.logSubText,
  })) || [];

export const mapPackageSchedulingOptions = (schedulingOptions = []) =>
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

export const mapServiceUserBasicInfo = (userResponse) => ({
  id: userResponse?.id,
  dateOfBirth: userResponse?.dateOfBirth || new Date(),
  client: `${userResponse?.firstName ?? ''} ${userResponse?.lastName ?? ''}`,
  hackneyId: userResponse?.hackneyId,
  postcode: userResponse?.postCode,
});
