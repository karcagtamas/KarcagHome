import { Box, Card, CardHeader, Typography } from '@mui/material';
import type { AccountDTO } from '../models/account';
import { AccountBalanceWalletOutlined } from '@mui/icons-material';
import { useAccountSummary } from '../hooks/useAccountSummary';
import { LoadingBox } from '../../../components/common/LoadingBox';

type Props = {
  account: AccountDTO;
  onClick?: () => void;
  className?: string | undefined;
};

export const AccountTile: React.FC<Props> = ({ account, onClick, className }) => {
  const { data: summary, isLoading } = useAccountSummary(account.id);

  return (
    <Card
      className={className}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': onClick
          ? {
              transform: 'translateY(-2px)',
              boxShadow: 3,
            }
          : {},
      }}
    >
      <CardHeader
        avatar={<AccountBalanceWalletOutlined sx={{ color: 'primary.main', fontSize: 28 }} />}
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {account.name}{' '}
            <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>
              [{account.currency.name}]
            </Box>
          </Typography>
        }
      ></CardHeader>

      <LoadingBox isLoading={isLoading}>
        <Box sx={{ padding: '4px' }}>
          <Typography>
            <strong>Total:</strong> {summary?.total} {account.currency.abbreviation}
          </Typography>
        </Box>
      </LoadingBox>
    </Card>
  );
};
