import type { ReferenceCategory } from '@/types'

export const NEXTJS_REFERENCE: ReferenceCategory[] = [
  {
    id: 'app-router',
    title: 'App Router',
    color: '#000000',
    entries: [
      {
        name: 'app/ directory',
        description: 'The App Router uses the app/ directory. Every folder is a route segment; page.tsx makes a segment publicly accessible.',
        example: 'app/\n  layout.tsx          // root layout (required)\n  page.tsx            // / route\n  about/\n    page.tsx          // /about route\n  blog/\n    [slug]/\n      page.tsx        // /blog/:slug route\n    page.tsx          // /blog route\n  (marketing)/        // route group (no URL segment)\n    landing/\n      page.tsx        // /landing route',
        link: 'https://nextjs.org/docs/app/building-your-application/routing',
      },
      {
        name: 'page.tsx',
        description: 'Defines the unique UI for a route. The default export receives params and searchParams props.',
        example: '// app/blog/[slug]/page.tsx\ninterface Props {\n  params: { slug: string }\n  searchParams: { [key: string]: string | undefined }\n}\n\nexport default function BlogPost({ params, searchParams }: Props) {\n  return <article>{params.slug}</article>\n}\n\n// Generate static routes:\nexport async function generateStaticParams() {\n  const posts = await getPosts()\n  return posts.map(p => ({ slug: p.slug }))\n}',
        link: 'https://nextjs.org/docs/app/api-reference/file-conventions/page',
      },
      {
        name: 'layout.tsx',
        description: 'Shared UI that wraps child routes. Root layout must include <html> and <body>. Layouts do not re-render on navigation.',
        example: '// app/layout.tsx (root — required)\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode\n}) {\n  return (\n    <html lang="en">\n      <body>\n        <Navbar />\n        <main>{children}</main>\n        <Footer />\n      </body>\n    </html>\n  )\n}\n\n// app/dashboard/layout.tsx (nested layout)\nexport default function DashboardLayout({ children }) {\n  return <aside><Sidebar />{children}</aside>\n}',
        link: 'https://nextjs.org/docs/app/api-reference/file-conventions/layout',
      },
      {
        name: 'loading.tsx',
        description: 'Automatically wraps the page in a Suspense boundary. Shown instantly while the page component streams in.',
        example: '// app/dashboard/loading.tsx\nexport default function Loading() {\n  return (\n    <div className="flex items-center justify-center h-64">\n      <div className="animate-spin rounded-full h-8 w-8\n                      border-4 border-blue-500 border-t-transparent" />\n    </div>\n  )\n}\n// Next.js automatically wraps page.tsx with:\n// <Suspense fallback={<Loading />}><Page /></Suspense>',
        link: 'https://nextjs.org/docs/app/api-reference/file-conventions/loading',
      },
      {
        name: 'error.tsx',
        description: 'Error boundary for a route segment. Must be a Client Component. Receives error and reset props.',
        example: '"use client"\n\nexport default function Error({\n  error,\n  reset,\n}: {\n  error: Error & { digest?: string }\n  reset: () => void\n}) {\n  return (\n    <div>\n      <h2>Something went wrong!</h2>\n      <p>{error.message}</p>\n      <button onClick={reset}>Try again</button>\n    </div>\n  )\n}',
        link: 'https://nextjs.org/docs/app/api-reference/file-conventions/error',
      },
      {
        name: 'not-found.tsx',
        description: 'Rendered when notFound() is called from a Server Component, or when no route matches.',
        example: '// app/not-found.tsx\nexport default function NotFound() {\n  return (\n    <main className="flex flex-col items-center justify-center min-h-screen">\n      <h1 className="text-6xl font-bold">404</h1>\n      <p className="text-gray-500 mt-4">Page not found.</p>\n      <a href="/" className="mt-6 text-blue-500">Go home</a>\n    </main>\n  )\n}\n\n// Trigger from a Server Component:\nimport { notFound } from "next/navigation"\nif (!post) notFound()',
        link: 'https://nextjs.org/docs/app/api-reference/file-conventions/not-found',
      },
      {
        name: 'Route Groups ()',
        description: 'Wrap folders in (parentheses) to group routes without affecting the URL. Useful for organizing layouts or applying middleware selectively.',
        example: 'app/\n  (auth)/            // no URL segment\n    login/\n      page.tsx       // /login\n    register/\n      page.tsx       // /register\n    layout.tsx       // shared auth layout\n  (dashboard)/\n    dashboard/\n      page.tsx       // /dashboard\n    settings/\n      page.tsx       // /settings\n    layout.tsx       // shared dashboard layout',
        link: 'https://nextjs.org/docs/app/building-your-application/routing/route-groups',
      },
    ],
  },
  {
    id: 'server-client',
    title: 'Server & Client Components',
    color: '#3b82f6',
    entries: [
      {
        name: 'Server Components (default)',
        description: 'All components in app/ are Server Components by default. They run on the server, can access databases directly, and never ship their code to the client.',
        example: '// No "use client" directive needed\nimport { db } from "@/lib/database"\n\nexport default async function UserList() {\n  // Direct database access — runs on server only\n  const users = await db.user.findMany()\n\n  return (\n    <ul>\n      {users.map(u => <li key={u.id}>{u.name}</li>)}\n    </ul>\n  )\n}\n// ✓ No useEffect, no useState needed for data fetching\n// ✓ DB credentials never exposed to client',
        link: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components',
      },
      {
        name: '"use client"',
        description: 'Marks a component as a Client Component — adds it to the JS bundle and enables useState, useEffect, event handlers, and browser APIs.',
        example: '"use client"\n\nimport { useState } from "react"\n\nexport function Counter() {\n  const [count, setCount] = useState(0)\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Count: {count}\n    </button>\n  )\n}\n\n// Move "use client" boundary as far down the tree\n// as possible — keep most components as Server Components',
        link: 'https://nextjs.org/docs/app/building-your-application/rendering/client-components',
      },
      {
        name: 'Composition pattern',
        description: 'Server Components can import Client Components, but not vice versa. Pass Server Component output as children or props to Client Components.',
        example: '// ✓ Server Component wraps Client Component:\nexport default function Page() {\n  return (\n    <InteractiveShell>    {/* Client Component */}\n      <ServerData />       {/* Server Component as child */}\n    </InteractiveShell>\n  )\n}\n\n// ✓ Pass server data as props:\nexport default async function Page() {\n  const data = await fetchData()  // server-side\n  return <ClientChart data={data} />\n}\n\n// ✗ Cannot import Server Component inside "use client":',
        link: 'https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns',
      },
    ],
  },
  {
    id: 'data-fetching',
    title: 'Data Fetching',
    color: '#10b981',
    entries: [
      {
        name: 'fetch in Server Components',
        description: 'Next.js extends the native fetch API with caching options. Use async/await directly in Server Components — no useEffect needed.',
        example: 'export default async function Page() {\n  // Cached by default (like getStaticProps):\n  const data = await fetch("https://api.example.com/data")\n  const json = await data.json()\n\n  // Revalidate every 60 seconds (like ISR):\n  const fresh = await fetch("/api/posts", {\n    next: { revalidate: 60 }\n  })\n\n  // No cache — always fresh (like getServerSideProps):\n  const live = await fetch("/api/live", {\n    cache: "no-store"\n  })\n\n  return <div>{json.title}</div>\n}',
        link: 'https://nextjs.org/docs/app/building-your-application/data-fetching/fetching',
      },
      {
        name: 'Server Actions',
        description: 'Async functions marked with "use server" that run on the server. Called directly from Client Components — no API route needed for mutations.',
        example: '// app/actions.ts\n"use server"\n\nexport async function createPost(formData: FormData) {\n  const title = formData.get("title") as string\n  await db.post.create({ data: { title } })\n  revalidatePath("/blog")\n}\n\n// In a Client Component:\nimport { createPost } from "@/app/actions"\n\nexport function NewPostForm() {\n  return (\n    <form action={createPost}>\n      <input name="title" />\n      <button type="submit">Create</button>\n    </form>\n  )\n}',
        link: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations',
      },
      {
        name: 'revalidatePath / revalidateTag',
        description: 'Purge the Next.js cache after a mutation. revalidatePath clears a URL; revalidateTag clears all fetches tagged with a specific key.',
        example: 'import { revalidatePath, revalidateTag } from "next/cache"\n\n// After updating a post:\nasync function updatePost(id: string, data: PostData) {\n  await db.post.update({ where: { id }, data })\n\n  revalidatePath("/blog")           // clear /blog page\n  revalidatePath(`/blog/${id}`)     // clear specific post\n  revalidateTag("posts")            // clear all "posts" tagged fetches\n}\n\n// Tag a fetch:\nconst res = await fetch("/api/posts", {\n  next: { tags: ["posts"] }\n})',
        link: 'https://nextjs.org/docs/app/api-reference/functions/revalidatePath',
      },
      {
        name: 'generateMetadata',
        description: 'Async function that generates dynamic <head> metadata per page. Replaces the static metadata export for dynamic routes.',
        example: '// app/blog/[slug]/page.tsx\nimport type { Metadata } from "next"\n\nexport async function generateMetadata(\n  { params }: { params: { slug: string } }\n): Promise<Metadata> {\n  const post = await getPost(params.slug)\n  return {\n    title: post.title,\n    description: post.excerpt,\n    openGraph: {\n      title: post.title,\n      images: [post.coverImage],\n    },\n  }\n}',
        link: 'https://nextjs.org/docs/app/api-reference/functions/generate-metadata',
      },
    ],
  },
  {
    id: 'routing',
    title: 'Navigation & Routing',
    color: '#f59e0b',
    entries: [
      {
        name: '<Link>',
        description: 'Client-side navigation between routes. Prefetches the route in the background when the link enters the viewport.',
        example: 'import Link from "next/link"\n\n// Basic link:\n<Link href="/about">About</Link>\n\n// Dynamic route:\n<Link href={`/blog/${post.slug}`}>{post.title}</Link>\n\n// Replace history (no back button):\n<Link href="/login" replace>Log In</Link>\n\n// Scroll to top (default true):\n<Link href="/dashboard" scroll={false}>\n  Dashboard\n</Link>',
        link: 'https://nextjs.org/docs/app/api-reference/components/link',
      },
      {
        name: 'useRouter',
        description: 'Programmatic navigation in Client Components. Use for navigation after form submissions, auth redirects, etc.',
        example: '"use client"\nimport { useRouter } from "next/navigation"\n\nexport function LoginForm() {\n  const router = useRouter()\n\n  async function handleSubmit(e: React.FormEvent) {\n    e.preventDefault()\n    await login()\n    router.push("/dashboard")      // navigate\n    // router.replace("/dashboard") // no history entry\n    // router.back()                // go back\n    // router.refresh()             // re-fetch server data\n  }\n  return <form onSubmit={handleSubmit}>...</form>\n}',
        link: 'https://nextjs.org/docs/app/api-reference/functions/use-router',
      },
      {
        name: 'usePathname / useSearchParams',
        description: 'Read the current URL path and search parameters in Client Components.',
        example: '"use client"\nimport { usePathname, useSearchParams } from "next/navigation"\n\nexport function ActiveLink({ href, label }) {\n  const pathname = usePathname()\n  const isActive = pathname === href\n  return (\n    <a href={href} className={isActive ? "font-bold" : ""}>\n      {label}\n    </a>\n  )\n}\n\n// Search params:\nexport function SearchBar() {\n  const searchParams = useSearchParams()\n  const query = searchParams.get("q") ?? ""\n  return <input defaultValue={query} />\n}',
        link: 'https://nextjs.org/docs/app/api-reference/functions/use-pathname',
      },
      {
        name: 'redirect / permanentRedirect',
        description: 'Server-side redirect functions. redirect() sends a 307; permanentRedirect() sends a 308. Can be called in Server Components and Server Actions.',
        example: 'import { redirect, permanentRedirect } from "next/navigation"\n\n// In a Server Component:\nexport default async function Page() {\n  const session = await getSession()\n  if (!session) redirect("/login")\n\n  return <Dashboard />\n}\n\n// In a Server Action:\nasync function deletePost(id: string) {\n  await db.post.delete({ where: { id } })\n  redirect("/blog")  // redirect after mutation\n}\n\n// Old URL → new URL (SEO-safe):\nexport default function OldPage() {\n  permanentRedirect("/new-url")\n}',
        link: 'https://nextjs.org/docs/app/api-reference/functions/redirect',
      },
      {
        name: 'middleware.ts',
        description: 'Runs before every request matching the config. Used for auth, locale detection, A/B testing, and redirects at the edge.',
        example: '// middleware.ts (root of project)\nimport { NextResponse } from "next/server"\nimport type { NextRequest } from "next/server"\n\nexport function middleware(request: NextRequest) {\n  const token = request.cookies.get("auth-token")\n\n  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {\n    return NextResponse.redirect(new URL("/login", request.url))\n  }\n\n  return NextResponse.next()\n}\n\nexport const config = {\n  matcher: ["/dashboard/:path*", "/settings/:path*"],\n}',
        link: 'https://nextjs.org/docs/app/building-your-application/routing/middleware',
      },
    ],
  },
  {
    id: 'rendering',
    title: 'Rendering Strategies',
    color: '#8b5cf6',
    entries: [
      {
        name: 'Static Rendering (default)',
        description: 'Routes are rendered at build time and cached. The default for pages without dynamic data. Fastest option — served from CDN.',
        example: '// Static: no dynamic data → rendered at build time\nexport default async function Page() {\n  const posts = await fetch("https://api.example.com/posts", {\n    // Cache forever (default behavior)\n  }).then(r => r.json())\n\n  return <PostList posts={posts} />\n}\n\n// Force static even with dynamic functions:\nexport const dynamic = "force-static"\n\n// Set revalidation interval (ISR):\nexport const revalidate = 3600  // every hour',
        link: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default',
      },
      {
        name: 'Dynamic Rendering',
        description: 'Renders on every request — like getServerSideProps. Triggered automatically when you use cookies(), headers(), or cache: "no-store".',
        example: 'import { cookies, headers } from "next/headers"\n\n// Opting into dynamic rendering:\nexport default async function Page() {\n  // Using cookies() or headers() forces dynamic rendering:\n  const cookieStore = cookies()\n  const theme = cookieStore.get("theme")\n\n  // Or explicit:\n  const data = await fetch("/api/live", {\n    cache: "no-store"\n  }).then(r => r.json())\n\n  return <div data-theme={theme?.value}>{data.message}</div>\n}\n\n// Force dynamic:\nexport const dynamic = "force-dynamic"',
        link: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering',
      },
      {
        name: 'Image component',
        description: 'Optimizes images automatically: WebP/AVIF conversion, lazy loading, blur placeholder, and layout shift prevention.',
        example: 'import Image from "next/image"\n\n// Fixed size:\n<Image\n  src="/hero.jpg"\n  alt="Hero image"\n  width={800}\n  height={500}\n  priority       // eager-load above-the-fold images\n/>\n\n// Fill container (parent must be relative + sized):\n<div className="relative h-64 w-full">\n  <Image\n    src="/cover.jpg"\n    alt="Cover"\n    fill\n    className="object-cover"\n  />\n</div>',
        link: 'https://nextjs.org/docs/app/api-reference/components/image',
      },
    ],
  },
]
