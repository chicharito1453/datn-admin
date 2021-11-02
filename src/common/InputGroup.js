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
  nameClass = "mb3",
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
        <select
          id={id}
          className={elementClass}
          style={inputStyle}
          onChange={(e) => changed(e.target.value)}
        >
          <option value="0">Tất cả</option>
          {Array.isArray(options) &&
            options.map((opt) => (
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
