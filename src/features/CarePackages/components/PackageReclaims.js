import PackageReclaim from "../../components/PackageReclaim";
import React, { useEffect, useState } from "react";
import { getInitialPackageReclaim } from "../../../api/Utils/CommonOptions";
import { uniqueID } from "../../../service/helpers";
import {
  getReclaimAmountOptions,
  getReclaimFromCategories,
  getReclaimFromOptions,
} from "../../../api/CarePackages/PackageReclaimApi";
import ShouldPackageReclaim from "../HomeCare/components/ShouldPackageReclaim";

const PackageReclaims = ({
  packagesReclaimed = [],
  setPackagesReclaimed = () => {},
  errors = [],
  setErrors = () => {},
}) => {
  const [reclaimFromOptions, setReclaimFromOptions] = useState([]);
  const [reclaimFromCategoryOptions, setReclaimFromCategoryOptions] = useState(
    []
  );
  const [reclaimAmountOptions, setReclaimAmountOptions] = useState([]);
  const [isReclaimed, setIsReclaimed] = useState(false);

  useEffect(() => {
    if (reclaimFromOptions.length === 0) {
      retrieveReclaimFromOptions();
    }
    if (reclaimFromCategoryOptions.length === 0) {
      retrieveReclaimFromCategories();
    }
    if (reclaimAmountOptions.length === 0) {
      retrieveReclaimAmountOptions();
    }
  }, []);

  const retrieveReclaimFromOptions = () => {
    getReclaimFromOptions()
      .then((res) => {
        let options = res.map((option) => ({
          text: option.reclaimFromName,
          value: option.reclaimFromId,
        }));
        setReclaimFromOptions(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve reclaim from options failed. ${error.message}`,
        ]);
      });
  };

  const retrieveReclaimFromCategories = () => {
    getReclaimFromCategories()
      .then((res) => {
        let options = res.map((option) => ({
          text: option.reclaimCategoryName,
          value: option.reclaimCategoryId,
        }));
        setReclaimFromCategoryOptions(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve reclaim from categories failed. ${error.message}`,
        ]);
      });
  };

  const retrieveReclaimAmountOptions = () => {
    getReclaimAmountOptions()
      .then((res) => {
        let options = res.map((option) => ({
          text: option.amountOptionName,
          value: option.amountOptionId,
        }));
        setReclaimAmountOptions(options);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve reclaim amount options failed. ${error.message}`,
        ]);
      });
  };

  const addDayCarePackageReclaim = () => {
    setPackagesReclaimed([
      ...packagesReclaimed,
      { ...getInitialPackageReclaim(), id: uniqueID() },
    ]);
  };

  const removeDayCarePackageReclaim = (id) => {
    const newPackagesReclaim = packagesReclaimed.filter(
      (item) => item.id !== id
    );
    setPackagesReclaimed(newPackagesReclaim);
  };

  const changeDayCarePackageReclaim = (id) => (updatedPackage) => {
    const newPackage = packagesReclaimed.slice();
    const packageIndex = packagesReclaimed.findIndex((item) => item.id === id);
    newPackage.splice(packageIndex, 1, updatedPackage);
    setPackagesReclaimed(newPackage);
  };

  const changeIsPackageReclaimed = (status) => {
    if (status === true && packagesReclaimed.length === 0) {
      addDayCarePackageReclaim();
    }

    if (status === false) {
      setPackagesReclaimed([]);
    }
  };

  useEffect(() => {
    setIsReclaimed(packagesReclaimed.length > 0);
  }, [packagesReclaimed.length]);

  return (
    <>
      {/*<div>
        <div className="mt-4 is-flex is-align-items-center is-justify-content-space-between">
          <p className="package-reclaim__text">
            Should the cost of this package be reclaimed in part or full from
            another body, e.g. NHS, CCG, another LA ?
          </p>
          <div className="control radio-list mr-4">
            <label className="radio">
              <input
                type="radio"
                name="showReclaim"
                checked={packagesReclaimed.length > 0}
                onChange={addDayCarePackageReclaim}
              />
              Yes
            </label>
            <br />
            <label className="radio">
              <input
                type="radio"
                name="showReclaim"
                checked={packagesReclaimed.length === 0}
                onChange={() => setPackagesReclaimed([])}
              />
              Not Sure
            </label>
          </div>
        </div>
        <hr className="horizontal-delimiter" />
      </div>*/}

      <ShouldPackageReclaim
        isReclaimed={isReclaimed}
        setIsReclaimed={changeIsPackageReclaimed}
      />

      {!!packagesReclaimed.length && (
        <div>
          {packagesReclaimed.map((item) => {
            return (
              <PackageReclaim
                remove={() => removeDayCarePackageReclaim(item.id)}
                key={item.id}
                packageReclaim={item}
                setPackageReclaim={changeDayCarePackageReclaim(item.id)}
                reclaimFromOptions={reclaimFromOptions}
                reclaimFromCategoryOptions={reclaimFromCategoryOptions}
                reclaimAmountOptions={reclaimAmountOptions}
              />
            );
          })}
          <p onClick={addDayCarePackageReclaim} className="action-button-text">
            + Add another reclaim
          </p>
        </div>
      )}
    </>
  );
};

export default PackageReclaims;
