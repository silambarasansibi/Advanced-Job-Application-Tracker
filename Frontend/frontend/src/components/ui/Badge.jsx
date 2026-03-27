const Badge = ({ text }) => {
  const colors = {
    Applied: "bg-gray-200 text-gray-700",
    Interview: "bg-yellow-200 text-yellow-800",
    Offer: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[text] || "bg-gray-200"
      }`}
    >
      {text}
    </span>
  );
};

export default Badge;