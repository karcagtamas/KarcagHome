export interface CurrencyDTO {
  id: number;
  name: string;
  abbreviation: string;
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
  currencyId: number;
  currencyName: string;
  currencyAbbreviation: string;
  months: MonthNode[];
}
