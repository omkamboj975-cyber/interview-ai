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
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm text-neutral-300">Upload Resume</span>
        <span className="rounded-full border border-white/25 bg-white/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-200">
          Best results
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
        className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-colors sm:py-10 ${
          dragActive
            ? "border-white/70 bg-white/[0.08]"
            : "border-white/20 bg-white/[0.02] hover:border-white/50 hover:bg-white/[0.05]"
        }`}
      >
        <span className="break-all text-sm font-semibold text-neutral-100 sm:text-[15px]">
          {resume ? resume.name : "Click to upload or drag & drop"}
        </span>
        <span className="text-xs text-neutral-400">PDF (Max 5MB)</span>
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
