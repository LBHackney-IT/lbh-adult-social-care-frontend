const testDataDaySummaries = [
  {
    id: 1,
    dayId: 1,
    day: "Monday",
    careSummaries: [
      {
        id: 1,
        timeSlot: "8am - 10am",
        label: "Personal Care",
        primaryCarer: "2h",
        secondaryCarer: "30m",
        totalHours: "2.5",
        needAddressing:
          "needAddressing 1",
        whatShouldBeDone:
          "whatShouldBeDone 1",
      },
    ],
  },
  {
    id: 2,
    dayId: 2,
    day: "Tuesday",
    careSummaries: [
      {
        id: 1,
        timeSlot: "8am - 10am",
        label: "Personal Care",
        primaryCarer: "2h",
        secondaryCarer: "30m",
        totalHours: "2.5",
        needAddressing:
          "needAddressing 1",
        whatShouldBeDone:
          "whatShouldBeDone 2",
      },
    ],
  }
];

export {
  testDataDaySummaries,
};