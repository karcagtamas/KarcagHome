import { Caption1, Card, CardHeader, makeStyles, Text } from "@fluentui/react-components";
import { DataLineRegular, HomeRegular, MoneyRegular, TasksAppRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        flex: 1,
        alignItems: 'center'
    },
    card: {
        height: '180px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
            transform: 'translateY(-4px)',
            backgroundColor: 'var(--colorNeutralBackground1Hover)',
        }
    },
});

export const HomePage: React.FC = () => {
    const styles = useStyles();
    const navigate = useNavigate();

    const menuItems = [
        { title: 'Measurements', desc: 'Data tracking', icon: <DataLineRegular fontSize={40} />, path: '/measurements', },
        { title: 'Smart Home', desc: 'IoT Device Control', icon: <HomeRegular fontSize={40} />, path: '/smart-home', },
        { title: 'Expenses', desc: 'Financial Analytics', icon: <MoneyRegular fontSize={40} />, path: '/expenses', },
        { title: 'Tasks', desc: '', icon: <TasksAppRegular fontSize={40} />, path: '/tasks', },
    ];

    return (
        <div className={styles.grid}>
            {menuItems.map((item) => (
                <Card key={item.title} className={styles.card} onClick={() => navigate(item.path)}>
                    <CardHeader
                        image={item.icon}
                        header={<Text weight="bold" size={500}>{item.title}</Text>}
                        description={<Caption1>{item.desc}</Caption1>} />
                </Card>
            ))}
        </div>
    );
}