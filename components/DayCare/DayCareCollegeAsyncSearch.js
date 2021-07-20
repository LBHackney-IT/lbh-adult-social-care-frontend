import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { getDayCareColleges } from '../../api/CarePackages/DayCareApi';
import { Button } from '../Button';
import DayCareCreateCollege from './DayCareCreateCollege';

const DayCareCollegeAsyncSearch = ({ setSelectedCollege = () => {}, onError = () => {}, classNames = 'is-3' }) => {
  // set default query terms
  const [query, setQuery] = useState('');
  const [allDayCareColleges, setAllDayCareColleges] = useState([]);
  const [displayAddNewCollegeButton, setDisplayAddNewCollegeButton] = useState(false);

  const [displayAddNewCollegeForm, setDisplayAddNewCollegeForm] = useState(false);

  useEffect(() => {
    retrieveDayCareColleges();
  }, []);

  const retrieveDayCareColleges = () => {
    getDayCareColleges()
      .then((res) => {
        setAllDayCareColleges(res);
      })
      .catch((error) => {
        onError(`Retrieve day care colleges failed. ${error.message}`);
      });
  };

  // fetch filters search results for dropdown
  const loadOptions = () =>
    new Promise((resolve) => {
      const filteredColleges = allDayCareColleges.filter((ele) =>
        ele.collegeName.toLowerCase().trim().includes(query.toLowerCase().trim())
      );
      if (filteredColleges.length === 0) {
        setDisplayAddNewCollegeButton(true);
      } else {
        setDisplayAddNewCollegeButton(false);
      }
      resolve(filteredColleges);
    });

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    setQuery(inputValue);
    return inputValue;
  };

  const handleNewCollegeCreated = () => {
    retrieveDayCareColleges();
    setDisplayAddNewCollegeButton(false);
    setDisplayAddNewCollegeForm(false);
  };

  const handleNewCollegeCreationCanceled = () => {
    retrieveDayCareColleges();
    setDisplayAddNewCollegeButton(false);
    setDisplayAddNewCollegeForm(false);
  };

  return (
    <>
      <div className="columns">
        <div className={`column ${classNames}`}>
          <div className="columns">
            <div className={`column ${displayAddNewCollegeButton ? 'is-10' : 'is-full'}`}>
              <AsyncSelect
                cacheOptions
                defaultOptions={allDayCareColleges.slice(0, 5)}
                name="dayCareColleges"
                className="w-100 min-w-200px"
                placeholder="Select College"
                closeMenuOnSelect
                backspaceRemovesValue
                isClearable
                blurInputOnSelect
                captureMenuScroll
                closeMenuOnScroll
                escapeClearsValue
                hideSelectedOptions
                getOptionLabel={(e) => e.collegeName}
                getOptionValue={(e) => e.id}
                loadOptions={loadOptions}
                onInputChange={(value) => handleInputChange(value)}
                onChange={(value) => setSelectedCollege(value)}
              />
            </div>
            {displayAddNewCollegeButton && (
              <div className="column is-2">
                <Button className="button hackney-btn-green" onClick={() => setDisplayAddNewCollegeForm(true)}>
                  New
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="column" />
      </div>
      {displayAddNewCollegeForm && (
        <div className="columns">
          <div className="column">
            <DayCareCreateCollege
              newName={query}
              onCreated={handleNewCollegeCreated}
              onCancelled={handleNewCollegeCreationCanceled}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DayCareCollegeAsyncSearch;
