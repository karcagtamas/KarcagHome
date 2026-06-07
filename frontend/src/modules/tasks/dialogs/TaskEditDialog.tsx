import { useEffect, useState } from 'react';
import { EditDialog } from '../../../components/dialog/EditDialog';
import type { TaskDTO } from '../models/task';
import { Field, Input, Textarea } from '@fluentui/react-components';

type Props = {
  open: boolean;
  task?: TaskDTO | null;
  onClose: () => void;
  onSubmit: (data: Omit<TaskDTO, 'id'>, id?: number) => Promise<void>;
  loading?: boolean;
};

export const TaskEditDialog: React.FC<Props> = ({ open, task, onClose, onSubmit, loading }) => {
  const isEdit = !!task;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTitle(task?.title ?? '');
      setDescription(task?.description ?? null);
    }
  }, [task, open]);

  const isValid = title.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      await onSubmit({
        title,
        description,
      });

      onClose();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  return (
    <>
      <EditDialog
        open={open}
        title={isEdit ? 'Edit Task' : 'Create Task'}
        isEdit={isEdit}
        isValid={isValid}
        onClose={onClose}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <Field label="Title" required>
          <Input autoFocus value={title} onChange={(_, d) => setTitle(d.value)} disabled={loading} />
        </Field>

        <Field label="Description">
          <Textarea value={description ?? undefined} onChange={(_, d) => setDescription(d.value)} disabled={loading} />
        </Field>
      </EditDialog>
    </>
  );
};
