import Button from "../../../components/ui/Button.jsx";

const HomeActions = ({ loading, resumeLoading, onDownloadResume }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-black/30">
      <span className="text-xs text-neutral-500">
        AI-Powered Strategy Generation · Approx 30s
      </span>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Button
          type="button"
          variant="ghost"
          onClick={onDownloadResume}
          disabled={resumeLoading}
          className="flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resumeLoading ? "Generating..." : "⬇ Tailored Resume PDF"}
        </Button>
        <Button
          type="submit"
          variant="solid"
          disabled={loading}
          className="flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "★ Generate My Interview Strategy"}
        </Button>
      </div>
    </div>
  );
};

export default HomeActions;
