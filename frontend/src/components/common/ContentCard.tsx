import { Box, Card, CardHeader } from '@mui/material';

type Props = {
  caption: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

export const ContentCard: React.FC<Props> = ({ caption, actions, children }) => {
  return (
    <Card>
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
            <span>{caption}</span>{' '}
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
