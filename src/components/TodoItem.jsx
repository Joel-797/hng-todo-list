import { useState } from "react";

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  function saveEdit() {
    onEdit(todo.id, draft);
    setIsEditing(false);
  }

  function cancelEdit() {
    setDraft(todo.title);
    setIsEditing(false);
  }

  return (
    <li className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "active" : "completed"}`}
        className="mt-1 h-4 w-4 shrink-0 accent-indigo-500"
      />

      {isEditing ? (
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") saveEdit();
              if (event.key === "Escape") cancelEdit();
            }}
            autoFocus
            className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveEdit}
              className="rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-400"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p
            className={`min-w-0 flex-1 break-words ${
              todo.completed ? "text-slate-500 line-through" : "text-slate-100"
            }`}
          >
            {todo.title}
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="rounded-lg px-2 py-1 text-sm text-rose-400 hover:bg-rose-500/10"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
