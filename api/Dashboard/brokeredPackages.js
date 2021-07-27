import { BASE_URL } from '../BaseApi';
import { axiosRequest, getQueryParamsFromObject } from '../Utils/ApiUtils'
import { requestMethods } from '../../constants/variables'

const BROKERED_PACKAGES = `${BASE_URL}/v1/brokered-packages`;

const getBrokeredPackagesBrokeredNew = (props) => axiosRequest({
  url: `${BROKERED_PACKAGES}/new${getQueryParamsFromObject(props)}`
})

const getBrokeredPackagesBrokeredInProgress = (props) => axiosRequest({
  url: `${BROKERED_PACKAGES}/in-progress${getQueryParamsFromObject(props)}`
})

const getBrokeredPackagesBrokeredDone = (props) => axiosRequest({
  url: `${BROKERED_PACKAGES}/done${getQueryParamsFromObject(props)}`
})

const getBrokeredPackagesStages = () => axiosRequest({
  url: `${BROKERED_PACKAGES}/stages`
})

const getBrokeredPackagesPackageTypes = () => axiosRequest({
  url: `${BROKERED_PACKAGES}/package-types`
})

const getBrokeredPackagesSocialWorkers = () => axiosRequest({
  url: `${BROKERED_PACKAGES}/social-workers`
})

const putBrokeredPackagesAssign = (userId) => axiosRequest({
  method: requestMethods.put, body: userId, url: `${BROKERED_PACKAGES}/assign`
})

export {
  getBrokeredPackagesBrokeredNew,
  getBrokeredPackagesBrokeredInProgress,
  getBrokeredPackagesBrokeredDone,
  getBrokeredPackagesStages,
  putBrokeredPackagesAssign,
  getBrokeredPackagesPackageTypes,
  getBrokeredPackagesSocialWorkers,
};
