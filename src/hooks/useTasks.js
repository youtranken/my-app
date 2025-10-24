import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext.js';

export function useTasks() {
  return useContext(TaskContext);
}
