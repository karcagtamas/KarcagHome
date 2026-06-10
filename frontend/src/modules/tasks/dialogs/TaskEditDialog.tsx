import { useEffect, useState } from 'react';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { IMPORTANCE_LEVELS, type TaskDTO, type TaskEditDTO } from '../models/task';
import { Box, MenuItem, TextField } from '@mui/material';

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

  const isValid = title.trim().length > 0 && importance !== undefined && importance !== null;

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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          <TextField
            label="Title"
            required
            fullWidth
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            variant="outlined"
            size="small"
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value || null)}
            disabled={loading}
            variant="outlined"
            size="small"
          />

          <TextField
            select
            label="Importance"
            required
            fullWidth
            value={importance}
            onChange={(e) => setImportance(Number(e.target.value))}
            disabled={loading}
            variant="outlined"
            size="small"
          >
            {Object.values(IMPORTANCE_LEVELS).map((level) => (
              <MenuItem key={level.value} value={level.value}>
                {level.displayText}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </EditDialog>
    </>
  );
};
