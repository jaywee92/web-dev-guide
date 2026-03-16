import type enCommon from './locales/en/common.json'
import type enHome from './locales/en/home.json'
import type enTopic from './locales/en/topic.json'
import type enCategories from './locales/en/categories.json'
import type enResources from './locales/en/resources.json'
import type enReference from './locales/en/reference.json'
import type enTopicsHtml from './locales/en/topics-html.json'
import type enTopicsCss from './locales/en/topics-css.json'
import type enTopicsJs from './locales/en/topics-js.json'
import type enTopicsOther from './locales/en/topics-other.json'
import type enGuestbook from './locales/en/guestbook.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof enCommon
      home: typeof enHome
      topic: typeof enTopic
      categories: typeof enCategories
      resources: typeof enResources
      reference: typeof enReference
      'topics-html': typeof enTopicsHtml
      'topics-css': typeof enTopicsCss
      'topics-js': typeof enTopicsJs
      'topics-other': typeof enTopicsOther
      guestbook: typeof enGuestbook
    }
  }
}
