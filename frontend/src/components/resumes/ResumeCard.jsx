export default function ResumeCard({ item }) {

  return (

    <div
      className="
        bg-[#121a2d]
        rounded-3xl
        p-6
        border
        border-cyan-500/10
        hover:border-cyan-500/30
        transition
      "
    >

      <div className="mb-6">

        <h2
          className="
            text-3xl
            font-bold
            text-white
          "
        >
          {item.name}
        </h2>

        <p
          className="
            text-gray-400
            mt-2
          "
        >
          Uploaded by Senior
        </p>

      </div>


      <a
        href={
          `${import.meta.env.VITE_API_URL}/uploads/${item.resumeUrl}`
        }

        target="_blank"

        rel="noreferrer"

        className="
          block
          w-full
          bg-cyan-500
          hover:bg-cyan-600
          text-white
          text-center
          p-4
          rounded-xl
          transition
        "
      >

        View Resume

      </a>

    </div>

  );

}