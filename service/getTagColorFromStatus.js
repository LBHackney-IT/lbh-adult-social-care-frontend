import { tagColors } from '../constants/variables';

export const getTagColorFromStatus = (statusName, colors = tagColors) => colors[statusName?.toLowerCase?.()] || '';
