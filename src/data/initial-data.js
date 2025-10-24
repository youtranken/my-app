export const USERS = [
  { id: 'u-1', name: 'Minh' },
  { id: 'u-2', name: 'Lan' },
  { id: 'u-3', name: 'Huy' },
]

export const initialTasks = {
  't-1': { id: 't-1', content: 'Chuẩn bị báo cáo tuần', assignedTo: 'u-1', status: 'todo', createdBy: 'u-1' },
  't-2': { id: 't-2', content: 'Sửa lỗi ticket #245',   assignedTo: 'u-2', status: 'inprogress', createdBy: 'u-1' },
  't-3': { id: 't-3', content: 'Triển khai NetBox',     assignedTo: 'u-3', status: 'done', createdBy: 'u-1' },
}

export const initialColumns = {
  todo:       { id: 'todo',       title: 'Todo',        taskIds: ['t-1'] },
  inprogress: { id: 'inprogress', title: 'In Progress', taskIds: ['t-2'] },
  done:       { id: 'done',       title: 'Done',        taskIds: ['t-3'] },
}

export const COLUMN_ORDER = ['todo', 'inprogress', 'done']
