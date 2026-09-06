const sections = [
  { key: "technical", label: "Technical Questions", icon: "</>" },
  { key: "behavioral", label: "Behavioral Questions", icon: "💬" },
  { key: "roadmap", label: "Road Map", icon: "🚀" },
];

const ReportNav = ({ activeSection, onSelect }) => (
  <aside className="w-full md:w-56 border-b md:border-b-0 md:border-r border-white/10 p-4">
    <p className="text-xs font-semibold text-neutral-500 tracking-wide mb-3 px-2">
      SECTIONS
    </p>
    <nav className="space-y-1">
      {sections.map((s) => (
        <button
          key={s.key}
          onClick={() => onSelect(s.key)}
          className={`w-full flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors ${
            activeSection === s.key
              ? "bg-pink-600/15 text-pink-400 font-medium"
              : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
          }`}
        >
          <span className="text-xs">{s.icon}</span>
          {s.label}
        </button>
      ))}
    </nav>
  </aside>
);

export default ReportNav;
