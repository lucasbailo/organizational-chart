export default function Toast({ message, type }) {
  return (
    <div
      className={`fixed top-5 right-5 px-6 py-3 rounded-xl shadow-lg text-white z-50 ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {message}
    </div>
  );
}
