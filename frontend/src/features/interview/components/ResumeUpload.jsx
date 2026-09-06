import { useState } from "react";

const ResumeUpload = ({ resume, onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    onFileSelect(e.dataTransfer.files[0]);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-neutral-300">Upload Resume</span>
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
            : "border-white/15 hover:border-pink-500/50"
        }`}
      >
        <span className="text-pink-500 text-xl">⇧</span>
        <span className="text-sm text-neutral-300 font-medium">
          {resume ? resume.name : "Click to upload or drag & drop"}
        </span>
        <span className="text-xs text-neutral-500">PDF (Max 5MB)</span>
      </label>
      <input
        id="resume-upload"
        type="file"
        accept="application/pdf"
        onChange={(e) => onFileSelect(e.target.files[0])}
        className="hidden"
      />
    </>
  );
};

export default ResumeUpload;
