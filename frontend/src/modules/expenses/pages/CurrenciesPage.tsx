import { Button, Dropdown, Label, Option, Switch } from "@fluentui/react-components";
import { PageFrame } from "../../../components/common/PageFrame";
import { PageHeader } from "../../../components/common/PageHeader";
import { AddRegular } from "@fluentui/react-icons";
import { useState } from "react";
import type { CurrencyDTO, CurrencyExchangeDTO } from "../models/currency";
import { CurrencyDialog } from "../dialogs/CurrencyDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currencyApi } from "../../../api/currency.api";
import { currencyKeys } from "../../../keys/currencyKeys";
import { useCurrencyTree } from "../../../hooks/useCurrencyTree";
import { CurrencyTable } from "../components/CurrencyTable";
import { CurrencyExchangeDialog } from "../dialogs/CurrencyExchangeDialog";
import { MONTHS } from "../../../common/month";

export const CurrenciesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [showDisabled, setShowDisabled] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [currencyDialogOpen, setCurrencyDialogOpen] = useState(false);
  const [currencyExchangeDialogOpen, setCurrencyExchangeDialogOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyDTO | null>(null);
  const [selectedExchange, setSelectedExchange] = useState<CurrencyExchangeDTO | null>(null);

  const { data, isLoading } = useCurrencyTree(year, showDisabled);

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

  const saveExchangeMutation = useMutation({
    mutationFn: currencyApi.saveExchange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.all });
    },
  });

  const handleCreate = () => {
    setSelectedCurrency(null);
    setCurrencyDialogOpen(true);
  };

  const handleEdit = (currency: CurrencyDTO) => {
    setSelectedCurrency(currency);
    setCurrencyDialogOpen(true);
  };

  const handleAddExchange = (currency: CurrencyDTO) => {
    setSelectedCurrency(currency);
    setSelectedExchange(null);
    setCurrencyExchangeDialogOpen(true);
  };

  const loading = createMutation.isPending || updateMutation.isPending || saveExchangeMutation.isPending;

  const handleSubmit = async (data: Omit<CurrencyDTO, "id">, id: number | undefined) => {
    if (id) {
      await updateMutation.mutateAsync({ id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleExchangeSubmit = async (data: CurrencyExchangeDTO) => {
    await saveExchangeMutation.mutateAsync(data);
  };

  return (
    <PageFrame>
      <PageHeader
        title={"Currencies"}
        actions={
          <>
            <Label htmlFor="show-disabled-toggle">Show Disabled</Label>
            <Switch
              id="show-disabled-toggle"
              checked={showDisabled}
              onChange={(_, data) => setShowDisabled(data.checked)}
            />
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

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CurrencyTable data={data} onEdit={handleEdit} onAddExchange={handleAddExchange} />
      )}

      <CurrencyDialog
        open={currencyDialogOpen}
        currency={selectedCurrency}
        onClose={() => setCurrencyDialogOpen(false)}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <CurrencyExchangeDialog
        open={currencyExchangeDialogOpen}
        exchange={selectedExchange}
        year={year}
        defaultCurrencyFromId={selectedCurrency?.id}
        defaultMonth={MONTHS.january.value}
        loading={loading}
        onClose={() => setCurrencyExchangeDialogOpen(false)}
        onSubmit={handleExchangeSubmit}
      />
    </PageFrame>
  );
};
