import './App.css'

const notes = [
  { id: 1, name: "Sample Task 1", completed: false },
  { id: 2, name: "Sample Task 2", completed: false },
  { id: 3, name: "Sample Task 3", completed: false }
]

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

function TaskItem({ note }) {
  return (
    <div className='task'>
      <input type="checkbox" />
      <span className='task-name'>{note.name}</span>
    </div>
  )
}

function TaskList() {
  return (
    <div className='task-list'>
      {notes.map(note => (
        <TaskItem key={note.id} note={note} />
      ))}
    </div>
  )
}
export default App
