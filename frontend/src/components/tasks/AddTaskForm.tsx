import { useState } from 'react';
import FormTextInput from '../common/Form/FormTextInput';
import Button from '../common/Button';

type AddTaskFormProps = {
  addTask: (title: string) => void | Promise<void>;
  loading: boolean;
};

function AddTaskForm({ addTask, loading }: AddTaskFormProps) {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormTextInput
        value={title}
        onChange={setTitle}
        placeholder="Nový úkol"
        disabled={loading}
      />
      <Button buttonType="submit" disabled={loading} buttonName="Přidat Úkol" />
    </form>
  );
}

export default AddTaskForm;
