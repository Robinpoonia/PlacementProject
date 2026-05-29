import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResumes } from "../store/slices/resumeSlice";
import ResumeCard from "../components/resumes/ResumeCard";
import Loading from "../components/Layout/Loading";

export default function Resumes() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.resumes);

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  if (loading) {
    return <Loading text="Loading Resumes..." fullScreen />;
  }

  if (error) {
    return <div className="text-red-500 text-center pt-28">{error}</div>;
  }

  return (
    <div className="min-h-screen pt-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-10">
          Senior Resumes
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {data && data.length > 0 ? (
            data.map((item) => (
              <ResumeCard key={item._id} item={item} />
            ))
          ) : (
            <p className="text-gray-400 text-xl">No resumes uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
}