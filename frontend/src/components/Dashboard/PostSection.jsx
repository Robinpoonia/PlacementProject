import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyExperiences } from "../../store/slices/experienceSlice";

import PostCard from "./PostCard";
import Loading from "../Layout/Loading";

export default function PostSection() {
  const dispatch = useDispatch();

  const {
    data: posts,
    loading,
    error,
  } = useSelector((state) => state.experience);

  useEffect(() => {
    dispatch(fetchMyExperiences());
  }, [dispatch]);

  // SAME AS YOUR RESUMES.JSX
  if (loading) {
    return (
      <Loading
        text="Loading Experiences..."
        fullScreen
      />
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-20">
        {error}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-[#1a1f2e] rounded-xl p-10 text-center">
        <h2 className="text-white text-xl font-semibold">
          No Experiences Yet
        </h2>

        <p className="text-gray-400 mt-3">
          Share your first interview experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}
    </div>
  );
}