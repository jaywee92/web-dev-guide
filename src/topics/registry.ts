import type { ComponentType } from 'react'

type AnimComp = ComponentType<{ step: number; compact?: boolean }>

// Lazy loaders
const lazyRegistry: Record<string, () => Promise<{ default: AnimComp }>> = {
  BoxModelViz: () => import('./css/BoxModelViz'),
  DomTreeBuilder: () => import('./html/DomTreeBuilder'),
  FlexboxViz: () => import('./css/FlexboxViz'),
  AnimatedFlow: () => import('./shared/AnimatedFlow'),
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
