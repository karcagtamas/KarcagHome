import { makeStyles } from "@fluentui/react-components";

type Props = {
  children: React.ReactNode;
};

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
});

export const PageFrame: React.FC<Props> = ({ children }) => {
  const styles = useStyles();

  return <div className={styles.page}>{children}</div>;
};
