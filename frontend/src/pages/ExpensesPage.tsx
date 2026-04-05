import { Button, Card, makeStyles, Spinner, Text } from "@fluentui/react-components";
import { BookmarkRegular, CurrencyDollarEuroRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "../hooks/useAccounts";

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem',
    },
    spacer: {
        flexGrow: 1
    }
});

export const ExpensesPage = () => {
    const styles = useStyles();
    const { data, isLoading } = useAccounts();
    const navigate = useNavigate();

    if (isLoading) return <Spinner />

    return (
        <div style={{ padding: 24 }}>
            <div className={styles.toolbar}>
                <Text size={700} weight="semibold">Expenses</Text>
                <span className={styles.spacer} />
                <Button icon={<CurrencyDollarEuroRegular />} onClick={() => navigate("/currencies")} />
                <Button icon={<BookmarkRegular />} onClick={() => navigate("/expense-categories")} />
            </div>

            <div style={{ marginTop: 24 }}>
                <Text weight="semibold">Accounts</Text>

                {data?.map(account => (<Card key={account.id}>{account.name}</Card>))}
            </div>
        </div>
    );
}