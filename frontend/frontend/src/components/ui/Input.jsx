const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 px-4 py-2.5 rounded-xl w-full text-sm outline-none transition-all ${className}`}
    />
  );
};

export default Input;