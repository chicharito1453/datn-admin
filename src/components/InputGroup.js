import Select from "react-select";

const InputGroup = ({
  id,
  text,
  value,
  valueD,
  type = "text",
  disabled,
  isChecked,
  min,
  name,
  placeholder,
  nameClass = "col",
  labelClass = "form-label",
  elementClass = "form-control",
  inputStyle,
  options,
  changed,
}) => {
  return (
    <div className={nameClass}>
      <label htmlFor={id} className={labelClass}>
        {text}
      </label>
      {["text", "number", "email", "radio", "password"].includes(type) && (
        <input
          type={type}
          min={min}
          defaultValue={valueD}
          value={value}
          placeholder={placeholder}
          name={name}
          style={inputStyle}
          className={elementClass}
          id={id}
          checked={isChecked}
          disabled={disabled || false}
          onChange={changed}
        />
      )}
      {type === "select" && (
        <Select
          id={id}
          name={name}
          value={value}
          styles={inputStyle}
          placeholder={placeholder}
          onChange={(e) => changed(e)}
          options={options}
        />
      )}
    </div>
  );
};
export default InputGroup;
