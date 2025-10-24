export default function TaskCard({ task, assigneeName }) {
  return (
    <div className="rounded-xl border bg-white p-3 shadow-sm">
      <div className="text-sm font-medium">{task.content}</div>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
        <span>👤 {assigneeName || '—'}</span>
        <span className="rounded-full border px-2 py-0.5">{task.id}</span>
      </div>
    </div>
  )
}
