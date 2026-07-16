import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { useState } from 'react';
import type { CurrencyDTO, CurrencyExchangeDTO, MonthNode, RateNode } from '../models/currency';
import { CurrencyEditDialog } from '../dialogs/CurrencyEditDialog';
import { useCurrencyTree } from '../hooks/useCurrencyTree';
import { CurrencyTable } from '../components/CurrencyTable';
import { CurrencyExchangeEditDialog } from '../dialogs/CurrencyExchangeEditDialog';
import { MONTHS } from '../../../common/month';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { useExchangeYears } from '../hooks/useExchangeYears';
import { Box, Button, FormControlLabel, IconButton, MenuItem, Switch, TextField } from '@mui/material';
import { AddOutlined, ArrowBackOutlined } from '@mui/icons-material';
import { useCurrencyMutations } from '../hooks/useCurrencyMutations';
import { useNavigate } from 'react-router-dom';

export const CurrenciesPage: React.FC = () => {
  const navigate = useNavigate();

  const [showDisabled, setShowDisabled] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [currencyDialogOpen, setCurrencyDialogOpen] = useState(false);
  const [currencyExchangeDialogOpen, setCurrencyExchangeDialogOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyDTO | null>(null);
  const [selectedExchange, setSelectedExchange] = useState<CurrencyExchangeDTO | null>(null);

  const { data, isLoading } = useCurrencyTree(year, showDisabled);
  const years = useExchangeYears();
  const {
    createMutation,
    updateMutation,
    exchangeSaveMutation,
    exchangeRemoveMutation,
    isPending: apiLoading,
  } = useCurrencyMutations();

  const handleCreate = () => {
    setSelectedCurrency(null);
    setCurrencyDialogOpen(true);
  };

  const handleEdit = (currency: CurrencyDTO) => {
    setSelectedCurrency(currency);
    setCurrencyDialogOpen(true);
  };

  const handleExchangeAdd = (currency: CurrencyDTO) => {
    setSelectedCurrency(currency);
    setSelectedExchange(null);
    setCurrencyExchangeDialogOpen(true);
  };

  const handleExchangeEdit = (currency: CurrencyDTO, month: MonthNode, rate: RateNode) => {
    setSelectedCurrency(currency);
    setSelectedExchange({
      currencyFromId: currency.id,
      currencyToId: rate.currencyToId,
      year: year,
      month: month.month,
      value: rate.value,
    });
    setCurrencyExchangeDialogOpen(true);
  };

  const handleSubmit = async (data: Omit<CurrencyDTO, 'id'>, id: number | undefined) => {
    try {
      if (id) {
        await updateMutation.mutateAsync({ id, data: data });
      } else {
        await createMutation.mutateAsync(data);
      }
    } catch (err) {
      console.error('Currency transaction failed', err);
    }
  };

  const handleExchangeSubmit = async (data: CurrencyExchangeDTO) => {
    try {
      await exchangeSaveMutation.mutateAsync(data);
    } catch (err) {
      console.error('Exchange save failed', err);
    }
  };

  const handleExchangeRemove = async (currency: CurrencyDTO, month: MonthNode, rate: RateNode) => {
    try {
      await exchangeRemoveMutation.mutateAsync({
        currencyFromId: currency.id,
        currencyToId: rate.currencyToId,
        year: year,
        month: month.month,
      });
    } catch (err) {
      console.error('Exchange removal failed', err);
    }
  };

  return (
    <PageFrame>
      <PageHeader
        title="Currencies"
        actions={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  id="show-disabled-toggle"
                  checked={showDisabled}
                  onChange={(e) => setShowDisabled(e.target.checked)}
                />
              }
              label="Show Disabled"
            />

            <TextField
              select
              size="small"
              label="Year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              sx={{ minWidth: 100 }}
            >
              {years.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" startIcon={<AddOutlined />} onClick={handleCreate} size="small">
              Create
            </Button>

            <IconButton size="small" color="info" onClick={() => navigate('/accounts')} disabled={apiLoading}>
              <ArrowBackOutlined fontSize="small" />
            </IconButton>
          </Box>
        }
      ></PageHeader>

      <LoadingBox isLoading={isLoading}>
        <CurrencyTable
          data={data}
          onEdit={handleEdit}
          onExchangeAdd={handleExchangeAdd}
          onExchangeEdit={handleExchangeEdit}
          onExchangeRemove={handleExchangeRemove}
        />
      </LoadingBox>

      {currencyDialogOpen && (
        <CurrencyEditDialog
          key={selectedCurrency ? `edit-currency-${selectedCurrency.id}` : 'create-currency'}
          open={currencyDialogOpen}
          currency={selectedCurrency}
          onClose={() => setCurrencyDialogOpen(false)}
          onSubmit={handleSubmit}
          loading={apiLoading}
        />
      )}

      {currencyExchangeDialogOpen && (
        <CurrencyExchangeEditDialog
          key={
            selectedExchange
              ? `edit-rate-${selectedExchange.currencyFromId}-${selectedExchange.currencyToId}-${selectedExchange.month}`
              : 'add-rate'
          }
          open={currencyExchangeDialogOpen}
          exchange={selectedExchange}
          year={year}
          defaultCurrencyFromId={selectedCurrency?.id}
          defaultMonth={MONTHS.january.value}
          loading={apiLoading}
          onClose={() => setCurrencyExchangeDialogOpen(false)}
          onSubmit={handleExchangeSubmit}
        />
      )}
    </PageFrame>
  );
};
