export default function SeniorProfileModal({
  senior,
  onClose,
}) {

  if (!senior) {
    return null;
  }


  const firstLetter =
    senior?.name?.charAt(0)?.toUpperCase() || "S";


  return (

    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50
        bg-black/75
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-2xl
          bg-[#121a2d]
          border
          border-cyan-500/20
          rounded-3xl
          p-8
          md:p-10
          max-h-[90vh]
          overflow-y-auto
        "
      >

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-6
            text-gray-400
            hover:text-white
            text-3xl
          "
        >

          ×

        </button>


        {/* PROFILE */}

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

          {senior.profilePicture ? (

            <img
              src={senior.profilePicture}
              alt={senior.name}
              className="
                w-28
                h-28
                rounded-full
                object-cover
                border-4
                border-cyan-500/30
              "
            />

          ) : (

            <div
              className="
                w-28
                h-28
                rounded-full
                bg-cyan-500/10
                flex
                items-center
                justify-center
                text-4xl
                text-cyan-400
                font-bold
              "
            >

              {firstLetter}

            </div>

          )}


          <div className="text-center sm:text-left">

            <p className="text-cyan-400 text-sm font-semibold">
              MCA SENIOR
            </p>

            <h1 className="text-3xl font-bold text-white mt-1">
              {senior.name}
            </h1>

            <p className="text-gray-400 mt-2">
              Batch {senior.batch || "N/A"}
            </p>

          </div>

        </div>


        <div className="border-t border-white/10 my-8" />


        {/* PLACEMENT DETAILS */}

        <h2 className="text-xl font-bold text-white mb-5">
          Placement Details
        </h2>


        <div className="grid sm:grid-cols-2 gap-5">

          <div
            className="
              bg-[#0a0f1a]
              rounded-2xl
              p-5
              border
              border-white/5
            "
          >

            <p className="text-gray-500 text-sm">
              Selected Company
            </p>

            <p className="text-white text-xl font-semibold mt-2">
              {senior.selectedCompany || "Not updated"}
            </p>

          </div>


          <div
            className="
              bg-[#0a0f1a]
              rounded-2xl
              p-5
              border
              border-white/5
            "
          >

            <p className="text-gray-500 text-sm">
              Package
            </p>

            <p className="text-green-400 text-xl font-bold mt-2">

              {senior.package
                ? `${senior.package} LPA`
                : "Not updated"}

            </p>

          </div>


          <div
            className="
              bg-[#0a0f1a]
              rounded-2xl
              p-5
              border
              border-white/5
            "
          >

            <p className="text-gray-500 text-sm">
              Batch
            </p>

            <p className="text-white text-xl font-semibold mt-2">
              {senior.batch || "Not updated"}
            </p>

          </div>


          <div
            className="
              bg-[#0a0f1a]
              rounded-2xl
              p-5
              border
              border-white/5
            "
          >

            <p className="text-gray-500 text-sm">
              Scholar Number
            </p>

            <p className="text-white text-xl font-semibold mt-2">
              {senior.scholarNo || "N/A"}
            </p>

          </div>

        </div>


      </div>

    </div>

  );
}

