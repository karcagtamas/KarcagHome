import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { IMPORTANCE_LEVELS, type TaskDTO } from '../models/task';
import { useMemo } from 'react';
import { DeleteOutlined, EditOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';

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
    <Card
      className={className}
      sx={{
        backgroundColor: importance.bgColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <CardHeader
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {task.title}
          </Typography>
        }
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="text"
              startIcon={<EditOutlined sx={{ color: 'darkorange' }} />}
              onClick={() => onEdit && onEdit()}
              sx={{ color: 'text.primary' }}
            >
              Edit
            </Button>
            <Button
              variant="text"
              startIcon={<DeleteOutlined sx={{ color: 'red' }} />}
              onClick={() => onRemove && onRemove()}
              sx={{ color: 'text.primary' }}
            >
              Delete
            </Button>
          </Box>
        }
      />

      <CardContent sx={{ pt: 0, pb: 1, flexGrow: 1 }}>
        <Typography variant="body2" sx={{ color: importance.fgColor, fontWeight: 'bold', mb: 1 }}>
          {importance.displayText}
        </Typography>

        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          {task.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifySelf: 'flex-end', p: 2, pt: 0 }}>
        <Button
          variant="outlined"
          startIcon={
            task.completed ? (
              <VisibilityOffOutlined sx={{ color: 'darkblue' }} />
            ) : (
              <VisibilityOutlined sx={{ color: 'darkblue' }} />
            )
          }
          onClick={() => onToggle && onToggle()}
          sx={{ borderColor: 'darkblue', color: 'darkblue' }}
        >
          {task.completed ? 'Unsolve' : 'Solve'}
        </Button>
      </CardActions>
    </Card>
  );
};
