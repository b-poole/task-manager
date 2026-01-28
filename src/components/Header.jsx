import TaskForm from './TaskForm.jsx';
import './Header.css';

export default function Header({ onAddTask }) {
  return (
    <>
      <div className='header'>
        <h1 className='title'>Task Manager</h1>
        <TaskForm onAddTask={onAddTask} />
      </div>
      <hr />
    </>
    
  )
}