import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResumes } from "../store/slices/ResumeSlice";
import ResumeCard from "../components/resumes/ResumeCard";
import Loading from "../components/Layout/Loading";

export default function Resumes() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.resumes
  );

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  if (loading) {
    return <Loading text="Loading Resumes..." fullScreen />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center pt-28">
        {error}
      </div>
    );
  }

  // Group resumes by graduation batch
  const groupedResumes = data.reduce((acc, resume) => {
    const batch = resume.user?.batch || "Unknown";

    if (!acc[batch]) {
      acc[batch] = [];
    }

    acc[batch].push(resume);

    return acc;
  }, {});

  const batches = Object.keys(groupedResumes).sort();

  return (
    <div className="min-h-screen pt-28 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-bold text-white mb-12">
          Senior Resumes
        </h1>

        {batches.length === 0 ? (
          <p className="text-gray-400 text-xl">
            No resumes uploaded.
          </p>
        ) : (
          batches.map((batch) => (
            <div key={batch} className="mb-16">

              <h2 className="text-3xl font-bold text-cyan-400 mb-6">
                Batch {batch}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {groupedResumes[batch].map((item) => (
                  <ResumeCard
                    key={item._id}
                    item={item}
                  />
                ))}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}