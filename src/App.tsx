import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import LevelOverview from '@/pages/LevelOverview'
import TopicPage from '@/pages/TopicPage'
import SearchPage from '@/pages/SearchPage'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/level/:levelId" element={<LevelOverview />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
