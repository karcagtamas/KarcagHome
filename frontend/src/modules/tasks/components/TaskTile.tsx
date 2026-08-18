import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography, useTheme } from '@mui/material';
import { IMPORTANCE_LEVELS, type TaskDTO } from '../models/task';
import { useMemo } from 'react';
import { DeleteOutlined, EditOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { getPaletteByTheme } from '../../../common/colors';

type Props = {
  task: TaskDTO;
  onEdit?: () => void;
  onRemove?: () => void;
  className?: string | undefined;
  onToggle?: () => void;
};

export const TaskTile: React.FC<Props> = ({ task, onEdit, onRemove, className, onToggle }) => {
  const theme = useTheme();
  const importance = useMemo(() => {
    return IMPORTANCE_LEVELS[task.importance];
  }, [task.importance]);

  const bgColor = useMemo(() => getPaletteByTheme(importance.colors, theme).bgColor, [importance, theme]);
  const fgColor = useMemo(() => getPaletteByTheme(importance.colors, theme).fgColor, [importance, theme]);
  const isOverdue = !!task.dueDate && !task.completed && (new Date(task.dueDate) < new Date());

  return (
    <Card
      className={className}
      sx={{
        backgroundColor: bgColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        border: isOverdue ? '2px solid' : 'unset',
        borderColor: theme.palette.error.main,
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 'bold',
              textDecoration: task.completed ? 'line-through' : 'none',
              textDecorationThickness: 3,
            }}
          >
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
              size="small"
            >
              Edit
            </Button>
            <Button
              variant="text"
              startIcon={<DeleteOutlined sx={{ color: 'red' }} />}
              onClick={() => onRemove && onRemove()}
              sx={{ color: 'text.primary' }}
              size="small"
            >
              Delete
            </Button>
          </Box>
        }
      />

      <CardContent sx={{ pt: 0, pb: 1, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
          <Typography variant="body2" sx={{ color: fgColor, fontWeight: 'bold' }}>
            {importance.displayText}
          </Typography>
          {task.dueDate && (
            <Typography variant="body2" sx={{ color: fgColor }}>
              [Due: {task.dueDate}]
            </Typography>
          )}
        </Box>

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
          sx={{ color: 'text.primary', borderColor: 'text.primary' }}
          size="small"
        >
          {task.completed ? 'Unsolve' : 'Solve'}
        </Button>
      </CardActions>
    </Card>
  );
};
