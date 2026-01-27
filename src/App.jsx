import './App.css'
import  useLocalStorage from './useLocalStorage.jsx';
import TaskForm from './taskForm.jsx';
import TaskList from './TaskList.jsx';
import EditTaskModal from './EditTaskModal.jsx';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

const notes = [
  { id: 1, name: "Sample Task 1", dueDate: null, completed: false },
  { id: 2, name: "Sample Task 2", dueDate: null, completed: false },
  { id: 3, name: "Sample Task 3", dueDate: "10-15-2023", completed: false }
]

function App() {
  const [task_list, setTaskList] = useLocalStorage("task_list", notes);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  function onCompletedTaskCheckboxToggle(toggledTask) {
    setTaskList(newList => newList.map(task => task.id === toggledTask.id ? toggledTask : task));
  }

  function handleAddTask(newTask) {
    setTaskList(newList => [...newList, newTask]);
  }

  function handleDeleteTask(taskId) {
    setTaskList(newList => newList.filter(task => task.id !== taskId));
  }

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



function FilterBar({ onFilter }) {
  return (
    <div className='filter-bar'>
      <button className='filter-button' onClick={() => onFilter('all')}>All Tasks</button>
      <button className='filter-button' onClick={() => onFilter('pending')}>Pending Tasks</button>
      <button className='filter-button' onClick={() => onFilter('completed')}>Completed Tasks</button>
    </div>
  )
}

function Body({tasks, onCompletedTaskCheckboxToggle, onDeleteTask, onShowEditTaskModal}) {
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
      <TaskList tasks={filteredTasks} 
        onCompletedTaskCheckboxToggle={onCompletedTaskCheckboxToggle} 
        onDeleteTask={onDeleteTask}
        onShowEditTaskModal={onShowEditTaskModal}
      />
    </>
  )
}

export default App
