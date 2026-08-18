import { Box, Typography } from '@mui/material';
import { ContentCard } from '../../../components/common/ContentCard';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { useAccountSummary } from '../hooks/useAccountSummary';
import type { AccountDTO } from '../models/account';
import { AccountCategoriesChart } from './AccountCategoriesChart';
import { AccountCategoryTypesChart } from './AccountCategoryTypesChart';

type Props = {
  account: AccountDTO;
};

export const AccountSummary: React.FC<Props> = ({ account }) => {
  const { data: summary, isLoading } = useAccountSummary(account.id);

  return (
    <ContentCard caption="Summary">
      <Box sx={{ padding: '8px' }}>
        <LoadingBox isLoading={isLoading}>
          <Typography>
            <strong>Currency:</strong> {account.currency.name} [{account.currency.abbreviation}]
          </Typography>
          <Typography>
            <strong>Total:</strong> {summary?.total} {account.currency.abbreviation}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {summary && <AccountCategoriesChart summary={summary} />}
            {summary && <AccountCategoryTypesChart summary={summary} />}
          </Box>
        </LoadingBox>
      </Box>
    </ContentCard>
  );
};
