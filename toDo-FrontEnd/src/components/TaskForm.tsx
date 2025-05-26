import { useEffect, useState } from 'react';

interface Props {
  onSubmit: (task: any) => void;
  editingTask?: any | null;
}

function TaskForm({ onSubmit, editingTask }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: editingTask?.id, title, description });

    // clear form only if creating
    if (!editingTask) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='task-form'>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button type="submit">
        {editingTask ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}

export default TaskForm;
