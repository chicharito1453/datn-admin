import Select from "react-select";

const InputGroup = ({
  id,
  text,
  value,
  valueD,
  type = "text",
  disabled,
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
          onChange={(e) => changed(e.value)}
          options={options}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
export default InputGroup;
