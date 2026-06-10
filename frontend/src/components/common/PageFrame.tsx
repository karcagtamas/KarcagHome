import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export const PageFrame: React.FC<Props> = ({ children }) => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
};
