import BaseField from "./baseComponents/BaseField";

const TextArea = ({ rows = 3, label, placeholder = "" }) => {
  return (
    <BaseField label={label}>
      <textarea rows={rows} placeholder={placeholder}></textarea>
    </BaseField>
  );
};

export default TextArea;
