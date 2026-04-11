import { Button } from "@fluentui/react-components";
import { PageFrame } from "../../../components/common/PageFrame";
import { PageHeader } from "../../../components/common/PageHeader";
import { AddRegular } from "@fluentui/react-icons";

export const CurrenciesPage: React.FC = () => {
  return (
    <PageFrame>
      <PageHeader title={"Currencies"} actions={<Button icon={<AddRegular />} />}></PageHeader>
    </PageFrame>
  );
};
