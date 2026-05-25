export default function ResumeCard({ item }) {
  return (
    <div className="bg-[#121a2d] rounded-3xl p-6 border border-cyan-500/10">
      <h2 className="text-3xl font-bold text-white">{item.name}</h2>
      <p className="text-gray-400 mt-2">Uploaded by Senior</p>

      <button
        onClick={() => {
          // 1. Target the raw resume URL string
          const rawUrl = item.resumeUrl;
          
          // 2. Encapsulate it inside the native Google online document iframe viewport
          const browserViewableUrl = `https://docs.google.com/gview?url=${encodeURIComponent(rawUrl)}&embedded=true`;
          
          // 3. Command the browser to cleanly stream the file inside a new window
          window.open(browserViewableUrl, "_blank");
        }}
        className="block w-full mt-6 bg-cyan-500 text-white text-center p-4 rounded-xl transition-all hover:bg-cyan-600"
      >
        View Resume
      </button>
    </div>
  );
}