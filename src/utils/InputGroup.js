const InputGroup = ({
  id,
  text,
  value,
  valueD,
  type,
  disabled,
  min,
  name,
  nameClass,
  labelClass,
  elementClass,
  options,
}) => {
  return (
    <div className={nameClass}>
      <label htmlFor={id} className={labelClass || "form-label"}>
        {text}
      </label>
      {(!type || ["number", "email", "radio"].includes(type)) && (
        <input
          type={type || "text"}
          min={min}
          defaultValue={valueD}
          value={value}
          name={name}
          className={elementClass || "form-control"}
          id={id}
          disabled={disabled || false}
        />
      )}
      {type === "select" && (
        <select id={id} className={elementClass || "form-control"}>
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
