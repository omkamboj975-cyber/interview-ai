const MAX_JD_CHARS = 5000;

const JobDescriptionInput = ({ value, onChange }) => {
  return (
    <div className="flex h-full flex-col p-5 sm:p-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <label
          htmlFor="job-description"
          className="text-base font-semibold text-white"
        >
          Target Job Description
        </label>
        <span className="rounded-full border border-white/25 bg-white/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-200">
          Required
        </span>
      </div>
      <textarea
        id="job-description"
        value={value}
        onChange={(e) =>
          e.target.value.length <= MAX_JD_CHARS && onChange(e.target.value)
        }
        placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
        className="min-h-56 w-full flex-1 resize-none rounded-2xl border border-white/10 bg-black/40 p-4 text-sm leading-relaxed text-neutral-100 placeholder-neutral-500 outline-none transition-colors focus:border-white/40 sm:min-h-80 sm:p-5 sm:text-[15px]"
      />
      <p className="mt-3 text-right text-xs text-neutral-400">
        {value.length} / {MAX_JD_CHARS} chars
      </p>
    </div>
  );
};

export default JobDescriptionInput;
