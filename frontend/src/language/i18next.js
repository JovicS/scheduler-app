import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import de from "./de.json";

i18next.use(initReactI18next).init({
	resources: {
		en: {
			translation: en,
		},
		de: {
			translation: de,
		},
	},
	lng: localStorage.getItem("lng") || 'en',
});

  export default i18next;