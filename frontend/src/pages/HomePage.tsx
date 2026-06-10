import { useNavigate } from 'react-router-dom';
import { AssessmentOutlined, AssignmentTurnedInOutlined, AttachMoneyOutlined, HomeOutlined } from '@mui/icons-material';
import { Box, Card, CardHeader, Typography } from '@mui/material';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Measurements',
      desc: 'Data tracking',
      icon: <AssessmentOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/measurements',
    },
    {
      title: 'Smart Home',
      desc: 'IoT Device Control',
      icon: <HomeOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/smart-home',
    },
    {
      title: 'Expenses',
      desc: 'Financial Analytics',
      icon: <AttachMoneyOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/accounts',
    },
    {
      title: 'Tasks',
      desc: '',
      icon: <AssignmentTurnedInOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/tasks',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {menuItems.map((item) => (
        <Card
          key={item.title}
          onClick={() => navigate(item.path)}
          sx={{
            height: '180px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              transform: 'translateY(-4px)',
              bgcolor: 'action.hover',
              boxShadow: 4,
            },
          }}
        >
          <CardHeader
            avatar={item.icon}
            title={
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {item.title}
              </Typography>
            }
            subheader={
              item.desc ? (
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              ) : null
            }
          />
        </Card>
      ))}
    </Box>
  );
};
