import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) =>
    location.pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-slate-600 hover:text-slate-900'

  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-lg font-bold">Team Tasks</span>
          <nav className="flex items-center gap-4 text-sm">
            <Link className={isActive('/')} to="/">Dashboard</Link>
            <Link className={isActive('/report')} to="/report">Report</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {currentUser && (
            <>
              <span className="text-sm text-slate-700">👋 {currentUser.name}</span>
              <button
                onClick={logout}
                className="text-sm rounded-xl border px-3 py-1.5 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
