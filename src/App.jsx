import './App.css'
<<<<<<< HEAD
import  useLocalStorage from './useLocalStorage.jsx';
import TaskForm from './taskForm.jsx';
import TaskList from './TaskList.jsx';
import EditTaskModal from './EditTaskModal.jsx';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
=======
import { useState } from 'react';
>>>>>>> origin/main

const notes = [
  { id: 1, name: "Sample Task 1", dueDate: null, completed: false },
  { id: 2, name: "Sample Task 2", dueDate: null, completed: false },
  { id: 3, name: "Sample Task 3", dueDate: "10-15-2023", completed: false }
]

function App() {
<<<<<<< HEAD
  const [task_list, setTaskList] = useLocalStorage("task_list", notes);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
=======
  const [task_list, setTaskList] = useState(notes);
>>>>>>> origin/main

  function onCompletedTaskCheckboxToggle(toggledTask) {
    setTaskList(newList => newList.map(task => task.id === toggledTask.id ? toggledTask : task));
  }

  function handleAddTask(newTask) {
    setTaskList(newList => [...newList, newTask]);
  }

  function handleDeleteTask(taskId) {
    setTaskList(newList => newList.filter(task => task.id !== taskId));
  }

<<<<<<< HEAD
  function onShowEditTaskModal(taskId) {
    setShowEditModal(true);
    const taskToEdit = task_list.find(task => task.id === taskId);
    setEditedTask(taskToEdit);
  }

  function onSaveEditedTask(updatedTask) {
    console.log("Saving edited task:", updatedTask);
    setTaskList(newList => newList.map(task => task.id === updatedTask.id ? updatedTask : task));
    setShowEditModal(false);
  }

  return (
    <>
      <div id='modal-root'></div>
      <Header onAddTask={handleAddTask} />
      <Body tasks={task_list} 
        onCompletedTaskCheckboxToggle={onCompletedTaskCheckboxToggle} 
        onDeleteTask={handleDeleteTask} 
        onShowEditTaskModal={onShowEditTaskModal}
      />
      {showEditModal && createPortal(
        <div className='modal-backdrop'>
          <EditTaskModal
            task={editedTask}
            onClose={() => setShowEditModal(false)}
            onSave={onSaveEditedTask} 
          />
        </div>,
        document.getElementById('modal-root')
      )}
=======
  return (
    <>
      <Header onAddTask={handleAddTask} />
      <Body tasks={task_list} onCompletedTaskCheckboxToggle={onCompletedTaskCheckboxToggle} onDeleteTask={handleDeleteTask} />
>>>>>>> origin/main
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

<<<<<<< HEAD

=======
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
>>>>>>> origin/main

function FilterBar({ onFilter }) {
  return (
    <div className='filter-bar'>
      <button className='filter-button' onClick={() => onFilter('all')}>All Tasks</button>
      <button className='filter-button' onClick={() => onFilter('pending')}>Pending Tasks</button>
      <button className='filter-button' onClick={() => onFilter('completed')}>Completed Tasks</button>
    </div>
  )
}

<<<<<<< HEAD
function Body({tasks, onCompletedTaskCheckboxToggle, onDeleteTask, onShowEditTaskModal}) {
=======
function TaskItem({ task, dueDate = null, onCompletedTaskCheckboxToggle, onDeleteTask}) {

  function handleCheckboxChange(event) {
    onCompletedTaskCheckboxToggle({ ...task, completed: event.target.checked });
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
        <button className='delete-button' onClick={() => {
          console.log("Deleting task with id:", task.id);
          onDeleteTask(task.id);
        }}>Delete</button>
      </td>
    </tr>
  )
}

function TaskList({ tasks, onDeleteTask, onCompletedTaskCheckboxToggle }) {
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
            onCompletedTaskCheckboxToggle={onCompletedTaskCheckboxToggle} 
            onDeleteTask={onDeleteTask} 
          />
        ))}
        </tbody>
      </table>
  )
}

function Body({tasks, onCompletedTaskCheckboxToggle, onDeleteTask}) {
>>>>>>> origin/main
  const [filter, setFilter] = useState('all');

  function onFilter(filterType) {
    setFilter(filterType);
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <>
      <FilterBar onFilter={onFilter} />
<<<<<<< HEAD
      <TaskList tasks={filteredTasks} 
        onCompletedTaskCheckboxToggle={onCompletedTaskCheckboxToggle} 
        onDeleteTask={onDeleteTask}
        onShowEditTaskModal={onShowEditTaskModal}
      />
=======
      <TaskList tasks={filteredTasks} onCompletedTaskCheckboxToggle={onCompletedTaskCheckboxToggle} onDeleteTask={onDeleteTask} />
>>>>>>> origin/main
    </>
  )
}

<<<<<<< HEAD
=======
function CompletedTasks({ tasks, onDeleteTask, onCompletedTaskCheckboxToggle }) {
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
          <TaskItem key={task.id} task={task} dueDate={task.dueDate} completed={true} 
            onCompletedTaskCheckboxToggle={onCompletedTaskCheckboxToggle} onDeleteTask={onDeleteTask} />
        ))}
      </tbody>
    </table>
  );
}

>>>>>>> origin/main
export default App
