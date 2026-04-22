export interface CurrencyDTO {
  id: number;
  name: string;
  abbreviation: string;
  disabled: boolean;
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
