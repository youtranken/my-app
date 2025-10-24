import Navbar from '../components/Navbar.jsx'
import { useTasks } from '../hooks/useTasks.js'
import { USERS } from '../data/initial-data.js'
import { useMemo } from 'react'

export default function ReportPage() {
  const { tasks } = useTasks()

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

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold">Report</h1>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold">Theo trạng thái</h3>
            <ul className="mt-3 text-sm space-y-1">
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
      </main>
    </>
  )
}
