import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadResumeAction } from "../../store/slices/ResumeSlice";
import Loading from "../../components/Layout/Loading";

export default function ResumeUpload() {
  const dispatch = useDispatch();

  const { uploadLoading } = useSelector((state) => state.resumes);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!title.trim()) {
      alert("Enter resume title");
      return;
    }

    if (!file) {
      alert("Select PDF");
      return;
    }

    try {
      setSuccess(false);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("resume", file);

      await dispatch(uploadResumeAction(formData)).unwrap();

      setSuccess(true);

      setTitle("");
      setFile(null);

      document.getElementById("resumeInput").value = "";
    } catch (err) {
      console.error(err);
      alert(err.message || "Upload failed");
    }
  };

  if (uploadLoading) {
    return <Loading text="Uploading Resume..." fullScreen />;
  }

  return (
    <div className="rounded-2xl bg-[#121a2d] p-8">

      <h2 className="text-3xl text-white mb-6">
        Upload Resume
      </h2>

      {success && (
        <div className="mb-6 rounded-xl border border-green-500 bg-green-500/10 p-4 text-center text-green-400">
          Resume uploaded successfully.
        </div>
      )}

      <input
        type="text"
        placeholder="Resume Title (Example: Amazon Resume)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-5 w-full rounded-xl bg-[#071022] p-4 text-white outline-none"
      />

      <input
        id="resumeInput"
        type="file"
        accept=".pdf"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setSuccess(false);
        }}
      />

      {file && (
        <p className="mt-3 text-gray-400">
          Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        className="mt-6 w-full rounded-xl bg-cyan-500 py-4 font-medium text-white hover:bg-cyan-600"
      >
        Upload Resume
      </button>
    </div>
  );
}