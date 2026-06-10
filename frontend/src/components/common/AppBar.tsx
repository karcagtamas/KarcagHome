import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  route: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export const AppBar: React.FC<Props> = ({ title, route, left, right }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '48px',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'divider',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1,
          height: '48px',
          paddingX: 2,
        }}
      >
        {left}
      </Box>
      <Typography
        onClick={() => navigate(route)}
        variant="h6"
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '48px',
          paddingX: 2,
          fontWeight: 600,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingX: 2,
          gap: 1,
          height: '48px',
        }}
      >
        {right}
      </Box>
    </Box>
  );
};
