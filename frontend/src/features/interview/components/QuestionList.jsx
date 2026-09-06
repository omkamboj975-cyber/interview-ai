const QuestionList = ({ title, questions }) => (
  <div>
    <h2 className="text-xl font-medium mb-6">{title}</h2>
    <div className="space-y-4">
      {questions?.map((q, i) => (
        <div
          key={i}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-5"
        >
          <p className="font-medium text-neutral-100">{q.question}</p>
          <p className="text-xs text-neutral-500 mt-2">
            <span className="text-pink-400 font-medium">
              Why this is asked:{" "}
            </span>
            {q.intention}
          </p>
          <details className="mt-3 group">
            <summary className="text-xs text-neutral-400 cursor-pointer hover:text-pink-400 transition-colors list-none flex items-center gap-1">
              <span className="group-open:rotate-90 transition-transform">
                ▸
              </span>{" "}
              View model answer
            </summary>
            <p className="text-sm text-neutral-300 mt-2 pl-4 border-l-2 border-white/10">
              {q.answer}
            </p>
          </details>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionList;
