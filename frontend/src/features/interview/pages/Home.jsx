import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { generateInterviewReport } from "../services/interview.api.js";

const MAX_JD_CHARS = 5000;

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError("File must be under 5MB");
      return;
    }
    setError("");
    setResume(file);
  };

  const handleFileInput = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!jobDescription.trim()) {
      setError("Please paste the job description");
      return;
    }
    if (!resume && !selfDescription.trim()) {
      setError("Either a resume or a self description is required");
      return;
    }

    setLoading(true);
    try {
      const data = await generateInterviewReport({
        resume,
        jobDescription,
        selfDescription,
      });
      navigate(`/report/${data.report._id}`, {
        state: { report: data.report },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Top nav */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">
          Interview<span className="text-pink-500">Sync</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-400">
            {user?.name ? `Hi, ${user.name}` : "Welcome"}
          </span>
          <Link
            to="/history"
            className="text-sm text-neutral-400 hover:text-pink-400 transition-colors"
          >
            History
          </Link>
          <button
            onClick={logout}
            className="text-sm px-4 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:border-pink-500 hover:text-pink-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-14">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Create Your Custom{" "}
            <span className="text-pink-500">Interview Plan</span>
          </h2>
          <p className="text-neutral-400 mt-3">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
              {/* Left: Job description */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-neutral-200">
                    Target Job Description
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 rounded-full">
                    REQUIRED
                  </span>
                </div>
                <textarea
                  value={jobDescription}
                  onChange={(e) =>
                    e.target.value.length <= MAX_JD_CHARS &&
                    setJobDescription(e.target.value)
                  }
                  placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                  className="w-full h-52 bg-transparent text-neutral-200 placeholder-neutral-500 text-sm outline-none resize-none"
                />
                <p className="text-right text-xs text-neutral-500 mt-2">
                  {jobDescription.length} / {MAX_JD_CHARS} chars
                </p>
              </div>

              {/* Right: Resume / self description */}
              <div className="p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-neutral-200">
                    Your Profile
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-300">
                    Upload Resume
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 rounded-full">
                    BEST RESULTS
                  </span>
                </div>

                <label
                  htmlFor="resume-upload"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 py-6 cursor-pointer transition-colors ${
                    dragActive
                      ? "border-pink-500 bg-pink-500/5"
                      : "border-neutral-700 hover:border-pink-500/60"
                  }`}
                >
                  <span className="text-pink-500 text-xl">⇧</span>
                  <span className="text-sm text-neutral-300 font-medium">
                    {resume ? resume.name : "Click to upload or drag & drop"}
                  </span>
                  <span className="text-xs text-neutral-500">
                    PDF (Max 5MB)
                  </span>
                </label>
                <input
                  id="resume-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />

                <div className="flex items-center gap-3 my-4">
                  <div className="h-px flex-1 bg-neutral-800" />
                  <span className="text-xs text-neutral-500">OR</span>
                  <div className="h-px flex-1 bg-neutral-800" />
                </div>

                <span className="text-sm text-neutral-300 mb-2">
                  Quick Self-Description
                </span>
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-pink-500 rounded-xl px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none transition-colors resize-none"
                />

                <div className="flex items-start gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs rounded-xl px-3 py-2 mt-4">
                  <span>
                    Either a <strong>Resume</strong> or a{" "}
                    <strong>Self Description</strong> is required to generate a
                    personalized plan.
                  </span>
                </div>
              </div>
            </div>

            {/* Footer bar */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-neutral-900/60">
              <span className="text-xs text-neutral-500">
                AI-Powered Strategy Generation · Approx 30s
              </span>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-pink-600 from-pink-600 to-rose-600 text-white text-sm font-semibold shadow-lg shadow-pink-600/20 hover:shadow-pink-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "★ Generate My Interview Strategy"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
