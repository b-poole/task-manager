export default function FilterBar({ onFilter }) {
  return (
    <div className='filter-bar'>
      <button className='filter-button' onClick={() => onFilter('all')}>All Tasks</button>
      <button className='filter-button' onClick={() => onFilter('pending')}>Pending Tasks</button>
      <button className='filter-button' onClick={() => onFilter('completed')}>Completed Tasks</button>
    </div>
  )
}