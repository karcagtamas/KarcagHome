import { useState } from "react";
import type { CurrencyDTO, CurrencyTreeDTO, MonthNode, RateNode } from "../models/currency";
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
import { AddRegular, ChevronDownRegular, ChevronRightRegular, DeleteRegular, EditRegular } from "@fluentui/react-icons";
import { MONTHS } from "../../../common/month";

type Props = {
  data?: CurrencyTreeDTO[];
  onEdit: (data: CurrencyDTO) => void;
  onExchangeAdd: (data: CurrencyDTO) => void;
  onExchangeEdit: (currency: CurrencyDTO, month: MonthNode, rate: RateNode) => void;
  onExchangeRemove: (currency: CurrencyDTO, month: MonthNode, rate: RateNode) => void;
};

export const CurrencyTable: React.FC<Props> = ({
  data = [],
  onEdit,
  onExchangeAdd,
  onExchangeEdit,
  onExchangeRemove,
}) => {
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

  const handleExchangeAdd = (currency: CurrencyTreeDTO) => {
    onExchangeAdd({
      ...currency.data,
    });
  };

  const handleExchangeEdit = (currency: CurrencyDTO, month: MonthNode, rate: RateNode) => {
    onExchangeEdit(currency, month, rate);
  };

  const handleExchangeRemove = (currency: CurrencyDTO, month: MonthNode, rate: RateNode) => {
    onExchangeRemove(currency, month, rate);
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

                <Button
                  icon={<AddRegular />}
                  appearance="subtle"
                  onClick={() => handleExchangeAdd(currency)}
                  disabled={currency.data.disabled}
                />
              </TableCell>
            </TableRow>

            {expanded[currency.data.id] &&
              currency.months.map((month) => (
                <React.Fragment key={month.month}>
                  <TableRow>
                    <TableCell />
                    <TableCell>{Object.values(MONTHS).find((m) => m.value === month.month)?.displayText}</TableCell>
                    <TableCell>
                      1 {currency.data.name} [{currency.data.abbreviation}]
                    </TableCell>
                  </TableRow>

                  {month.rates.map((rate) => (
                    <TableRow key={`${currency.data.id}-${month.month}-${rate.currencyToId}`}>
                      <TableCell />
                      <TableCell />
                      <TableCell>
                        {rate.value} {rate.currencyToName} [{rate.currencyToAbbreviation}]
                      </TableCell>
                      <TableCell>
                        <Button
                          icon={<EditRegular />}
                          appearance="subtle"
                          onClick={() => handleExchangeEdit(currency.data, month, rate)}
                          disabled={currency.data.disabled}
                        />
                        <Button
                          icon={<DeleteRegular />}
                          appearance="subtle"
                          onClick={() => handleExchangeRemove(currency.data, month, rate)}
                          disabled={currency.data.disabled}
                        />
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
