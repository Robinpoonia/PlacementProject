import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ExperienceList from '../components/experiences/ExperienceList';
import ExperienceFilters from '../components/experiences/ExperienceFilters';
import Loading from '../components/Layout/Loading'; // Imported your existing Loading component

export default function Experiences() {
  const [all, setAll] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('All');
  const [loading, setLoading] = useState(true); // Added loading state initialized to true

  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.user?.role || user?.role;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let data = [...all];

    if (search) {
      data = data.filter((item) =>
        item.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selected !== 'All') {
      data = data.filter((item) => item.roundType === selected);
    }

    setFiltered(data);
  }, [search, selected, all]);

  const fetchData = async () => {
    try {
      setLoading(true); // Trigger loading fallback if fetched again
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/experiences`);
      const data = await res.json();
      setAll(data);
      setFiltered(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Gracefully terminate loading state
    }
  };

  // Intercept view rendering if loading state is active
  if (loading) {
    return <Loading text="Loading Experiences..." fullScreen />;
  }

  return (
    <div className="min-h-screen pt-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-10">
          Interview Experiences
        </h1>

        {/* Senior Resume Section */}
        {role === 'senior' && (
          <div className="bg-[#121a2d] rounded-3xl p-8 mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Senior Dashboard
              </h2>
              <p className="text-gray-400 mt-2">
                Browse all uploaded resumes
              </p>
            </div>

            <Link
              to="/resume"
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-white font-semibold transition"
            >
              View All Resumes →
            </Link>
          </div>
        )}

        <ExperienceFilters
          search={search}
          setSearch={setSearch}
          selected={selected}
          setSelected={setSelected}
        />

        <ExperienceList experiences={filtered} />
      </div>
    </div>
  );
}