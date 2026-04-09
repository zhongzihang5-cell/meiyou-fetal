import { StatusBar, BottomNav } from '../components/Layout.jsx'

export default function BabyPage({ onTabChange }) {
  return (
    <div className="phone-shell" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <StatusBar />

      <div className="top-nav">
        <div style={{ padding: '0 6px', display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#555" strokeWidth="1.6"/>
            <path d="M14.5 14.5L18 18" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="top-nav-tabs">
          <div className="nav-tab" onClick={() => onTabChange('mama')}>妈妈</div>
          <div className="nav-tab" onClick={() => onTabChange('fetal')}>胎宝宝</div>
          <div className="nav-tab active">呢呢</div>
        </div>
        <div style={{ padding: '0 6px' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="3" stroke="#555" strokeWidth="1.6" fill="none"/>
            <path d="M7 10h6M10 7v6" stroke="#555" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero */}
        <div style={{ height: 200, position: 'relative', background: 'linear-gradient(160deg, #B8D0C8, #D4ECD0, #E8F5E8)', overflow: 'hidden' }}>
          <svg width="100%" height="200" viewBox="0 0 390 200" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
            <ellipse cx="195" cy="100" rx="60" ry="70" fill="#D4E8E0" opacity="0.6"/>
            <ellipse cx="195" cy="80" rx="35" ry="38" fill="#EAF4F0" opacity="0.7"/>
            <ellipse cx="195" cy="155" rx="50" ry="35" fill="#D4E8E0" opacity="0.5"/>
          </svg>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '14px 16px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.28))',
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>呢呢</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>2 岁 6 天</div>
          </div>
          <div style={{
            position: 'absolute', top: 14, right: 14,
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,0.92)',
            borderRadius: 20, padding: '6px 12px',
            fontSize: 12, fontWeight: 500, color: 'var(--pink)',
            cursor: 'pointer',
          }}>邀请亲友</div>
        </div>

        {/* Today change */}
        <div style={{
          background: 'linear-gradient(135deg, #FFB347, #FF8C42)',
          margin: '10px 12px', borderRadius: 18,
          padding: '14px 16px', color: '#fff',
        }}>
          <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 5, fontWeight: 500 }}>宝宝今日变化</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, fontWeight: 500 }}>
            我已经能用勺和碗了，可以开始锻炼我使用筷子了，使用筷子会牵动200多块肌肉，对我而言是一项锻炼呢。›
          </div>
        </div>

        {/* Kong */}
        <div style={{ background: '#fff', marginTop: 8, padding: '14px 14px 10px' }}>
          <div className="kong-grid">
            {['喂养记录', '云相册', '发育测评', '记身高体重', '更多 ∨'].map(k => (
              <div key={k} className="kong-item">
                <div className="kong-icon-wrap" style={{ background: '#F5F5F7' }}>
                  <div style={{ width: 26, height: 26, background: 'rgba(0,0,0,0.08)', borderRadius: 6 }} />
                </div>
                <div className="kong-label">{k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud banner */}
        <div style={{
          background: '#fff', margin: '8px 12px',
          borderRadius: 14, border: '0.5px solid #EBEBEB',
          padding: '12px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 13, color: '#666' }}>宝宝的珍贵回忆永久保存 →</span>
          <div style={{
            fontSize: 12, background: '#FBEAF0', color: 'var(--pink)',
            borderRadius: 14, padding: '5px 12px',
            fontWeight: 500, border: '1px solid #F4C0D1',
            cursor: 'pointer',
          }}>一键开启</div>
        </div>

        {/* Timeline */}
        <div className="timeline">
          <div className="tl-date-row">
            <div className="tl-dot" />
            <div className="tl-date-label">今天</div>
            <div className="tl-week-label">2 岁 6 天</div>
          </div>

          {/* Daily prompt card */}
          <div style={{
            background: '#fff', borderRadius: 18,
            border: '1px solid #F4C0D1', padding: 16,
            marginBottom: 14, display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <div style={{ width: 56, height: 56, background: '#FBEAF0', borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🧸</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#C04070', marginBottom: 4 }}>宝宝给娃娃盖被子呢</div>
              <div style={{ fontSize: 12, color: '#B06080' }}>喂饭打针像大人～</div>
              <div style={{ marginTop: 8, display: 'inline-block', background: 'var(--pink)', color: '#fff', borderRadius: 16, padding: '5px 14px', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>立即保存</div>
            </div>
          </div>

          <div className="tl-date-row" style={{ marginTop: 4 }}>
            <div className="tl-dot" />
            <div className="tl-date-label">2025 年 5 月 26 日</div>
            <div className="tl-week-label">1 岁 1 个月 23 天</div>
          </div>

          {/* Photo card */}
          <div style={{ background: '#fff', borderRadius: 18, border: '0.5px solid #EBEBEB', overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ height: 200, background: 'linear-gradient(135deg, #B8D8D0, #90C0B8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.35">
                <circle cx="30" cy="24" r="14" fill="#fff"/>
                <ellipse cx="30" cy="50" rx="22" ry="16" fill="#fff"/>
              </svg>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>在海边玩耍</div>
              <div style={{ fontSize: 12, color: '#AAA' }}>2025 年 5 月 26 日 · 1 岁 1 个月 23 天</div>
            </div>
            <div style={{ padding: '10px 14px', borderTop: '0.5px solid #F2F2F2', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#AAA' }}>妈妈 刚刚</span>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 12, color: '#AAA' }}>❤️ 赞</span>
                <span style={{ fontSize: 12, color: '#AAA' }}>💬 评论</span>
              </div>
            </div>
          </div>

          <div className="tl-date-row">
            <div className="tl-dot muted" />
            <div className="tl-date-label">2024 年 4 月 9 日</div>
            <div className="tl-week-label">出生日</div>
          </div>

          {/* Birth card */}
          <div style={{ background: '#fff', borderRadius: 18, border: '0.5px solid #EBEBEB', overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ background: 'linear-gradient(135deg, #FFE4E8, #FFC8D0)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 24 }}>👶</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#C04070' }}>小小的你，大大的爱</div>
                <div style={{ fontSize: 12, color: '#C06080', marginTop: 2 }}>★ 白羊座 &nbsp; 农历 二月廿二</div>
              </div>
            </div>
            <div style={{ display: 'flex', padding: '14px 0 10px' }}>
              {[{ val: '50', unit: 'cm', label: '身高' }, { val: '3.2', unit: 'kg', label: '体重' }, { val: '34', unit: 'cm', label: '头围' }].map((s, i) => (
                <div key={s.label} style={{ flex: 1, textAlign: 'center', borderLeft: i > 0 ? '0.5px solid #F2F2F2' : 'none' }}>
                  <div><span style={{ fontSize: 24, fontWeight: 700 }}>{s.val}</span><span style={{ fontSize: 12, color: '#AAA' }}> {s.unit}</span></div>
                  <div style={{ fontSize: 11, color: '#AAA', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '0 14px 12px', display: 'flex', gap: 6 }}>
              {['2024年4月9日', '身高体重', '出生记录'].map(t => (
                <div key={t} style={{ fontSize: 11, background: '#F5F5F7', color: '#666', borderRadius: 8, padding: '4px 10px' }}>{t}</div>
              ))}
            </div>
            <div style={{ padding: '10px 14px', borderTop: '0.5px solid #F2F2F2', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#AAA' }}>妈妈 刚刚</span>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 12, color: '#AAA' }}>❤️ 赞</span>
                <span style={{ fontSize: 12, color: '#AAA' }}>💬 评论</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>

      <BottomNav active="home" />
    </div>
  )
}
