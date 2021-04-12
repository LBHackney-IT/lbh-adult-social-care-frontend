import SectionHeading from "../../components/SectionHeading";
import { Button } from "../../components/Button";
import TextArea from "../../components/TextArea";
import RadioButton from "../../components/RadioButton";
import "../assets/additionalNeeds.scss";

const AdditionalNeedEntry = ({
  costOptions,
  entry,
  onEdit = () => {},
  removeEntry = () => {},
}) => {
  const onRadioBtnChange = (value) => {
    onEdit({ ...entry, selectedCost: value });
  };

  const onTextAreaChange = (value) => {
    onEdit({ ...entry, needToAddress: value });
  };

  return (
    <>
      <div className="mb-2">
        <SectionHeading>Additional needs</SectionHeading>
      </div>
      <div className="columns">
        <div className="column care-cost-col">
          <RadioButton
            label="This cost is:"
            inline={false}
            options={costOptions}
            selectedValue={entry.selectedCost}
            onChange={onRadioBtnChange}
          />
          <Button onClick={() => removeEntry(entry.id)} linkBtn={true}>
            Remove Need
          </Button>
        </div>
        <div className="column">
          <TextArea
            label="Need to Address"
            rows={5}
            placeholder="Add details..."
            onChange={onTextAreaChange}
          >
            {entry.needToAddress}
          </TextArea>
        </div>
        <div className="column is-2"></div>
      </div>
    </>
  );
};

const AdditionalNeeds = ({
  costOptions,
  entries,
  setAdditionalNeedsState = () => {},
}) => {
  // Add new additional need entry
  const addAdditionalNeedEntry = () => {
    setAdditionalNeedsState([
      ...entries,
      {
        id: entries.length + 1,
        selectedCost: undefined,
        needToAddress: undefined,
      },
    ]);
  };

  // Edit additional need entry
  const editAdditionalNeedEntry = (entry) => {
    const newEntries = entries.map((entryItem) =>
      entryItem.id === entry.id ? entry : entryItem
    );
    setAdditionalNeedsState([...newEntries]);
  };

  // Remove additional need entry
  const removeAdditionalNeedEntry = (entryId) => {
    const newEntries = entries.filter((entryItem) => entryItem.id !== entryId);
    setAdditionalNeedsState([...newEntries]);
  };

  return (
    <>
      {entries.map((entryItem) => {
        return (
          <AdditionalNeedEntry
            key={entryItem.id}
            costOptions={costOptions}
            entry={entryItem}
            onEdit={editAdditionalNeedEntry}
            removeEntry={removeAdditionalNeedEntry}
          />
        );
      })}
      <div className="mt-4">
        <Button onClick={addAdditionalNeedEntry} linkBtn={true}>
          + Add Need
        </Button>
      </div>
    </>
  );
};

const getInitialAdditionalNeedsArray = () => {
  return [
    {
      id: 1,
      selectedCost: undefined,
      needToAddress: undefined,
    },
  ];
};

export default AdditionalNeeds;
export { getInitialAdditionalNeedsArray };
