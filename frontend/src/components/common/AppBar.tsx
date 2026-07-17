import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.svg';

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
      <Box
        onClick={() => navigate(route)}
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '48px',
          paddingX: 2,
          cursor: 'pointer',
          userSelect: 'none',
          gap: '8px',
        }}
      >
        <img src={logo} style={{ width: '24px', height: '24px' }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      </Box>
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
