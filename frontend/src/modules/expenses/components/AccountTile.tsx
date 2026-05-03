import { Card, CardHeader } from '@fluentui/react-components';
import type { AccountDTO } from '../models/account';
import { WalletRegular } from '@fluentui/react-icons';

type Props = {
  account: AccountDTO;
  onClick?: () => void;
  className?: string | undefined;
};

export const AccountTile: React.FC<Props> = ({ account, onClick, className }) => {
  return (
    <Card className={className} onClick={onClick}>
      <CardHeader
        image={<WalletRegular />}
        header={
          <>
            {account.name} [{account.currency.name}]
          </>
        }
      ></CardHeader>
    </Card>
  );
};
