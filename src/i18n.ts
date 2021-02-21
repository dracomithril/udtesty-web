import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import pl_PL from "./translations/pl_PL.json";

const options: InitOptions = {
  debug: true,

  lng: "pl_PL",
  resources: {
    pl_PL: {
      translation: pl_PL,
    },
  },
  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    nsMode: "default",
  },
};
i18n.use(initReactI18next).init(options);

export default i18n;
