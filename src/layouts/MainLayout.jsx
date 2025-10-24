import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import AssigneeMenu, { ALL_ASSIGNEES_KEY } from '../components/AssigneeMenu.jsx';

export default function MainLayout() {
  const [selectedAssignee, setSelectedAssignee] = useState(ALL_ASSIGNEES_KEY);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
        <AssigneeMenu selected={selectedAssignee} onSelect={setSelectedAssignee} />

        <main className="flex-1">
          <Outlet context={{ selectedAssignee, setSelectedAssignee }} />
        </main>
      </div>
    </div>
  );
}