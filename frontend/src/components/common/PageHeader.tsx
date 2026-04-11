import { makeStyles, Text } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "56px",
    padding: "0 16px",
    borderBottom: "1px solid #eee",
    flexShrink: 0,
    gap: "12px",
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  left: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },
});

type Props = {
  title: React.ReactNode;
  actions?: React.ReactNode;
};

export const PageHeader: React.FC<Props> = ({ title, actions }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <Text className={styles.title}>{title}</Text>
      </div>
      {actions && <div className={styles.right}>{actions}</div>}
    </div>
  );
};
