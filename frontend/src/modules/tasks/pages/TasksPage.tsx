import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { IMPORTANCE_LEVELS, type TaskDTO, type TaskEditDTO } from '../models/task';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { TaskEditDialog } from '../dialogs/TaskEditDialog';
import { TaskTile } from '../components/TaskTile';
import { Box, Button, FormControlLabel, MenuItem, Switch, TextField } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { ContentCard } from '../../../components/common/ContentCard';
import { TasksCharts } from '../components/TasksCharts';
import { useTaskMutations } from '../hooks/useTaskMutations';
import { useSearchParams } from 'react-router-dom';

export const TasksPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const showAll = searchParams.get('showAll') === 'true';
  const importance = searchParams.get('importance') ? Number(searchParams.get('importance')) : null;
  const setShowAll = (val: boolean) => {
    setSearchParams((prev) => {
      if (val) {
        prev.set('showAll', 'true');
      } else {
        prev.delete('showAll');
      }
      return prev;
    });
  };
  const setImportance = (val: number | null) => {
    setSearchParams((prev) => {
      if (val !== null) {
        prev.set('importance', String(val));
      } else {
        prev.delete('importance');
      }
      return prev;
    });
  };

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskDTO | null>(null);
  const { data, isLoading } = useTasks(showAll, importance);

  const { createMutation, updateMutation, removeMutation, toggleMutation, isPending: apiLoading } = useTaskMutations();

  const handleCreate = () => {
    setSelectedTask(null);
    setTaskDialogOpen(true);
  };

  const handleEdit = (task: TaskDTO) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  };

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
              control={<Switch id="show-all-toggle" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} size='small' />}
              label="Show All"
            />
            <TextField
              select
              size="small"
              label="Importance"
              value={importance ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                setImportance(val === '' ? null : Number(val));
              }}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All</MenuItem>
              {Object.values(IMPORTANCE_LEVELS).map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.displayText}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" startIcon={<AddOutlined />} onClick={handleCreate} size='small'>
              Create
            </Button>
          </Box>
        }
      ></PageHeader>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          padding: '8px',
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            borderRadius: '4px',
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
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <ContentCard caption="Charts">
            <TasksCharts showAll={showAll} importance={importance} />
          </ContentCard>
        </Box>
      </Box>

      {taskDialogOpen && (
        <TaskEditDialog
          key={selectedTask?.id ?? 'new'}
          open={taskDialogOpen}
          task={selectedTask}
          onClose={() => setTaskDialogOpen(false)}
          onSubmit={handleSubmit}
          loading={apiLoading}
        />
      )}
    </PageFrame>
  );
};
