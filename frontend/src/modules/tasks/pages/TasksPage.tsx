import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { taskApi } from '../api/task.api';
import { taskKeys } from '../../../keys/taskKeys';
import { IMPORTANCE_LEVELS, type TaskDTO, type TaskEditDTO } from '../models/task';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { TaskEditDialog } from '../dialogs/TaskEditDialog';
import { TaskTile } from '../components/TaskTile';
import { Box, Button, FormControlLabel, MenuItem, Switch, TextField } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { ContentCard } from '../../../components/common/ContentCard';
import { TasksCharts } from '../components/TasksCharts';

export const TasksPage: React.FC = () => {
  const queryClient = useQueryClient();

  const [showAll, setShowAll] = useState(false);
  const [importance, setImportance] = useState<number | null>(null);

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskDTO | null>(null);
  const { data, isLoading } = useTasks(showAll, importance);

  const createMutation = useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskEditDTO }) => taskApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });

  const removeMutation = useMutation({
    mutationFn: taskApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: taskApi.toggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });

  const handleCreate = () => {
    setSelectedTask(null);
    setTaskDialogOpen(true);
  };

  const handleEdit = (task: TaskDTO) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  };

  const apiLoading =
    createMutation.isPending || updateMutation.isPending || removeMutation.isPending || toggleMutation.isPending;

  const handleSubmit = async (data: TaskEditDTO, id?: number) => {
    if (id) {
      await updateMutation.mutateAsync({ id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  return (
    <PageFrame>
      <PageHeader
        title="Tasks"
        actions={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={<Switch id="show-all-toggle" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />}
              label="Show All"
            />
            <TextField
              select
              size="small"
              label="Importance"
              value={importance}
              onChange={(e) => {
                const val = e.target.value;
                setImportance(val === '' ? null : Number(val));
              }}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All Levels</MenuItem>
              {Object.values(IMPORTANCE_LEVELS).map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.displayText}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" startIcon={<AddOutlined />} onClick={handleCreate}>
              Create
            </Button>
          </Box>
        }
      ></PageHeader>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: '8px',
        }}
      >
        <LoadingBox isLoading={isLoading}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
              alignItems: 'stretch',
              padding: '1rem',
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            {data?.map((task) => (
              <TaskTile
                key={task.id}
                task={task}
                onEdit={() => handleEdit(task)}
                onRemove={async () => await removeMutation.mutateAsync(task.id)}
                onToggle={async () => await toggleMutation.mutateAsync(task.id)}
              />
            ))}
          </Box>
        </LoadingBox>

        <ContentCard caption="Charts">
          <TasksCharts showAll={showAll} importance={importance} />
        </ContentCard>
      </Box>

      <TaskEditDialog
        open={taskDialogOpen}
        task={selectedTask}
        onClose={() => setTaskDialogOpen(false)}
        onSubmit={handleSubmit}
        loading={apiLoading}
      />
    </PageFrame>
  );
};
