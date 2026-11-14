const SelfDescriptionInput = ({ value, onChange }) => {
  return (
    <>
      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs tracking-widest text-neutral-400">OR</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <label
        htmlFor="self-description"
        className="mb-3 text-sm text-neutral-300"
      >
        Quick Self-Description
      </label>
      <textarea
        id="self-description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
        rows={4}
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-relaxed text-neutral-100 placeholder-neutral-500 outline-none transition-colors focus:border-white/40 sm:text-[15px]"
      />

      <p className="mt-5 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-[13px] leading-relaxed text-neutral-300">
        Either a <strong className="font-semibold text-white">Resume</strong> or
        a <strong className="font-semibold text-white">Self Description</strong>{" "}
        is required to generate a personalized plan.
      </p>
    </>
  );
};

export default SelfDescriptionInput;
