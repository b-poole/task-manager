// TaskCard.jsx
import './TaskCard.css';

export default function TaskCard({
  task,
  onCompletedTask,
  onDeleteTask,
  onShowEditTaskModal,
}) {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() =>
            onCompletedTask({ ...task, completed: !task.completed })
          }
        />
        <h3 className={task.completed ? 'completed' : ''}>
          {task.name}
        </h3>
      </div>

      <div className="task-card-meta">
        <span><strong>Due:</strong> {task.dueDate || '—'}</span>
        <span><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</span>
      </div>

      <div className="task-card-actions">
        <button onClick={() => onShowEditTaskModal(task.id)}>Edit</button>
        <button onClick={() => onDeleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
}
