import { StatusBar } from '../components/Layout.jsx'
import { PHONE_SHELL_MIN_HEIGHT } from '../lib/phoneShell.js'
import { CURRENT_WEEK, CURRENT_DAY, DAYS_UNTIL_DUE } from '../data/timeline.js'

function formatMonthDay(d) {
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

const TOOL_GRID = [
  { label: '能不能吃', emoji: '🦀', bg: '#FFF3E0' },
  { label: '产检时间表', emoji: '📅', bg: '#E8F4E8' },
  { label: 'B超单解读', emoji: 'B', bg: '#FFF8E0', emojiIsText: true },
  { label: '孕妈食谱', emoji: '🍴', bg: '#FFE8E0' },
  { label: '胎教音乐', emoji: '♪', bg: '#E0F7FA', emojiIsText: true },
  { label: '胎儿估重', emoji: '⚖', bg: '#FBEAF0', emojiIsText: true },
  { label: '能不能做', emoji: '👠', bg: '#FFF0F5' },
  { label: '知识百科', emoji: '📖', bg: '#E8F2FC' },
  { label: '宝宝MV', emoji: '🎬', bg: '#F0EDFC' },
  { label: '测一测', emoji: '📋', bg: '#E8F4FF' },
]

/**
 * 孕期聚合页（演示）：与产品「孕期」截图一致的可滚动布局；入口暂挂在妈妈 tab 左上角原搜索位。
 */
export default function PregnancyPeriodPage({ onBack }) {
  const today = new Date()
  const centerLabel = `${CURRENT_WEEK}周${CURRENT_DAY}天（${formatMonthDay(today)}）`

  return (
    <div
      className="phone-shell"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: PHONE_SHELL_MIN_HEIGHT,
        height: '100%',
        background: '#F5F5F7',
      }}
    >
      <StatusBar />

      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: '#fff',
          borderBottom: '0.5px solid #EBEBEB',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          aria-label="返回"
          onClick={onBack}
          style={{
            position: 'absolute',
            left: 6,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 40,
            height: 40,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>孕期</span>
      </div>

      <div className="scroll-area" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {/* 顶部孕周卡 */}
        <div style={{ padding: '10px 12px 0' }}>
          <div
            style={{
              background: 'linear-gradient(145deg, #FF6B9D 0%, #F05A8A 42%, #E8487A 100%)',
              borderRadius: 18,
              padding: '16px 14px 22px',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: -28,
                top: -18,
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -20,
                bottom: -30,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
              }}
            />

            <div style={{ display: 'flex', gap: 2, marginBottom: 6, overflow: 'hidden', position: 'relative' }}>
              {[
                { label: `${CURRENT_WEEK}周${Math.max(1, CURRENT_DAY - 1)}天`, sub: '昨日', active: false },
                { label: centerLabel, sub: '', active: true },
                { label: `${CURRENT_WEEK}周${CURRENT_DAY + 1}天`, sub: '明日', active: false },
              ].map((w, i) => (
                <div
                  key={i}
                  style={{
                    flex: '1 1 0',
                    minWidth: 0,
                    textAlign: 'center',
                    opacity: w.active ? 1 : 0.55,
                    borderBottom: w.active ? '2px solid #fff' : '1.5px solid rgba(255,255,255,0.28)',
                    paddingBottom: 5,
                    marginBottom: 4,
                    fontSize: w.active ? 11 : 10,
                    fontWeight: w.active ? 700 : 500,
                    lineHeight: 1.2,
                    letterSpacing: -0.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {w.label}
                  {w.sub ? <span style={{ fontWeight: 400, opacity: 0.88 }}> {w.sub}</span> : null}
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, opacity: 0.92, marginBottom: 14, position: 'relative' }}>距离预产期 {DAYS_UNTIL_DUE} 天</div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, position: 'relative' }}>
              <div style={{ display: 'flex', gap: 22 }}>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.78, marginBottom: 4 }}>身高</div>
                  <div>
                    <span style={{ fontSize: 22, fontWeight: 700 }}>512</span>
                    <span style={{ fontSize: 12, opacity: 0.85, marginLeft: 2 }}>mm</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.78, marginBottom: 4 }}>体重</div>
                  <div>
                    <span style={{ fontSize: 22, fontWeight: 700 }}>3500</span>
                    <span style={{ fontSize: 12, opacity: 0.85, marginLeft: 2 }}>g</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 20,
                  background: 'linear-gradient(160deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08))',
                  border: '1px solid rgba(255,255,255,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 40,
                  flexShrink: 0,
                  marginBottom: 2,
                }}
                aria-hidden
              >
                👶
              </div>
            </div>

            <button
              type="button"
              style={{
                marginTop: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: 'rgba(255,255,255,0.22)',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 18,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 600,
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              本周孕期指南
            </button>
          </div>

          {/* 叠在粉色卡下方的宝宝/妈妈变化 */}
          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              border: '0.5px solid #EEE',
              marginTop: -12,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            {[
              {
                dot: '#E8608A',
                label: '宝宝变化',
                color: '#C04070',
                text: '宝宝的肝脏已能处理部分废物；皮下脂肪继续增加，体温调节能力在完善。',
              },
              {
                dot: '#1BA97A',
                label: '妈妈变化',
                color: '#1BA97A',
                text: '留意胎动规律，如有明显减少请及时就诊；准备待产包，保持心情放松。',
              },
            ].map(row => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  gap: 10,
                  padding: '12px 14px',
                  borderBottom: '0.5px solid #F2F2F2',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: row.dot, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: row.color, marginBottom: 2 }}>{row.label}</div>
                  <div style={{ fontSize: 12, color: '#666', lineHeight: 1.55 }}>{row.text}</div>
                </div>
                <div style={{ color: '#CCC', fontSize: 14, marginTop: 2 }}>›</div>
              </div>
            ))}
          </div>
        </div>

        {/* 工具宫格 */}
        <div style={{ padding: '12px 12px 0' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              border: '0.5px solid #EEE',
              padding: '14px 10px 12px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '12px 6px',
              }}
            >
              {TOOL_GRID.map(t => (
                <button
                  key={t.label}
                  type="button"
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    padding: '4px 2px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: t.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: t.emojiIsText ? 17 : 22,
                      fontWeight: t.emojiIsText ? 700 : 400,
                      color: t.emojiIsText ? '#C85A30' : undefined,
                    }}
                  >
                    {t.emoji}
                  </div>
                  <span style={{ fontSize: 11, color: '#555', lineHeight: 1.25, textAlign: 'center' }}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 宝宝记 */}
        <div style={{ padding: '12px 12px 28px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>宝宝记</div>

          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              border: '0.5px solid #EEE',
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                border: 'none',
                borderBottom: '0.5px solid #F2F2F2',
                background: '#FAFAFA',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFD6E8, #E8D4FF)',
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1, fontSize: 13, color: '#333' }}>1 条新的亲友消息</span>
              <span style={{ color: '#CCC', fontSize: 16 }}>›</span>
            </button>

            <div style={{ padding: '12px 12px 16px' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 18, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#E295A8',
                      boxShadow: '0 0 0 2px #fff',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, width: 2, background: '#E8E8E8', marginTop: 4, borderRadius: 1 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: '#AAA', marginBottom: 8 }}>
                    今天 · 孕{CURRENT_WEEK}周{CURRENT_DAY}天
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#E8608A', marginBottom: 10, lineHeight: 1.45 }}>
                    宝宝每一次变化都值得记录
                  </div>
                  <div
                    style={{
                      height: 120,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE8F0 50%, #F5E8FF 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 12,
                      border: '0.5px solid #F4D0DA',
                    }}
                  >
                    <span style={{ fontSize: 42 }}>📷</span>
                  </div>
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      border: 'none',
                      borderRadius: 22,
                      padding: '12px',
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#fff',
                      background: 'linear-gradient(145deg, #FF6B9D, #E8608A)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      boxShadow: '0 6px 18px rgba(232,96,138,0.35)',
                    }}
                  >
                    上传照片
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <div style={{ width: 18, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#E295A8',
                      boxShadow: '0 0 0 2px #fff',
                      flexShrink: 0,
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0, paddingBottom: 4 }}>
                  <div style={{ fontSize: 12, color: '#AAA', marginBottom: 8 }}>2025年8月23日 · 孕4周2天</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#E8608A', marginBottom: 10, lineHeight: 1.45 }}>
                    记录第一次发现宝宝存在
                  </div>
                  <div
                    style={{
                      height: 100,
                      borderRadius: 12,
                      background: 'linear-gradient(180deg, #FFF5F0 0%, #FFE8EE 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '0.5px solid #F4D0DA',
                      fontSize: 40,
                    }}
                  >
                    💑
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '0 12px 14px' }}>
              <button
                type="button"
                style={{
                  width: '100%',
                  border: '1px solid #F4C0D1',
                  background: '#FFF',
                  borderRadius: 20,
                  padding: '10px',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#C04070',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                查看全部记录 ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
