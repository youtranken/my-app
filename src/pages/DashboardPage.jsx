import Navbar from '../components/Navbar.jsx'
import Column from '../components/Column.jsx'
import AddTaskModal from '../components/AddTaskModal.jsx'
import { useTasks } from '../hooks/useTasks.js'
import { USERS, COLUMN_ORDER } from '../data/initial-data.js'
import { useState, useMemo } from 'react'

export default function DashboardPage() {
  const { tasks, columns, addTask } = useTasks()
  const [open, setOpen] = useState(false)

  const getName = (uid) => USERS.find(u => u.id === uid)?.name

  const lists = useMemo(() => {
    const map = {}
    for (const colId of COLUMN_ORDER) {
      const col = columns[colId]
      map[colId] = col.taskIds.map(id => tasks[id]).filter(Boolean)
    }
    return map
  }, [tasks, columns])

  const total = Object.values(tasks).length
  const doneCount = lists.done?.length || 0

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Job board</h1>
          <div className="text-sm text-slate-600">
            Total: <span className="font-semibold">{total}</span> • Completed: <span className="font-semibold">{doneCount}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Column
            title="Todo"
            tasks={lists.todo || []}
            getName={getName}
            onAddClick={() => setOpen(true)}
          />
          <Column
            title="In Progress"
            tasks={lists.inprogress || []}
            getName={getName}
          />
          <Column
            title="Done"
            tasks={lists.done || []}
            getName={getName}
          />
        </div>
      </main>

      <AddTaskModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={addTask}
      />
    </>
  )
}
