export interface CurrencyDTO {
  id: number;
  name: string;
  abbreviation: string;
  disabled: boolean;
}

export interface CurrencyExchangeDTO {
  currencyFromId: number;
  currencyToId: number;
  year: number;
  month: number;
  value: number;
}

export interface RateNode {
  currencyToId: number;
  currencyToName: string;
  currencyToAbbreviation: string;
  value: number;
}

export interface MonthNode {
  month: number;
  rates: RateNode[];
}

export interface CurrencyTreeDTO {
  data: CurrencyDTO;
  months: MonthNode[];
}
