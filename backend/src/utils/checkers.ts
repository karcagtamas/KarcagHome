import ICheck from "../models/ICheck";

import { CheckError } from "../models/checkError";
export const checkLength = (
  value: string,
  max: number,
  min?: number
): ICheck => {
  if (min && value.length < min) {
    return { error: CheckError.MaxStringLengthError, isSuccess: false };
  }
  if (value.length > max) {
    return { error: CheckError.MaxStringLengthError, isSuccess: false };
  }
  return { error: null, isSuccess: true };
};

export const checkRequired = (value: string | number): ICheck => {
  if (typeof value === "string" && value.length === 0) {
    return { error: CheckError.ValueLengthNullError, isSuccess: false };
  }
  if (value === undefined) {
    return { error: CheckError.ValueUndefienedError, isSuccess: false };
  }
  if (value === null) {
    return { error: CheckError.ValueNullError, isSuccess: false };
  }
  return { error: null, isSuccess: true };
};

export const checkNumValue = (
  value: number,
  min?: number,
  max?: number
): ICheck => {
  if (min && value < min) {
    return { error: CheckError.MinNumberValueError, isSuccess: false };
  }
  if (max && value > max) {
    return { error: CheckError.MaxNumberValueError, isSuccess: false };
  }
  return { error: null, isSuccess: true };
};

export const checkDateValue = (value: Date, min?: Date, max?: Date): ICheck => {
  if (min && value < min) {
    return { error: CheckError.MinDateValueError, isSuccess: false };
  }
  if (max && value > max) {
    return { error: CheckError.MaxDateValueError, isSuccess: false };
  }
  return { error: null, isSuccess: true };
};
