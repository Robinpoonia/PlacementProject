import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchSeniors,
} from "../store/slices/seniorSlice";

import SeniorCard
  from "../components/Seniors/SeniorCard";

import SeniorProfileModal
  from "../components/Seniors/SeniorProfileModal";

import Loading
  from "../components/Layout/Loading";


export default function Seniors() {

  const dispatch = useDispatch();


  // ============================================
  // REDUX
  // ============================================

  const {
    data,
    loading,
    error,
  } = useSelector(
    (state) => state.seniors
  );


  // ============================================
  // LOCAL STATE
  // ============================================

  const [search, setSearch] =
    useState("");

  const [selectedBatch, setSelectedBatch] =
    useState("All");

  const [selectedSenior, setSelectedSenior] =
    useState(null);


  // ============================================
  // FETCH
  // ============================================

  useEffect(() => {

    dispatch(fetchSeniors());

  }, [dispatch]);


  // ============================================
  // BATCHES
  // ============================================

  const batches = useMemo(() => {

    return [
      ...new Set(
        data
          .map((senior) => senior.batch)
          .filter(Boolean)
      ),
    ].sort((a, b) => b - a);

  }, [data]);


  // ============================================
  // FILTER
  // ============================================

  const filteredSeniors = useMemo(() => {

    return data.filter((senior) => {

      const query =
        search.toLowerCase().trim();


      const matchesSearch =

        !query ||

        senior.name
          ?.toLowerCase()
          .includes(query) ||

        senior.selectedCompany
          ?.toLowerCase()
          .includes(query) ||

        senior.scholarNo
          ?.toLowerCase()
          .includes(query);


      const matchesBatch =

        selectedBatch === "All" ||

        String(senior.batch) ===
          String(selectedBatch);


      return (
        matchesSearch &&
        matchesBatch
      );

    });

  }, [
    data,
    search,
    selectedBatch,
  ]);


  // ============================================
  // GROUP BY BATCH
  // ============================================

  const grouped = useMemo(() => {

    return filteredSeniors.reduce(
      (acc, senior) => {

        const batch =
          senior.batch || "Unknown";

        if (!acc[batch]) {
          acc[batch] = [];
        }

        acc[batch].push(senior);

        return acc;

      },
      {}
    );

  }, [filteredSeniors]);


  const groupedBatches =
    Object.keys(grouped).sort(
      (a, b) => {

        if (a === "Unknown") return 1;

        if (b === "Unknown") return -1;

        return Number(b) - Number(a);

      }
    );


  // ============================================
  // LOADING
  // ============================================

  if (loading) {

    return (
      <Loading
        text="Loading Seniors..."
        fullScreen
      />
    );

  }


  // ============================================
  // ERROR
  // ============================================

  if (error) {

    return (

      <div className="min-h-screen pt-32 px-6 bg-[#0a0f1a]">

        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-red-400 text-xl">
            {error}
          </h2>

          <button
            onClick={() =>
              dispatch(fetchSeniors())
            }
            className="
              mt-5
              bg-cyan-500
              px-6
              py-3
              rounded-xl
              text-white
            "
          >

            Try Again

          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] to-[#1a2332] pt-28 pb-24 px-4">

      <div className="max-w-7xl mx-auto">


        {/* ============================================
            HEADER
        ============================================ */}

        <div className="mb-12">

          <p className="text-cyan-400 font-semibold mb-3">
            MCA COMMUNITY
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-white">

            Explore Our
            <span className="text-cyan-400">
              {" "}Seniors
            </span>

          </h1>

          <p className="text-gray-400 text-lg mt-5 max-w-3xl leading-8">

            Learn from MCA seniors who have already
            gone through the placement journey.
            Discover their companies, packages and
            placement experiences.

          </p>

        </div>


        {/* ============================================
            SEARCH + FILTER
        ============================================ */}

        <div
          className="
            bg-[#121a2d]
            border
            border-cyan-500/10
            rounded-2xl
            p-5
            mb-12
            flex
            flex-col
            md:flex-row
            gap-4
          "
        >

          {/* SEARCH */}

          <div className="flex-1">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by name, company or scholar number..."
              className="
                w-full
                bg-[#0a0f1a]
                border
                border-white/10
                focus:border-cyan-500
                rounded-xl
                px-5
                py-4
                text-white
                outline-none
                transition
              "
            />

          </div>


          {/* BATCH */}

          <select
            value={selectedBatch}
            onChange={(e) =>
              setSelectedBatch(
                e.target.value
              )
            }
            className="
              bg-[#0a0f1a]
              border
              border-white/10
              focus:border-cyan-500
              rounded-xl
              px-5
              py-4
              text-white
              outline-none
              min-w-[180px]
            "
          >

            <option value="All">
              All Batches
            </option>

            {batches.map((batch) => (

              <option
                key={batch}
                value={batch}
              >

                Batch {batch}

              </option>

            ))}

          </select>

        </div>


        {/* ============================================
            RESULTS COUNT
        ============================================ */}

        <div className="flex items-center justify-between mb-10">

          <p className="text-gray-400">

            Showing{" "}

            <span className="text-white font-semibold">
              {filteredSeniors.length}
            </span>

            {" "}senior
            {filteredSeniors.length !== 1
              ? "s"
              : ""}

          </p>

        </div>


        {/* ============================================
            EMPTY
        ============================================ */}

        {filteredSeniors.length === 0 && (

          <div
            className="
              bg-[#121a2d]
              border
              border-white/10
              rounded-3xl
              p-16
              text-center
            "
          >

            <div className="text-5xl mb-5">
              🔍
            </div>

            <h2 className="text-2xl font-bold text-white">
              No seniors found
            </h2>

            <p className="text-gray-400 mt-3">
              Try changing your search or batch filter.
            </p>

          </div>

        )}


        {/* ============================================
            GROUP BY BATCH
        ============================================ */}

        {groupedBatches.map((batch) => (

          <section
            key={batch}
            className="mb-16"
          >

            {/* BATCH HEADER */}

            <div
              className="
                flex
                items-center
                gap-4
                mb-7
              "
            >

              <h2 className="text-3xl font-bold text-white">

                Batch{" "}

                <span className="text-cyan-400">
                  {batch}
                </span>

              </h2>


              <div className="h-px flex-1 bg-white/10" />


              <span
                className="
                  bg-cyan-500/10
                  text-cyan-400
                  px-4
                  py-2
                  rounded-full
                  text-sm
                "
              >

                {grouped[batch].length}

                {" "}

                Senior
                {grouped[batch].length !== 1
                  ? "s"
                  : ""}

              </span>

            </div>


            {/* CARDS */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {grouped[batch].map(
                (senior) => (

                  <SeniorCard
                    key={senior._id}
                    senior={senior}
                    onClick={
                      setSelectedSenior
                    }
                  />

                )
              )}

            </div>

          </section>

        ))}

      </div>


      {/* ============================================
          PROFILE MODAL
      ============================================ */}

      {selectedSenior && (

        <SeniorProfileModal
          senior={selectedSenior}
          onClose={() =>
            setSelectedSenior(null)
          }
        />

      )}

    </div>

  );
}