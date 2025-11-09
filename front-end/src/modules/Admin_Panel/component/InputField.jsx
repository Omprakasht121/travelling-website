const InputField = ({ label, name, type, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        />
      )}
    </div>
  );
};

export default InputField;
