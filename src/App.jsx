import './App.css'

function App() {

  return (
    <>
      <Title />
      <TaskList />
    </>
  )
}

function Title() {
  return (
    <h1 className='title'>Task Manager</h1>  
  )
}

function Task() {
  return (
    <div className='task'>
      <input type="checkbox" />
      <span className='task-name'>Sample Task</span>
    </div>
  )
}

function TaskList() {
  return (
    <div className='task-list'>
      <Task />
      <Task />
      <Task />
    </div>
  )
}
export default App
