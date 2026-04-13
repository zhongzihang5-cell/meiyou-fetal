import { buildWeekDotStates, getRemainWeeksToMeet } from '../data/pregnancyProgress.js'

const DOT = 9
const GAP = 5
const COLS = 20
/** 每行 20 点，两行排完 40 周；宽度 = 20×点径 + 19×gap */
const DOTS_ROW_WIDTH = COLS * DOT + (COLS - 1) * GAP

const dotStyle = {
  recorded: {
    width: DOT,
    height: DOT,
    borderRadius: '50%',
    flexShrink: 0,
    boxSizing: 'border-box',
    background: '#E07099',
  },
  empty: {
    width: DOT,
    height: DOT,
    borderRadius: '50%',
    flexShrink: 0,
    boxSizing: 'border-box',
    border: '1.5px solid #DDC0C8',
    background: 'transparent',
  },
  current: {
    width: DOT,
    height: DOT,
    borderRadius: '50%',
    flexShrink: 0,
    boxSizing: 'border-box',
    background: '#D64D7A',
    boxShadow: '0 0 0 2px #fff, 0 0 0 3.5px #D64D7A',
  },
  future: {
    width: DOT,
    height: DOT,
    borderRadius: '50%',
    flexShrink: 0,
    boxSizing: 'border-box',
    border: '1px dashed #DDC0C8',
    background: 'transparent',
  },
}

/**
 * @param {{ currentWeek: number, recordedWeeks: number[] }} data 接口数据
 */
export default function PregnancyWeekDotsCard({ data }) {
  const { currentWeek, recordedWeeks } = data
  const remainWeeks = getRemainWeeksToMeet(currentWeek)
  const recordedCount = recordedWeeks.length
  const states = buildWeekDotStates(currentWeek, recordedWeeks)

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #FFB3C8 0%, #E87090 48%, #D84A78 100%)',
        margin: '10px 12px',
        borderRadius: 18,
        padding: '14px 16px',
        color: '#fff',
        boxShadow: '0 8px 24px rgba(232, 96, 138, 0.25)',
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 5, lineHeight: 1.35 }}>
        <span style={{ color: '#fff' }}>第 {currentWeek} 周</span>
        <span style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}> · 还有 {remainWeeks} 周见面</span>
      </div>
      <div style={{ fontSize: 11, opacity: 0.9, marginBottom: 10, lineHeight: 1.45, fontWeight: 500 }}>
        记录了 {recordedCount} 周，继续留下足迹吧
      </div>
      <div
        style={{
          background: 'rgba(255,255,255,0.94)',
          borderRadius: 14,
          padding: '12px 10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: GAP,
            width: DOTS_ROW_WIDTH,
            maxWidth: '100%',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
          }}
        >
          {states.map((state, i) => (
            <div key={i} style={dotStyle[state]} title={`第 ${i + 1} 周`} />
          ))}
        </div>
      </div>
    </div>
  )
}
