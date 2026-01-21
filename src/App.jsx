import './App.css'
import { useState } from 'react';

const notes = [
  { id: 1, name: "Sample Task 1", completed: false },
  { id: 2, name: "Sample Task 2", completed: false },
  { id: 3, name: "Sample Task 3", completed: false }
]

function App() {
  const [task_list, setTaskList] = useState(notes);

  function handleAddTask(newTask) {
    alert('Task added!');
    setTaskList(prev => [...prev, newTask]);
  }

  return (
    <>
      <Header onAddTask={handleAddTask} />
      <TaskList tasks = {task_list} />
    </>
  )
}

function Header({ onAddTask }) {
  return (
    <>
      <div className='header'>
        <Title />
        <TaskForm onAddTask={onAddTask} />
      </div>
      <hr />
    </>
    
  )
}

function Title() {
  return (
    <h1 className='title'>Task Manager</h1>  
  )
}

function TaskForm({ onAddTask }) {
  const [task_name, setTaskName] = useState('');
  const [due_date, setDueDate] = useState('');

  function handleTaskNameChange(event) {
    setTaskName(event.target.value);
  }

  function handleDueDateChange(event) {
    setDueDate(event.target.value);
  }

  function handleAddTask(event) {
    event.preventDefault();
    alert('Task added!' + '\nTask Name: ' + task_name + '\nDue Date: ' + due_date);

    onAddTask({
      id: Date.now(),
      name: task_name,
      completed: false,
      dueDate: due_date
    });

    setTaskName('');
    setDueDate('');
  }

  return (
    <div className='task-form'>
      <span className='form-task-name'>Task Name</span>
      <span className='form-due-date'>Due Date</span>
      <input className="form-task-input" type="text" placeholder='Enter new task' value={task_name} onChange={handleTaskNameChange} />
      <input className="form-due-date-input" type="date" placeholder='Due date' value={due_date} onChange={handleDueDateChange} />
      <button className="form-add-task-button" onClick={handleAddTask}>Add Task</button>
    </div>
  )
}

function TaskItem({ note, dueDate = null}) {
  const [task_state, setTaskState] = useState(note.completed);

  function handleTaskCompletedChange() {
    setTaskState(!task_state);
  }

  return (
    <tr className='task'>
      <td>
        <input type="checkbox" checked={task_state} onChange={handleTaskCompletedChange} />
      </td>
      <td className='task-name'>
        {note.name}
      </td>
      <td className = 'due-date'>
        {dueDate ? dueDate : note.dueDate}
      </td>
      <td>
        {task_state ? "Completed" : "Pending"}
      </td>
    </tr>
  )
}

function TaskList({ tasks }) {
  return (
      <table width="100%" className='task-list'>
        <thead>
          <tr>
            <th width="10%">Task</th>
            <th width="50%">Name</th>
            <th width="20%" min-width="10em">Due Date</th>
            <th width="20%">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(note => (
          <TaskItem key={note.id} note={note} dueDate={note.dueDate} completed={false} />
        ))}
        </tbody>
      </table>
  )
}
export default App
