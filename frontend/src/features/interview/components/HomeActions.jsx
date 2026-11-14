import Button from "../../../components/ui/Button.jsx";

const HomeActions = ({ loading, resumeLoading, onDownloadResume }) => {
  return (
    <div className="flex flex-col-reverse items-stretch gap-4 border-t border-white/10 bg-black/35 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
      <span className="text-center text-xs text-neutral-400 lg:text-left">
        AI-Powered Strategy Generation · Approx 30s
      </span>
      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        <Button
          type="button"
          variant="ghost"
          onClick={onDownloadResume}
          disabled={resumeLoading}
          className="w-full px-6 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {resumeLoading ? "Generating..." : "Tailored Resume PDF"}
        </Button>
        <Button
          type="submit"
          variant="solid"
          disabled={loading}
          className="w-full px-6 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Generating..." : "Generate My Interview Strategy"}
        </Button>
      </div>
    </div>
  );
};

export default HomeActions;
