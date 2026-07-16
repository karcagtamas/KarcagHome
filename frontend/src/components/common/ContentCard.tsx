import { Box, Card, CardHeader, Typography } from '@mui/material';

type Props = {
  caption: React.ReactNode | string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

export const ContentCard: React.FC<Props> = ({ caption, actions, children }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              width: '100%',
            }}
          >
            {typeof caption === 'string' ? <Typography variant="h5">{caption}</Typography> : caption}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                gap: '0.6rem',
                justifyContent: 'flex-end',
              }}
            >
              {actions}
            </Box>
          </Box>
        }
      />

      {children}
    </Card>
  );
};
