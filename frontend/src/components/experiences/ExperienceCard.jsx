import { useState } from "react";

export default function ExperienceCard({ experience }) {
  const [show, setShow] = useState(false);

  const openResume = (e) => {
    // e.stopPropagation() prevents clicking the button from triggering parent click events
    e.stopPropagation();
    if (experience?.user?.resumeUrl) {
      window.open(experience.user.resumeUrl, "_blank");
    }
  };

  return (
    <>
      {/* CARD */}
      <div
        className="bg-[#121a2d] rounded-3xl p-8 cursor-pointer hover:border hover:border-cyan-500/20 transition"
        onClick={() => setShow(true)}
      >
        <h2 className="text-4xl font-bold text-white">
          {experience.company}
        </h2>
        <p className="text-cyan-400 mb-6 mt-2">
          {experience.roundType}
        </p>
        <p className="text-gray-300 line-clamp-3">
          {experience.description}
        </p>
        <button className="mt-6 text-cyan-400 hover:text-cyan-300">
          View Full →
        </button>
      </div>

      {/* MODAL */}
      {show && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-6">
          <div className="bg-[#121a2d] w-full max-w-3xl rounded-3xl p-10 relative max-h-[90vh] overflow-y-auto">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300"
            >
              ×
            </button>

            {/* HEADER */}
            <h1 className="text-5xl font-bold text-white mb-4">
              {experience.company}
            </h1>
            <p className="text-cyan-400">
              Round: {experience.roundType}
            </p>
            <p className="text-white mt-3">
              Author: {experience.user?.name || "Unknown"}
            </p>

            {/* DESCRIPTION */}
            <div className="mt-8 text-gray-300 whitespace-pre-wrap leading-8">
              {experience.description}
            </div>

            {/* RESULT */}
            {experience?.result && (
              <div className="mt-8">
                <p className="text-green-400">
                  Result: {experience.result}
                </p>
              </div>
            )}

            {/* NEXT ROUND */}
            {experience?.nextRoundDetails && (
              <div className="mt-6">
                <p className="text-yellow-400 font-semibold">Next Round</p>
                <p className="text-gray-300 mt-2">
                  {experience.nextRoundDetails}
                </p>
              </div>
            )}

            {/* RESUME BUTTON */}
            {experience?.user?.resumeUrl ? (
              <button
                onClick={openResume}
                className="mt-8 inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition"
              >
                📄 View Resume
              </button>
            ) : (
              <div className="mt-8 text-red-400 font-medium">
                Resume not uploaded
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}