import { tagColors } from '../constants/variables';

const getTagColorFromStatus = (statusName) => tagColors[statusName.toLowerCase()];
export default getTagColorFromStatus;