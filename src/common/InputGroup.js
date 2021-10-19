const InputGroup = ({
  id,
  text,
  value,
  valueD,
  type = "text",
  disabled,
  min,
  name,
  nameClass = "mb3",
  labelClass = "form-label",
  elementClass = "form-control",
  options,
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
          name={name}
          className={elementClass}
          id={id}
          disabled={disabled || false}
        />
      )}
      {type === "select" && (
        <select id={id} className={elementClass}>
          {options.map((opt) => (
            <option value={opt.id} key={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
export default InputGroup;
