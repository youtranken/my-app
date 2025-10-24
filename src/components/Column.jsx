import TaskCard from './TaskCard.jsx'

export default function Column({ title, tasks, getName, onAddClick }) {
  return (
    <div className="flex flex-col rounded-2xl bg-slate-100 p-3 gap-3 min-h-[200px]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        {onAddClick && (
          <button
            className="text-xs rounded-lg border px-2 py-1 hover:bg-white"
            onClick={onAddClick}
          >
            + Add
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {tasks.map(t => (
          <TaskCard key={t.id} task={t} assigneeName={getName?.(t.assignedTo)} />
        ))}
        {tasks.length === 0 && (
          <div className="text-xs text-slate-500 italic">Không có công việc</div>
        )}
      </div>
    </div>
  )
}
