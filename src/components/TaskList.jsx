import TaskRow from './TaskRow.jsx';
import TaskCard from './TaskCard.jsx';
import './TaskList.css';

export default function TaskList({ tasks, onDeleteTask, onCompletedTask, onShowEditTaskModal }) {
  return (
    <>
      {/* Desktop View */}
      <table className='task-list desktop-only'>
        <thead>
          <tr>
            <th className='col-check'><span role="img" aria-label="checkmark">✔️</span></th>
            <th className='col-name'>Name</th>
            <th className='col-due'>Due Date</th>
            <th className='col-status'>Status</th>
            <th className='col-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
          <TaskRow
            key={task.id} 
            task={task} 
            onCompletedTask={onCompletedTask} 
            onDeleteTask={onDeleteTask}
            onShowEditTaskModal={onShowEditTaskModal}
          />
        ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className='task-cards mobile-only'>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onCompletedTask={onCompletedTask}
            onDeleteTask={onDeleteTask}
            onShowEditTaskModal={onShowEditTaskModal}
          />
        ))}
      </div>
    </>
  )
}