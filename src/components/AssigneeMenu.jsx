import { useMemo } from 'react';
import { USERS } from '../data/initial-data.js';
import { useTasks } from '../hooks/useTasks.js';
import { ALL_ASSIGNEES_KEY } from '../constants/assignees.js';

export default function AssigneeMenu({ selected, onSelect }) {
  const { tasks } = useTasks();

  const entries = useMemo(() => {
    const counts = {};
    Object.values(tasks).forEach(task => {
      const key = task.assignedTo || 'unassigned';
      counts[key] = (counts[key] || 0) + 1;
    });

    const mappedUsers = USERS.map(user => ({
      id: user.id,
      name: user.name,
      count: counts[user.id] || 0,
    }));

    const unknownCount = Object.entries(counts)
      .filter(([key]) => !USERS.some(user => user.id === key))
      .reduce((acc, [, value]) => acc + value, 0);

    return {
      list: mappedUsers,
      total: Object.values(tasks).length,
      unknown: unknownCount,
    };
  }, [tasks]);

  return (
    <aside className="hidden w-60 shrink-0 rounded-2xl border bg-white p-4 shadow-sm md:block">
      <div className="text-sm font-semibold text-slate-700">Assignees</div>
      <p className="mt-1 text-xs text-slate-500">Chọn thành viên để lọc bảng công việc.</p>

      <nav className="mt-4 space-y-2 text-sm">
        <button
          type="button"
          onClick={() => onSelect?.(ALL_ASSIGNEES_KEY)}
          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${selected === ALL_ASSIGNEES_KEY
              ? 'bg-blue-50 text-blue-700'
              : 'hover:bg-slate-100 text-slate-600'
            }`}
        >
          <span>Tất cả ({entries.total})</span>
        </button>

        {entries.list.map(user => (
          <button
            key={user.id}
            type="button"
            onClick={() => onSelect?.(user.id)}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${selected === user.id
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-slate-100 text-slate-600'
              }`}
          >
            <span>{user.name}</span>
            <span className="text-xs font-semibold">{user.count}</span>
          </button>
        ))}

        {entries.unknown > 0 && (
          <div className="rounded-xl border border-dashed px-3 py-2 text-xs text-slate-500">
            + {entries.unknown} task(s) chưa rõ assignee
          </div>
        )}
      </nav>
    </aside>
  );
}