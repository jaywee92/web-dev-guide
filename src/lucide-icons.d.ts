// Type declarations for lucide-react direct icon imports
// These allow importing individual icons without loading the full barrel
declare module 'lucide-react/dist/esm/icons/*' {
  import type { LucideIcon } from 'lucide-react'
  const icon: LucideIcon
  export default icon
}
