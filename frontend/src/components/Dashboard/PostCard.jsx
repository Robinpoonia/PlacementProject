import { useState } from "react";
import { useDispatch } from "react-redux";

import Loading from "../Layout/Loading";

import {
  deleteExperienceAction,
  updateExperienceAction,
} from "../../store/slices/experienceSlice";

import { getResumes } from "../../api/resumeApi";

export default function PostCard({ post }) {
  const dispatch = useDispatch();

  // =====================================================
  // MODALS
  // =====================================================

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showResume, setShowResume] = useState(false);

  // =====================================================
  // LOADING STATES
  // =====================================================

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);

  // =====================================================
  // RESUMES
  // =====================================================

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");

  // =====================================================
  // EDIT FORM
  // =====================================================

  const [editData, setEditData] = useState({
    company: post.company || "",
    roundType: post.roundType || "OT",
    description: post.description || "",
    result: post.result || "Qualified",
    nextRoundDetails: post.nextRoundDetails || "",
  });

  // =====================================================
  // DELETE EXPERIENCE
  // =====================================================

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await dispatch(
        deleteExperienceAction(post._id)
      ).unwrap();

      setShowDelete(false);
    } catch (error) {
      console.error("Delete error:", error);

      alert(
        error?.message ||
          "Failed to delete experience"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // =====================================================
  // EDIT CHANGE
  // =====================================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // Selected means placement process finished
      if (name === "roundType") {
        if (value === "Selected") {
          updated.result = "";
          updated.nextRoundDetails = "";
        } else if (!updated.result) {
          updated.result = "Qualified";
        }
      }

      // No next round if user did not qualify
      if (
        name === "result" &&
        value === "Not Qualified"
      ) {
        updated.nextRoundDetails = "";
      }

      return updated;
    });
  };

  // =====================================================
  // UPDATE EXPERIENCE
  // =====================================================

  const handleUpdate = async () => {
    if (!editData.company.trim()) {
      alert("Company name is required");
      return;
    }

    if (!editData.description.trim()) {
      alert("Description is required");
      return;
    }

    try {
      setUpdateLoading(true);

      await dispatch(
        updateExperienceAction({
          id: post._id,
          data: editData,
        })
      ).unwrap();

      setShowEdit(false);

      alert("Experience updated successfully");
    } catch (error) {
      console.error("Update error:", error);

      alert(
        error?.message ||
          "Failed to update experience"
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  // =====================================================
  // LOAD USER RESUMES
  // =====================================================

  const loadResumes = async () => {
    try {
      setResumeLoading(true);

      const data = await getResumes();

      console.log("Resume API response:", data);

      // Supports:
      // [...]
      //
      // OR
      //
      // {
      //    resumes: [...]
      // }

      const resumeList = Array.isArray(data)
        ? data
        : data?.resumes || [];

      setResumes(resumeList);

      // Preselect currently assigned resume
      if (post.resume?._id) {
        setSelectedResume(post.resume._id);
      } else if (typeof post.resume === "string") {
        setSelectedResume(post.resume);
      } else {
        setSelectedResume("");
      }
    } catch (error) {
      console.error(
        "Load resumes error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load resumes"
      );
    } finally {
      setResumeLoading(false);
    }
  };

  // =====================================================
  // OPEN RESUME MODAL
  // =====================================================

  const openResumeModal = () => {
    setShowResume(true);

    loadResumes();
  };

  // =====================================================
  // ASSIGN / CHANGE RESUME
  // =====================================================

  const handleAssignResume = async () => {
    if (!selectedResume) {
      alert("Please select a resume");
      return;
    }

    try {
      setAssignLoading(true);

      await dispatch(
        updateExperienceAction({
          id: post._id,

          data: {
            resume: selectedResume,
          },
        })
      ).unwrap();

      setShowResume(false);

      alert(
        post.resume
          ? "Resume changed successfully"
          : "Resume assigned successfully"
      );
    } catch (error) {
      console.error(
        "Assign resume error:",
        error
      );

      alert(
        error?.message ||
          "Failed to assign resume"
      );
    } finally {
      setAssignLoading(false);
    }
  };

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <>
      {/* =================================================
          POST CARD
      ================================================= */}

      <div
        className="
          bg-[#1a1f2e]
          border
          border-cyan-500/20
          rounded-2xl
          p-6
        "
      >
        {/* HEADER */}

        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {post.company}
            </h2>

            <p className="text-cyan-400 mt-1">
              {post.roundType}
            </p>
          </div>

          {/* RESULT */}

          {post.result && (
            <span
              className={`
                px-3
                py-1
                rounded-full
                text-sm
                whitespace-nowrap

                ${
                  post.result === "Qualified"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }
              `}
            >
              {post.result}
            </span>
          )}
        </div>

        {/* DESCRIPTION */}

        <p className="mt-5 text-gray-300 whitespace-pre-wrap">
          {post.description}
        </p>

        {/* NEXT ROUND */}

        {post.nextRoundDetails && (
          <div className="mt-5">
            <p className="text-sm text-gray-500">
              Next Round
            </p>

            <p className="text-gray-300 mt-1 whitespace-pre-wrap">
              {post.nextRoundDetails}
            </p>
          </div>
        )}

        {/* RESUME */}

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Resume
          </p>

          {post.resume ? (
            <div className="mt-1">
              <p className="text-white">
                {post.resume?.title ||
                  "Attached Resume"}
              </p>

              {post.resume?.resumeUrl && (
                <a
                  href={post.resume.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-block
                    mt-1
                    text-sm
                    text-cyan-400
                    hover:underline
                  "
                >
                  View Resume →
                </a>
              )}
            </div>
          ) : (
            <p className="text-white mt-1">
              No Resume Attached
            </p>
          )}
        </div>

        {/* ACTION BUTTONS */}

        <div className="flex flex-wrap gap-3 mt-8">
          {/* EDIT */}

          <button
            type="button"
            onClick={() => setShowEdit(true)}
            disabled={
              deleteLoading ||
              updateLoading ||
              assignLoading
            }
            className="
              px-4
              py-2
              rounded-lg
              bg-cyan-500
              hover:bg-cyan-600
              text-white
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Edit
          </button>

          {/* ASSIGN / CHANGE RESUME */}

          <button
            type="button"
            onClick={openResumeModal}
            disabled={
              deleteLoading ||
              updateLoading ||
              assignLoading
            }
            className="
              px-4
              py-2
              rounded-lg
              bg-yellow-500
              hover:bg-yellow-600
              text-white
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {post.resume
              ? "Change Resume"
              : "Assign Resume"}
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={() =>
              setShowDelete(true)
            }
            disabled={
              deleteLoading ||
              updateLoading ||
              assignLoading
            }
            className="
              px-4
              py-2
              rounded-lg
              bg-red-500
              hover:bg-red-600
              text-white
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Delete
          </button>
        </div>
      </div>

      {/* =================================================
          EDIT MODAL
      ================================================= */}

      {showEdit && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              bg-[#121a2d]
              border
              border-cyan-500/20
              w-full
              max-w-xl
              max-h-[90vh]
              overflow-y-auto
              rounded-2xl
              p-7
            "
          >
            {/* MODAL HEADER */}

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Edit Experience
              </h2>

              {!updateLoading && (
                <button
                  type="button"
                  onClick={() =>
                    setShowEdit(false)
                  }
                  className="
                    text-gray-400
                    hover:text-white
                    text-3xl
                  "
                >
                  ×
                </button>
              )}
            </div>

            {/* UPDATE LOADING */}

            {updateLoading ? (
              <div className="py-16">
                <Loading text="Updating Experience..." />
              </div>
            ) : (
              <>
                {/* FORM */}

                <div className="space-y-4 mt-6">
                  {/* COMPANY */}

                  <input
                    type="text"
                    name="company"
                    value={editData.company}
                    onChange={
                      handleEditChange
                    }
                    placeholder="Company"
                    className="
                      w-full
                      bg-[#071022]
                      text-white
                      p-4
                      rounded-xl
                      outline-none
                      focus:ring-2
                      focus:ring-cyan-500
                    "
                  />

                  {/* ROUND */}

                  <select
                    name="roundType"
                    value={
                      editData.roundType
                    }
                    onChange={
                      handleEditChange
                    }
                    className="
                      w-full
                      bg-[#071022]
                      text-white
                      p-4
                      rounded-xl
                      outline-none
                    "
                  >
                    <option value="OT">
                      OT
                    </option>

                    <option value="Technical">
                      Technical
                    </option>

                    <option value="HR">
                      HR
                    </option>

                    <option value="Selected">
                      Selected
                    </option>
                  </select>

                  {/* DESCRIPTION */}

                  <textarea
                    name="description"
                    value={
                      editData.description
                    }
                    onChange={
                      handleEditChange
                    }
                    rows={5}
                    placeholder="Description"
                    className="
                      w-full
                      bg-[#071022]
                      text-white
                      p-4
                      rounded-xl
                      outline-none
                      focus:ring-2
                      focus:ring-cyan-500
                    "
                  />

                  {/* RESULT */}

                  {editData.roundType !==
                    "Selected" && (
                    <select
                      name="result"
                      value={
                        editData.result
                      }
                      onChange={
                        handleEditChange
                      }
                      className="
                        w-full
                        bg-[#071022]
                        text-white
                        p-4
                        rounded-xl
                        outline-none
                      "
                    >
                      <option value="Qualified">
                        Qualified
                      </option>

                      <option value="Not Qualified">
                        Not Qualified
                      </option>
                    </select>
                  )}

                  {/* NEXT ROUND */}

                  {editData.roundType !==
                    "Selected" &&
                    editData.result ===
                      "Qualified" && (
                      <textarea
                        name="nextRoundDetails"
                        value={
                          editData.nextRoundDetails
                        }
                        onChange={
                          handleEditChange
                        }
                        rows={3}
                        placeholder="Next round details"
                        className="
                          w-full
                          bg-[#071022]
                          text-white
                          p-4
                          rounded-xl
                          outline-none
                          focus:ring-2
                          focus:ring-cyan-500
                        "
                      />
                    )}
                </div>

                {/* BUTTONS */}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      setShowEdit(false)
                    }
                    className="
                      px-5
                      py-2
                      bg-gray-700
                      hover:bg-gray-600
                      text-white
                      rounded-lg
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleUpdate
                    }
                    className="
                      px-5
                      py-2
                      bg-cyan-500
                      hover:bg-cyan-600
                      text-white
                      rounded-lg
                    "
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* =================================================
          ASSIGN RESUME MODAL
      ================================================= */}

      {showResume && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              bg-[#121a2d]
              border
              border-cyan-500/20
              w-full
              max-w-lg
              max-h-[90vh]
              overflow-y-auto
              rounded-2xl
              p-7
            "
          >
            {/* HEADER */}

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {post.resume
                  ? "Change Resume"
                  : "Assign Resume"}
              </h2>

              {!assignLoading &&
                !resumeLoading && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowResume(false)
                    }
                    className="
                      text-gray-400
                      hover:text-white
                      text-3xl
                    "
                  >
                    ×
                  </button>
                )}
            </div>

            {/* ASSIGNING */}

            {assignLoading ? (
              <div className="py-16">
                <Loading text="Assigning Resume..." />
              </div>
            ) : resumeLoading ? (
              /* LOADING RESUMES */

              <div className="py-16">
                <Loading text="Loading Resumes..." />
              </div>
            ) : resumes.length === 0 ? (
              /* NO RESUMES */

              <div className="py-10 text-center">
                <p className="text-white text-lg font-semibold">
                  No Resumes Found
                </p>

                <p className="text-gray-400 mt-2">
                  Upload a resume first and
                  then assign it to your
                  experience.
                </p>
              </div>
            ) : (
              <>
                {/* RESUME LIST */}

                <div
                  className="
                    space-y-3
                    mt-6
                    max-h-[400px]
                    overflow-y-auto
                    pr-1
                  "
                >
                  {resumes.map(
                    (resume) => (
                      <label
                        key={
                          resume._id
                        }
                        className={`
                          flex
                          items-center
                          gap-4
                          p-4
                          rounded-xl
                          cursor-pointer
                          border
                          transition

                          ${
                            selectedResume ===
                            resume._id
                              ? "border-cyan-500 bg-cyan-500/10"
                              : "border-gray-700 bg-[#071022] hover:border-gray-500"
                          }
                        `}
                      >
                        {/* RADIO */}

                        <input
                          type="radio"
                          name="resume"
                          value={
                            resume._id
                          }
                          checked={
                            selectedResume ===
                            resume._id
                          }
                          onChange={() =>
                            setSelectedResume(
                              resume._id
                            )
                          }
                        />

                        {/* RESUME INFO */}

                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold truncate">
                            {resume.title ||
                              "Untitled Resume"}
                          </p>

                          {resume.isDefault && (
                            <span
                              className="
                                inline-block
                                text-xs
                                text-cyan-400
                                mt-1
                              "
                            >
                              Default Resume
                            </span>
                          )}
                        </div>

                        {/* VIEW */}

                        {resume.resumeUrl && (
                          <a
                            href={
                              resume.resumeUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            onClick={(
                              e
                            ) =>
                              e.stopPropagation()
                            }
                            className="
                              text-cyan-400
                              hover:underline
                              text-sm
                            "
                          >
                            View
                          </a>
                        )}
                      </label>
                    )
                  )}
                </div>

                {/* BUTTONS */}

                <div className="flex justify-end gap-3 mt-7">
                  <button
                    type="button"
                    onClick={() =>
                      setShowResume(false)
                    }
                    className="
                      px-5
                      py-2
                      bg-gray-700
                      hover:bg-gray-600
                      text-white
                      rounded-lg
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={
                      !selectedResume
                    }
                    onClick={
                      handleAssignResume
                    }
                    className="
                      min-w-[150px]
                      px-5
                      py-2
                      bg-yellow-500
                      hover:bg-yellow-600
                      text-white
                      rounded-lg
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
                    {post.resume
                      ? "Change Resume"
                      : "Assign Resume"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {showDelete && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              bg-[#121a2d]
              border
              border-red-500/20
              rounded-2xl
              p-7
              w-full
              max-w-md
            "
          >
            {/* DELETE LOADING */}

            {deleteLoading ? (
              <div className="py-12">
                <Loading text="Deleting Experience..." />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white">
                  Delete Experience?
                </h2>

                <p className="text-gray-400 mt-3">
                  Are you sure you want to
                  delete your{" "}
                  <span className="text-white font-semibold">
                    {post.company}
                  </span>{" "}
                  experience?
                </p>

                <p className="text-red-400 text-sm mt-2">
                  This action cannot be
                  undone.
                </p>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      setShowDelete(
                        false
                      )
                    }
                    className="
                      px-4
                      py-2
                      bg-gray-700
                      hover:bg-gray-600
                      rounded-lg
                      text-white
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleDelete
                    }
                    className="
                      px-4
                      py-2
                      bg-red-500
                      hover:bg-red-600
                      rounded-lg
                      text-white
                    "
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}