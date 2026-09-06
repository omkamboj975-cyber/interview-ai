const MAX_JD_CHARS = 5000;

const JobDescriptionInput = ({ value, onChange }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-neutral-200">
          🎯 Target Job Description
        </span>
        <span className="text-[10px] font-semibold tracking-wide text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 rounded-full">
          REQUIRED
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) =>
          e.target.value.length <= MAX_JD_CHARS && onChange(e.target.value)
        }
        placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
        className="w-full h-52 bg-transparent text-neutral-200 placeholder-neutral-500 text-sm outline-none resize-none"
      />
      <p className="text-right text-xs text-neutral-500 mt-2">
        {value.length} / {MAX_JD_CHARS} chars
      </p>
    </div>
  );
};

export default JobDescriptionInput;
