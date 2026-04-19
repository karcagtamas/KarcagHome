import { Button } from "@fluentui/react-components";
import { PageFrame } from "../../../components/common/PageFrame";
import { PageHeader } from "../../../components/common/PageHeader";
import { AddRegular } from "@fluentui/react-icons";
import { useState } from "react";
import type { CurrencyDTO } from "../models/currency";
import { CurrencyDialog } from "../dialogs/CurrencyDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currencyApi } from "../../../api/currency.api";
import { currencyKeys } from "../../../keys/currencyKeys";

export const CurrenciesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyDTO | null>(null);

  const createMutation = useMutation({
    mutationFn: currencyApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<CurrencyDTO, "id"> }) => currencyApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.all });
    },
  });

  const handleCreate = () => {
    setSelectedCurrency(null);
    setDialogOpen(true);
  };

  const handleEdit = (currency: CurrencyDTO) => {
    setSelectedCurrency(currency);
    setDialogOpen(true);
  };

  const loading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: Omit<CurrencyDTO, "id">, id: number | undefined) => {
    if (id) {
      await updateMutation.mutateAsync({ id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  return (
    <PageFrame>
      <PageHeader title={"Currencies"} actions={<Button icon={<AddRegular />} onClick={handleCreate} />}></PageHeader>

      <CurrencyDialog
        open={dialogOpen}
        currency={selectedCurrency}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </PageFrame>
  );
};
