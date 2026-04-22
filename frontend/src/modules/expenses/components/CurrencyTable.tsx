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
import { ChevronDownRegular, ChevronRightRegular, EditRegular } from "@fluentui/react-icons";

type Props = {
  data?: CurrencyTreeDTO[];
  onEdit: (data: CurrencyDTO) => void;
};

export const CurrencyTable: React.FC<Props> = ({ data = [], onEdit }) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEdit = (currency: CurrencyTreeDTO) => {
    onEdit({
      ...currency.data,
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
          <React.Fragment key={currency.data.id}>
            <TableRow>
              <TableCell>
                <Button
                  appearance="subtle"
                  icon={expanded[currency.data.id] ? <ChevronDownRegular /> : <ChevronRightRegular />}
                  onClick={() => toggle(currency.data.id)}
                >
                  {currency.data.name} [{currency.data.abbreviation}]
                </Button>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell>
                <Button
                  icon={<EditRegular />}
                  appearance="subtle"
                  onClick={() => handleEdit(currency)}
                  disabled={currency.data.disabled}
                />
              </TableCell>
            </TableRow>

            {expanded[currency.data.id] &&
              currency.months.map((month) => (
                <React.Fragment key={month.month}>
                  <TableRow>
                    <TableCell />
                    <TableCell>Month {month.month}</TableCell>
                    <TableCell />
                  </TableRow>

                  {month.rates.map((rate) => (
                    <TableRow key={`${currency.data.id}-${month.month}-${rate.currencyToId}`}>
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
