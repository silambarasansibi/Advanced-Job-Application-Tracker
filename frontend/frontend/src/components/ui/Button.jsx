const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gray-900 text-white font-medium px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shadow-sm w-full ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;