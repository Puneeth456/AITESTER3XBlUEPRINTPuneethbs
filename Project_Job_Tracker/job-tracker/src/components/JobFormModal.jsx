import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getResumeNames } from '../services/db';
import { COLUMNS, DEFAULT_RESUMES } from '../services/constants';

export default function JobFormModal({ job, onSave, onClose }) {
  const [form, setForm] = useState({
    company: '',
    role: '',
    linkedInUrl: '',
    resumeUsed: '',
    salaryRange: '',
    notes: '',
    status: 'wishlist',
    createdAt: Date.now(),
  });
  const [errors, setErrors] = useState({});
  const [resumes, setResumes] = useState(DEFAULT_RESUMES);
  const [customResume, setCustomResume] = useState('');

  useEffect(() => {
    getResumeNames().then((names) => {
      const all = [...new Set([...DEFAULT_RESUMES, ...names])];
      setResumes(all);
    });
  }, []);

  useEffect(() => {
    if (job) {
      setForm({
        company: job.company || '',
        role: job.role || '',
        linkedInUrl: job.linkedInUrl || '',
        resumeUsed: job.resumeUsed || '',
        salaryRange: job.salaryRange || '',
        notes: job.notes || '',
        status: job.status || 'wishlist',
        createdAt: job.createdAt || Date.now(),
      });
    }
  }, [job]);

  function validate() {
    const e = {};
    if (!form.company.trim()) e.company = 'Company name is required';
    if (!form.role.trim()) e.role = 'Job title is required';
    if (form.linkedInUrl && !form.linkedInUrl.startsWith('http')) {
      e.linkedInUrl = 'Enter a valid URL (starting with http)';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const resume = customResume.trim() || form.resumeUsed;
    const payload = {
      ...form,
      resumeUsed: resume,
    };

    if (job) {
      payload.id = job.id;
    }
    onSave(payload);
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">{job ? 'Edit Job' : 'Add Job'}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Company <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => update('company', e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  errors.company
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 transition-colors`}
                placeholder="e.g. Google"
              />
              {errors.company && (
                <p className="text-xs text-red-400 mt-1">{errors.company}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Role / Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  errors.role
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 transition-colors`}
                placeholder="e.g. SDE II"
              />
              {errors.role && (
                <p className="text-xs text-red-400 mt-1">{errors.role}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={form.linkedInUrl}
              onChange={(e) => update('linkedInUrl', e.target.value)}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${
                errors.linkedInUrl
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 transition-colors`}
              placeholder="https://linkedin.com/jobs/view/..."
            />
            {errors.linkedInUrl && (
              <p className="text-xs text-red-400 mt-1">{errors.linkedInUrl}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Resume Used
            </label>
            <div className="flex gap-2">
              <select
                value={form.resumeUsed}
                onChange={(e) => {
                  update('resumeUsed', e.target.value);
                  if (e.target.value !== '__custom__') setCustomResume('');
                }}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select resume</option>
                {resumes.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
                <option value="__custom__">+ Custom</option>
              </select>
            </div>
            {form.resumeUsed === '__custom__' && (
              <input
                type="text"
                value={customResume}
                onChange={(e) => setCustomResume(e.target.value)}
                className="mt-2 w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter resume name"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Salary Range
              </label>
              <input
                type="text"
                value={form.salaryRange}
                onChange={(e) => update('salaryRange', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="₹25-30 LPA"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Recruiter name, referral info, etc."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {job ? 'Save Changes' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
