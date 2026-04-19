import { useState } from "react";
import type { CurrencyTreeDTO } from "../models/currency";
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
import { ChevronDownRegular, ChevronRightRegular } from "@fluentui/react-icons";

type Props = {
  data?: CurrencyTreeDTO[];
};

export const CurrencyTable: React.FC<Props> = ({ data = [] }) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Currency</TableHeaderCell>
          <TableHeaderCell>Month</TableHeaderCell>
          <TableHeaderCell>Rates</TableHeaderCell>
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
