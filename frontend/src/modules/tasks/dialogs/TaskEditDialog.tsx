import { useEffect } from 'react';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { IMPORTANCE_LEVELS, type TaskDTO, type TaskEditDTO } from '../models/task';
import { Box, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  task?: TaskDTO | null;
  onClose: () => void;
  onSubmit: (data: TaskEditDTO, id?: number) => Promise<void>;
  loading?: boolean;
};

export const TaskEditDialog: React.FC<Props> = ({ open, task, onClose, onSubmit, loading }) => {
  const isEdit = !!task;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<TaskEditDTO>({
    defaultValues: {
      title: '',
      description: null,
      importance: 0,
      dueDate: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    reset({
      title: task?.title ?? '',
      description: task?.description ?? null,
      importance: task?.importance ?? 0,
      dueDate: task?.dueDate ?? '',
    });
  }, [task, reset]);

  const handleValidSubmit = async (data: TaskEditDTO) => {
    if (!isValid || loading) return;

    try {
      await onSubmit(data, task?.id);

      onClose();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  return (
    <EditDialog
      open={open}
      title={isEdit ? 'Edit Task' : 'Create Task'}
      isEdit={isEdit}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit(handleValidSubmit)}
      loading={loading}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleValidSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required', validate: (v) => !!v?.trim() || 'Cannot be empty spaces' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Title"
              required
              fullWidth
              autoFocus
              disabled={loading}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              size="small"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value || null)}
              label="Description"
              fullWidth
              multiline
              rows={3}
              disabled={loading}
              variant="outlined"
              size="small"
            />
          )}
        />

        <Controller
          name="importance"
          control={control}
          rules={{ required: 'Importance is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              select
              label="Importance"
              required
              fullWidth
              disabled={loading}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              size="small"
            >
              {Object.values(IMPORTANCE_LEVELS).map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.displayText}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="dueDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              value={field.value ?? ''}
              onChange={field.onChange}
              label="Due Date"
              fullWidth
              type="date"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              disabled={loading}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              size="small"
            />
          )}
        />
      </Box>
    </EditDialog>
  );
};
