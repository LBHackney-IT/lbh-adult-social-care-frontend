import React, {useState} from "react";
import {maxStringLength} from "../../constants/variables";
// {
//       id: 1,
//       dayId: 1,
//       day: "Monday",
//       careSummaries: [
//         {
//           id: 1,
//       timeSlot: "8am - 10am",
//           label: "Personal Care",
//           primaryCarer: "2h",
//           secondaryCarer: "30m",
//           totalHours: "2.5",
//           needAddressing:
//             ".rgaerhrae aerhe je rj ej a jear jrae tera ah err jej ejaeyhea",
//           whatShouldBeDone:
//             "aaeh  nakh jh shejrg aerghagh erjg ersug ser uug er jhgag ergjer g",
//         },
//       ],
//     }

const DaySummary = ({ daySummaryItem, edit, remove, slicedText = false }) => {
  const [openedAddressText, setOpenedAddressText] = useState([]);
  const [openedBeDoneText, setOpenedBeDoneText] = useState([]);

  const formatStringLength = (string, collapsedText) => {
    if(string.length > maxStringLength && collapsedText && slicedText) {
      return `${string.slice(0, maxStringLength)}`;
    } else {
      return string;
    }
  }

  const showMore = (getter, setter, id) => setter([...getter, id]);

  const collapse = (getter, setter, id) => setter(getter.filter(itemId => String(itemId) !== String(id)));

  return (
    <div className="day-summary">
      <div className="day-summary-title">
        <label>{daySummaryItem.day}</label>
        <div className="day-summary-line"/>
      </div>
      {daySummaryItem.careSummaries.map((careSummary) => {
        const addressTextCollapsed = !openedAddressText.some(itemId => String(itemId) === String(careSummary.id));
        const beDoneTextCollapsed = !openedBeDoneText.some(itemId => String(itemId) === String(careSummary.id));
        return (
          <div key={careSummary.id}>
            <div className="day-summary-time-slot">{careSummary.timeSlot}</div>
            <div className="columns">
              <div className="column care-label">{careSummary.label}</div>
              <div className="column level">
                <div className="level-item level-right care-time-breakdown">
                  <div className="breakdown-item">
                    <label>Primary Carer</label>
                    <label className="time-entry">
                      {careSummary.primaryCarer}
                    </label>
                  </div>
                  <div className="breakdown-item">
                    <label>Secondary Carer</label>
                    <label className="time-entry">
                      {careSummary.secondaryCarer}
                    </label>
                  </div>
                  <div className="breakdown-item total-breakdown">
                    <label>Total hrs</label>
                    <label className="time-entry">
                      {careSummary.totalHours}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns additional-detail-summaries">
              <div className="column">
                <label>Need Addressing</label>
                <p>{formatStringLength(careSummary.needAddressing, addressTextCollapsed)} {
                  addressTextCollapsed ?
                    <span
                      className='day-summary__action-button'
                      onClick={() => showMore(openedAddressText, setOpenedAddressText, careSummary.id)}> More...
                    </span> :
                    <span
                      className='day-summary__action-button'
                      onClick={() => collapse(openedAddressText, setOpenedAddressText, careSummary.id)}> Collapse
                    </span>
                  }
                  </p>
                    {
                    (edit || remove) &&
                    <div className='is-flex is-flex-wrap-wrap'>
                      {edit && <p className='day-summary__action-button' onClick={() => edit(daySummaryItem)}>Edit</p>}
                      {remove && <p onClick={() => remove(daySummaryItem)} className='day-summary__action-button'>Remove</p>}
                    </div>
                    }
              </div>
              <div className="column">
                <label>What should be done</label>
                <p>
                  {formatStringLength(careSummary.whatShouldBeDone, beDoneTextCollapsed)} {
                    beDoneTextCollapsed ?
                      <span
                        className='day-summary__action-button'
                        onClick={() => showMore(openedBeDoneText, setOpenedBeDoneText, careSummary.id)}> More...
                      </span> :
                    <span
                      className='day-summary__action-button'
                      onClick={() => collapse(openedBeDoneText, setOpenedBeDoneText, careSummary.id)}> Collapse
                    </span>
                }
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DaySummary;
