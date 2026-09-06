const RoadMap = ({ plan }) => (
  <div>
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-xl font-medium">Preparation Road Map</h2>
      <span className="text-xs font-medium text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
        {plan?.length}-day plan
      </span>
    </div>

    <div className="relative pl-6 border-l-2 border-white/10 space-y-8">
      {plan?.map((day, i) => (
        <div key={i} className="relative">
          <span className="absolute -left-[29px] top-0 w-3 h-3 rounded-full bg-pink-500 ring-4 ring-black" />
          <span className="inline-block text-[10px] font-bold tracking-wide text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 rounded-full mb-1">
            Day {day.day}
          </span>
          <h3 className="font-semibold text-neutral-100">{day.focus}</h3>
          <ul className="mt-2 space-y-1">
            {day.tasks?.map((task, ti) => (
              <li key={ti} className="text-sm text-neutral-400 flex gap-2">
                <span className="text-neutral-600">•</span>
                {task}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default RoadMap;
