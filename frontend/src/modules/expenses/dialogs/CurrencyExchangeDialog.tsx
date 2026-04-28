import { Button, Dropdown, Field, makeStyles, Spinner, tokens, Option, Input } from "@fluentui/react-components";
import type { CurrencyExchangeDTO } from "../models/currency";
import type React from "react";
import { useEffect, useState } from "react";
import { AppDialog } from "../../../components/dialog/AppDialog";
import { MONTHS } from "../../../common/month";
import { useCurrencies } from "../../../hooks/useCurrencies";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: "420px",
  },
});

type Props = {
  open: boolean;
  exchange?: CurrencyExchangeDTO | null;
  year: number;
  loading?: boolean;

  defaultCurrencyFromId?: number;
  defaultMonth?: number;

  onClose: () => void;
  onSubmit: (data: CurrencyExchangeDTO) => Promise<void>;
};

export const CurrencyExchangeDialog: React.FC<Props> = ({
  open,
  exchange,
  year,
  loading = false,
  defaultCurrencyFromId,
  defaultMonth,
  onClose,
  onSubmit,
}) => {
  const styles = useStyles();

  const isEdit = !!exchange;
  const currencies = useCurrencies();

  const [currencyFromId, setCurrencyFromId] = useState<number>();
  const [currencyToId, setCurrencyToId] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!open) return;

    setCurrencyFromId(exchange?.currencyFromId ?? defaultCurrencyFromId);
    setCurrencyToId(exchange?.currencyToId);
    setMonth(exchange?.month ?? defaultMonth);
    setValue(exchange?.value?.toString() ?? "");
  }, [exchange, open, defaultCurrencyFromId, defaultMonth]);

  const parsedValue = Number(value);
  const isValid =
    !!currencyFromId &&
    !!currencyToId &&
    !!month &&
    !Number.isNaN(parsedValue) &&
    parsedValue > 0 &&
    currencyFromId !== currencyToId;

  const handleSubmit = async () => {
    if (!isValid || loading) {
      return;
    }

    await onSubmit({
      currencyFromId,
      currencyToId,
      year,
      month,
      value: parsedValue,
    });

    onClose();
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => {
        if (!o && !loading) {
          onClose();
        }
      }}
      title={isEdit ? "Edit Exchange Rate" : "Add Exchange Rate"}
      footer={
        <>
          <Button appearance="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button appearance="primary" onClick={handleSubmit} disabled={!isValid || loading}>
            {loading ? <Spinner size="tiny" /> : isEdit ? "Save" : "Create"}
          </Button>
        </>
      }
    >
      <div className={styles.content}>
        <Field label="From Currency" required>
          <Dropdown
            value={currencies.find((x) => x.id === currencyFromId)?.name}
            selectedOptions={currencyFromId ? [currencyFromId.toString()] : []}
            onOptionSelect={(_, data) => setCurrencyFromId(Number(data.optionValue))}
            disabled={loading || isEdit}
          >
            {currencies
              .filter((x) => x.id !== currencyToId)
              .map((c) => (
                <Option key={c.id} value={c.id.toString()} text={`${c.name} [${c.abbreviation}]`}>
                  {c.name} [{c.abbreviation}]
                </Option>
              ))}
          </Dropdown>
        </Field>

        <Field label="To Currency" required>
          <Dropdown
            value={currencies.find((x) => x.id === currencyToId)?.name}
            selectedOptions={currencyToId ? [currencyToId.toString()] : []}
            onOptionSelect={(_, data) => setCurrencyToId(Number(data.optionValue))}
            disabled={loading || isEdit}
          >
            {currencies
              .filter((x) => x.id !== currencyFromId)
              .map((c) => (
                <Option key={c.id} value={c.id.toString()} text={`${c.name} [${c.abbreviation}]`}>
                  {c.name} [{c.abbreviation}]
                </Option>
              ))}
          </Dropdown>
        </Field>

        <Field label="Month" required>
          <Dropdown
            value={Object.values(MONTHS).find((x) => x.value === month)?.displayText}
            selectedOptions={month ? [month.toString()] : []}
            onOptionSelect={(_, data) => setMonth(Number(data.optionValue))}
            disabled={loading}
          >
            {Object.values(MONTHS).map((m) => (
              <Option key={m.value} value={m.value.toString()}>
                {m.displayText}
              </Option>
            ))}
          </Dropdown>
        </Field>

        <Field label={`Exchange Value (${year})`} required>
          <Input
            type="number"
            step="0.000001"
            value={value}
            onChange={(_, data) => setValue(data.value)}
            disabled={loading}
          />
        </Field>
      </div>
    </AppDialog>
  );
};
