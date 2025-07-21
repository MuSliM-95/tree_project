import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import translationEN from '../../../public/locales/en/translation.json'
import translationRU from '../../../public/locales/ru/translation.json'

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'ru',
		debug: true,
		detection: {
			order: ['queryString', 'cookie'],
			caches: ['cookie']
		},
		resources: {
			en: { translation: translationEN },
			ru: { translation: translationRU }
		},
		interpolation: {
			escapeValue: true
		}
	})

export default i18n
