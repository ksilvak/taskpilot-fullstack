import { useState } from "react";

function AddTaskForm ({addTask, loading}) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask(title);
        setTitle('');

    };

    return(
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nový úkol"
                disabled={loading}
            />
            <button type="submit" disabled={loading}>Přidat úkol</button>
        </form>
    );
}

export default AddTaskForm