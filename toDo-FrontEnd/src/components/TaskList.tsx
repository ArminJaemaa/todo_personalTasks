import { useEffect, useState } from 'react';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/TaskService';
import TaskForm from './TaskForm';
import { Task } from '../models/TaskModel';


function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

    const loadTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(res.data);
        } catch (error) {
            console.error("Failed to load tasks", error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleCreate = async (task: Partial<Task>) => {
        await createTask({...task, isComplete: false});
        await loadTasks();
    };

    const handleUpdate = async (task: Task) => {
        await updateTask(task.id, task);
        setEditingTask(null);
        await loadTasks();
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        await loadTasks();
    };

    const toggleComplete = async (task: Task) => {
        await updateTask(task.id, {
            ...task,
            isComplete: !task.isComplete,
        });
        await loadTasks();
    };

    const filteredTasks = tasks.filter((task) =>
        showCompleted ? task.isComplete : !task.isComplete
    );

  return (
    <>
        <div className='tasks'>
            <h2>My Tasks</h2>

            <TaskForm
                onSubmit={editingTask ? handleUpdate : handleCreate}
                editingTask={editingTask}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }} className='show-tasks'>
                <button onClick={() => setShowCompleted(!showCompleted)}>
                {showCompleted ? 'Show Uncompleted' : 'Show Completed'}
                </button>
            </div>

            <ul>
                {filteredTasks.map((task) => (
                <li key={task.id} className='tasks-list'>
                    <input
                    type="checkbox"
                    checked={task.isComplete}
                    onChange={() => toggleComplete(task)}
                    />
                    <strong>{task.title}</strong> – {task.description}
                    <button onClick={() => setEditingTask(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                </li>
                ))}
            </ul>
        </div>
    </>
  );
}

export default TaskList;
