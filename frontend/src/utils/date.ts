import { DateTime } from "luxon";

const DATE_FORMATS = {
  shortDate: "dd/LL/yyyy",
  displayDate: "LLL d, yyyy",
  mediumDate: "dd LLL yyyy",
  longDate: "dd LLLL yyyy",
  fullDate: "cccc, dd LLLL yyyy",
  isoDate: "yyyy-LL-dd",
  monthYear: "LLLL yyyy",
  dayMonth: "dd LLL",
  dateTime12: "LLL d, yyyy, h:mm a",
  dateTime24: "LLL d, yyyy, HH:mm",
  shortDateTime12: "dd/LL/yyyy, h:mm a",
  shortDateTime24: "dd/LL/yyyy, HH:mm",
  time12: "h:mm a",
  time24: "HH:mm",
  timeWithSeconds12: "h:mm:ss a",
  timeWithSeconds24: "HH:mm:ss",
} as const;

type TDateInput = string | number | Date | null | undefined;
type TDateFormat = keyof typeof DATE_FORMATS;

interface IParseDateOptions {
  inputFormat?: TDateFormat;
  locale?: string;
}

interface IFormatDateOptions extends IParseDateOptions {
  fallback?: string;
}

const parseDate = (
  value: TDateInput,
  { inputFormat, locale }: IParseDateOptions = {},
) => {
  if (value === null || value === undefined || value === "") {
    return DateTime.invalid("A date value is required");
  }

  let dateTime: DateTime;

  if (value instanceof Date) {
    dateTime = DateTime.fromJSDate(value);
  } else if (typeof value === "number") {
    dateTime = DateTime.fromMillis(value);
  } else if (inputFormat) {
    dateTime = DateTime.fromFormat(value, DATE_FORMATS[inputFormat], {
      locale,
    });
  } else {
    dateTime = DateTime.fromISO(value);
  }

  return locale && dateTime.isValid ? dateTime.setLocale(locale) : dateTime;
};

const formatDate = (
  value: TDateInput,
  outputFormat: TDateFormat = "displayDate",
  { fallback = "—", ...parseOptions }: IFormatDateOptions = {},
) => {
  const dateTime = parseDate(value, parseOptions);
  return dateTime.isValid
    ? dateTime.toFormat(DATE_FORMATS[outputFormat])
    : fallback;
};

export { DATE_FORMATS, formatDate, parseDate };

export type { IFormatDateOptions, IParseDateOptions, TDateFormat, TDateInput };
