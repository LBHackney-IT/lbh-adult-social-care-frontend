const mapHomeCarePackageDetailsForBrokerage = array => !array ? [] : array.map(
  (historyItem) => ({
    eventDate: new Date(historyItem.approvedDate).toLocaleDateString(
      "en-GB"
    ),
    eventMessage: historyItem.logText,
    eventSubMessage: undefined
  })
);

export {
  mapHomeCarePackageDetailsForBrokerage,
};
