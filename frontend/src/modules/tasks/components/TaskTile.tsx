import { Button, Card, CardFooter, CardHeader } from '@fluentui/react-components';
import { IMPORTANCE_LEVELS, type TaskDTO } from '../models/task';
import { DeleteRegular, EditRegular, EyeFilled, EyeOffRegular } from '@fluentui/react-icons';
import { useMemo } from 'react';

type Props = {
  task: TaskDTO;
  onEdit?: () => void;
  onRemove?: () => void;
  className?: string | undefined;
  onToggle?: () => void;
};

export const TaskTile: React.FC<Props> = ({ task, onEdit, onRemove, className, onToggle }) => {
  const importance = useMemo(() => {
    return IMPORTANCE_LEVELS[task.importance];
  }, [task.importance]);
  return (
    <Card className={className} style={{ backgroundColor: importance.bgColor }}>
      <CardHeader
        header={<strong>{task.title}</strong>}
        action={
          <>
            <Button icon={<EditRegular color="darkorange" />} onClick={() => onEdit && onEdit()}>
              Edit
            </Button>{' '}
            <Button icon={<DeleteRegular color="red" />} onClick={() => onRemove && onRemove()}>
              Delete
            </Button>
          </>
        }
      />

      <div style={{color: importance.fgColor}}><strong>{importance.displayText}</strong></div>

      <div>
        <em>{task.description}</em>
      </div>

      <CardFooter>
        <Button
          icon={task.completed ? <EyeOffRegular color="darkblue" /> : <EyeFilled color="darkblue" />}
          onClick={() => onToggle && onToggle()}
        >
          {task.completed ? 'Unsolve' : 'Solve'}
        </Button>
      </CardFooter>
    </Card>
  );
};
