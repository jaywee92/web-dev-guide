import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// EN namespaces
import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enTopic from './locales/en/topic.json'
import enCategories from './locales/en/categories.json'
import enResources from './locales/en/resources.json'
import enReference from './locales/en/reference.json'
import enTopicsHtml from './locales/en/topics-html.json'
import enTopicsCss from './locales/en/topics-css.json'
import enTopicsJs from './locales/en/topics-js.json'
import enTopicsOther from './locales/en/topics-other.json'

// DE namespaces
import deCommon from './locales/de/common.json'
import deHome from './locales/de/home.json'
import deTopic from './locales/de/topic.json'
import deCategories from './locales/de/categories.json'
import deResources from './locales/de/resources.json'
import deReference from './locales/de/reference.json'
import deTopicsHtml from './locales/de/topics-html.json'
import deTopicsCss from './locales/de/topics-css.json'
import deTopicsJs from './locales/de/topics-js.json'
import deTopicsOther from './locales/de/topics-other.json'
import enGuestbook from './locales/en/guestbook.json'
import deGuestbook from './locales/de/guestbook.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        topic: enTopic,
        categories: enCategories,
        resources: enResources,
        reference: enReference,
        'topics-html': enTopicsHtml,
        'topics-css': enTopicsCss,
        'topics-js': enTopicsJs,
        'topics-other': enTopicsOther,
        guestbook: enGuestbook,
      },
      de: {
        common: deCommon,
        home: deHome,
        topic: deTopic,
        categories: deCategories,
        resources: deResources,
        reference: deReference,
        'topics-html': deTopicsHtml,
        'topics-css': deTopicsCss,
        'topics-js': deTopicsJs,
        'topics-other': deTopicsOther,
        guestbook: deGuestbook,
      },
    },
    defaultNS: 'common',
    fallbackLng: 'en',
    supportedLngs: ['en', 'de'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'wdvg-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

i18n.on('languageChanged', lng => {
  document.documentElement.lang = lng
})
document.documentElement.lang = i18n.language

export default i18n
