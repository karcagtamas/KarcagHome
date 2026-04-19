import { useEffect, useState } from "react";
import type { CurrencyDTO } from "../models/currency";
import { AppDialog } from "../../../components/dialog/AppDialog";
import { Button, Field, Input, Spinner } from "@fluentui/react-components";

type Props = {
  open: boolean;
  currency?: CurrencyDTO | null;
  onClose: () => void;
  onSubmit: (data: Omit<CurrencyDTO, "id">, id?: number) => Promise<void>;
  loading?: boolean;
};

export const CurrencyDialog: React.FC<Props> = ({ open, currency, onClose, onSubmit, loading }) => {
  const isEdit = !!currency;

  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");

  useEffect(() => {
    if (open) {
      setName(currency?.name ?? "");
      setAbbreviation(currency?.abbreviation ?? "");
    }
  }, [currency, open]);

  const isValid = name.trim().length > 0 && abbreviation.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      await onSubmit({ name: name.trim(), abbreviation: abbreviation.trim().toUpperCase() }, currency?.id);

      onClose();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => !o && !loading && onClose()}
      title={isEdit ? "Edit Currency" : "Create Currency"}
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
      <Field label="Name" required>
        <Input
          autoFocus
          value={name}
          onChange={(_, d) => setName(d.value)}
          disabled={loading}
          placeholder="e.g. Euro"
        />
      </Field>

      <Field label="Abbreviation" required>
        <Input
          value={abbreviation}
          onChange={(_, d) => setAbbreviation(d.value)}
          disabled={loading}
          placeholder="e.g. EUR"
        />
      </Field>
    </AppDialog>
  );
};
