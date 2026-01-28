import { useState } from 'react';
import FilterBar from './FilterBar.jsx';
import TaskList from './TaskList.jsx';

export default function Body({tasks, onCompletedTask, onDeleteTask, onShowEditTaskModal}) {
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
        onCompletedTask={onCompletedTask} 
        onDeleteTask={onDeleteTask}
        onShowEditTaskModal={onShowEditTaskModal}
      />
    </>
  )
}