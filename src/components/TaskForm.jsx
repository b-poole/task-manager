import { useState } from 'react';
import './TaskForm.css';

export default function TaskForm({ onAddTask }) {
  const [task_name, setTaskName] = useState('');
  const [due_date, setDueDate] = useState('');

  function handleTaskNameChange(event) {
    setTaskName(event.target.value);
  }

  function handleDueDateChange(event) {
    setDueDate(event.target.value);
  }

  function handleAddTask() {
    if (!task_name.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    onAddTask({
      id: Date.now(),
      name: task_name.trim(),
      completed: false,
      dueDate: due_date
    });

    setTaskName('');
    setDueDate('');
  }

  return (
    <div className='task-form'>
      <span className='form-task-name'>Task Name</span>
      <input className="form-task-input" type="text" placeholder='Enter new task' value={task_name} onChange={handleTaskNameChange} />
      <span className='form-due-date'>Due Date</span>
      <input className="form-due-date-input" type="date" placeholder='Due date' value={due_date} onChange={handleDueDateChange} />
      <button className="form-add-task-button" onClick={handleAddTask}>Add Task</button>
    </div>
  )
}