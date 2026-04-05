import { Card, Spinner, Text } from "@fluentui/react-components";
import { useExpenses } from "../hooks/useExpenses"

export const ExpensesPage = () => {
    const { data, isLoading } = useExpenses();

    if (isLoading) return <Spinner />

    const total = data?.reduce((sum, e) => sum + e.amount, 0) ?? 0;

    const byCategory = Object.values(
        (data ?? []).reduce((acc, e) => {
            const key = e.category.name;
            acc[key] = (acc[key] || 0) + e.amount;
            return acc;
        }, {} as Record<string, number>)
    );

    return (
        <div style={{ padding: 24 }}>
            <Text size={700} weight="semibold">
                Expenses
            </Text>

            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                <Card>
                    <Text>Total</Text>
                    <Text size={600}>{total.toFixed(2)} HUF</Text>
                </Card>

                <Card>
                    <Text>Entries</Text>
                    <Text size={600}>{data?.length ?? 0}</Text>
                </Card>
            </div>

            <div style={{ marginTop: 24 }}>
                <Text weight="semibold">Recent</Text>

                {(data ?? []).slice(0, 5).map((e) => (
                    <Card key={e.id} style={{ marginTop: 8 }}>
                        <Text>{e.amount} HUF - {e.category.name}</Text>
                    </Card>
                ))}
            </div>
        </div>
    );
}