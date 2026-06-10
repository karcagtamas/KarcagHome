import { Box, CircularProgress } from '@mui/material';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

export const LoadingBox: React.FC<Props> = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: 4,
          boxSizing: 'border-box',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <>{children}</>;
};
