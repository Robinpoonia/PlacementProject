export default function SeniorCard({
  senior,
  onClick,
}) {

  const firstLetter =
    senior?.name?.charAt(0)?.toUpperCase() || "S";


  return (

    <div
      onClick={() => onClick(senior)}
      className="
        group
        bg-[#121a2d]
        border
        border-cyan-500/10
        hover:border-cyan-500/50
        rounded-3xl
        p-7
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:shadow-cyan-500/5
      "
    >

      {/* PROFILE */}

      <div className="flex items-center gap-5">

        {senior.profilePicture ? (

          <img
            src={senior.profilePicture}
            alt={senior.name}
            className="
              w-20
              h-20
              rounded-full
              object-cover
              border-2
              border-cyan-500/40
            "
          />

        ) : (

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-cyan-500/10
              border
              border-cyan-500/30
              flex
              items-center
              justify-center
              text-cyan-400
              text-3xl
              font-bold
            "
          >

            {firstLetter}

          </div>

        )}


        <div className="min-w-0">

          <h2
            className="
              text-xl
              font-bold
              text-white
              group-hover:text-cyan-400
              transition
              truncate
            "
          >
            {senior.name}
          </h2>


          <p className="text-gray-500 mt-1">
            MCA • Batch {senior.batch || "N/A"}
          </p>


          <span
            className="
              inline-block
              mt-2
              px-3
              py-1
              text-xs
              rounded-full
              bg-cyan-500/10
              text-cyan-400
              capitalize
            "
          >

            {senior.role}

          </span>

        </div>

      </div>


      {/* DIVIDER */}

      <div className="border-t border-white/10 my-6" />


      {/* PLACEMENT */}

      <div className="grid grid-cols-2 gap-4">

        <div>

          <p className="text-xs text-gray-500 mb-1">
            SELECTED AT
          </p>

          <p className="text-white font-semibold truncate">
            {senior.selectedCompany || "Not updated"}
          </p>

        </div>


        <div>

          <p className="text-xs text-gray-500 mb-1">
            PACKAGE
          </p>

          <p className="text-green-400 font-bold">
            {senior.package
              ? `${senior.package} LPA`
              : "Not updated"}
          </p>

        </div>

      </div>


      {/* BUTTON */}

      <button
        className="
          mt-7
          w-full
          py-3
          rounded-xl
          bg-cyan-500/10
          text-cyan-400
          font-semibold
          group-hover:bg-cyan-500
          group-hover:text-white
          transition
        "
      >

        View Profile →

      </button>

    </div>

  );
}