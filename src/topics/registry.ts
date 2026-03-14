import type { ComponentType } from 'react'

type AnimComp = ComponentType<{ step: number; compact?: boolean }>

// Lazy loaders
const lazyRegistry: Record<string, () => Promise<{ default: AnimComp }>> = {
  BoxModelViz: () => import('./css/BoxModelViz'),
  DomTreeBuilder: () => import('./html/DomTreeBuilder'),
  SemanticViz: () => import('./html/SemanticViz'),
  FormsViz: () => import('./html/FormsViz'),
  ElementsViz:     () => import('./html/ElementsViz'),
  TextHeadingsViz: () => import('./html/TextHeadingsViz'),
  LinksImagesViz:  () => import('./html/LinksImagesViz'),
  ListsViz:        () => import('./html/ListsViz'),
  MediaEmbedsViz:  () => import('./html/MediaEmbedsViz'),
  FlexboxViz: () => import('./css/FlexboxViz'),
  FlexboxUseCasesViz: () => import('./css/FlexboxUseCasesViz'),
  GridViz: () => import('./css/GridViz'),
  GridAreasViz: () => import('./css/GridAreasViz'),
  SelectorsViz: () => import('./css/SelectorsViz'),
  CSSBasicsViz: () => import('./css/CSSBasicsViz'),
  ColorsUnitsViz: () => import('./css/ColorsUnitsViz'),
  TypographyViz: () => import('./css/TypographyViz'),
  BackgroundsViz: () => import('./css/BackgroundsViz'),
  DisplayPositioningViz: () => import('./css/DisplayPositioningViz'),
  ResponsiveViz: () => import('./css/ResponsiveViz'),
  ImagesViz: () => import('./css/ImagesViz'),
  CustomPropertiesViz: () => import('./css/CustomPropertiesViz'),
  TransformsViz: () => import('./css/TransformsViz'),
  TransitionsViz: () => import('./css/TransitionsViz'),
  AnimationsViz: () => import('./css/AnimationsViz'),
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
  InterfacesViz: () => import('./typescript/InterfacesViz'),
  GenericsViz: () => import('./typescript/GenericsViz'),
  RouterViz: () => import('./react/RouterViz'),
  FetchViz: () => import('./webapis/FetchViz'),
  DomEventsViz: () => import('./webapis/DomEventsViz'),
  StorageViz: () => import('./webapis/StorageViz'),
  ComponentsViz: () => import('./react/ComponentsViz'),
  StateViz: () => import('./react/StateViz'),
  UseEffectViz: () => import('./react/UseEffectViz'),
  ShadowsViz: () => import('./css/ShadowsViz'),
  OverflowViz: () => import('./css/OverflowViz'),
  ThemingViz: () => import('./css/ThemingViz'),
  AccessibilityViz: () => import('./html/AccessibilityViz'),
  GitIntroViz:     () => import('./git/GitIntroViz'),
  GitWorkflowViz:  () => import('./git/GitWorkflowViz'),
  GitIgnoreViz:    () => import('./git/GitIgnoreViz'),
  GitHubViz:       () => import('./git/GitHubViz'),
  GitCollabSetupViz: () => import('./git/GitCollabSetupViz'),
  GitConflictViz:    () => import('./git/GitConflictViz'),
  GitUndoViz:      () => import('./git/GitUndoViz'),
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

// ─── Banner registry ───────────────────────────────────────────────────────

type BannerComp = ComponentType<Record<string, never>>

// Populated incrementally as banner files are created
const bannerLazyRegistry: Record<string, () => Promise<{ default: BannerComp }>> = {
  // HTML
  ElementsBanner:      () => import('./banners/html/ElementsBanner'),
  TextHeadingsBanner:  () => import('./banners/html/TextHeadingsBanner'),
  LinksImagesBanner:   () => import('./banners/html/LinksImagesBanner'),
  ListsBanner:         () => import('./banners/html/ListsBanner'),
  DomTreeBanner:       () => import('./banners/html/DomTreeBanner'),
  SemanticBanner:      () => import('./banners/html/SemanticBanner'),
  FormsBanner:         () => import('./banners/html/FormsBanner'),
  AccessibilityBanner: () => import('./banners/html/AccessibilityBanner'),
  MediaEmbedsBanner:   () => import('./banners/html/MediaEmbedsBanner'),
  // CSS
  CSSBasicsBanner:          () => import('./banners/css/CSSBasicsBanner'),
  BoxModelBanner:           () => import('./banners/css/BoxModelBanner'),
  FlexboxBanner:            () => import('./banners/css/FlexboxBanner'),
  GridBanner:               () => import('./banners/css/GridBanner'),
  SelectorsBanner:          () => import('./banners/css/SelectorsBanner'),
  ColorsUnitsBanner:        () => import('./banners/css/ColorsUnitsBanner'),
  TypographyBanner:         () => import('./banners/css/TypographyBanner'),
  BackgroundsBanner:        () => import('./banners/css/BackgroundsBanner'),
  ShadowsBanner:            () => import('./banners/css/ShadowsBanner'),
  OverflowBanner:           () => import('./banners/css/OverflowBanner'),
  DisplayPositioningBanner: () => import('./banners/css/DisplayPositioningBanner'),
  ResponsiveBanner:         () => import('./banners/css/ResponsiveBanner'),
  ImagesBanner:             () => import('./banners/css/ImagesBanner'),
  CustomPropertiesBanner:   () => import('./banners/css/CustomPropertiesBanner'),
  ThemingBanner:            () => import('./banners/css/ThemingBanner'),
  TransformsBanner:         () => import('./banners/css/TransformsBanner'),
  TransitionsBanner:        () => import('./banners/css/TransitionsBanner'),
  AnimationsBanner:         () => import('./banners/css/AnimationsBanner'),
  // JavaScript
  EventLoopBanner: () => import('./banners/javascript/EventLoopBanner'),
  ClosureBanner:   () => import('./banners/javascript/ClosureBanner'),
  VariablesBanner: () => import('./banners/javascript/VariablesBanner'),
  ArraysBanner:    () => import('./banners/javascript/ArraysBanner'),
  // TypeScript
  TypeScriptBanner:  () => import('./banners/typescript/TypeScriptBanner'),
  InterfacesBanner:  () => import('./banners/typescript/InterfacesBanner'),
  GenericsBanner:    () => import('./banners/typescript/GenericsBanner'),
  // React
  ComponentsBanner: () => import('./banners/react/ComponentsBanner'),
  StateBanner:      () => import('./banners/react/StateBanner'),
  UseEffectBanner:  () => import('./banners/react/UseEffectBanner'),
  RouterBanner:     () => import('./banners/react/RouterBanner'),
  // Web APIs
  FetchBanner:     () => import('./banners/webapis/FetchBanner'),
  DomEventsBanner: () => import('./banners/webapis/DomEventsBanner'),
  StorageBanner:   () => import('./banners/webapis/StorageBanner'),
  // HTTP
  AnimatedFlowBanner: () => import('./banners/http/AnimatedFlowBanner'),
  RestBanner:         () => import('./banners/http/RestBanner'),
  StatusCodesBanner:  () => import('./banners/http/StatusCodesBanner'),
  // PostgreSQL
  QueriesBanner: () => import('./banners/postgresql/QueriesBanner'),
  JoinsBanner:   () => import('./banners/postgresql/JoinsBanner'),
  CrudBanner:    () => import('./banners/postgresql/CrudBanner'),
  // Git
  GitIntroBanner:       () => import('./banners/git/GitIntroBanner'),
  GitWorkflowBanner:    () => import('./banners/git/GitWorkflowBanner'),
  GitIgnoreBanner:      () => import('./banners/git/GitIgnoreBanner'),
  GitHubBanner:         () => import('./banners/git/GitHubBanner'),
  GitCollabSetupBanner: () => import('./banners/git/GitCollabSetupBanner'),
  GitConflictBanner:    () => import('./banners/git/GitConflictBanner'),
  GitUndoBanner:        () => import('./banners/git/GitUndoBanner'),
}

const loadedBannerRegistry: Record<string, BannerComp> = {}

export function getBannerComponent(name: string): BannerComp | null {
  if (!name) return null
  return loadedBannerRegistry[name] ?? null
}

export async function preloadBanner(name: string): Promise<void> {
  if (!name || loadedBannerRegistry[name] || !bannerLazyRegistry[name]) return
  const mod = await bannerLazyRegistry[name]()
  loadedBannerRegistry[name] = mod.default
}
