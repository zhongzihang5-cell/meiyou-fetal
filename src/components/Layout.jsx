import { IconSignal, IconWifi, IconBattery, IconHome, IconCalendar, IconMessage, IconUser } from './Icons.jsx'

export function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-time">09:41</span>
      <div className="status-icons">
        <IconSignal />
        <IconWifi />
        <IconBattery />
      </div>
    </div>
  )
}

export function BottomNav({ active = 'home', currentTab, onTabChange }) {
  return (
    <div className="bottom-nav">
      <div className={`bot-item ${active === 'home' ? 'active' : ''}`} onClick={() => onTabChange?.('mama')}>
        <div className="bot-icon"><IconHome active={active === 'home'} /></div>
        美柚
      </div>
      <div className={`bot-item ${active === 'record' ? 'active' : ''}`}>
        <div className="bot-icon" style={{ position: 'relative' }}>
          <IconCalendar active={active === 'record'} />
          <div className="bot-badge">8</div>
        </div>
        记录
      </div>
      <div className="bot-item">
        <div className="bot-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5Z" stroke="#AAA" strokeWidth="1.4" fill="none"/>
          </svg>
        </div>
        返现
      </div>
      <div className="bot-item">
        <div className="bot-icon" style={{ position: 'relative' }}>
          <IconMessage active={false} />
          <div className="bot-badge">2</div>
        </div>
        消息
      </div>
      <div className="bot-item">
        <div className="bot-icon"><IconUser active={false} /></div>
        我
      </div>
    </div>
  )
}
