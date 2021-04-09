import BaseField from "./baseComponents/BaseField";

const TextArea = ({ rows = 3, label, placeholder = "", children }) => {
  return (
    <BaseField label={label}>
      <textarea rows={rows} placeholder={placeholder}>
        {children !== undefined ? children : null}
      </textarea>
    </BaseField>
  );
};

export default TextArea;
