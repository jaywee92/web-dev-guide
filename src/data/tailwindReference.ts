import type { ReferenceCategory } from '@/types'

export const TAILWIND_REFERENCE: ReferenceCategory[] = [
  {
    id: 'layout',
    title: 'Layout',
    color: '#5b9cf5',
    entries: [
      {
        name: 'flex / flex-col / flex-row',
        description: 'Activates Flexbox layout. flex-row (default) arranges children horizontally; flex-col arranges them vertically.',
        example: '<!-- Horizontal navbar -->\n<nav class="flex items-center justify-between gap-4 px-6">\n  <Logo />\n  <NavLinks />\n  <SignInBtn />\n</nav>\n\n<!-- Vertical sidebar -->\n<aside class="flex flex-col gap-2 w-64">\n  <SidebarItem />\n  <SidebarItem />\n</aside>\n\n<!-- Center content -->\n<div class="flex items-center justify-center min-h-screen">\n  <Card />\n</div>',
        link: 'https://tailwindcss.com/docs/display#flex',
      },
      {
        name: 'grid / grid-cols',
        description: 'Activates CSS Grid. grid-cols-{n} sets the number of equal-width columns. Use grid-cols-subgrid for nested grids.',
        example: '<!-- 3-column card grid -->\n<div class="grid grid-cols-3 gap-6">\n  <Card /><Card /><Card />\n</div>\n\n<!-- Responsive: 1→2→3 columns -->\n<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">\n  ...\n</div>\n\n<!-- Custom columns with arbitrary value -->\n<div class="grid grid-cols-[1fr_300px_1fr] gap-4">\n  <Sidebar /><Main /><Aside />\n</div>',
        link: 'https://tailwindcss.com/docs/grid-template-columns',
      },
      {
        name: 'gap / space-x / space-y',
        description: 'gap sets spacing between grid/flex items. space-x-{n} and space-y-{n} add margin between siblings.',
        example: '<!-- Grid gap -->\n<div class="grid grid-cols-3 gap-4">...</div>\n<div class="grid grid-cols-3 gap-x-6 gap-y-4">...</div>\n\n<!-- Flex gap (preferred over space-x) -->\n<div class="flex gap-3">...</div>\n\n<!-- space-x adds margin-left to all but first -->\n<div class="flex space-x-4">\n  <Item /><Item /><Item />\n</div>',
        link: 'https://tailwindcss.com/docs/gap',
      },
      {
        name: 'items-center / justify-center / place-items',
        description: 'Alignment utilities: items-* aligns on the cross axis; justify-* aligns on the main axis; place-items is shorthand for both in grid.',
        example: '<!-- Flex: center horizontally and vertically -->\n<div class="flex items-center justify-center h-screen">\n  <div>Centered content</div>\n</div>\n\n<!-- Grid: center all items -->\n<div class="grid place-items-center h-screen">\n  <Modal />\n</div>\n\n<!-- Space between + center vertically -->\n<div class="flex items-center justify-between">\n  <Logo />\n  <NavLinks />\n</div>',
        link: 'https://tailwindcss.com/docs/align-items',
      },
      {
        name: 'w-* / h-* / min-h-screen',
        description: 'Width and height utilities. Numbers map to 0.25rem increments (4 = 1rem). Use full for 100%, screen for 100vh, auto for auto.',
        example: '<!-- Fixed size -->\n<div class="w-64 h-64">...</div>     <!-- 16rem × 16rem -->\n\n<!-- Full width, auto height -->\n<div class="w-full">...</div>\n\n<!-- Full viewport height -->\n<main class="min-h-screen">\n  <div class="h-full">...</div>\n</main>\n\n<!-- Max width container -->\n<div class="max-w-4xl mx-auto px-4">\n  ...\n</div>',
        link: 'https://tailwindcss.com/docs/width',
      },
      {
        name: 'relative / absolute / fixed / sticky',
        description: 'Positioning utilities. sticky is particularly useful for headers that should stick while scrolling.',
        example: '<!-- Absolute positioned badge -->\n<div class="relative">\n  <img src="avatar.jpg" class="w-12 h-12 rounded-full" />\n  <span class="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>\n</div>\n\n<!-- Sticky header -->\n<header class="sticky top-0 z-50 bg-white shadow">\n  ...\n</header>\n\n<!-- Fixed overlay -->\n<div class="fixed inset-0 bg-black/50 z-40">...</div>',
        link: 'https://tailwindcss.com/docs/position',
      },
      {
        name: 'overflow-hidden / overflow-auto',
        description: 'Controls content overflow. overflow-hidden clips overflowing content; overflow-auto adds scrollbars only when needed.',
        example: '<!-- Clip image to shape -->\n<div class="rounded-full overflow-hidden w-16 h-16">\n  <img src="avatar.jpg" class="w-full h-full object-cover" />\n</div>\n\n<!-- Scrollable container -->\n<div class="overflow-y-auto h-96">\n  <VeryLongList />\n</div>\n\n<!-- Prevent text overflow -->\n<p class="overflow-hidden text-ellipsis whitespace-nowrap w-48">\n  Very long text that gets truncated\n</p>',
        link: 'https://tailwindcss.com/docs/overflow',
      },
    ],
  },
  {
    id: 'spacing',
    title: 'Spacing',
    color: '#4ade80',
    entries: [
      {
        name: 'p-* / px-* / py-*',
        description: 'Padding utilities. p sets all sides; px sets left+right; py sets top+bottom; pt/pr/pb/pl set individual sides.',
        example: '<!-- All sides -->\n<div class="p-4">...</div>       <!-- 1rem padding -->\n<div class="p-8">...</div>       <!-- 2rem padding -->\n\n<!-- Horizontal and vertical -->\n<button class="px-6 py-2">Click me</button>\n<div class="px-4 py-8">...</div>\n\n<!-- Individual sides -->\n<div class="pt-8 pb-4 pl-6 pr-6">...</div>\n\n<!-- Responsive -->\n<div class="p-4 md:p-8 lg:p-12">...</div>',
        link: 'https://tailwindcss.com/docs/padding',
      },
      {
        name: 'm-* / mx-auto / my-*',
        description: 'Margin utilities. mx-auto centers block elements horizontally. Negative margins use the - prefix.',
        example: '<!-- Center a block element -->\n<div class="max-w-lg mx-auto">Centered</div>\n\n<!-- Vertical spacing between sections -->\n<section class="my-16">...</section>\n\n<!-- Top only -->\n<h2 class="mt-8 mb-4">Section Title</h2>\n\n<!-- Negative margin (pull element up) -->\n<div class="mt-[-32px]">Pulls up 32px</div>\n<div class="-mt-8">Also pulls up 2rem</div>',
        link: 'https://tailwindcss.com/docs/margin',
      },
      {
        name: 'size-*',
        description: 'Shorthand for setting width and height simultaneously (Tailwind v3.4+). Equivalent to w-* h-*.',
        example: '<!-- Square elements -->\n<div class="size-10">...</div>      <!-- 2.5rem × 2.5rem -->\n<div class="size-16">...</div>      <!-- 4rem × 4rem -->\n\n<!-- Icon sizing -->\n<img class="size-6 rounded-full" src="icon.svg" />\n\n<!-- Avatar -->\n<img class="size-12 rounded-full object-cover" src="avatar.jpg" />',
        link: 'https://tailwindcss.com/docs/width#setting-both-width-and-height',
      },
    ],
  },
  {
    id: 'typography-tw',
    title: 'Typography',
    color: '#f59e0b',
    entries: [
      {
        name: 'text-* (size)',
        description: 'Font size utilities: xs, sm, base, lg, xl, 2xl through 9xl. Each includes a sensible default line-height.',
        example: '<p class="text-xs">Extra small (12px)</p>\n<p class="text-sm">Small (14px)</p>\n<p class="text-base">Base (16px)</p>\n<p class="text-lg">Large (18px)</p>\n<p class="text-xl">XL (20px)</p>\n<p class="text-2xl">2XL (24px)</p>\n<p class="text-4xl">4XL (36px)</p>\n<h1 class="text-5xl font-bold">Heading</h1>',
        link: 'https://tailwindcss.com/docs/font-size',
      },
      {
        name: 'font-* (weight)',
        description: 'Font weight utilities: thin (100), light (300), normal (400), medium (500), semibold (600), bold (700), extrabold (800), black (900).',
        example: '<p class="font-thin">Thin (100)</p>\n<p class="font-light">Light (300)</p>\n<p class="font-normal">Normal (400)</p>\n<p class="font-medium">Medium (500)</p>\n<p class="font-semibold">Semibold (600)</p>\n<p class="font-bold">Bold (700)</p>\n<p class="font-extrabold">Extrabold (800)</p>\n<p class="font-black">Black (900)</p>',
        link: 'https://tailwindcss.com/docs/font-weight',
      },
      {
        name: 'text-* (color)',
        description: 'Text color utilities. Colors follow the {color}-{shade} pattern with shades from 50 to 950.',
        example: '<p class="text-gray-900">Nearly black</p>\n<p class="text-gray-500">Muted gray</p>\n<p class="text-gray-400">Lighter muted</p>\n<p class="text-blue-600">Blue link color</p>\n<p class="text-red-500">Error red</p>\n<p class="text-green-600">Success green</p>\n\n<!-- With opacity -->\n<p class="text-black/70">70% opacity black</p>',
        link: 'https://tailwindcss.com/docs/text-color',
      },
      {
        name: 'truncate / line-clamp-*',
        description: 'Truncate clips text to one line with an ellipsis. line-clamp-{n} limits text to n lines with ellipsis.',
        example: '<!-- Single line truncation -->\n<p class="truncate max-w-xs">\n  Very long text that will be truncated...\n</p>\n\n<!-- Multi-line clamp -->\n<p class="line-clamp-3 max-w-sm">\n  A paragraph that will be clamped to exactly three\n  lines no matter how long the content is. The rest\n  will be hidden with an ellipsis.\n</p>',
        link: 'https://tailwindcss.com/docs/line-clamp',
      },
      {
        name: 'leading-* / tracking-*',
        description: 'leading sets line-height; tracking sets letter-spacing.',
        example: '<!-- Line height -->\n<p class="leading-none">No extra space</p>      <!-- 1 -->\n<p class="leading-tight">Tight (1.25)</p>\n<p class="leading-normal">Normal (1.5)</p>\n<p class="leading-relaxed">Relaxed (1.625)</p>\n<p class="leading-loose">Loose (2)</p>\n\n<!-- Letter spacing -->\n<h2 class="tracking-tight">Tight tracking</h2>\n<h2 class="tracking-wide">Wide tracking</h2>\n<span class="tracking-widest uppercase text-xs">Label</span>',
        link: 'https://tailwindcss.com/docs/line-height',
      },
    ],
  },
  {
    id: 'visual-tw',
    title: 'Visual & Background',
    color: '#a78bfa',
    entries: [
      {
        name: 'bg-* (color + gradient)',
        description: 'Background color and gradient utilities. Use bg-gradient-to-{dir} with from-*, via-*, and to-* for gradients.',
        example: '<!-- Solid background -->\n<div class="bg-white">White</div>\n<div class="bg-slate-900">Dark</div>\n<div class="bg-blue-500">Blue</div>\n\n<!-- Gradient -->\n<div class="bg-gradient-to-r from-blue-500 to-purple-600">\n  Horizontal gradient\n</div>\n\n<div class="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">\n  Diagonal, 3 stops\n</div>',
        link: 'https://tailwindcss.com/docs/background-color',
      },
      {
        name: 'rounded / shadow',
        description: 'Border radius and box shadow utilities. rounded-full creates a circle; shadow adds a subtle drop shadow.',
        example: '<!-- Border radius -->\n<div class="rounded">Small (4px)</div>\n<div class="rounded-lg">Large (8px)</div>\n<div class="rounded-xl">XL (12px)</div>\n<div class="rounded-2xl">2XL (16px)</div>\n<div class="rounded-full">Full — pill/circle</div>\n\n<!-- Shadow -->\n<div class="shadow-sm">Subtle</div>\n<div class="shadow">Default</div>\n<div class="shadow-lg">Large</div>\n<div class="shadow-xl">XL</div>\n<div class="shadow-xl shadow-blue-500/20">Colored shadow</div>',
        link: 'https://tailwindcss.com/docs/border-radius',
      },
      {
        name: 'border / ring',
        description: 'Border and outline ring utilities. ring uses box-shadow and doesn\'t affect layout — great for focus states.',
        example: '<!-- Border -->\n<div class="border">1px default border</div>\n<div class="border-2 border-blue-500">Blue 2px border</div>\n<div class="border border-dashed border-gray-300">Dashed</div>\n\n<!-- Ring (focus indicator) -->\n<button class="focus:ring-2 focus:ring-blue-500 focus:outline-none">\n  Focused button\n</button>\n\n<!-- Ring offset -->\n<button class="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">\n  With offset\n</button>',
        link: 'https://tailwindcss.com/docs/border-width',
      },
      {
        name: 'opacity / backdrop-blur',
        description: 'opacity-{n} sets element opacity (0–100). backdrop-blur creates a frosted glass effect on the background behind the element.',
        example: '<!-- Opacity -->\n<div class="opacity-0">Invisible</div>\n<div class="opacity-50">50% opacity</div>\n<div class="opacity-100">Fully opaque</div>\n\n<!-- Transparent color (preferred over opacity class) -->\n<div class="bg-black/50">50% black bg</div>\n\n<!-- Frosted glass card -->\n<div class="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-6">\n  Glassmorphism card\n</div>',
        link: 'https://tailwindcss.com/docs/opacity',
      },
    ],
  },
  {
    id: 'states',
    title: 'States & Pseudo-classes',
    color: '#fb923c',
    entries: [
      {
        name: 'hover: / focus: / active:',
        description: 'State-based conditional styling. Prefix any utility with hover:, focus:, or active: to apply it only in that state.',
        example: '<!-- Button with hover effect -->\n<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded transition-colors">\n  Click me\n</button>\n\n<!-- Link hover -->\n<a class="text-blue-500 hover:text-blue-700 hover:underline">\n  Link\n</a>\n\n<!-- Input focus -->\n<input class="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded px-3 py-2 outline-none" />',
        link: 'https://tailwindcss.com/docs/hover-focus-and-other-states',
      },
      {
        name: 'group / group-hover',
        description: 'Mark a parent with group, then use group-hover: on children to style them when the parent is hovered.',
        example: '<!-- Reveal action button on card hover -->\n<div class="group relative rounded-xl overflow-hidden">\n  <img src="photo.jpg" class="w-full" />\n  \n  <div class="absolute inset-0 bg-black/60 flex items-center justify-center\n              opacity-0 group-hover:opacity-100 transition-opacity">\n    <button class="text-white border border-white px-4 py-2 rounded">\n      View Details\n    </button>\n  </div>\n</div>',
        link: 'https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state',
      },
      {
        name: 'peer / peer-checked',
        description: 'Mark a sibling element with peer, then style elements that follow it based on its state. Useful for custom checkboxes and toggles.',
        example: '<!-- Custom checkbox with peer -->\n<label class="flex items-center gap-3 cursor-pointer">\n  <input type="checkbox" class="peer sr-only">\n  <div class="w-5 h-5 border-2 rounded\n              peer-checked:bg-blue-500 peer-checked:border-blue-500\n              border-gray-400 transition-colors">\n    <svg class="text-white hidden peer-checked:block" ...>\n      <!-- checkmark -->\n    </svg>\n  </div>\n  <span>Accept terms</span>\n</label>',
        link: 'https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state',
      },
      {
        name: 'disabled: / focus-visible:',
        description: 'disabled: styles an element when it is disabled. focus-visible: applies only when focused via keyboard (not mouse clicks).',
        example: '<!-- Disabled button -->\n<button\n  class="bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 rounded"\n  disabled>\n  Submit\n</button>\n\n<!-- Focus-visible for keyboard accessibility -->\n<button class="outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded px-4 py-2">\n  Keyboard-accessible button\n</button>',
        link: 'https://tailwindcss.com/docs/hover-focus-and-other-states#focus-visible',
      },
      {
        name: 'first: / last: / odd: / even:',
        description: 'Style list items based on their position. Useful for alternating row colors and removing borders from the first/last item.',
        example: '<!-- Remove bottom border from last item -->\n<ul>\n  {items.map(item => (\n    <li class="py-3 border-b last:border-b-0">\n      {item.name}\n    </li>\n  ))}\n</ul>\n\n<!-- Alternating row colors -->\n{rows.map(row => (\n  <tr class="odd:bg-white even:bg-gray-50">\n    ...\n  </tr>\n))}',
        link: 'https://tailwindcss.com/docs/hover-focus-and-other-states#first-last-odd-and-even',
      },
    ],
  },
  {
    id: 'responsive-tw',
    title: 'Responsive & Dark Mode',
    color: '#38bdf8',
    entries: [
      {
        name: 'Breakpoint prefixes',
        description: 'Tailwind is mobile-first. sm:, md:, lg:, xl:, 2xl: apply at the given minimum width and above. No prefix = all screen sizes.',
        example: '<!-- Stack on mobile, side-by-side on desktop -->\n<div class="flex flex-col md:flex-row gap-4">\n  <Sidebar />\n  <Main />\n</div>\n\n<!-- Hide on mobile, show on desktop -->\n<nav class="hidden lg:flex gap-6">\n  ...\n</nav>\n\n<!-- Responsive text size -->\n<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">\n  Responsive Heading\n</h1>',
        link: 'https://tailwindcss.com/docs/responsive-design',
      },
      {
        name: 'dark:',
        description: 'Applies styles in dark mode. Configure darkMode in tailwind.config to use media (system preference) or class (.dark on <html>).',
        example: '<!-- Respects system dark mode preference -->\n<div class="bg-white dark:bg-gray-900\n            text-gray-900 dark:text-gray-100\n            border border-gray-200 dark:border-gray-700\n            rounded-xl p-6">\n  Card that adapts to dark mode\n</div>\n\n<!-- Toggle with class strategy: -->\n<!-- Add/remove "dark" class on <html> element -->\ndocument.documentElement.classList.toggle("dark");',
        link: 'https://tailwindcss.com/docs/dark-mode',
      },
      {
        name: 'Arbitrary values',
        description: 'Use square brackets to specify any CSS value not in the scale. Use underscores for spaces within arbitrary values.',
        example: '<!-- Arbitrary size -->\n<div class="w-[350px] h-[420px]">...</div>\n\n<!-- Arbitrary color -->\n<div class="bg-[#1a1b26] text-[#c0caf5]">...</div>\n\n<!-- Arbitrary CSS property (escape hatch) -->\n<div class="[mask-type:luminance] [clip-path:circle(50%)]">...</div>\n\n<!-- CSS variable -->\n<div class="bg-[var(--brand-color)]">...</div>\n\n<!-- Fraction -->\n<div class="w-[calc(100%-2rem)]">...</div>',
        link: 'https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values',
      },
      {
        name: '@apply directive',
        description: 'Extracts repeated Tailwind utility combinations into a CSS class. Use sparingly — prefer component abstractions when possible.',
        example: '/* In your CSS file: */\n@layer components {\n  .btn {\n    @apply inline-flex items-center justify-center\n           px-4 py-2 rounded-lg font-medium\n           transition-colors duration-150;\n  }\n\n  .btn-primary {\n    @apply btn bg-blue-600 text-white\n           hover:bg-blue-700 active:bg-blue-800;\n  }\n\n  .card {\n    @apply bg-white dark:bg-gray-800\n           rounded-xl shadow-sm\n           border border-gray-200 dark:border-gray-700\n           p-6;\n  }\n}',
        link: 'https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply',
      },
      {
        name: 'motion-reduce:',
        description: 'Disables animations for users who have enabled "Reduce Motion" in their OS. Essential for accessibility.',
        example: '<!-- Fade-in animation that respects reduced motion -->\n<div class="animate-fade-in motion-reduce:animate-none">\n  Content\n</div>\n\n<!-- Transition with reduced motion support -->\n<button class="transition-transform hover:scale-105\n               motion-reduce:transition-none\n               motion-reduce:hover:transform-none">\n  Hover me\n</button>',
        link: 'https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion',
      },
    ],
  },
  {
    id: 'components-tw',
    title: 'Common Patterns',
    color: '#f472b6',
    entries: [
      {
        name: 'Card pattern',
        description: 'A common container pattern: white background, rounded corners, shadow, and padding.',
        example: '<!-- Basic card -->\n<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm\n            border border-gray-100 dark:border-gray-700 p-6">\n  <h2 class="font-semibold text-lg mb-2">Card Title</h2>\n  <p class="text-gray-600 dark:text-gray-400">Card content here.</p>\n</div>\n\n<!-- Hoverable card -->\n<div class="group bg-white rounded-xl shadow-sm hover:shadow-md\n            border border-gray-100 p-6\n            transition-shadow duration-200 cursor-pointer">\n  ...\n</div>',
        link: 'https://tailwindcss.com/docs/reusing-styles',
      },
      {
        name: 'Button variants',
        description: 'Common button styles with primary, secondary, and ghost variants.',
        example: '<!-- Primary -->\n<button class="bg-blue-600 hover:bg-blue-700 text-white\n               px-4 py-2 rounded-lg font-medium\n               transition-colors">\n  Primary\n</button>\n\n<!-- Secondary -->\n<button class="border border-gray-300 hover:bg-gray-50\n               text-gray-700 px-4 py-2 rounded-lg\n               font-medium transition-colors">\n  Secondary\n</button>\n\n<!-- Ghost -->\n<button class="hover:bg-gray-100 text-gray-600\n               px-4 py-2 rounded-lg font-medium\n               transition-colors">\n  Ghost\n</button>',
        link: 'https://tailwindcss.com/docs/reusing-styles',
      },
      {
        name: 'sr-only',
        description: 'Visually hides content but keeps it accessible to screen readers. Use for labels, descriptions, and context that sighted users don\'t need to see.',
        example: '<!-- Skip link (visible on focus) -->\n<a href="#main"\n   class="sr-only focus:not-sr-only\n          focus:fixed focus:top-4 focus:left-4\n          bg-blue-600 text-white px-4 py-2 rounded">\n  Skip to main content\n</a>\n\n<!-- Icon button with hidden label -->\n<button aria-label="Close">\n  <svg aria-hidden="true"><!-- × --></svg>\n  <span class="sr-only">Close</span>\n</button>',
        link: 'https://tailwindcss.com/docs/screen-readers',
      },
      {
        name: 'aspect-ratio',
        description: 'Controls the aspect ratio of an element. aspect-video is 16/9; aspect-square is 1/1.',
        example: '<!-- 16:9 video embed -->\n<div class="aspect-video">\n  <iframe class="w-full h-full"\n    src="https://youtube.com/embed/...">\n  </iframe>\n</div>\n\n<!-- Square image thumbnail -->\n<div class="aspect-square overflow-hidden rounded-lg">\n  <img src="thumb.jpg"\n       class="w-full h-full object-cover"\n       alt="..." />\n</div>\n\n<!-- Arbitrary ratio -->\n<div class="aspect-[4/3]">...</div>',
        link: 'https://tailwindcss.com/docs/aspect-ratio',
      },
      {
        name: 'transition / animate-*',
        description: 'transition enables CSS transitions; animate-* applies named animations like spin, ping, pulse, bounce.',
        example: '<!-- Smooth color transition -->\n<button class="bg-blue-500 hover:bg-blue-600\n               transition-colors duration-200">\n  Smooth\n</button>\n\n<!-- Expand with all transitions -->\n<div class="transition-all duration-300 ease-in-out">\n  ...\n</div>\n\n<!-- Loading animations -->\n<div class="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />\n<div class="animate-pulse bg-gray-200 rounded h-4 w-32" />\n<div class="animate-bounce">↓</div>',
        link: 'https://tailwindcss.com/docs/transition-property',
      },
      {
        name: 'divide-y / divide-x',
        description: 'Adds borders between child elements using CSS. Cleaner than adding border-b to each individual item.',
        example: '<!-- List with dividers -->\n<ul class="divide-y divide-gray-200 dark:divide-gray-700">\n  <li class="py-3">Item 1</li>\n  <li class="py-3">Item 2</li>\n  <li class="py-3">Item 3</li>\n</ul>\n\n<!-- Navigation with vertical dividers -->\n<nav class="flex divide-x divide-gray-200">\n  <a class="px-4 py-2">Home</a>\n  <a class="px-4 py-2">About</a>\n  <a class="px-4 py-2">Contact</a>\n</nav>',
        link: 'https://tailwindcss.com/docs/divide-width',
      },
    ],
  },
]
