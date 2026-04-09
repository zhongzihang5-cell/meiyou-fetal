import { useState } from 'react'
import MamaPage from './pages/MamaPage.jsx'
import FetalPage from './pages/FetalPage.jsx'
import BabyPage from './pages/BabyPage.jsx'

export default function App() {
  const [currentTab, setCurrentTab] = useState('fetal') // default to fetal - the new feature

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '24px 0 48px',
      background: '#D0D0D5',
    }}>
      {/* Render current page */}
      <div style={{ position: 'relative' }}>
        {currentTab === 'mama' && <MamaPage onTabChange={setCurrentTab} />}
        {currentTab === 'fetal' && <FetalPage onTabChange={setCurrentTab} />}
        {currentTab === 'baby' && <BabyPage onTabChange={setCurrentTab} />}
      </div>
    </div>
  )
}
