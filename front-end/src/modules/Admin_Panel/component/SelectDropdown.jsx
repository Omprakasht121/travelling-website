const SelectDropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm  text-white/80">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
