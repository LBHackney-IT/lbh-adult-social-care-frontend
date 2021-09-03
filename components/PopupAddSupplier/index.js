import React, { useState } from 'react';
import { createSupplier } from '../../api/CarePackages/SuppliersApi';
import { Input } from '../HackneyDS';
import Dropdown from '../Dropdown';
import RadioButton, { yesNoValues } from '../RadioButton';
import HomeCareCostEntry from '../packages/home-care/components/CostEntry';
import Popup from '../Popup';
import useBrokeredPackageApi from '../../api/SWR/useBrokeredPackagesApi'
import optionsMapper from '../../api/Mappers/optionsMapper'

const PopupAddSupplier = ({ closePopup }) => {
  const [supplierName, setSupplierName] = useState('');
  const [packageTypeId, setPackageTypeId] = useState('');
  const [isSupplierInternal, setIsSupplierInternal] = useState(false);
  const [hasSupplierFrameworkContractedRates, setHasSupplierFrameworkContractedRates] = useState(false);

  const [elementsData, setElementsData] = useState({
    '30mCall': 0,
    '45mCall': 0,
    '60m+Call': 0,
    secondaryCarer: 0,
    domesticCare: 0,
    escortServices: 0,
    sleepingNight: 0,
    wakingNight: 0,
    nightOwl: 0,
  });

  const changeElementsData = (field, data) => {
    setElementsData({ ...elementsData, [field]: data });
  };

  const { data: packageTypes } = useBrokeredPackageApi.types();

  const addSupplier = async () => {
    await createSupplier({
      supplierName,
      packageTypeId,
      isSupplierInternal,
      hasSupplierFrameworkContractedRates,
    });
    closePopup();
  };

  const addSupplierContent = (
    <div className="add-supplier">
      <Input
        value={supplierName}
        label='Supplier Name'
        handler={(value) => setSupplierName(value)}
      />
      <Dropdown
        className='type-of-care mb-3'
        options={optionsMapper({text: 'packageType', value: 'id'}, packageTypes)}
        selectedValue={packageTypeId}
        onOptionSelect={(value) => setPackageTypeId(value)}
      />
      <RadioButton
        label='Supplier is internal'
        options={yesNoValues}
        selectedValue={isSupplierInternal}
        onChange={(value) => setIsSupplierInternal(value)}
      />
      <RadioButton
        label='Supplier has framework contracted rates?'
        options={yesNoValues}
        selectedValue={hasSupplierFrameworkContractedRates}
        onChange={(value) => setHasSupplierFrameworkContractedRates(value)}
      />
      <div>
        <div className="proposed-packages__elements column">
          <h2>Elements - enter all per hour</h2>
          <div className="mb-5 is-flex is-flex-wrap-wrap is-justify-content-space-between">
            <div className="elements-column">
              <div className="elements-row">
                <div>Primary Carer</div>
                <div />
                <div className="bold-text" />
                <div className="bold-text" />
              </div>
              <div className="elements-sub-column">
                <HomeCareCostEntry
                  label="30m call"
                  value={elementsData['30mCall']}
                  onChange={(value) => changeElementsData('30mCall', value)}
                />
                <HomeCareCostEntry
                  label="45m call"
                  value={elementsData['45mCall']}
                  onChange={(value) => changeElementsData('45mCall', value)}
                />
                <HomeCareCostEntry
                  label="60m+ call"
                  value={elementsData['60m+Call']}
                  onChange={(value) => changeElementsData('60m+Call', value)}
                />
                <br />
                <HomeCareCostEntry
                  label="Secondary Carer"
                  value={elementsData.secondaryCarer}
                  onChange={(value) => changeElementsData('secondaryCarer', value)}
                />
                <HomeCareCostEntry
                  label="Domestic Care"
                  value={elementsData.domesticCare}
                  onChange={(value) => changeElementsData('domesticCare', value)}
                />
                <HomeCareCostEntry
                  label="Escort Services"
                  value={elementsData.escortServices}
                  onChange={(value) => changeElementsData('escortServices', value)}
                />
              </div>
            </div>
            <div className="vertical-line" />
            <div className="elements-column">
              <HomeCareCostEntry
                label="Sleeping Night"
                value={elementsData.sleepingNight}
                onChange={(value) => changeElementsData('sleepingNight', value)}
              />
              <HomeCareCostEntry
                label="Waking Night"
                value={elementsData.wakingNight}
                onChange={(value) => changeElementsData('wakingNight', value)}
              />
              <HomeCareCostEntry
                label="Night Owl"
                value={elementsData.nightOwl}
                onChange={(value) => changeElementsData('nightOwl', value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Popup
      closePopup={closePopup}
      mainContent={addSupplierContent}
      title="Add New Supplier"
      firstButton={{ text: 'Cancel', onClick: closePopup }}
      secondButton={{ text: 'Add Supplier', onClick: addSupplier }}
    />
  );
};

export default PopupAddSupplier;