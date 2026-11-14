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
    <div className="relative isolate min-h-screen bg-black text-white">
      <AppBackground />
      <AppHeader activeLink="home" />

      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-8 flex flex-col items-center text-center sm:mb-12">
          <span className="mb-5 rounded-lg border border-white/10 bg-white/[0.07] px-4 py-1.5 text-xs text-neutral-200 sm:text-[13px]">
            AI-Powered Interview Preparation
          </span>
          <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Create Your Custom{" "}
            <em className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text pr-1 font-serif font-normal italic text-transparent">
              Interview Plan
            </em>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-400 sm:mt-5 sm:text-lg">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
              />

              <div className="flex flex-col p-5 sm:p-8">
                <span className="mb-4 text-base font-semibold text-white">
                  Your Profile
                </span>
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
