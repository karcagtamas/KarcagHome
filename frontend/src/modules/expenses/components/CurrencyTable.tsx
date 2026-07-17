import type { CurrencyDTO, CurrencyTreeDTO, MonthNode, RateNode } from '../models/currency';
import React from 'react';
import { MONTHS } from '../../../common/month';
import { Box, IconButton, Typography } from '@mui/material';
import { SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { AddOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';

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
  const renderItemLabel = (text: string, actionButtons?: React.ReactNode) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        pr: 1,
      }}
    >
      <Typography variant="body2">{text}</Typography>
      {actionButtons && (
        <Box className="tree-item-actions" sx={{ display: 'flex', gap: 0.5 }} onClick={(e) => e.stopPropagation()}>
          {actionButtons}
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ width: '100%', minHeight: 400, boxSizing: 'border-box' }}>
      <SimpleTreeView
        sx={{
          [`&.${treeItemClasses.root}`]: {
            borderBottom: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {data.map((currency) => {
          const currencyIdStr = `currency-${currency.data.id}`;

          return (
            <TreeItem
              key={currencyIdStr}
              itemId={currencyIdStr}
              label={renderItemLabel(
                `${currency.data.name} [${currency.data.abbreviation}]`,
                <>
                  <IconButton
                    size="small"
                    color='warning'
                    onClick={() => onEdit({ ...currency.data })}
                  >
                    <EditOutlined fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color='info'
                    onClick={() => onExchangeAdd({ ...currency.data })}
                    disabled={currency.data.disabled}
                  >
                    <AddOutlined fontSize="small" />
                  </IconButton>
                </>,
              )}
            >
              {currency.months.map((month) => {
                const monthName = Object.values(MONTHS).find((m) => m.value == month.month)?.displayText ?? 'Unknown';
                const monthIdStr = `${currencyIdStr}-month-${month.month}`;

                return (
                  <TreeItem
                    key={monthIdStr}
                    itemId={monthIdStr}
                    label={renderItemLabel(`${monthName} (Base: 1 ${currency.data.abbreviation})`)}
                  >
                    {month.rates.map((rate) => {
                      const rateIdStr = `${monthIdStr}-rate-${rate.currencyToId}`;
                      const rateLabelText = `${rate.value} ${rate.currencyToName} [${rate.currencyToAbbreviation}]`;

                      return (
                        <TreeItem
                          key={rateIdStr}
                          itemId={rateIdStr}
                          label={renderItemLabel(
                            rateLabelText,
                            <>
                              <IconButton
                                size="small"
                                color="warning"
                                onClick={() => onExchangeEdit(currency.data, month, rate)}
                                disabled={currency.data.disabled}
                              >
                                <EditOutlined fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => onExchangeRemove(currency.data, month, rate)}
                                disabled={currency.data.disabled}
                              >
                                <DeleteOutlined fontSize="small" />
                              </IconButton>
                            </>,
                          )}
                        />
                      );
                    })}
                  </TreeItem>
                );
              })}
            </TreeItem>
          );
        })}
      </SimpleTreeView>
    </Box>
  );
};
