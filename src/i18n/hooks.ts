import { useTranslation } from 'react-i18next'
import { CATEGORIES, CATEGORY_GROUPS, TECH_SECTION_META, TOPIC_LABELS } from '@/data/categories'
import type { CategoryGroup, TechSectionMeta } from '@/data/categories'
import { TOPICS } from '@/data/topics'
import { RESOURCE_GROUPS } from '@/data/resources'
import type { Category, Topic } from '@/types'

// ─── Category hooks ───────────────────────────────────────────────────────────

export function useCategories(): Category[] {
  const { t } = useTranslation('categories')
  return CATEGORIES.map(cat => ({
    ...cat,
    title:       t(`${cat.id}.title`       as never),
    description: t(`${cat.id}.description` as never),
    cardLabel:   t(`${cat.id}.cardLabel`   as never),
  }))
}

export function useTopicLabels(): Record<string, string> {
  const { t } = useTranslation('categories')
  return Object.fromEntries(
    Object.keys(TOPIC_LABELS).map(id => [
      id,
      t(`topicLabels.${id}` as never),
    ])
  )
}

export function useCategoryGroups(): CategoryGroup[] {
  const { t } = useTranslation('home')
  return CATEGORY_GROUPS.map(group => ({
    ...group,
    label: t(`groups.${group.key}` as never),
  }))
}

export function useTechMeta(): Record<string, TechSectionMeta> {
  const { t } = useTranslation('categories')
  return Object.fromEntries(
    Object.keys(TECH_SECTION_META).map(key => [
      key,
      {
        ...TECH_SECTION_META[key],
        title:    t(`techMeta.${key}.title`    as never),
        subtitle: t(`techMeta.${key}.subtitle` as never),
      },
    ])
  )
}

// ─── Topic hooks ──────────────────────────────────────────────────────────────

type TopicsNS = 'topics-html' | 'topics-css' | 'topics-js' | 'topics-other'

function topicsNSFor(id: string): TopicsNS {
  if (id.startsWith('html-'))  return 'topics-html'
  if (id.startsWith('css-'))   return 'topics-css'
  if (id.startsWith('js-'))    return 'topics-js'
  return 'topics-other'
}

interface StepTranslation { animationStep: number; heading: string; text: string }
interface CheatSheetTranslation {
  syntax?:         Array<{ label: string; note?: string }>
  patterns?:       Array<{ title: string }>
  whenToUse?:      string
  commonMistakes?: string[]
}
interface TopicTranslation {
  title:       string
  description: string
  steps:       StepTranslation[]
  cheatSheet?: CheatSheetTranslation
}

function mergeCheatSheet(
  base: NonNullable<Topic['cheatSheet']>,
  tx: CheatSheetTranslation
): NonNullable<Topic['cheatSheet']> {
  return {
    ...base,
    syntax: base.syntax?.map((s, i) => ({
      ...s,
      label: tx.syntax?.[i]?.label ?? s.label,
      note:  tx.syntax?.[i]?.note  ?? s.note,
    })),
    patterns: base.patterns?.map((p, i) => ({
      ...p,
      title: tx.patterns?.[i]?.title ?? p.title,
    })),
    whenToUse:      tx.whenToUse      ?? base.whenToUse,
    commonMistakes: tx.commonMistakes ?? base.commonMistakes,
  }
}

export function useTopic(id: string): Topic | undefined {
  const ns = topicsNSFor(id)
  const { t } = useTranslation(ns)
  const base = TOPICS.find(tp => tp.id === id)
  if (!base) return undefined

  const tx = t(id as never, { returnObjects: true }) as TopicTranslation

  return {
    ...base,
    title:       tx.title,
    description: tx.description,
    sections: base.sections.map(section => {
      if (section.type !== 'explanation') return section
      return {
        ...section,
        steps: section.steps.map((step, i) => ({
          ...step,
          heading: tx.steps[i]?.heading ?? step.heading,
          text:    tx.steps[i]?.text    ?? step.text,
        })),
      }
    }),
    cheatSheet: base.cheatSheet && tx.cheatSheet
      ? mergeCheatSheet(base.cheatSheet, tx.cheatSheet)
      : base.cheatSheet,
  }
}

export function useTopics(): Topic[] {
  const { t: tHtml }  = useTranslation('topics-html')
  const { t: tCss }   = useTranslation('topics-css')
  const { t: tJs }    = useTranslation('topics-js')
  const { t: tOther } = useTranslation('topics-other')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tMap: Record<TopicsNS, (key: never, opts?: object) => any> = {
    'topics-html':  tHtml  as (key: never, opts?: object) => any,
    'topics-css':   tCss   as (key: never, opts?: object) => any,
    'topics-js':    tJs    as (key: never, opts?: object) => any,
    'topics-other': tOther as (key: never, opts?: object) => any,
  }

  return TOPICS.map(base => {
    const ns = topicsNSFor(base.id)
    const t  = tMap[ns]
    const tx = t(base.id as never, { returnObjects: true }) as TopicTranslation | string

    if (typeof tx === 'string') return base

    return {
      ...base,
      title:       tx.title,
      description: tx.description,
      sections: base.sections.map(section => {
        if (section.type !== 'explanation') return section
        return {
          ...section,
          steps: section.steps.map((step, i) => ({
            ...step,
            heading: tx.steps[i]?.heading ?? step.heading,
            text:    tx.steps[i]?.text    ?? step.text,
          })),
        }
      }),
      cheatSheet: base.cheatSheet && tx.cheatSheet
        ? mergeCheatSheet(base.cheatSheet, tx.cheatSheet)
        : base.cheatSheet,
    }
  })
}

// ─── Resource hooks ───────────────────────────────────────────────────────────

export function useResourceGroups() {
  const { t } = useTranslation('resources')
  return RESOURCE_GROUPS.map(group => ({
    ...group,
    label: t(`groups.${group.id}` as never),
    resources: group.resources.map(r => ({
      ...r,
      name:        t(`items.${r.id}.name`        as never),
      description: t(`items.${r.id}.description` as never),
    })),
  }))
}
