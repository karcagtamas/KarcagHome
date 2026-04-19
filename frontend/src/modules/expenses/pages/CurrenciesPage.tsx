import { Button, Dropdown, Option } from "@fluentui/react-components";
import { PageFrame } from "../../../components/common/PageFrame";
import { PageHeader } from "../../../components/common/PageHeader";
import { AddRegular } from "@fluentui/react-icons";
import { useState } from "react";
import type { CurrencyDTO } from "../models/currency";
import { CurrencyDialog } from "../dialogs/CurrencyDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currencyApi } from "../../../api/currency.api";
import { currencyKeys } from "../../../keys/currencyKeys";
import { useCurrencyTree } from "../../../hooks/useCurrencyTree";
import { CurrencyTable } from "../components/CurrencyTable";

export const CurrenciesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [year, setYear] = useState(new Date().getFullYear());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyDTO | null>(null);

  const { data, isLoading } = useCurrencyTree(year);

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
      <PageHeader
        title={"Currencies"}
        actions={
          <>
            <Dropdown value={year.toString()} onOptionSelect={(_, data) => setYear(Number(data.optionValue))}>
              {[2023, 2024, 2025, 2026].map((y) => (
                <Option key={y} value={y.toString()} text={y.toString()}>
                  {y}
                </Option>
              ))}
            </Dropdown>
            <Button icon={<AddRegular />} onClick={handleCreate} />
          </>
        }
      ></PageHeader>

      {isLoading ? <div>Loading...</div> : <CurrencyTable data={data} />}

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
