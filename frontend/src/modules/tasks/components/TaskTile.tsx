import { Button, Card, CardHeader } from '@fluentui/react-components';
import type { TaskDTO } from '../models/task';
import { DeleteRegular, EditRegular } from '@fluentui/react-icons';

type Props = {
  task: TaskDTO;
  onEdit?: () => void;
  onRemove?: () => void;
  className?: string | undefined;
};

export const TaskTile: React.FC<Props> = ({ task, onEdit, onRemove, className }) => {
  return (
    <Card className={className}>
      <CardHeader
        header={<>{task.title}</>}
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

      <div>{task.description}</div>
    </Card>
  );
};
