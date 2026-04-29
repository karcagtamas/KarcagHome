import { makeStyles, tokens } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    height: '48px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  left: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'left',
    gap: tokens.spacingHorizontalS,
    height: '48px',
    padding: `0 ${tokens.spacingHorizontalM}`,
  },

  title: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '48px',
    padding: `0 ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    ':hover': {
      cursor: 'pointer',
    },
  },

  right: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'right',
    padding: `0 ${tokens.spacingHorizontalM}`,
    gap: tokens.spacingHorizontalS,
    height: '48px',
  },
});

type Props = {
  title: string;
  route: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export const AppBar: React.FC<Props> = ({ title, route, left, right }) => {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.left}>{left}</div>
      <div className={styles.title} onClick={() => navigate(route)}>
        {title}
      </div>
      <div className={styles.right}>{right}</div>
    </div>
  );
};
