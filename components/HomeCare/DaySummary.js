import React, { useState } from 'react';
import { formatStringLength } from 'service/helpers';
import TextArea from '../TextArea';
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

const DaySummary = ({ daySummaryItem, edit = (item) => console.log(item), remove, slicedText = false }) => {
  const [openedAddressText, setOpenedAddressText] = useState([]);
  const [openedBeDoneText, setOpenedBeDoneText] = useState([]);
  const [editAddressingText, setEditAddressingText] = useState(null);
  const [editDoneText, setEditDoneText] = useState(null);

  const showMore = (getter, setter, id) => setter([...getter, id]);

  const collapse = (getter, setter, id) => setter(getter.filter((itemId) => String(itemId) !== String(id)));

  const acceptEditAddressing = (careSummary) => {
    console.log('request to edit for: ', careSummary.id, editAddressingText);
    setEditAddressingText(null);
  };

  const cancelEditAddressing = () => {
    setEditAddressingText(null);
  }

  const acceptEditDone = (careSummary) => {
    console.log('request to edit for: ', careSummary.id, editDoneText);
    setEditDoneText(null);
  };

  const cancelEditDone = () => {
    setEditDoneText(null);
  }

  return (
    <div className="day-summary">
      <div className="day-summary-title">
        <span>{daySummaryItem.day}</span>
        <div className="day-summary-line" />
      </div>
      {daySummaryItem.careSummaries.map((careSummary) => {
        const addressTextCollapsed = !openedAddressText.some((itemId) => String(itemId) === String(careSummary.id));
        const beDoneTextCollapsed = !openedBeDoneText.some((itemId) => String(itemId) === String(careSummary.id));
        const formattedNeedAddressing = formatStringLength(careSummary.needAddressing, addressTextCollapsed, slicedText);
        const whatShouldBeDone = formatStringLength(careSummary.whatShouldBeDone, beDoneTextCollapsed);
        return (
          <div key={careSummary.id}>
            <div className="day-summary-time-slot">{careSummary.timeSlot}</div>
            <div className="columns">
              <div className="column care-label">{careSummary.label}</div>
              <div className="column level">
                <div className="is-flex is-flex-wrap-wrap care-time-breakdown">
                  <div className="m-0 breakdown-item">
                    <span className='mr-2'>Primary Carer</span>
                    <span className="time-entry">{careSummary.primaryCarer}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className='mr-2'>Secondary Carer</span>
                    <span className="time-entry">{careSummary.secondaryCarer}</span>
                  </div>
                  <div className="breakdown-item total-breakdown">
                    <span className='mr-2'>Total hrs</span>
                    <span className="time-entry">{careSummary.totalHours}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns additional-detail-summaries">
              <div className="column">
                <span>Need Addressing</span>
                <p>
                  {`${formattedNeedAddressing} `}
                  {formattedNeedAddressing.length !== careSummary?.needAddressing?.length && (addressTextCollapsed ? (
                    <span
                      className="day-summary__action-button"
                      onClick={() => showMore(openedAddressText, setOpenedAddressText, careSummary.id)}
                      role="presentation"
                    >
                      {' More...'}
                    </span>
                  ) : (
                    <span
                      className="day-summary__action-button"
                      onClick={() => collapse(openedAddressText, setOpenedAddressText, careSummary.id)}
                      role="presentation"
                    >
                      {' Collapse'}
                    </span>
                  ))}
                </p>
                {editAddressingText === null && (edit || remove) && (
                  <div className="is-flex is-flex-wrap-wrap">
                    {edit && (
                      <p
                        className="day-summary__action-button"
                        onClick={() => setEditAddressingText(careSummary.needAddressing)}
                        role="presentation"
                      >
                        Edit
                      </p>
                    )}
                    {remove && (
                      <p
                        onClick={() => remove(daySummaryItem)}
                        className="day-summary__action-button"
                        role="presentation"
                      >
                        Remove
                      </p>
                    )}
                  </div>
                )}
                {editAddressingText !== null && (
                  <>
                  <TextArea onChange={(value) => setEditAddressingText(value)} value={editAddressingText} />
                  <div className='is-flex-wrap-wrap is-flex'>
                    <p
                      className='day-summary__action-button'
                      onClick={() => acceptEditAddressing(careSummary)}
                    >
                      Accept
                    </p>
                    <p
                      className='day-summary__action-button'
                      onClick={cancelEditAddressing}
                    >
                      Cancel
                    </p>
                  </div>
                  </>
                )}
              </div>
              <div className="column">
                <span>What should be done</span>
                <p>
                  {`${whatShouldBeDone} `}
                  {whatShouldBeDone.length !== careSummary?.whatShouldBeDone?.length && (beDoneTextCollapsed ? (
                    <span
                      className="day-summary__action-button"
                      onClick={() => showMore(openedBeDoneText, setOpenedBeDoneText, careSummary.id)}
                      role="presentation"
                    >
                      {' More...'}
                    </span>
                  ) : (
                    <span
                      className="day-summary__action-button"
                      onClick={() => collapse(openedBeDoneText, setOpenedBeDoneText, careSummary.id)}
                      role="presentation"
                    >
                      {' Collapse'}
                    </span>
                  ))}
                </p>
                {editDoneText !== null && (
                  <>
                    <TextArea onChange={(value) => setEditDoneText(value)} value={editDoneText} />
                    <div className='is-flex-wrap-wrap is-flex'>
                      <p
                        className='day-summary__action-button'
                        onClick={() => acceptEditDone(careSummary)}
                      >
                        Accept
                      </p>
                      <p
                        className='day-summary__action-button'
                        onClick={cancelEditDone}
                      >
                        Cancel
                      </p>
                    </div>
                  </>
                )}
                {editDoneText === null && (edit || remove) && (
                  <div className="is-flex is-flex-wrap-wrap">
                    {edit && (
                      <p
                        className="day-summary__action-button"
                        onClick={() => setEditDoneText(careSummary.whatShouldBeDone)}
                        role="presentation"
                      >
                        Edit
                      </p>
                    )}
                    {remove && (
                      <p
                        onClick={() => remove(daySummaryItem)}
                        className="day-summary__action-button"
                        role="presentation"
                      >
                        Remove
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DaySummary;
