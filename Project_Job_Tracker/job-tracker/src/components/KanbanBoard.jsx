import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './Column';
import JobCard from './JobCard';
import { COLUMNS } from '../services/constants';
import { updateJob } from '../services/db';

export default function KanbanBoard({ jobs, onJobsChange, onEdit, onDelete }) {
  const [activeJob, setActiveJob] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  function getJobsByStatus(status) {
    return jobs
      .filter((j) => j.status === status)
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }

  function handleDragStart(event) {
    const job = jobs.find((j) => j.id === event.active.id);
    if (job) setActiveJob(job);
  }

  function handleDragEnd(event) {
    setActiveJob(null);
    const { active, over } = event;
    if (!over) return;

    const activeJobData = jobs.find((j) => j.id === active.id);
    if (!activeJobData) return;

    // Determine target column
    const overId = over.id;
    const targetColumn = COLUMNS.find((c) => c.id === overId);
    const targetStatus = targetColumn ? overId : activeJobData.status;

    if (targetStatus !== activeJobData.status) {
      // Moved to a different column
      const updated = { ...activeJobData, status: targetStatus };
      updateJob(updated);
      onJobsChange((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
    } else {
      // Reorder within same column — just persist as-is since we sort by date
      updateJob(activeJobData);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-6 px-6 flex-1">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            column={col}
            jobs={getJobsByStatus(col.id)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <DragOverlay>
        {activeJob && (
          <div className="rotate-3 opacity-90">
            <JobCard job={activeJob} onEdit={() => {}} onDelete={() => {}} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
