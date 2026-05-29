export default function Loading({
  text = "Loading...",
  fullScreen = false
}) {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        ${
          fullScreen
            ? "fixed inset-0 bg-[#071224] z-50"
            : "w-full h-full"
        }
      `}
    >
      <div
        className="
          w-16
          h-16
          border-4
          border-cyan-500
          border-t-transparent
          rounded-full
          animate-spin
        "
      />

      <p
        className="
          mt-5
          text-white
          text-lg
          font-medium
        "
      >
        {text}
      </p>
    </div>
  );
}