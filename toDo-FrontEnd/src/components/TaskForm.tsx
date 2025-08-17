import { useEffect, useState } from 'react';

interface Props {
  onSubmit: (task: any) => void;
  onCancel: () => void;
  editingTask?: any | null;
}

function TaskForm({ onSubmit, onCancel, editingTask }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
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

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    // tell parent to stop editing
    onCancel?.();
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
        {editingTask ? 'save' : 'Create Task'}
      </button>
      { editingTask && (
        <button type="button" onClick={handleCancel}>
          cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;
