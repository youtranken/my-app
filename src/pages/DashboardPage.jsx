import { ALL_ASSIGNEES_KEY } from '../components/AssigneeMenu.jsx'
import Column from '../components/Column.jsx'
import AddTaskModal from '../components/AddTaskModal.jsx'
import { useTasks } from '../hooks/useTasks.js'
import { USERS, COLUMN_ORDER } from '../data/initial-data.js'
import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
export default function DashboardPage() {
  const { tasks, columns, addTask } = useTasks()
  const [open, setOpen] = useState(false)
  const { selectedAssignee } = useOutletContext()
  const getName = (uid) => USERS.find(u => u.id === uid)?.name

  const lists = useMemo(() => {
    const map = {}
    for (const colId of COLUMN_ORDER) {
      const col = columns[colId]
      if (!col) {
        map[colId] = []
        continue
      }
      map[colId] = col.taskIds
        .map(id => tasks[id])
        .filter(Boolean)
        .filter(task => selectedAssignee === ALL_ASSIGNEES_KEY || task.assignedTo === selectedAssignee)
    }
    return map
  }, [tasks, columns, selectedAssignee])

  const total = Object.values(tasks).length
  const visible = Object.values(lists).reduce((sum, arr) => sum + arr.length, 0)
  const doneCount = lists.done?.length || 0
  const selectedName = selectedAssignee === ALL_ASSIGNEES_KEY
    ? 'tất cả thành viên'
    : (getName(selectedAssignee) || 'Không xác định')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Job board</h1>
        <div className="text-sm text-slate-600">
          Tổng task: <span className="font-semibold">{total}</span>
          {' • '}
          Đang hiển thị: <span className="font-semibold">{visible}</span>
          {' • '}
          Hoàn thành: <span className="font-semibold">{doneCount}</span>
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Đang lọc theo: <span className="font-medium text-slate-700">{selectedName}</span>
      </p>

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
      <AddTaskModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={addTask}
        defaultAssignee={selectedAssignee !== ALL_ASSIGNEES_KEY ? selectedAssignee : undefined}
      />
    </div>
  )
}
