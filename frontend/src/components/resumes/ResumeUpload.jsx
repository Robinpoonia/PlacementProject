import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadResumeAction } from "../../store/slices/ResumeSlice";
import Loading from "../../components/Layout/Loading";

export default function ResumeUpload() {
  const dispatch = useDispatch();
  const { uploadLoading } = useSelector((state) => state.resumes);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select PDF");
      return;
    }
    
    try {
      setSuccess(false); // Reset success state before starting a new upload
      // .unwrap() allows us to run code specifically when the thunk succeeds
      await dispatch(uploadResumeAction(file)).unwrap();
      setSuccess(true);
      setFile(null); // Clear the selected file from state on success
    } catch (err) {
      console.error("Upload failed: ", err);
    }
  };

  if (uploadLoading) {
    return <Loading text="Uploading Resume..." fullScreen />;
  }

  return (
    <div className="rounded-2xl bg-[#121a2d] p-8">
      <h2 className="text-white text-3xl mb-6">Upload Resume</h2>

      {/* Success Message Banner */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500 text-green-400 text-center font-medium">
          Resume uploaded successfully!
        </div>
      )}

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setSuccess(false); // Hide the success banner if they pick a new file
        }}
      />

      <button
        onClick={handleUpload}
        className="mt-6 w-full bg-cyan-500 py-4 rounded-xl text-white font-medium hover:bg-cyan-600 transition"
      >
        Upload Resume
      </button>
    </div>
  );
}