import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `0 ${tokens.spacingHorizontalM}`,
  },

  left: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },

  title: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
  },

  right: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
});

type Props = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export const AppBar: React.FC<Props> = ({ title, left, right }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        {left}
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.right}>{right}</div>
    </div>
  );
};
