import { useEffect, useState } from "react";

const STORAGE_KEY = "hng-todo-list";

function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    const trimmed = title.trim();
    if (!trimmed) return;

    setTodos((current) => [
      {
        id: crypto.randomUUID(),
        title: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
      ...current,
    ]);
  }

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function editTodo(id, title) {
    const trimmed = title.trim();
    if (!trimmed) return;

    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, title: trimmed } : todo))
    );
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
  };
}
