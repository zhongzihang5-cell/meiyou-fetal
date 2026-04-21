import { CardFoot, PhotoRecordImageBlock } from './FetalPhotoCardParts.jsx'
import { getPhotoCardBodyText } from '../lib/fetalPhotoCard.js'

/**
 * 胎宝宝时间轴「大肚照 / 产检报告」卡片；详情页可设 embedded 去掉外边距、不设 onBlankClick。
 */
export function FetalTimelinePhotoCard({ entry, onTagClick, onBlankClick, embedded }) {
  const isBelly = entry.subtype === 'belly'
  const tag = isBelly ? '大肚照' : '产检报告'
  const tagColor = isBelly ? '#508040' : '#308878'
  const tagBg = isBelly ? '#E8F4E0' : '#E0F4F0'
  const bodyText = getPhotoCardBodyText(entry)
  const hasNote = Boolean(bodyText)
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        border: '0.5px solid #EBEBEB',
        overflow: 'hidden',
        marginBottom: embedded ? 0 : 12,
      }}
    >
      <PhotoRecordImageBlock entry={entry} />
      {onBlankClick ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => onBlankClick()}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onBlankClick()
            }
          }}
          style={{
            cursor: 'pointer',
            outline: 'none',
            background: '#fff',
            minHeight: hasNote ? undefined : 48,
          }}
        >
          {hasNote && (
            <div style={{ padding: '10px 14px 0', fontSize: 13, fontWeight: 500, color: '#1A1A1A', lineHeight: 1.5 }}>{bodyText}</div>
          )}
        </div>
      ) : (
        <>
          {hasNote && (
            <div style={{ padding: '10px 14px 0', fontSize: 13, fontWeight: 500, color: '#1A1A1A', lineHeight: 1.5 }}>{bodyText}</div>
          )}
        </>
      )}
      <CardFoot tag={tag} tagColor={tagColor} tagBg={tagBg} entry={entry} onTagClick={onTagClick} />
    </div>
  )
}
