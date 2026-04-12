import { useState } from 'react'
import MamaPage from './pages/MamaPage.jsx'
import FetalPage from './pages/FetalPage.jsx'
import BabyPage from './pages/BabyPage.jsx'

export default function App() {
  const [currentTab, setCurrentTab] = useState('fetal')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: '24px 0 48px', background: '#C8C8CE' }}>
      {/* Page switcher */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, background: 'rgba(255,255,255,0.25)', padding: 4, borderRadius: 28 }}>
        {[
          { id: 'mama', label: '妈妈 tab' },
          { id: 'fetal', label: '胎宝宝 tab ✨' },
          { id: 'baby', label: '柚柚 tab' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setCurrentTab(t.id)}
            style={{
              padding: '9px 18px', borderRadius: 22, border: 'none',
              background: currentTab === t.id ? '#fff' : 'transparent',
              color: currentTab === t.id ? '#E8608A' : 'rgba(0,0,0,0.45)',
              fontWeight: currentTab === t.id ? 600 : 400,
              fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: currentTab === t.id ? '0 2px 10px rgba(0,0,0,0.12)' : 'none',
              transition: 'all 0.18s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative' }}>
        {currentTab === 'mama'  && <MamaPage  onTabChange={setCurrentTab} />}
        {currentTab === 'fetal' && <FetalPage onTabChange={setCurrentTab} />}
        {currentTab === 'baby'  && <BabyPage  onTabChange={setCurrentTab} />}
      </div>
    </div>
  )
}
