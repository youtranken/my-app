import { useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext.js';
import { initialTasks, initialColumns } from '../data/initial-data.js';
import { useAuth } from '../hooks/useAuth.js';

const readStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn(`Không thể đọc ${key} từ localStorage:`, error);
    return fallback;
  }
};

export default function TaskProvider({ children }) {
  const { currentUser } = useAuth();

  const [tasks, setTasks] = useState(() => readStorage('tasks', initialTasks));

  const [columns, setColumns] = useState(() => readStorage('columns', initialColumns));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  const addTask = ({ content, assignedTo }) => {
    const id = `t-${Date.now()}`;
    const newTask = { id, content, assignedTo, status: 'todo', createdBy: currentUser?.id ?? 'u-1' };
    setTasks(prev => ({ ...prev, [id]: newTask }));
    setColumns(prev => ({ ...prev, todo: { ...prev.todo, taskIds: [...prev.todo.taskIds, id] } }));
  };

  const moveTask = ({ taskId, fromCol, toCol, toIndex }) => {
    const fromIds = [...(columns[fromCol]?.taskIds || [])].filter(id => id !== taskId);
    const toIds = [...(columns[toCol]?.taskIds || [])];
    toIds.splice(toIndex, 0, taskId);
    setColumns(prev => ({
      ...prev,
      [fromCol]: { ...prev[fromCol], taskIds: fromIds },
      [toCol]: { ...prev[toCol], taskIds: toIds },
    }));
    setTasks(prev => ({ ...prev, [taskId]: { ...prev[taskId], status: toCol } }));
  };

  return (
    <TaskContext.Provider value={{ tasks, columns, addTask, moveTask, setTasks, setColumns }}>
      {children}
    </TaskContext.Provider>
  );
}
