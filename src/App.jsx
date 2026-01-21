import './App.css'
import { useState } from 'react';

const notes = [
  { id: 1, name: "Sample Task 1", dueDate: null, completed: false },
  { id: 2, name: "Sample Task 2", dueDate: null, completed: false },
  { id: 3, name: "Sample Task 3", dueDate: "10-15-2023", completed: false }
]

function App() {
  const [task_list, setTaskList] = useState(notes);

  function onToggle(toggledTask) {
    setTaskList(newList => newList.map(task => task.id === toggledTask.id ? toggledTask : task));
  }

  function handleAddTask(newTask) {
    setTaskList(newList => [...newList, newTask]);
  }

  function handleDeleteTask(taskId) {
    setTaskList(newList => newList.filter(task => task.id !== taskId));
  }

  return (
    <>
      <Header onAddTask={handleAddTask} />
      <TaskList tasks = {task_list} onDeleteTask={handleDeleteTask} onToggle={onToggle} />
      <hr className="completed-tasks-hr" />
      <h2 className='completed-tasks-title'>Completed Tasks</h2>
      <hr />
      <CompletedTasks tasks={task_list} onDeleteTask={handleDeleteTask} onToggle={onToggle} />
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
      <span className='form-due-date'>Due Date</span>
      <input className="form-task-input" type="text" placeholder='Enter new task' value={task_name} onChange={handleTaskNameChange} />
      <input className="form-due-date-input" type="date" placeholder='Due date' value={due_date} onChange={handleDueDateChange} />
      <button className="form-add-task-button" onClick={handleAddTask}>Add Task</button>
    </div>
  )
}

function TaskItem({ task, dueDate = null, onToggle, onDeleteTask}) {

  function handleCheckboxChange(event) {
    onToggle({ ...task, completed: event.target.checked });
  }

  return (
    <tr className='task'>
      <td>
        <input type="checkbox" name="completed" checked={task.completed} onChange={handleCheckboxChange} />
      </td>
      <td className='task-name' name="name">
        {task.name}
      </td>
      <td className = 'due-date' name="dueDate">
        {dueDate ? dueDate : task.dueDate}
      </td>
      <td>
        {task.completed ? "Completed" : "Pending"}
      </td>
      <td>
        <button className='delete-button' onClick={() => onDeleteTask(task.id)}>Delete</button>
      </td>
    </tr>
  )
}

function TaskList({ tasks, onDeleteTask, onToggle }) {
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
          <TaskItem key={task.id} task={task} dueDate={task.dueDate} completed={false} onToggle={onToggle} onDeleteTask={onDeleteTask} />
        ))}
        </tbody>
      </table>
  )
}

function CompletedTasks({ tasks, onDeleteTask, onToggle }) {
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <table width="100%" className='completed-tasks'>
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
        {completedTasks.map(task => (
          <TaskItem key={task.id} task={task} dueDate={task.dueDate} completed={true} onToggle={onToggle} onDeleteTask={onDeleteTask} />
        ))}
      </tbody>
    </table>
  );
}

export default App
