import { useEffect, useState } from 'react';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { IMPORTANCE_LEVELS, type TaskDTO, type TaskEditDTO } from '../models/task';
import { Field, Input, Textarea } from '@fluentui/react-components';
import { ComboBox } from '../../../components/common/ComboBox';

type Props = {
  open: boolean;
  task?: TaskDTO | null;
  onClose: () => void;
  onSubmit: (data: TaskEditDTO, id?: number) => Promise<void>;
  loading?: boolean;
};

export const TaskEditDialog: React.FC<Props> = ({ open, task, onClose, onSubmit, loading }) => {
  const isEdit = !!task;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string | null>(null);
  const [importance, setImportance] = useState<number>();

  useEffect(() => {
    if (open) {
      setTitle(task?.title ?? '');
      setDescription(task?.description ?? null);
      setImportance(task?.importance ?? 0);
    }
  }, [task, open]);

  const isValid = title.trim().length > 0 && !!importance;

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      await onSubmit(
        {
          title,
          description,
          importance,
        },
        task?.id,
      );

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

        <Field label="Importance" required>
          <ComboBox
            data={Object.values(IMPORTANCE_LEVELS)}
            value={importance?.toString()}
            identifierProvider={(d) => d.value.toString()}
            displayTextProvider={(d) => d.displayText}
            onValueChange={(v) => setImportance(Number(v))}
            disabled={loading}
          />
        </Field>
      </EditDialog>
    </>
  );
};
