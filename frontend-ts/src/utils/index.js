import { ToWords } from "to-words";

export const toWords = new ToWords({
  localeCode: "fr-FR",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: "Dihram",
      plural: "Dihrams",
      symbol: "DH",
    },
  },
});
