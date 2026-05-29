import ExperienceForm from '../components/experiences/ExperienceForm';
import ResumeUpload from '../components/resumes/ResumeUpload';

export default function NewExperience() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isSenior = user?.role === 'senior';

  return (
    <div className="min-h-screen pt-28 px-6 bg-[#0b0f19]">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Clear Section Header to guide the user */}
        <div>
          <h1 className="text-white text-4xl font-bold mb-2">Share Your Placement Intel</h1>
          <p className="text-gray-400">Please complete both sections below to help juniors navigate the drive.</p>
        </div>

        {/* Step 1: Document Upload */}
        {isSenior && (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white font-bold text-sm">1</span>
              <h3 className="text-xl font-semibold text-white">Upload Your Shortlisted Resume</h3>
            </div>
            <ResumeUpload />
          </div>
        )}

        {/* Step 2: The Interview Experience Form */}
        <div className="space-y-3">
          {isSenior && (
            <div className="flex items-center space-x-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white font-bold text-sm">2</span>
              <h3 className="text-xl font-semibold text-white">Interview Round Details</h3>
            </div>
          )}
          <ExperienceForm />
        </div>

      </div>
    </div>
  );
}