import { tagColors } from '../constants/variables';

export const getTagColorFromStatus = (statusName) => tagColors[statusName?.toLowerCase?.()] || '';
