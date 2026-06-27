import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import JobFormModal from './components/JobFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { getAllJobs, addJob, updateJob, deleteJob } from './services/db';

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('job-tracker-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('job-tracker-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return [dark, () => setDark((d) => !d)];
}

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [darkMode, toggleDark] = useDarkMode();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deletingJob, setDeletingJob] = useState(null);

  // Load jobs from IndexedDB on mount
  useEffect(() => {
    getAllJobs().then(setJobs).catch(console.error);
  }, []);

  const filteredJobs = jobs.filter((j) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      j.company?.toLowerCase().includes(q) ||
      j.role?.toLowerCase().includes(q)
    );
  });

  const handleAdd = useCallback(async (data) => {
    try {
      const id = await addJob(data);
      setJobs((prev) => [...prev, { ...data, id }]);
      setShowForm(false);
      toast.success('Job added!');
    } catch {
      toast.error('Failed to add job');
    }
  }, []);

  const handleEdit = useCallback(async (data) => {
    try {
      await updateJob(data);
      setJobs((prev) => prev.map((j) => (j.id === data.id ? data : j)));
      setEditingJob(null);
      toast.success('Job updated!');
    } catch {
      toast.error('Failed to update job');
    }
  }, []);

  const handleDelete = useCallback(async (job) => {
    try {
      await deleteJob(job.id);
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
      setDeletingJob(null);
      toast.success('Job deleted');
    } catch {
      toast.error('Failed to delete job');
    }
  }, []);

  const handleImport = useCallback((data) => {
    if (!Array.isArray(data)) {
      toast.error('Invalid format: expected an array of jobs');
      return;
    }
    // Import each job as a new entry
    Promise.all(data.map((job) => addJob(job)))
      .then((ids) => {
        const imported = data.map((job, i) => ({ ...job, id: ids[i] }));
        setJobs((prev) => [...prev, ...imported]);
        toast.success(`Imported ${data.length} jobs`);
      })
      .catch(() => toast.error('Import failed'));
  }, []);

  const handleExport = useCallback(() => {
    if (jobs.length === 0) {
      toast.error('No data to export');
      return;
    }
    const blob = new Blob([JSON.stringify(jobs, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-tracker-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported!');
  }, [jobs]);

  return (
    <div className="h-screen flex flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: darkMode ? '#1f2937' : '#fff',
            color: darkMode ? '#f3f4f6' : '#111827',
            border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          },
        }}
      />

      <Header
        searchQuery={search}
        onSearchChange={setSearch}
        darkMode={darkMode}
        onToggleDark={toggleDark}
        onAddClick={() => setShowForm(true)}
        onExport={handleExport}
        onImport={handleImport}
      />

      <main className="flex-1 overflow-hidden pt-4">
        {filteredJobs.length === 0 && jobs.length > 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              No jobs match your search
            </p>
          </div>
        ) : (
          <KanbanBoard
            jobs={filteredJobs}
            onJobsChange={setJobs}
            onEdit={(job) => setEditingJob(job)}
            onDelete={(job) => setDeletingJob(job)}
          />
        )}
        {jobs.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-400 dark:text-gray-500 text-sm mb-3">
                No jobs yet — start tracking your applications
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Add your first job
              </button>
            </div>
          </div>
        )}
      </main>

      {showForm && (
        <JobFormModal onSave={handleAdd} onClose={() => setShowForm(false)} />
      )}
      {editingJob && (
        <JobFormModal
          job={editingJob}
          onSave={handleEdit}
          onClose={() => setEditingJob(null)}
        />
      )}
      {deletingJob && (
        <DeleteConfirmModal
          job={deletingJob}
          onConfirm={handleDelete}
          onClose={() => setDeletingJob(null)}
        />
      )}
    </div>
  );
}
