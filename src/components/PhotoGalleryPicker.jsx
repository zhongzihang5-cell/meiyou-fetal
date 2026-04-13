import { useState, useMemo } from 'react'

const MOCK_COUNT = 16

function formatAlbumDate() {
  const d = new Date()
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

export default function PhotoGalleryPicker({ onClose, onContinue }) {
  const [selected, setSelected] = useState(() => new Set())
  const dateLabel = useMemo(() => formatAlbumDate(), [])

  const mockItems = useMemo(
    () =>
      Array.from({ length: MOCK_COUNT }, (_, i) => ({
        id: i,
        bg: `linear-gradient(135deg, hsl(${(i * 23) % 360} 18% 32%), hsl(${(i * 41 + 40) % 360} 22% 22%))`,
      })),
    [],
  )

  function toggle(id) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectAll() {
    if (selected.size === MOCK_COUNT) setSelected(new Set())
    else setSelected(new Set(mockItems.map(m => m.id)))
  }

  return (
    <div
      className="gallery-picker-root"
      style={{
        background: '#0D0D0F',
        color: '#fff',
        fontFamily: 'inherit',
      }}
      onClick={e => e.stopPropagation()}
    >
      {/* 顶栏 */}
      <div style={{ padding: '10px 14px 6px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 36, position: 'relative' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 22,
              lineHeight: 1,
              cursor: 'pointer',
              padding: 4,
              marginLeft: -4,
            }}
            aria-label="关闭"
          >
            ×
          </button>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 16, fontWeight: 500 }}>
            最近项目
            <span style={{ fontSize: 10, opacity: 0.7 }}>▼</span>
          </div>
          <div style={{ width: 32 }} />
        </div>
      </div>

      {/* 日期 + 全选 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 14px 10px',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{dateLabel}</span>
        <button
          type="button"
          onClick={selectAll}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--pink)',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            padding: 4,
          }}
        >
          全选
        </button>
      </div>

      {/* 网格 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 2px 8px', WebkitOverflowScrolling: 'touch' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
          }}
        >
          {mockItems.map(item => {
            const isOn = selected.has(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: item.bg,
                  display: 'block',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.95)',
                    background: isOn ? 'var(--pink)' : 'rgba(0,0,0,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  {isOn && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l2.5 2.5L10 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              </button>
            )
          })}
          <button
            type="button"
            style={{
              aspectRatio: '1',
              border: 'none',
              background: '#2A2A2E',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer',
              padding: 8,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" fill="#07C160" />
              <path d="M8 11c0-1 1-2 2-2h8c1 0 2 1 2 2v6c0 1-1 2-2 2h-2l-3 2v-2h-3c-1 0-2-1-2-2v-6z" fill="#fff" opacity="0.95" />
            </svg>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', lineHeight: 1.25, textAlign: 'center' }}>从微信导入</span>
          </button>
        </div>
      </div>

      {/* 底栏 */}
      <div style={{ flexShrink: 0, background: '#0D0D0F', paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px 8px',
            borderTop: '0.5px solid rgba(255,255,255,0.08)',
          }}
        >
          <button type="button" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.85)', fontSize: 15, cursor: 'pointer', padding: 4 }}>
            预览
          </button>
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.85)',
              fontSize: 14,
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            超高清
            <span style={{ fontSize: 9 }}>▲</span>
          </button>
          <button
            type="button"
            onClick={onContinue}
            style={{
              minWidth: 120,
              padding: '10px 28px',
              borderRadius: 22,
              border: 'none',
              background: '#fff',
              color: '#111',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            完成
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '8px 12px 4px',
            borderTop: '0.5px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { label: '相册', active: true },
            { label: '拍小视频', active: false },
            { label: '拍照', active: false },
          ].map(t => (
            <div key={t.label} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: 12, color: t.active ? '#fff' : 'rgba(255,255,255,0.45)', fontWeight: t.active ? 500 : 400 }}>{t.label}</div>
              {t.active && (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff', margin: '5px auto 0' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
