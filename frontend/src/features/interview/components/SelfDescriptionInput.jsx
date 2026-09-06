const SelfDescriptionInput = ({ value, onChange }) => {
  return (
    <>
      <div className="flex items-center gap-3 my-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-neutral-500">OR</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <span className="text-sm text-neutral-300 mb-2">
        Quick Self-Description
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
        rows={3}
        className="w-full bg-black/40 border border-white/10 focus:border-pink-500/60 rounded-xl px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none transition-colors resize-none"
      />

      <div className="flex items-start gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs rounded-xl px-3 py-2 mt-4">
        <span>ℹ️</span>
        <span>
          Either a <strong>Resume</strong> or a{" "}
          <strong>Self Description</strong> is required to generate a
          personalized plan.
        </span>
      </div>
    </>
  );
};

export default SelfDescriptionInput;
