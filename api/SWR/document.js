import axios from 'axios';
import { getUrlOrNull } from '../Utils/FuncUtils';
import useGetData from './useGetData';
import { BASE_URL } from '../BaseApi';
import { requestMethods } from '../../constants/variables';
import { handleError, handleResponse } from '../Utils/ApiUtils';

const DOCUMENT_URL = '/documents';
export const useDocument = (documentId) =>
  useGetData(getUrlOrNull(`${DOCUMENT_URL}${documentId && `/${documentId}`}`), 'Cannot get document', null);

export const getDocumentRequest = (documentId) =>
  axios({
    url: `${BASE_URL}/v1${DOCUMENT_URL}/${documentId}`,
    method: requestMethods.get,
  })
    .then(handleResponse)
    .catch(handleError);
