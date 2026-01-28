import { useState } from 'react';

export default function EditTaskModal({ task, onClose, onSave }) {
    const [name, setName] = useState(task.name);
    const [dueDate, setDueDate] = useState(task.dueDate);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDueDateChange(e) {
        setDueDate(e.target.value);
    }

    return (
        <div className='modal'>
            <h2>Edit Task</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSave({ ...task, name, dueDate });
            }}>
                <input type="text" defaultValue={task.name} placeholder="Task Name" onChange={handleNameChange} />
                <input type="date" defaultValue={task.dueDate} placeholder="Due Date" onChange={handleDueDateChange} />
                <button type="submit">Save Changes</button>        
                <button onClick={onClose}>Close</button>
            </form>
        </div>
    );
}