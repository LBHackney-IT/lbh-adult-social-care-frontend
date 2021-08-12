import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { BASE_URL } from '../../api/BaseApi';
import { usePackageGetAll, usePaymentDepartments } from '../../api/SWR';
import { Button } from '../Button';
import DatePick from '../DatePick';
import Dropdown from '../Dropdown';
import { CaretDownIcon } from '../Icons';

const convertLocalToUTCDate = (date, isEndDate) => {
  if (!date) return date;

  const utcDate = moment.parseZone(date).utc(true);

  if (!isEndDate) return utcDate.format();

  // set time to end of the day for dateEnd
  return utcDate
    .add({
      hours: 23,
      minutes: 59,
      seconds: 59,
    })
    .format();
};

const HeldPaymentsFilters = ({ filters, changeFilter, applyFilters }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const { options: packageTypeOptions } = usePackageGetAll();
  const { options: waitingOnOptions } = usePaymentDepartments();

  const dropdowns = [
    { text: 'Service type', options: packageTypeOptions, key: 'serviceType' },
    { text: 'Waiting on', options: waitingOnOptions, key: 'waitingOn' },
    { text: 'Service User', key: 'serviceUser', endpoint: 'clients' },
    { text: 'Supplier', key: 'supplier', endpoint: 'suppliers' },
  ];

  return (
    <>
      <div className="held-payments__filters">
        <DatePick
          classes="held-payments__date-picker"
          startDate={startDate}
          endDate={endDate}
          setDate={(dates) => {
            setDateRange(dates);
            const [from, to] = dates;
            changeFilter('dateStart', convertLocalToUTCDate(from, false));
            changeFilter('dateEnd', convertLocalToUTCDate(to, true));
          }}
          selectsRange
        />

        {dropdowns.map(({ text, options, key, endpoint }) => {
          if (endpoint) {
            const isClient = endpoint === 'clients';
            const filterKey = isClient ? 'clientName' : 'supplierName';

            const loadOptions = async (searchText) => {
              const { data } = await axios.get(`${BASE_URL}/v1/${endpoint}/get-all`, {
                params: { [filterKey]: searchText },
              });
              return data.data;
            };

            return (
              <AsyncSelect
                onChange={(option) => changeFilter(key, option.id)}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => (isClient ? `${option.firstName} ${option.lastName}` : option.supplierName)}
                loadOptions={loadOptions}
                components={{ DropdownIndicator: CaretDownIcon }}
                classNamePrefix="held-payments-select"
                className="held-payments-select"
                placeholder={text}
                defaultOptions
                cacheOptions
              />
            );
          }

          return (
            <Dropdown
              key={key}
              initialText={text}
              options={options}
              classes="pay-runs__dropdown-type mr-3"
              selectedValue={filters[key]}
              onOptionSelect={(option) => changeFilter(key, option)}
            />
          );
        })}
      </div>

      <Button onClick={applyFilters}>Filter</Button>
    </>
  );
};

export default HeldPaymentsFilters;
