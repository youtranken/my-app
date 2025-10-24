// import { useAuth } from '../context/AuthContext.js'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function LoginPage() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow">
        <h1 className="text-xl font-bold">Login (Demo)</h1>
        <p className="mt-1 text-sm text-slate-500">Chỉ cần nhập tên để vào Dashboard</p>

        <div className="mt-4 space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Tên của bạn"
          />
          <button
            className="w-full rounded-xl bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
            onClick={() => { login(name || 'User'); nav('/') }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
