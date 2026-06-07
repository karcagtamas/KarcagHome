import { Button, Label, makeStyles, Switch } from '@fluentui/react-components';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { AddRegular } from '@fluentui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { taskApi } from '../api/task.api';
import { taskKeys } from '../../../keys/taskKeys';
import { IMPORTANCE_LEVELS, type TaskDTO, type TaskEditDTO } from '../models/task';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { TaskEditDialog } from '../dialogs/TaskEditDialog';
import { TaskTile } from '../components/TaskTile';
import { ComboBox } from '../../../components/common/ComboBox';

const useStyles = makeStyles({
  tasksBox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
    alignItems: 'stretch',
    padding: '1rem',
  },
  taskTile: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const TasksPage: React.FC = () => {
  const queryClient = useQueryClient();
  const styles = useStyles();

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
          <>
            <Label htmlFor="show-all-toggle">Show All</Label>
            <Switch id="show-all-toggle" checked={showAll} onChange={(_, data) => setShowAll(data.checked)} />
            <ComboBox
              data={Object.values(IMPORTANCE_LEVELS)}
              value={importance?.toString()}
              identifierProvider={(d) => d.value.toString()}
              displayTextProvider={(d) => d.displayText}
              onValueChange={(v) => (v ? setImportance(Number(v)) : setImportance(null))}
              clearable={true}
            />
            <Button icon={<AddRegular />} onClick={handleCreate}>
              Create
            </Button>
          </>
        }
      ></PageHeader>

      <LoadingBox isLoading={isLoading}>
        <div className={styles.tasksBox}>
          {data?.map((task) => (
            <TaskTile
              className={styles.taskTile}
              key={task.id}
              task={task}
              onEdit={() => handleEdit(task)}
              onRemove={async () => await removeMutation.mutateAsync(task.id)}
              onToggle={async () => await toggleMutation.mutateAsync(task.id)}
            />
          ))}
        </div>
      </LoadingBox>

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
