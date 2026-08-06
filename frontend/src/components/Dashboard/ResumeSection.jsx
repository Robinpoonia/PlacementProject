import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMyResumes,
  deleteResumeAction,
  setDefaultResumeAction,
} from "../../store/slices/ResumeSlice";

import Loading from "../Layout/Loading";

export default function ResumeSection() {
  const dispatch = useDispatch();

  const {
    data: resumes,
    loading,
    error,
    deleteLoading,
    defaultLoading,
  } = useSelector((state) => state.resumes);

  // =====================================================
  // FETCH MY RESUMES
  // =====================================================

  useEffect(() => {
    dispatch(fetchMyResumes());
  }, [dispatch]);

  // =====================================================
  // DELETE RESUME
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteResumeAction(id)).unwrap();
    } catch (error) {
      console.error("Delete resume error:", error);

      alert(
        error?.message ||
          "Failed to delete resume"
      );
    }
  };

  // =====================================================
  // SET DEFAULT
  // =====================================================

  const handleDefault = async (id) => {
    try {
      await dispatch(
        setDefaultResumeAction(id)
      ).unwrap();
    } catch (error) {
      console.error(
        "Set default resume error:",
        error
      );

      alert(
        error?.message ||
          "Failed to set default resume"
      );
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="py-20">
        <Loading text="Loading Your Resumes..." />
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div
        className="
          bg-red-500/10
          border
          border-red-500/30
          rounded-2xl
          p-8
          text-center
        "
      >
        <p className="text-red-400">
          {error}
        </p>

        <button
          type="button"
          onClick={() =>
            dispatch(fetchResumes())
          }
          className="
            mt-5
            px-5
            py-2
            bg-cyan-500
            hover:bg-cyan-600
            text-white
            rounded-lg
          "
        >
          Try Again
        </button>
      </div>
    );
  }

  // =====================================================
  // NO RESUMES
  // =====================================================

  if (!resumes || resumes.length === 0) {
    return (
      <div
        className="
          bg-[#1a1f2e]
          border
          border-cyan-500/10
          rounded-2xl
          p-12
          text-center
        "
      >
        <div className="text-5xl mb-4">
          📄
        </div>

        <h2 className="text-2xl font-bold text-white">
          No Resumes Yet
        </h2>

        <p className="text-gray-400 mt-3">
          Upload your first resume to use it
          with your interview experiences.
        </p>

        <a
          href="/experiences/new"
          className="
            inline-block
            mt-6
            px-6
            py-3
            bg-cyan-500
            hover:bg-cyan-600
            text-white
            rounded-xl
            font-semibold
          "
        >
          Upload Resume
        </a>
      </div>
    );
  }

  // =====================================================
  // RESUME UI
  // =====================================================

  return (
    <div>
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          justify-between
          gap-4
          mb-6
        "
      >
        <div>
          <h2 className="text-2xl font-bold text-white">
            My Resumes
          </h2>

          <p className="text-gray-400 mt-1">
            Manage resumes and choose your
            default resume.
          </p>
        </div>

        <a
          href="/resume"
          className="
            px-5
            py-3
            bg-cyan-500
            hover:bg-cyan-600
            text-white
            rounded-xl
            font-semibold
            text-center
          "
        >
          + Upload Resume
        </a>
      </div>

      {/* RESUME GRID */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-5
        "
      >
        {resumes.map((resume) => (
          <div
            key={resume._id}
            className={`
              relative
              bg-[#1a1f2e]
              border
              rounded-2xl
              p-6
              transition

              ${
                resume.isDefault
                  ? "border-cyan-500"
                  : "border-cyan-500/20"
              }
            `}
          >
            {/* DEFAULT BADGE */}

            {resume.isDefault && (
              <span
                className="
                  absolute
                  top-4
                  right-4
                  bg-cyan-500/20
                  text-cyan-400
                  text-xs
                  font-semibold
                  px-3
                  py-1
                  rounded-full
                "
              >
                Default
              </span>
            )}

            {/* ICON */}

            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-cyan-500/10
                flex
                items-center
                justify-center
                text-2xl
                mb-5
              "
            >
              📄
            </div>

            {/* TITLE */}

            <h3
              className="
                text-xl
                font-bold
                text-white
                pr-20
                break-words
              "
            >
              {resume.title ||
                "Untitled Resume"}
            </h3>

            {/* DATE */}

            {resume.createdAt && (
              <p className="text-gray-500 text-sm mt-2">
                Uploaded{" "}
                {new Date(
                  resume.createdAt
                ).toLocaleDateString()}
              </p>
            )}

            {/* VIEW */}

{resume.resumeUrl && (
  <button
    type="button"
    onClick={() => {
      const rawUrl = resume.resumeUrl;

      const browserViewableUrl =
        `https://docs.google.com/gview?url=${encodeURIComponent(
          rawUrl
        )}&embedded=true`;

      window.open(
        browserViewableUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }}
    className="
      block
      w-full
      mt-6
      py-3
      text-center
      bg-cyan-500
      hover:bg-cyan-600
      text-white
      rounded-xl
      font-semibold
      transition
    "
  >
    View Resume
  </button>
)}

            {/* ACTIONS */}

            <div className="flex gap-3 mt-3">
              {!resume.isDefault && (
                <button
                  type="button"
                  disabled={
                    defaultLoading
                  }
                  onClick={() =>
                    handleDefault(
                      resume._id
                    )
                  }
                  className="
                    flex-1
                    py-2.5
                    bg-yellow-500
                    hover:bg-yellow-600
                    text-white
                    rounded-lg
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  Set Default
                </button>
              )}

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() =>
                  handleDelete(
                    resume._id
                  )
                }
                className="
                  flex-1
                  py-2.5
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  rounded-lg
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}