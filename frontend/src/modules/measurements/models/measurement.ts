export interface MeasurementCategory {
    id: string;
    name: string;
    color: string;
    unit: string;
}

export interface Measurement {
    id: string;
    value: number;
    date: string;
    categoryId: string;
}