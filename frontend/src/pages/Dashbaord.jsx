import { useState } from "react";

import PostSection from "../components/dashboard/PostSection";
import ResumeSection from "../components/dashboard/ResumeSection";

export default function Dashboard() {

  const [activeTab, setActiveTab] = useState("posts");

  return (

    <div className="max-w-7xl mx-auto pt-24 px-6">

      <h1 className="text-4xl font-bold text-white">
        Dashboard
      </h1>

      <p className="text-gray-400 mt-2">
        Manage your interview experiences and resumes.
      </p>

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => setActiveTab("posts")}
          className={`px-5 py-2 rounded-lg transition ${
            activeTab === "posts"
              ? "bg-cyan-500 text-white"
              : "bg-[#1a1f2e] text-gray-300"
          }`}
        >
          My Posts
        </button>

        <button
          onClick={() => setActiveTab("resumes")}
          className={`px-5 py-2 rounded-lg transition ${
            activeTab === "resumes"
              ? "bg-cyan-500 text-white"
              : "bg-[#1a1f2e] text-gray-300"
          }`}
        >
          My Resumes
        </button>

      </div>

      <div className="mt-8">

        {activeTab === "posts"
          ? <PostSection />
          : <ResumeSection />}

      </div>

    </div>

  );

}