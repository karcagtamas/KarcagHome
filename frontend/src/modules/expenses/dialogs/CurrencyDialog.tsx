import { useEffect, useState } from "react";
import type { CurrencyDTO } from "../models/currency";
import { AppDialog } from "../../../components/dialog/AppDialog";
import { Button, Field, Input } from "@fluentui/react-components";

type Props = {
  open: boolean;
  currency?: CurrencyDTO | null;
  onClose: () => void;
  onSubmit: (data: Omit<CurrencyDTO, "id">, id?: number) => void;
};

export const CurrencyDialog: React.FC<Props> = ({ open, currency, onClose, onSubmit }) => {
  const isEdit = !!currency;

  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");

  useEffect(() => {
    if (open) {
      setName(currency?.name ?? "");
      setAbbreviation(currency?.abbreviation ?? "");
    }
  }, [currency, open]);

  const handleSubmit = () => {
    if (!name || !abbreviation) return;

    onSubmit({ name, abbreviation }, currency?.id);

    onClose();
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => !o && onClose()}
      title={isEdit ? "Edit Currency" : "Create Currency"}
      footer={
        <>
          <Button appearance="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleSubmit}>
            {isEdit ? "Save" : "Create"}
          </Button>
        </>
      }
    >
      <Field label="Name" required>
        <Input value={name} onChange={(_, d) => setName(d.value)} placeholder="e.g. Euro" />
      </Field>

      <Field label="Abbreviation" required>
        <Input value={abbreviation} onChange={(_, d) => setAbbreviation(d.value)} placeholder="e.g. EUR" />
      </Field>
    </AppDialog>
  );
};
