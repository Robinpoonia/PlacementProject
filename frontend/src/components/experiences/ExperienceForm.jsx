import { useState } from 'react';

export default function ExperienceForm() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    company: '',
    roundType: 'OT',
    description: '',
    result: 'Qualified',
    nextRoundDetails: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // If they pick "Selected", wipe out results and next round text fields
      if (name === 'roundType' && value === 'Selected') {
        updatedData.result = ''; 
        updatedData.nextRoundDetails = '';
      } else if (name === 'roundType' && value !== 'Selected') {
        // Fallback defaults if they switch back away from "Selected"
        updatedData.result = 'Qualified';
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        alert('Login first');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed');
      }

      setPreview(data);
      alert('Experience Submitted');

      setFormData({
        company: '',
        roundType: 'OT',
        description: '',
        result: 'Qualified',
        nextRoundDetails: '',
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* COMPANY */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          placeholder="Company"
          className="w-full rounded-xl bg-[#071022] p-5 text-white outline-none"
        />

        {/* ROUND */}
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

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={7}
          placeholder="Share your experience"
          className="w-full rounded-xl bg-[#071022] p-5 text-white outline-none"
        />

        {/* CONDITIONAL SECTIONS: Only show if round type is NOT 'Selected' */}
        {formData.roundType !== 'Selected' && (
          <>
            {/* RESULT */}
            <select
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#071022] p-5 text-white"
            >
              <option value="Qualified">Qualified</option>
              <option value="Not Qualified">Not Qualified</option>
            </select>

            {/* NEXT ROUND */}
            {formData.result === 'Qualified' && (
              <textarea
                name="nextRoundDetails"
                value={formData.nextRoundDetails}
                onChange={handleChange}
                rows={4}
                placeholder="Next round details"
                className="w-full rounded-xl bg-[#071022] p-5 text-white outline-none"
              />
            )}
          </>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 py-5 text-white text-lg font-bold hover:bg-cyan-600 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* PREVIEW */}
      {preview && (
        <div className="mt-10 rounded-2xl bg-[#101b31] p-8 text-white">
          <h2 className="text-3xl mb-5">Experience Preview</h2>
          <p>🏢 {preview.company}</p>
          <p>🎯 {preview.roundType}</p>
          <p>¼ {preview.description}</p>
          {preview.result && <p>✅ {preview.result}</p>}
          {preview.nextRoundDetails && <p>➡️ {preview.nextRoundDetails}</p>}
        </div>
      )}
    </div>
  );
}