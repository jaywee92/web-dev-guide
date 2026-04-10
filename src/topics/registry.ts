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
  TailwindViz: () => import('./css/TailwindViz'),
  TailwindLayoutViz: () => import('./css/TailwindLayoutViz'),
  TailwindStatesViz: () => import('./css/TailwindStatesViz'),
  TailwindAdvancedViz: () => import('./css/TailwindAdvancedViz'),
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
  OOPViz: () => import('./javascript/OOPViz'),
  FunctionsViz: () => import('./javascript/FunctionsViz'),
  ControlFlowViz: () => import('./javascript/ControlFlowViz'),
  DestructuringViz: () => import('./javascript/DestructuringViz'),
  TimersViz: () => import('./javascript/TimersViz'),
  PromisesViz: () => import('./javascript/PromisesViz'),
  ModulesViz: () => import('./javascript/ModulesViz'),
  NpmBundlersViz: () => import('./javascript/NpmBundlersViz'),
  JsVsPythonViz:  () => import('./javascript/JsVsPythonViz'),
  TypeScriptViz: () => import('./typescript/TypeScriptViz'),
  InterfacesViz: () => import('./typescript/InterfacesViz'),
  GenericsViz: () => import('./typescript/GenericsViz'),
  TsArraysViz: () => import('./typescript/TsArraysViz'),
  ClassesViz: () => import('./typescript/ClassesViz'),
  EnumsViz: () => import('./typescript/EnumsViz'),
  TsReactViz: () => import('./typescript/TsReactViz'),
  TypeAssertionViz: () => import('./typescript/TypeAssertionViz'),
  ZodViz: () => import('./typescript/ZodViz'),
  RouterViz: () => import('./react/RouterViz'),
  ReactIntroViz: () => import('./react/ReactIntroViz'),
  ContextViz: () => import('./react/ContextViz'),
  DataFetchingViz: () => import('./react/DataFetchingViz'),
  MutationsViz: () => import('./react/MutationsViz'),
  RouterAdvancedViz: () => import('./react/RouterAdvancedViz'),
  TanStackQueryViz: () => import('./react/TanStackQueryViz'),
  FetchViz: () => import('./webapis/FetchViz'),
  DomViz: () => import('./webapis/DomViz'),
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
  NextjsBasicsViz:            () => import('./nextjs/NextjsBasicsViz'),
  NextjsRoutingViz:           () => import('./nextjs/NextjsRoutingViz'),
  NextjsLayoutsViz:           () => import('./nextjs/NextjsLayoutsViz'),
  NextjsNavigationViz:        () => import('./nextjs/NextjsNavigationViz'),
  NextjsServerComponentsViz:  () => import('./nextjs/NextjsServerComponentsViz'),
  NextjsClientComponentsViz:  () => import('./nextjs/NextjsClientComponentsViz'),
  NextjsSuspenseViz:          () => import('./nextjs/NextjsSuspenseViz'),
  NextjsDataFetchingViz:      () => import('./nextjs/NextjsDataFetchingViz'),
  NextjsServerActionsViz:     () => import('./nextjs/NextjsServerActionsViz'),
  NextjsRouteHandlersViz:     () => import('./nextjs/NextjsRouteHandlersViz'),
  TestingBasicsViz:           () => import('./testing/TestingBasicsViz'),
  TestingReactViz:            () => import('./testing/TestingReactViz'),
  CiViz:                      () => import('./testing/CiViz'),
  SsrCsrViz:                  () => import('./http/SsrCsrViz'),
  DbIntroViz:                 () => import('./postgresql/DbIntroViz'),
}

// Synchronous cache
const loadedRegistry: Record<string, AnimComp> = {}

export function getAnimationComponent(name: string | undefined): AnimComp | null {
  if (!name) return null
  return loadedRegistry[name] ?? null
}

export async function preloadAnimation(name: string | undefined): Promise<void> {
  if (!name || loadedRegistry[name] || !lazyRegistry[name]) return
  const mod = await lazyRegistry[name]()
  loadedRegistry[name] = mod.default
}


// ─── Analogy registry ─────────────────────────────────────────────────────

type AnalogyComp = ComponentType<{ step: number }>

const analogyLazyRegistry: Record<string, () => Promise<{ default: AnalogyComp }>> = {
  VariablesAnalogyViz: () => import('./javascript/VariablesAnalogyViz'),
}

const loadedAnalogyRegistry: Record<string, AnalogyComp> = {}

export function getAnalogyComponent(name: string | undefined): AnalogyComp | null {
  if (!name) return null
  return loadedAnalogyRegistry[name] ?? null
}

export async function preloadAnalogyAnimation(name: string | undefined): Promise<void> {
  if (!name || loadedAnalogyRegistry[name] || !analogyLazyRegistry[name]) return
  const mod = await analogyLazyRegistry[name]()
  loadedAnalogyRegistry[name] = mod.default
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
  TailwindBanner:           () => import('./banners/css/TailwindBanner'),
  // JavaScript
  EventLoopBanner:    () => import('./banners/javascript/EventLoopBanner'),
  ClosureBanner:      () => import('./banners/javascript/ClosureBanner'),
  VariablesBanner:    () => import('./banners/javascript/VariablesBanner'),
  ArraysBanner:       () => import('./banners/javascript/ArraysBanner'),
  FunctionsBanner:    () => import('./banners/javascript/FunctionsBanner'),
  DestructuringBanner: () => import('./banners/javascript/DestructuringBanner'),
  ControlFlowBanner:  () => import('./banners/javascript/ControlFlowBanner'),
  OOPBanner:          () => import('./banners/javascript/OOPBanner'),
  TimersBanner:       () => import('./banners/javascript/TimersBanner'),
  PromisesBanner:     () => import('./banners/javascript/PromisesBanner'),
  ModulesBanner:       () => import('./banners/javascript/ModulesBanner'),
  NpmBundlersBanner:   () => import('./banners/javascript/NpmBundlersBanner'),
  // TypeScript
  TypeScriptBanner:   () => import('./banners/typescript/TypeScriptBanner'),
  InterfacesBanner:   () => import('./banners/typescript/InterfacesBanner'),
  GenericsBanner:     () => import('./banners/typescript/GenericsBanner'),
  NarrowingBanner:    () => import('./banners/typescript/NarrowingBanner'),
  UtilityTypesBanner: () => import('./banners/typescript/UtilityTypesBanner'),
  // React
  ReactIntroBanner: () => import('./banners/react/ReactIntroBanner'),
  ComponentsBanner: () => import('./banners/react/ComponentsBanner'),
  StateBanner:      () => import('./banners/react/StateBanner'),
  UseEffectBanner:  () => import('./banners/react/UseEffectBanner'),
  RouterBanner:     () => import('./banners/react/RouterBanner'),
  ContextBanner:    () => import('./banners/react/ContextBanner'),
  // React Ecosystem
  RouterAdvancedBanner:  () => import('./banners/react-ecosystem/RouterAdvancedBanner'),
  DataFetchingBanner:    () => import('./banners/react-ecosystem/DataFetchingBanner'),
  MutationsBanner:       () => import('./banners/react-ecosystem/MutationsBanner'),
  TanStackQueryBanner:   () => import('./banners/react-ecosystem/TanStackQueryBanner'),
  // Web APIs
  FetchBanner:     () => import('./banners/webapis/FetchBanner'),
  DomEventsBanner: () => import('./banners/webapis/DomEventsBanner'),
  StorageBanner:   () => import('./banners/webapis/StorageBanner'),
  DomBanner:       () => import('./banners/webapis/DomBanner'),
  // HTTP
  AnimatedFlowBanner: () => import('./banners/http/AnimatedFlowBanner'),
  RestBanner:         () => import('./banners/http/RestBanner'),
  StatusCodesBanner:  () => import('./banners/http/StatusCodesBanner'),
  SsrCsrBanner:       () => import('./banners/http/SsrCsrBanner'),
  // PostgreSQL
  QueriesBanner: () => import('./banners/postgresql/QueriesBanner'),
  JoinsBanner:   () => import('./banners/postgresql/JoinsBanner'),
  CrudBanner:    () => import('./banners/postgresql/CrudBanner'),
  DbIntroBanner: () => import('./banners/postgresql/DbIntroBanner'),
  // Testing
  VitestBanner:         () => import('./banners/testing/VitestBanner'),
  ReactTestingBanner:   () => import('./banners/testing/ReactTestingBanner'),
  CoverageCIBanner:     () => import('./banners/testing/CoverageCIBanner'),
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
