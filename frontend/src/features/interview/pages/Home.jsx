import { useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview.js";
import AppBackground from "../../../components/ui/AppBackground.jsx";
import AppHeader from "../../../components/ui/AppHeader.jsx";
import JobDescriptionInput from "../components/JobDescriptionInput.jsx";
import ResumeUpload from "../components/ResumeUpload.jsx";
import SelfDescriptionInput from "../components/SelfDescriptionInput.jsx";
import HomeActions from "../components/HomeActions.jsx";

const Home = () => {
  const { loading, resumeLoading, generateReport, downloadResume } =
    useInterview();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [error, setError] = useState("");

  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5MB");
      return;
    }
    setError("");
    setResume(file);
  };

  const validateInputs = () => {
    if (!jobDescription.trim()) {
      setError("Please paste the job description");
      return false;
    }
    if (!resume && !selfDescription.trim()) {
      setError("Either a resume or a self description is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateInputs()) return;

    try {
      const data = await generateReport({
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
    }
  };

  const handleDownloadResume = async () => {
    setError("");
    if (!validateInputs()) return;

    try {
      await downloadResume({ resume, jobDescription, selfDescription });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate resume PDF");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AppBackground />
      <AppHeader activeLink="home" />

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Create Your Custom{" "}
            <em className="font-serif italic text-neutral-400 not-italic-none">
              Interview Plan
            </em>
          </h2>
          <p className="text-neutral-400 mt-3 text-[15px]">
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
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
              />

              <div className="p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-neutral-200">
                    👤 Your Profile
                  </span>
                </div>
                <ResumeUpload resume={resume} onFileSelect={handleFileSelect} />
                <SelfDescriptionInput
                  value={selfDescription}
                  onChange={setSelfDescription}
                />
              </div>
            </div>

            <HomeActions
              loading={loading}
              resumeLoading={resumeLoading}
              onDownloadResume={handleDownloadResume}
            />
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
