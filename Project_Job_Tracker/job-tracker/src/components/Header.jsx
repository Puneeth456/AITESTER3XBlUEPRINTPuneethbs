import { useState, useRef } from 'react';
import { Plus, Search, Sun, Moon, Download, Upload, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Header({
  searchQuery,
  onSearchChange,
  darkMode,
  onToggleDark,
  onAddClick,
  onImport,
}) {
  const fileInputRef = useRef(null);

  function handleExport() {
    // Data is passed up from App
    const raw = localStorage.getItem('__export_jobs');
    if (!raw) {
      toast.error('No data to export');
      return;
    }
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-tracker-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported!');
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        onImport(data);
        toast.success('Data imported!');
      } catch {
        toast.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Briefcase size={16} className="text-white" />
            </div>
            <h1 className="text-lg font-bold hidden sm:block">Job Tracker</h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by company or role..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleImportClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
              title="Import JSON"
            >
              <Upload size={18} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={onExport}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
              title="Export JSON"
            >
              <Download size={18} />
            </button>
            <button
              onClick={onToggleDark}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
              title="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={onAddClick}
              className="ml-1 flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Job</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
