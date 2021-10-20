export const getSlot = (nodeList = [], name) => nodeList.find((el) => el.props.slot === name);

export const getMultipleSlot = (nodeList = [], name) => nodeList.filter((el) => el.props.slot === name);
