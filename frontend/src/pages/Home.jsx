import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  // ============================================
  // USER
  // ============================================

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Invalid user data in localStorage");
  }

  const role = user?.user?.role || user?.role;

  // Senior/Admin/Boss can share experience
  const canShare =
    role === "senior" ||
    role === "admin" ||
    role === "boss";

  // ============================================
  // FEATURES
  // ============================================

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Real Interview Experiences",
      description:
        "Read actual OT, technical, HR and selection experiences shared by MANIT MCA seniors.",
    },

    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
          />
        </svg>
      ),
      title: "Company-Wise Preparation",
      description:
        "Explore experiences by company and interview round to understand how different hiring processes work.",
    },

    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
      ),
      title: "Senior Profiles",
      description:
        "Discover seniors batch-wise, their selected companies, placement packages and placement journeys.",
    },

    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2zm7 0v6h6"
          />
        </svg>
      ),
      title: "Resume Insights",
      description:
        "Explore resumes shared by seniors and understand what shortlisted profiles look like for different companies.",
    },
  ];

  // ============================================
  // HOW IT WORKS
  // ============================================

  const steps = [
    {
      number: "01",
      title: "Seniors Share",
      description:
        "Seniors contribute interview experiences, round details, results and placement insights.",
    },
    {
      number: "02",
      title: "Knowledge Gets Organized",
      description:
        "Experiences are organized company-wise and round-wise so useful information is easy to discover.",
    },
    {
      number: "03",
      title: "Juniors Prepare",
      description:
        "Students learn from real experiences, senior profiles and resumes before their interviews.",
    },
    {
      number: "04",
      title: "Knowledge Continues",
      description:
        "Every batch contributes back, building a stronger placement knowledge base for future MCA students.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] to-[#1a2332]">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block"
          >
            <span className="px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm">
              🚀 MCA Launchpad • MANIT Bhopal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-7 leading-tight"
          >
            Everything You Need for Your
            <span className="block text-cyan-400 mt-2">
              Placement Journey
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            A placement knowledge hub built for MCA students at MANIT
            Bhopal. Explore real interview experiences, senior profiles,
            resumes and company hiring processes — all powered by the
            knowledge of previous batches.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Link
              to="/experiences"
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition"
            >
              Explore Experiences →
            </Link>

            <Link
              to="/students"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition"
            >
              Explore Seniors
            </Link>

            {canShare && (
              <Link
                to="/experiences/new"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition"
              >
                Share Experience
              </Link>
            )}

          </div>
        </div>
      </section>

      {/* ==================================================
          FEATURES
      ================================================== */}

      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <p className="text-cyan-400 font-semibold mb-3">
              EVERYTHING IN ONE PLACE
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Prepare With Real Placement Knowledge
            </h2>

            <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
              Learn from students who have already gone through the
              placement process.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-[#1a1f2e]/60 border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/40 transition"
              >

                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-5">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ==================================================
          WHY MCA LAUNCHPAD
      ================================================== */}

      <section className="px-4 py-24">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#121a2d]/80 border border-cyan-500/20 rounded-[2rem] p-10 md:p-16 text-center"
          >

            <p className="text-cyan-400 font-semibold mb-4">
              BUILT FOR MANIT MCA
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Placement Knowledge Shouldn't
              <span className="text-cyan-400">
                {" "}Disappear Every Year
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-7 leading-8">
              Every MCA batch faces similar placement challenges.
              Valuable interview experiences, preparation strategies and
              resume insights often disappear when seniors graduate.
              MCA Launchpad preserves that knowledge and makes it
              available to the students who come next.
            </p>

          </motion.div>
        </div>
      </section>

      {/* ==================================================
          HOW IT WORKS
      ================================================== */}

      <section className="px-4 py-24 bg-[#080d16]/40">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <p className="text-cyan-400 font-semibold mb-3">
              HOW IT WORKS
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Seniors Help Juniors.
              <span className="text-cyan-400">
                {" "}Every Batch Helps the Next.
              </span>
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {steps.map((step) => (
              <motion.div
                key={step.number}
                whileHover={{ y: -6 }}
                className="bg-[#121a2d] border border-cyan-500/20 rounded-3xl p-8"
              >

                <div className="text-4xl font-bold text-cyan-400">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold text-white mt-6 mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-400 leading-7">
                  {step.description}
                </p>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ==================================================
          SENIOR NETWORK
      ================================================== */}

      <section className="px-4 py-24">
        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <p className="text-cyan-400 font-semibold mb-3">
                SENIOR NETWORK
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Learn From People Who've
                <span className="text-cyan-400">
                  {" "}Already Done It
                </span>
              </h2>

              <p className="text-gray-400 text-lg mt-6 leading-8">
                Discover MCA seniors batch-wise and learn about their
                placement journey. See where they were selected, their
                placement package and the experiences they have shared.
              </p>

              <Link
                to="/students"
                className="inline-block mt-8 px-7 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white font-semibold transition"
              >
                Explore Senior Profiles →
              </Link>

            </div>

            <div className="bg-[#121a2d] border border-cyan-500/20 rounded-3xl p-8">

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center text-3xl">
                  👨‍🎓
                </div>

                <div>

                  <p className="text-sm text-cyan-400">
                    SENIOR PROFILE
                  </p>

                  <h3 className="text-2xl font-bold text-white mt-1">
                    Placement Journey
                  </h3>

                  <p className="text-gray-400 mt-1">
                    Batch • Company • Package
                  </p>

                </div>

              </div>

              <div className="border-t border-white/10 mt-8 pt-8">

                <p className="text-gray-300 leading-7">
                  Explore senior profiles to understand placement
                  outcomes and connect interview experiences with the
                  students who went through the process.
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          RESUME SECTION
      ================================================== */}

      <section className="px-4 py-24">
        <div className="max-w-6xl mx-auto">

          <div className="bg-gradient-to-r from-cyan-500/10 to-[#121a2d] border border-cyan-500/20 rounded-[2rem] p-10 md:p-14">

            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">

              <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-4xl">
                📄
              </div>

              <div>

                <p className="text-cyan-400 font-semibold mb-2">
                  RESUME INSIGHTS
                </p>

                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Learn From Shortlisted Resumes
                </h2>

                <p className="text-gray-400 mt-4 leading-7 max-w-3xl">
                  Explore resumes shared by seniors and understand how
                  successful candidates presented their skills, projects
                  and experience during placements.
                </p>

                <Link
                  to="/resume"
                  className="inline-block mt-6 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Explore Resumes →
                </Link>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          PRIVACY
      ================================================== */}

      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col md:flex-row gap-8 items-center bg-[#121a2d] border border-white/10 rounded-3xl p-10">

            <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-3xl">
              🔒
            </div>

            <div>

              <h2 className="text-3xl font-bold text-white">
                Anonymous Experience Sharing
              </h2>

              <p className="text-gray-400 mt-3 leading-7">
                Placement knowledge should be easy to share.
                Interview experiences can be contributed anonymously,
                allowing useful insights to reach juniors while
                protecting the contributor's privacy when needed.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          FINAL CTA
      ================================================== */}

      <section className="px-4 py-28">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-cyan-400 font-semibold mb-4">
            GIVE BACK TO THE COMMUNITY
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Your Experience Could Help
            <span className="text-cyan-400">
              {" "}the Next Batch
            </span>
          </h2>

          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto leading-8">
            Every interview teaches something. Share what you learned
            and help another MANIT MCA student walk into their interview
            better prepared.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            {canShare ? (
              <Link
                to="/experiences/new"
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white font-semibold transition"
              >
                Share Your Experience →
              </Link>
            ) : (
              <Link
                to="/experiences"
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white font-semibold transition"
              >
                Explore Experiences →
              </Link>
            )}

            <Link
              to="/companies"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold transition"
            >
              Explore Companies
            </Link>

          </div>

        </div>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="text-center md:text-left">

              <h2 className="text-2xl font-bold text-white">
                🚀 MCA Launchpad
              </h2>

              <p className="text-cyan-400 text-sm mt-1">
                MANIT BHOPAL
              </p>

            </div>

            <p className="text-gray-500 text-center">
              Built for MCA students, powered by MCA students.
            </p>

            <p className="text-gray-500 text-sm">
              Made with ❤️ by @rpstylish
            </p>

          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;