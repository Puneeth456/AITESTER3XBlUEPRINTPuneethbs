import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { STATUS_COLORS } from '../services/constants';

function daysSince(timestamp) {
  const diff = Date.now() - timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export default function JobCard({ job, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: job.id, data: { job } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 border-l-4 ${STATUS_COLORS[job.status]} p-3 shadow-sm hover:shadow-md transition-shadow group`}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <GripVertical size={14} />
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{job.company}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{job.role}</p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            {job.resumeUsed && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {job.resumeUsed}
              </span>
            )}
            <span className="text-[10px] text-gray-400">
              {daysSince(job.createdAt || job.dateApplied)}
            </span>
            {job.linkedInUrl && (
              <a
                href={job.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {job.salaryRange && (
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{job.salaryRange}</p>
          )}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(job)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            title="Edit"
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={() => onDelete(job)}
            className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500"
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
