import type { ComponentType } from 'react'

const loadedRegistry: Record<string, ComponentType<{ step: number; compact?: boolean }>> = {}

export function getAnimationComponent(name: string) {
  return loadedRegistry[name] ?? null
}

export async function preloadAnimation(_name: string): Promise<void> {
  // Full implementation added in Phase 8
}
