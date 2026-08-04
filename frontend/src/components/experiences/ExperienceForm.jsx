import { useState } from "react";

export default function ExperienceForm() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    roundType: "OT",
    description: "",
    result: "Qualified",
    nextRoundDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: value,
      };

      if (name === "roundType") {
        if (value === "Selected") {
          updatedData.result = "";
          updatedData.nextRoundDetails = "";
        } else {
          updatedData.result = "Qualified";
        }
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/experience`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit experience.");
      }

      setPreview(data);

      alert("Experience submitted successfully!");

      setFormData({
        company: "",
        roundType: "OT",
        description: "",
        result: "Qualified",
        nextRoundDetails: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full rounded-xl bg-[#071022] p-5 text-white outline-none"
        />

        {/* Round */}
        <select
          name="roundType"
          value={formData.roundType}
          onChange={handleChange}
          className="w-full rounded-xl bg-[#071022] p-5 text-white"
        >
          <option value="OT">OT</option>
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Selected">Selected</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Share your interview experience"
          value={formData.description}
          onChange={handleChange}
          rows={7}
          required
          className="w-full rounded-xl bg-[#071022] p-5 text-white outline-none"
        />

        {formData.roundType !== "Selected" && (
          <>
            {/* Result */}
            <select
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#071022] p-5 text-white"
            >
              <option value="Qualified">Qualified</option>
              <option value="Not Qualified">Not Qualified</option>
            </select>

            {/* Next Round */}
            {formData.result === "Qualified" && (
              <textarea
                name="nextRoundDetails"
                placeholder="Next round details"
                value={formData.nextRoundDetails}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl bg-[#071022] p-5 text-white outline-none"
              />
            )}
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 py-5 text-lg font-bold text-white hover:bg-cyan-600 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {preview && (
        <div className="mt-10 rounded-2xl bg-[#101b31] p-8 text-white">
          <h2 className="mb-5 text-3xl font-bold">
            Experience Preview
          </h2>

          <p><strong>Company:</strong> {preview.company}</p>
          <p><strong>Round:</strong> {preview.roundType}</p>
          <p><strong>Description:</strong> {preview.description}</p>

          {preview.result && (
            <p><strong>Result:</strong> {preview.result}</p>
          )}

          {preview.nextRoundDetails && (
            <p>
              <strong>Next Round:</strong>{" "}
              {preview.nextRoundDetails}
            </p>
          )}
        </div>
      )}
    </div>
  );
}