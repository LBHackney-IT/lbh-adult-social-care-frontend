import axios from 'axios';
import { getBaseUrl } from '../BaseApi';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const SUBMITTED_PACKAGES_URL = `${getBaseUrl()}/v1/submitted-package-requests`;

const getSubmittedPackages = (pageNumber, pageSize, clientName, statusId) =>
  axios.get(`${SUBMITTED_PACKAGES_URL}`,
    {
        params: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            clientName : clientName,
            statusId : statusId
        }
    }
  ).then(handleResponse).catch(handleError);

const getSubmittedPackagesStatus = () =>
  axios.get(`${SUBMITTED_PACKAGES_URL}/status`).then(handleResponse).catch(handleError);

export { getSubmittedPackages, getSubmittedPackagesStatus };
