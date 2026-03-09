import type { ComponentType } from 'react'

type AnimComp = ComponentType<{ step: number; compact?: boolean }>

// Lazy loaders
const lazyRegistry: Record<string, () => Promise<{ default: AnimComp }>> = {
  BoxModelViz: () => import('./css/BoxModelViz'),
  DomTreeBuilder: () => import('./html/DomTreeBuilder'),
  SemanticViz: () => import('./html/SemanticViz'),
  FormsViz: () => import('./html/FormsViz'),
  FlexboxViz: () => import('./css/FlexboxViz'),
  GridViz: () => import('./css/GridViz'),
  SelectorsViz: () => import('./css/SelectorsViz'),
  AnimatedFlow: () => import('./shared/AnimatedFlow'),
  RestViz: () => import('./http/RestViz'),
  StatusCodesViz: () => import('./http/StatusCodesViz'),
  QueriesViz: () => import('./postgresql/QueriesViz'),
  JoinsViz: () => import('./postgresql/JoinsViz'),
  CrudViz: () => import('./postgresql/CrudViz'),
  EventLoopViz: () => import('./javascript/EventLoopViz'),
  ClosureViz: () => import('./javascript/ClosureViz'),
  VariablesViz: () => import('./javascript/VariablesViz'),
  ArraysViz: () => import('./javascript/ArraysViz'),
  TypeScriptViz: () => import('./typescript/TypeScriptViz'),
  FetchViz: () => import('./webapis/FetchViz'),
  DomEventsViz: () => import('./webapis/DomEventsViz'),
  StorageViz: () => import('./webapis/StorageViz'),
  ComponentsViz: () => import('./react/ComponentsViz'),
  StateViz: () => import('./react/StateViz'),
  UseEffectViz: () => import('./react/UseEffectViz'),
}

// Synchronous cache
const loadedRegistry: Record<string, AnimComp> = {}

export function getAnimationComponent(name: string): AnimComp | null {
  return loadedRegistry[name] ?? null
}

export async function preloadAnimation(name: string): Promise<void> {
  if (loadedRegistry[name] || !lazyRegistry[name]) return
  const mod = await lazyRegistry[name]()
  loadedRegistry[name] = mod.default
}
