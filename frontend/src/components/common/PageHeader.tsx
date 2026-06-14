import { Box, Typography } from '@mui/material';

type Props = {
  title: React.ReactNode;
  actions?: React.ReactNode;
};

export const PageHeader: React.FC<Props> = ({ title, actions }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        padding: '0 16px',
        borderBottom: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
        gap: '12px',
        boxSizing: 'border-box',
        width: '100%',
        bgcolor: 'background.paper'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minWidth: 0,
        }}
      >
        {typeof title === 'string' ? (
          <Typography
            variant="h6"
            sx={{
              fontSize: '20px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
        ) : (
          title
        )}
      </Box>
      {actions && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          {actions}
        </Box>
      )}
    </Box>
  );
};
