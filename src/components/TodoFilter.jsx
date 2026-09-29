const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

function TodoFilter({ filter, onChange }) {
  return (
    <div className="flex gap-2 rounded-xl bg-slate-900/70 p-1">
      {FILTERS.map((item) => {
        const isActive = filter === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-indigo-500 text-white"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default TodoFilter;
