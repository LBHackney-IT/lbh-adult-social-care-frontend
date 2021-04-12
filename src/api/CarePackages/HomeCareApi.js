import { BASE_URL } from "../BaseApi";
import axios from "axios";

const HOME_CARE_URL = `${BASE_URL}/v1/homeCarePackage`;
const HOME_CARE_SERVICE_URL = `${BASE_URL}/v1/homeCareService`;

const createHomeCarePackage = async (
  startDate,
  endDate,
  isImmediate,
  isS117,
  isFixedPeriod
) => {
  const response = await axios.post(HOME_CARE_URL, {
    IsThisuserUnderS117: isS117,
    IsThisAnImmediateService: isImmediate,
    IsFixedPeriod: isFixedPeriod,
    IsOngoingPeriod: !isFixedPeriod,
    StartDate: startDate,
    EndDate: endDate,
  });

  return response.data;
};

const getHomeCareServices = async () => {
  const response = await axios.get(`${HOME_CARE_SERVICE_URL}/getall`);
  return response.data;
};

const getHomeCareSummaryData = () => {
  return [
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu",
          whatShouldBeDone:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu",
        },
        {
          id: 2,
          timeSlot: "12pm - 2pm",
          label: "Personal Care",
          primaryCarer: "2h",
          secondaryCarer: "30m",
          totalHours: "2.5",
          needAddressing:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu",
          whatShouldBeDone:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu",
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu",
          whatShouldBeDone:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend faucibus dictum. Nulla congue velit velit, ut ultricies eros consequat quis. Duis at fermentum ex. Vivamus metus sem, consequat nec ante sed, tempus placerat risus. Maecenas suscipit sed dui et pellentesque. Proin et sapien dolor. Sed quam odio, pretium eget semper in, congue eget diam. Nulla faucibus, velit et iaculis maximus, urna nunc consequat est, non blandit mauris dui sed risus. Curabitur efficitur sollicitudin tellus, sed sagittis urna ornare id. Fusce varius nisi non tincidunt luctus. Morbi porttitor diam mi, sit amet laoreet elit tincidunt in. Cras ex ante, luctus vel metu",
        },
      ],
    },
  ];
};

export { createHomeCarePackage, getHomeCareServices, getHomeCareSummaryData };
