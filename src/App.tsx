import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import CategoryPage from '@/pages/CategoryPage'
import TopicPage from '@/pages/TopicPage'
import SearchPage from '@/pages/SearchPage'
import SearchPalette from '@/components/ui/SearchPalette'
import ReferencePage from '@/pages/ReferencePage'
import ResourcesPage from '@/pages/ResourcesPage'
import GuestbookWidget from '@/components/guestbook/GuestbookWidget'
import GuestbookPage from '@/pages/GuestbookPage'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <Navbar />
        <SearchPalette />
        <GuestbookWidget />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/html-core" element={<CategoryPage />} />
              <Route path="/html-structure" element={<CategoryPage />} />
              <Route path="/html-interactive" element={<CategoryPage />} />
              <Route path="/css-basics" element={<CategoryPage />} />
              <Route path="/css-layout" element={<CategoryPage />} />
              <Route path="/css-modern" element={<CategoryPage />} />
              <Route path="/css-frameworks" element={<CategoryPage />} />
              <Route path="/javascript" element={<CategoryPage />} />
              <Route path="/javascript-oop" element={<CategoryPage />} />
              <Route path="/javascript-async" element={<CategoryPage />} />
              <Route path="/typescript" element={<CategoryPage />} />
              <Route path="/typescript-advanced" element={<CategoryPage />} />
              <Route path="/typescript-react" element={<CategoryPage />} />
              <Route path="/react" element={<CategoryPage />} />
              <Route path="/react-ecosystem" element={<CategoryPage />} />
              <Route path="/nextjs" element={<CategoryPage />} />
              <Route path="/nextjs-rendering" element={<CategoryPage />} />
              <Route path="/nextjs-data" element={<CategoryPage />} />
              <Route path="/webapis" element={<CategoryPage />} />
              <Route path="/http" element={<CategoryPage />} />
              <Route path="/postgresql" element={<CategoryPage />} />
              <Route path="/git" element={<CategoryPage />} />
              <Route path="/git-collab" element={<CategoryPage />} />
              <Route path="/testing" element={<CategoryPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/guestbook" element={<GuestbookPage />} />
              <Route path="/reference/html" element={<ReferencePage type="html" />} />
              <Route path="/reference/css" element={<ReferencePage type="css" />} />
              <Route path="/reference/javascript" element={<ReferencePage type="javascript" />} />
              <Route path="/reference/typescript" element={<ReferencePage type="typescript" />} />
              <Route path="/reference/react" element={<ReferencePage type="react" />} />
              <Route path="/reference/tailwind" element={<ReferencePage type="tailwind" />} />
              <Route path="/reference/nextjs" element={<ReferencePage type="nextjs" />} />
              <Route path="/reference/webapis" element={<ReferencePage type="webapis" />} />
              <Route path="/reference/postgresql" element={<ReferencePage type="postgresql" />} />
              <Route path="/reference/git" element={<ReferencePage type="git" />} />
              <Route path="/reference/testing" element={<ReferencePage type="testing" />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
