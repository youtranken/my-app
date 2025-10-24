import { useOutletContext } from 'react-router-dom'
import { ALL_ASSIGNEES_KEY } from '../components/AssigneeMenu.jsx'
import { useTasks } from '../hooks/useTasks.js'
import { USERS } from '../data/initial-data.js'
import { useMemo } from 'react'

export default function ReportPage() {
  const { tasks } = useTasks()
  const { selectedAssignee } = useOutletContext()
  const byStatus = useMemo(() => {
    const res = { todo: 0, inprogress: 0, done: 0 }
    Object.values(tasks).forEach(t => { res[t.status] = (res[t.status] || 0) + 1 })
    return res
  }, [tasks])

  const byUser = useMemo(() => {
    const res = {}
    USERS.forEach(u => (res[u.id] = { name: u.name, count: 0 }))
    Object.values(tasks).forEach(t => {
      if (!res[t.assignedTo]) res[t.assignedTo] = { name: t.assignedTo, count: 0 }
      res[t.assignedTo].count++
    })
    return res
  }, [tasks])

  const selected = selectedAssignee === ALL_ASSIGNEES_KEY
    ? { label: 'Tất cả thành viên', count: Object.values(tasks).length }
    : {
      label: USERS.find(u => u.id === selectedAssignee)?.name || 'Không xác định',
      count: Object.values(tasks).filter(t => t.assignedTo === selectedAssignee).length,
    }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Report</h1>
        <div className="rounded-xl bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
          Đang xem cho: <span className="font-semibold text-slate-700">{selected.label}</span>
          {' • '}
          {selected.count} task
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold">Theo trạng thái</h3>
          <ul className="mt-3 space-y-1 text-sm">
            <li>Todo: <strong>{byStatus.todo}</strong></li>
            <li>In Progress: <strong>{byStatus.inprogress}</strong></li>
            <li>Done: <strong>{byStatus.done}</strong></li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm md:col-span-2">
          <h3 className="text-sm font-semibold">Theo thành viên</h3>
          <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
            {Object.entries(byUser).map(([uid, v]) => (
              <div key={uid} className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm">{v.name}</span>
                <span className="text-sm font-semibold">{v.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
