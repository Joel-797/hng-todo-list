import { useMemo, useState } from "react";
import { useTodos } from "../hooks/useTodos.js";
import TodoFilter from "./TodoFilter.jsx";
import TodoForm from "./TodoForm.jsx";
import TodoItem from "./TodoItem.jsx";

function TodoApp() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted } =
    useTodos();
  const [filter, setFilter] = useState("all");

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, filter]);

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - remainingCount;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.28),_transparent_60%)]" />

      <main className="relative mx-auto w-full max-w-xl px-4 py-10 sm:py-16">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium tracking-wide text-indigo-300 uppercase">
            HNG Internship
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">FocusFlow</h1>
          <p className="mt-2 text-slate-400">
            A clean todo list that remembers your tasks in this browser.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 shadow-2xl shadow-indigo-950/40 backdrop-blur sm:p-6">
          <TodoForm onAdd={addTodo} />

          <div className="mt-5 space-y-4">
            <TodoFilter filter={filter} onChange={setFilter} />

            {visibleTodos.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center text-slate-500">
                {todos.length === 0
                  ? "No tasks yet. Add one above to get started."
                  : "No tasks in this filter."}
              </p>
            ) : (
              <ul className="space-y-2">
                {visibleTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </ul>
            )}
          </div>

          <footer className="mt-5 flex flex-col gap-3 border-t border-slate-800 pt-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {remainingCount} remaining
              {completedCount > 0 ? ` · ${completedCount} done` : ""}
            </p>
            {completedCount > 0 && (
              <button
                type="button"
                onClick={clearCompleted}
                className="text-left text-indigo-300 hover:text-indigo-200 sm:text-right"
              >
                Clear completed
              </button>
            )}
          </footer>
        </section>
      </main>
    </div>
  );
}

export default TodoApp;
