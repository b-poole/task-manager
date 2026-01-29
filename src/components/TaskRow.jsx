export default function TaskRow({ task, onCompletedTask, onDeleteTask, onShowEditTaskModal }) {
  return (
    <tr className='task'>
      <td>
        <input type="checkbox" name="completed" checked={task.completed} onChange={() =>
            onCompletedTask({ ...task, completed: !task.completed })
          } />
      </td>
      <td className='task-name' name="name">
        {task.name}
      </td>
      <td className = 'due-date' name="dueDate">
        {task.dueDate ? task.dueDate : '—'}
      </td>
      <td>
        {task.completed ? "Completed" : "Pending"}
      </td>
      <td>
        <button className='edit-button' onClick={() => {
          console.log("Editing task with id:", task.id);
          onShowEditTaskModal(task.id);
        }}>Edit</button>
        <button className='delete-button' onClick={() => {
          console.log("Deleting task with id:", task.id);
          onDeleteTask(task.id);
        }}>Delete</button>
      </td>
    </tr>
  )
}