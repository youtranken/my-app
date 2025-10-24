import { useEffect, useState } from 'react'
import { USERS } from '../data/initial-data.js'

export default function AddTaskModal({ open, onClose, onSubmit }) {
  const [content, setContent] = useState('')
  const [assignee, setAssignee] = useState(USERS[0]?.id || '')

  useEffect(() => {
    if (open) {
      setContent('')
      setAssignee(USERS[0]?.id || '')
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
        <h3 className="text-lg font-semibold">Thêm công việc</h3>
        <div className="mt-3 space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Nội dung</label>
            <input
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập nội dung..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Giao cho</label>
            <select
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={assignee}
              onChange={e => setAssignee(e.target.value)}
            >
              {USERS.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-xl border px-3 py-2" onClick={onClose}>Hủy</button>
          <button
            className="rounded-xl bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
            onClick={() => {
              if (!content.trim()) return
              onSubmit({ content: content.trim(), assignedTo: assignee })
              onClose()
            }}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}
