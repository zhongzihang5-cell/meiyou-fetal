import { StatusBar, BottomNav } from '../components/Layout.jsx'
import { DAYS_UNTIL_DUE } from '../data/timeline.js'

export default function MamaPage({ onTabChange }) {
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
          <div className="nav-tab active">妈妈</div>
          <div className="nav-tab" onClick={() => onTabChange('fetal')}>胎宝宝</div>
          <div className="nav-tab" onClick={() => onTabChange('baby')}>柚柚</div>
        </div>
        <div style={{ padding: '0 6px' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h10M3 15h7" stroke="#555" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Pregnancy hero */}
        <div style={{
          background: 'linear-gradient(135deg, #F87BAD 0%, #E85A8A 50%, #D44078 100%)',
          margin: '10px 12px',
          borderRadius: 20,
          padding: 16,
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -20, top: -20,
            width: 160, height: 160,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute', top: 14, right: 14,
            fontSize: 11, opacity: 0.85,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 10, padding: '3px 8px',
          }}>距预产期 {DAYS_UNTIL_DUE} 天</div>

          <div style={{ display: 'flex', gap: 0, marginBottom: 10, overflow: 'hidden' }}>
            {[
              { label: '4周1天', date: '4月7日', active: false },
              { label: '4周2天', date: '4月8日', active: true },
              { label: '4周3天', date: '4月9日', active: false },
            ].map(w => (
              <div key={w.label} style={{
                minWidth: 110, textAlign: 'center',
                opacity: w.active ? 1 : 0.45,
                borderBottom: w.active ? '2.5px solid #fff' : '2px solid rgba(255,255,255,0.3)',
                paddingBottom: 8, marginBottom: 10,
                fontSize: w.active ? 15 : 13,
                fontWeight: w.active ? 700 : 500,
              }}>
                {w.label}<br />
                <span style={{ fontSize: 11, opacity: 0.85 }}>{w.date}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
            <div>
              <div><span style={{ fontSize: 22, fontWeight: 700 }}>513</span><span style={{ fontSize: 12, opacity: 0.8, marginLeft: 2 }}>mm</span></div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>身长</div>
            </div>
            <div>
              <div><span style={{ fontSize: 22, fontWeight: 700 }}>3510</span><span style={{ fontSize: 12, opacity: 0.8, marginLeft: 2 }}>g</span></div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>体重</div>
            </div>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: 'rgba(255,255,255,0.22)',
            borderRadius: 14, padding: '5px 12px',
            fontSize: 12, fontWeight: 500, color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
          }}>本周孕期指南 ›</div>
        </div>

        {/* Change card */}
        <div style={{
          background: '#fff', margin: '8px 12px',
          borderRadius: 16, border: '0.5px solid #EBEBEB', overflow: 'hidden',
        }}>
          {[
            { dot: 'var(--pink)', label: '宝宝变化', color: 'var(--pink)', text: '妈妈，如果我在肚里突然动得很厉害，可能是我缺氧了，你要及时告诉医生哦！' },
            { dot: '#1BA97A', label: '妈妈变化', color: '#1BA97A', text: '人工催产会比自然发动要疼一些，你可以提前和医生沟通，采取镇痛措施哦。' },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex', gap: 10, padding: '12px 14px',
              borderBottom: '0.5px solid #F2F2F2', alignItems: 'flex-start',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: row.dot, marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: row.color, marginBottom: 2 }}>{row.label}</div>
                <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{row.text}</div>
              </div>
              <div style={{ color: '#CCC', fontSize: 14, marginTop: 2 }}>›</div>
            </div>
          ))}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', background: '#FAFAFA', borderTop: '0.5px solid #F2F2F2',
          }}>
            <span style={{ fontSize: 12, color: '#666' }}>让准爸爸看看，孕期他能做什么</span>
            <div style={{
              fontSize: 12, color: 'var(--pink)', border: '1px solid #F4C0D1',
              borderRadius: 14, padding: '4px 12px', background: '#FBEAF0',
              fontWeight: 500, cursor: 'pointer',
            }}>邀请爸爸</div>
          </div>
        </div>

        {/* Kong zone */}
        <div style={{ background: '#fff', marginTop: 8, padding: '14px 14px 10px' }}>
          <div className="kong-grid">
            {[
              { label: '问医生', bg: '#E0F5F0' },
              { label: '能不能吃', bg: '#FFF3E0' },
              { label: '产检时间表', bg: '#E8F4E8' },
              { label: 'hCG查询', bg: '#F0EDFC' },
              { label: '孕期体重', bg: '#E8F2FC' },
              { label: '宝宝起名', bg: '#FFF0E6', ad: true },
              { label: '精选好物', bg: '#F8F0FB', ad: true },
              { label: '数宫缩', bg: '#FBEAF0' },
              { label: '妈妈交流群', bg: '#E8F4E8' },
              { label: 'B超单解读', bg: '#E8F2FC', vip: true },
            ].map(k => (
              <div key={k.label} className="kong-item">
                <div className="kong-icon-wrap" style={{ background: k.bg }}>
                  {k.ad && <div className="kong-ad">广告</div>}
                  {k.vip && <div className="kong-ad" style={{ background: '#8A6FD8' }}>VIP</div>}
                  <div style={{ width: 26, height: 26, background: 'rgba(0,0,0,0.08)', borderRadius: 6 }} />
                </div>
                <div className="kong-label">{k.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feed placeholder */}
        <div className="section-gap" />
        <div style={{ padding: '10px 12px' }}>
          <div style={{
            background: '#fff', borderRadius: 16,
            border: '0.5px solid #EBEBEB', padding: 14,
          }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F0E8FC', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>♂ ____北风</div>
                <div style={{ fontSize: 11, color: '#AAA' }}>柚柚 · 产后第1天</div>
              </div>
              <div style={{ marginLeft: 'auto', color: '#AAA' }}>···</div>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>
              姐妹们，我女儿的名字会不会过于大气？有点担心她压不住
            </div>
            <div style={{ width: 120, height: 76, background: '#E8E8E8', borderRadius: 10, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#BBB' }}>出生医学证明</div>
            <div style={{ background: '#F8F8F8', borderRadius: 10, padding: '8px 10px', marginBottom: 10 }}>
              <div style={{ display: 'inline-block', fontSize: 10, background: '#FBEAF0', color: 'var(--pink)', borderRadius: 4, padding: '1px 6px', marginBottom: 4, fontWeight: 500, border: '0.5px solid #F4C0D1' }}>姐妹回复</div>
              <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>我小时候上学名字带了个凤字，没上户口的，从小体弱多病...</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
              <span style={{ fontSize: 12, color: '#AAA' }}>💬 2093</span>
              <span style={{ fontSize: 12, color: '#AAA' }}>❤️ 2127</span>
            </div>
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>

      <BottomNav active="home" />
    </div>
  )
}
