import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, onDeleteTask, onCompletedTask, onShowEditTaskModal }) {
  return (
      <table width="100%" className='task-list'>
        <thead>
          <tr>
            <th width="10%"><span role="img" aria-label="checkmark">✔️</span></th>
            <th width="30%">Name</th>
            <th width="15%">Due Date</th>
            <th width="25%">Status</th>
            <th width="20%">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            dueDate={task.dueDate} 
            completed={false} 
            onCompletedTask={onCompletedTask} 
            onDeleteTask={onDeleteTask}
            onShowEditTaskModal={onShowEditTaskModal}
          />
        ))}
        </tbody>
      </table>
  )
}