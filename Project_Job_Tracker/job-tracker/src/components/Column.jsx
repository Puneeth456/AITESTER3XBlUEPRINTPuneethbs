import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import JobCard from './JobCard';
import { STATUS_BG } from '../services/constants';

export default function Column({ column, jobs, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      className={`flex flex-col bg-gray-100 dark:bg-gray-900 rounded-xl min-w-[280px] w-[280px] shrink-0 transition-colors ${
        isOver ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${STATUS_BG[column.id]} px-2 py-0.5 rounded-full`}>
            {column.label}
          </span>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
            {jobs.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto px-3 py-2 space-y-2 column-scroll"
        style={{ maxHeight: 'calc(100vh - 160px)' }}
      >
        <SortableContext items={jobs.map((j) => j.id)} strategy={verticalListSortingStrategy}>
          {jobs.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-400 dark:text-gray-500">
              No jobs here yet
            </div>
          ) : (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}
