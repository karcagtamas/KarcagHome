export interface MeasurementCategoryDTO {
  id: number;
  name: string;
  color: string;
  unit: string;
}

export interface MeasurementDTO {
  id: number;
  value: number;
  date: string;
  categoryId: string;
}

export interface MeasurementCategoryEditDTO {
  name: string;
  color: string;
  unit: string;
}

export interface MeasurementEditDTO {
  value: number;
  date: string;
  categoryId: string;
}
