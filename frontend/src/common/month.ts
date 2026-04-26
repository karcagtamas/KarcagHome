type Months =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export const MONTHS: Record<Months, { value: number; displayText: string }> = {
  ["january"]: {
    value: 1,
    displayText: "January",
  },
  ["february"]: {
    value: 2,
    displayText: "February",
  },
  ["march"]: {
    value: 3,
    displayText: "March",
  },
  ["april"]: {
    value: 4,
    displayText: "April",
  },
  ["may"]: {
    value: 5,
    displayText: "May",
  },
  ["june"]: {
    value: 6,
    displayText: "June",
  },
  ["july"]: {
    value: 7,
    displayText: "July",
  },
  ["august"]: {
    value: 8,
    displayText: "August",
  },
  ["september"]: {
    value: 9,
    displayText: "September",
  },
  ["october"]: {
    value: 10,
    displayText: "October",
  },
  ["november"]: {
    value: 11,
    displayText: "November",
  },
  ["december"]: {
    value: 12,
    displayText: "December",
  },
};
