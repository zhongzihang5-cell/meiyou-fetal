import { useState } from 'react'
import PhotoGalleryPicker from './PhotoGalleryPicker.jsx'

const UPLOAD_TYPES = [
  {
    id: 'belly',
    label: '大肚照',
    sub: '记录孕肚变化',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="16" rx="3" fill="#E8608A" opacity="0.7"/>
        <circle cx="12" cy="13" r="4" fill="#fff"/>
        <circle cx="12" cy="13" r="2" fill="#E8608A"/>
        <rect x="8" y="3" width="3" height="3" rx="1.5" fill="#E8608A"/>
        <rect x="13" y="3" width="3" height="3" rx="1.5" fill="#E8608A"/>
      </svg>
    ),
    bg: '#FBEAF0',
    color: '#FBEAF0',
  },
  {
    id: 'ultrasound',
    label: 'B 超单',
    sub: '上传产检照片',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#3A8DDD" opacity="0.7"/>
        <path d="M6 14 L9 10 L12 13 L15 8 L18 12" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bg: '#E8F2FC',
  },
  {
    id: 'weight_estimate',
    label: '胎儿估重',
    sub: '录入产检数据',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="10" width="16" height="11" rx="3" fill="#E8608A" opacity="0.6"/>
        <ellipse cx="12" cy="10" rx="7" ry="5" fill="#E8608A" opacity="0.9"/>
        <text x="12" y="17" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">g</text>
      </svg>
    ),
    bg: '#FBEAF0',
  },
  {
    id: 'fetal_movement',
    label: '胎动记录',
    sub: '数胎动结果',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 4 Q17 8 17 12 Q17 18 12 21 Q7 18 7 12 Q7 8 12 4Z" fill="#1BA97A" opacity="0.8"/>
        <circle cx="12" cy="12" r="3" fill="#fff"/>
        <circle cx="12" cy="12" r="1.5" fill="#1BA97A"/>
      </svg>
    ),
    bg: '#E2F5EE',
  },
]

export default function UploadModal({ onClose, onSubmit }) {
  const [selected, setSelected] = useState(null)
  const [step, setStep] = useState('gallery') // 'gallery' | 'choose' | 'form'
  const [form, setForm] = useState({})
  const [note, setNote] = useState('')

  function handleNext() {
    if (!selected) return
    setStep('form')
  }

  function handleSubmit() {
    const type = UPLOAD_TYPES.find(t => t.id === selected)
    onSubmit({
      id: 'entry-' + Date.now(),
      type: selected === 'belly' || selected === 'ultrasound' ? 'photo' : 'data',
      subtype: selected,
      date: new Date().toISOString().split('T')[0],
      week: 30,
      day: 1,
      title: type.label,
      note,
      data: form,
      author: '妈妈',
      color: selected === 'belly' ? '#E8C8B8' : selected === 'ultrasound' ? '#C8D8E8' : null,
      isNew: true,
    })
    onClose()
  }

  if (step === 'gallery') {
    return <PhotoGalleryPicker onClose={onClose} onContinue={() => setStep('choose')} />
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />

        {step === 'choose' && (
          <>
            <div className="modal-title">记录什么？</div>
            <div className="modal-options">
              {UPLOAD_TYPES.map(t => (
                <div
                  key={t.id}
                  className={`modal-option ${selected === t.id ? 'selected' : ''}`}
                  onClick={() => setSelected(t.id)}
                >
                  <div className="modal-option-icon" style={{ background: t.bg }}>
                    {t.icon}
                  </div>
                  <div className="modal-option-label">{t.label}</div>
                  <div className="modal-option-sub">{t.sub}</div>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={handleNext} disabled={!selected}
              style={{ opacity: selected ? 1 : 0.4 }}>
              下一步
            </button>
            <button className="btn-ghost" onClick={onClose}>取消</button>
          </>
        )}

        {step === 'form' && (
          <>
            <div className="modal-title">
              {UPLOAD_TYPES.find(t => t.id === selected)?.label}
            </div>

            {(selected === 'belly' || selected === 'ultrasound') && (
              <div style={{
                width: '100%', height: 160,
                background: selected === 'belly' ? '#F5E8E0' : '#E0ECF8',
                borderRadius: 14,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 8, marginBottom: 14, cursor: 'pointer',
                border: '1.5px dashed #DDD'
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="2" y="7" width="28" height="20" rx="4" stroke="#CCC" strokeWidth="1.5" fill="none"/>
                  <circle cx="16" cy="17" r="5" stroke="#CCC" strokeWidth="1.5" fill="none"/>
                  <path d="M11 7l2-3h6l2 3" stroke="#CCC" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: 13, color: '#CCC' }}>点击选择照片</span>
              </div>
            )}

            {selected === 'weight_estimate' && (
              <div style={{ marginBottom: 14 }}>
                {[
                  { key: 'weight', label: '体重', unit: 'g', placeholder: '如 1120' },
                  { key: 'head', label: '头围', unit: 'mm', placeholder: '如 248' },
                  { key: 'belly', label: '腹围', unit: 'mm', placeholder: '如 220' },
                  { key: 'femur', label: '股骨', unit: 'mm', placeholder: '如 42' },
                ].map(f => (
                  <div key={f.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ width: 48, fontSize: 14, color: '#666', flexShrink: 0 }}>{f.label}</span>
                    <input
                      type="number"
                      placeholder={f.placeholder}
                      value={form[f.key] || ''}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      style={{
                        flex: 1, height: 40, border: '1px solid #EEE',
                        borderRadius: 10, padding: '0 12px', fontSize: 15,
                        fontFamily: 'inherit', color: '#111',
                        outline: 'none',
                      }}
                    />
                    <span style={{ marginLeft: 8, fontSize: 13, color: '#999', width: 24 }}>{f.unit}</span>
                  </div>
                ))}
              </div>
            )}

            {selected === 'fetal_movement' && (
              <div style={{ marginBottom: 14 }}>
                {[
                  { key: 'count', label: '胎动次数', unit: '次', placeholder: '如 12' },
                  { key: 'duration', label: '计数时长', unit: '分钟', placeholder: '如 60' },
                ].map(f => (
                  <div key={f.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ width: 72, fontSize: 14, color: '#666', flexShrink: 0 }}>{f.label}</span>
                    <input
                      type="number"
                      placeholder={f.placeholder}
                      value={form[f.key] || ''}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      style={{
                        flex: 1, height: 40, border: '1px solid #EEE',
                        borderRadius: 10, padding: '0 12px', fontSize: 15,
                        fontFamily: 'inherit', color: '#111',
                        outline: 'none',
                      }}
                    />
                    <span style={{ marginLeft: 8, fontSize: 13, color: '#999', width: 36 }}>{f.unit}</span>
                  </div>
                ))}
              </div>
            )}

            <textarea
              placeholder="写点什么…（可选）"
              value={note}
              onChange={e => setNote(e.target.value)}
              style={{
                width: '100%', height: 80, border: '1px solid #EEE',
                borderRadius: 12, padding: '10px 12px', fontSize: 14,
                fontFamily: 'inherit', resize: 'none', color: '#111',
                outline: 'none', marginBottom: 14,
              }}
            />

            <button className="btn-primary" onClick={handleSubmit}>保存记录</button>
            <button className="btn-ghost" onClick={() => setStep('choose')}>← 返回</button>
          </>
        )}
      </div>
    </div>
  )
}
