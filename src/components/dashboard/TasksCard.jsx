import { useState } from 'react';
import { tasks as initialTasks } from '../../data/mockData';
import { Plus, Check, Info } from 'lucide-react';

export default function TasksCard() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (id) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const done = tasks.filter(t => t.done).length;

  return (
    <div className="card tasks-card">
      <div className="tasks-header">
        <div className="card-title">Tasks for this Session <Info size={13} /></div>
        <button className="btn-add-task">
          <Plus size={11} /> Add Task
        </button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item" onClick={() => toggle(task.id)}>
            <div className={`task-check${task.done ? ' done' : ''}`}>
              {task.done && <Check size={10} color="#000" strokeWidth={3} />}
            </div>
            <span className={`task-title${task.done ? ' done' : ''}`}>{task.title}</span>
            <span className="task-dur">{task.duration} min</span>
          </div>
        ))}
      </div>

      <div className="tasks-footer">
        <div className="tasks-progress-label">
          <span style={{ color: 'var(--text-muted)' }}>{done}/{tasks.length} tasks completed</span>
          <span className="tasks-progress-pct">{Math.round((done / tasks.length) * 100)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(done / tasks.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
