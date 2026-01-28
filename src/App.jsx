import './App.css'
import  useLocalStorage from './hooks/useLocalStorage.jsx';
import Header from './components/Header.jsx';
import Body from './components/Body.jsx';
import EditTaskModal from './components/EditTaskModal.jsx';
import { createPortal } from 'react-dom';
import { useState } from 'react';

const notes = [
  { id: 1, name: "Sample Task 1", dueDate: null, completed: false },
  { id: 2, name: "Sample Task 2", dueDate: null, completed: false },
  { id: 3, name: "Sample Task 3", dueDate: "10-15-2023", completed: false }
]

function App() {
  const [tasks, setTaskList] = useLocalStorage("tasks", notes);
  const [editingTask, setEditingTask] = useState(null);

  function handleCompletedTask(toggledTask) {
    setTaskList(newList => newList.map(task => task.id === toggledTask.id ? toggledTask : task));
  }

  function handleAddTask(newTask) {
    setTaskList(newList => [...newList, newTask]);
  }

  function handleDeleteTask(taskId) {
    setTaskList(newList => newList.filter(task => task.id !== taskId));
  }

  function handleShowEditTaskModal(taskId) {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditingTask(taskToEdit);
  }

  function handleSaveEditedTask(updatedTask) {
    setTaskList(newList => newList.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(null);
  }

  return (
    <>
      <div className='main-content'>
        <Header onAddTask={handleAddTask} />
        <Body tasks={tasks} 
          onCompletedTask={handleCompletedTask} 
          onDeleteTask={handleDeleteTask} 
          onShowEditTaskModal={handleShowEditTaskModal}
        />
        {editingTask && createPortal(
          <div className='modal-backdrop'>
            <EditTaskModal
              task={editingTask}
              onClose={() => setEditingTask(null)}
              onSave={handleSaveEditedTask} 
            />
          </div>,
          document.getElementById('modal-root')
        )}
      </div>
      <footer className="site-footer">
            Built by <strong>Barrett Poole</strong> | Frontend Developer | React & JS Enthusiast
          <p>
            <a href="https://www.linkedin.com/in/barrett-poole-630a3a145/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a> {' | '}
            <a href="https://github.com/b-poole" target="_blank" rel="noopener noreferrer">
               GitHub
            </a>
          </p>
        </footer>
    </>
  )
}

export default App
