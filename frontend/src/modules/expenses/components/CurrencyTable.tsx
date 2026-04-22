import { useState } from "react";
import type { CurrencyDTO, CurrencyTreeDTO } from "../models/currency";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";
import React from "react";
import { ChevronDownRegular, ChevronRightRegular, DeleteRegular, EditRegular } from "@fluentui/react-icons";

type Props = {
  data?: CurrencyTreeDTO[];
  onEdit: (data: CurrencyDTO) => void;
  onRemove: (data: CurrencyDTO) => void;
};

export const CurrencyTable: React.FC<Props> = ({ data = [], onEdit, onRemove }) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEdit = (currency: CurrencyTreeDTO) => {
    onEdit({
      id: currency.currencyId,
      name: currency.currencyName,
      abbreviation: currency.currencyAbbreviation,
    });
  };

  const handleRemove = (currency: CurrencyTreeDTO) => {
    onRemove({
      id: currency.currencyId,
      name: currency.currencyName,
      abbreviation: currency.currencyAbbreviation,
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Currency</TableHeaderCell>
          <TableHeaderCell>Month</TableHeaderCell>
          <TableHeaderCell>Rates</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((currency) => (
          <React.Fragment key={currency.currencyId}>
            <TableRow>
              <TableCell>
                <Button
                  appearance="subtle"
                  icon={expanded[currency.currencyId] ? <ChevronDownRegular /> : <ChevronRightRegular />}
                  onClick={() => toggle(currency.currencyId)}
                >
                  {currency.currencyName} [{currency.currencyAbbreviation}]
                </Button>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell>
                <Button icon={<EditRegular />} appearance="subtle" onClick={() => handleEdit(currency)} />
                <Button icon={<DeleteRegular />} appearance="subtle" onClick={() => handleRemove(currency)} />
              </TableCell>
            </TableRow>

            {expanded[currency.currencyId] &&
              currency.months.map((month) => (
                <React.Fragment key={month.month}>
                  <TableRow>
                    <TableCell />
                    <TableCell>Month {month.month}</TableCell>
                    <TableCell />
                  </TableRow>

                  {month.rates.map((rate) => (
                    <TableRow key={`${currency.currencyId}-${month.month}-${rate.currencyToId}`}>
                      <TableCell />
                      <TableCell />
                      <TableCell>
                        {rate.currencyToName}: {rate.value}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};
