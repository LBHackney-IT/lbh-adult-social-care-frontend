import { getUrlOrNull } from '../Utils/FuncUtils';
import useGetData from './useGetData';

const DOCUMENT_URL = '/documents';
export const useDocument = (documentId) =>
  useGetData(getUrlOrNull(
      `${DOCUMENT_URL}${documentId && `/${documentId}`}`),
    'Cannot get document',
    null
  );