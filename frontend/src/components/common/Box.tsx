import { Card, CardHeader, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    gap: '0.6rem',
    justifyContent: 'flex-end'
  },
});

type Props = {
  caption: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

export const Box: React.FC<Props> = ({ caption, actions, children }) => {
  const styles = useStyles();

  return (
    <Card>
      <CardHeader
        header={
          <div className={styles.header}>
            <span>{caption}</span> <div className={styles.actions}>{actions}</div>
          </div>
        }
      />

      {children}
    </Card>
  );
};
