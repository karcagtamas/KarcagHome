import { Card, CardHeader } from '@fluentui/react-components';
import { useExpenses } from '../../../hooks/useExpenses';

type Props = {
  accountId: number;
};

export const Expenses: React.FC<Props> = ({ accountId }) => {
  const { data, isLoading } = useExpenses(accountId);

  return (
    <Card>
      <CardHeader header="Expenses" />
    </Card>
  );
};
