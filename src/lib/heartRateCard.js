/** 胎心率卡片：正常（玫瑰粉）/ 异常（通用橙）主题与波形点 */

export function getHeartRateTheme(abnormal) {
  if (abnormal) {
    return {
      border: '#F5C4B3',
      headline: '#C85030',
      blockBg: '#FDF1EE',
      wave: '#E8845A',
      label: '#C07060',
      value: '#B090A0',
      bpmLarge: '#C85030',
      footTag: '#C07060',
      footBg: '#FDF1EE',
      footBorder: '#F5C4B3',
      warnText: '#C07060',
      heartIcon: '#E8845A',
    }
  }
  return {
    border: '#F4D0DA',
    headline: '#C0526E',
    blockBg: '#FDF4F6',
    wave: '#E295A8',
    label: '#C0A8B4',
    value: '#B090A0',
    bpmLarge: '#C0526E',
    footTag: '#A06878',
    footBg: '#FEF0F3',
    footBorder: '#F4D0DA',
    warnText: '#C07060',
    heartIcon: '#E295A8',
  }
}

/**
 * 仅用心跳数据点数组渲染折线；无数据或点数不足时返回 null（不画曲线区）。
 * 支持 number[]（0–1 或原始 bpm）、或 { y } / { value } 对象数组。
 */
export function buildHeartCurvePolylinePoints(curve, w, h) {
  if (!Array.isArray(curve) || curve.length < 2) return null
  const nums = curve
    .map(v => {
      if (typeof v === 'number' && Number.isFinite(v)) return v
      if (v && typeof v === 'object') {
        const y = v.y ?? v.value ?? v.bpm
        return Number.isFinite(Number(y)) ? Number(y) : NaN
      }
      return NaN
    })
    .filter(Number.isFinite)
  if (nums.length < 2) return null

  let normVals = nums
  const maxV = Math.max(...nums)
  const minV = Math.min(...nums)
  if (maxV > 1.5 || minV < -0.5) {
    const span = maxV - minV || 1
    normVals = nums.map(v => (v - minV) / span)
  } else {
    normVals = nums.map(v => Math.min(1, Math.max(0, v)))
  }

  return normVals
    .map((t, i) => {
      const x = (i / (normVals.length - 1)) * w
      const y = h * (0.82 - t * 0.64)
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

/** 与截图一致：MM-DD HH:mm，如 06-16 10:14 */
export function formatHeartMeasurementDateTime(entry) {
  const dateStr = entry?.date
  const timeStr = (entry?.time && String(entry.time).trim()) || ''
  if (!dateStr) return timeStr || '—'
  const d = new Date(`${dateStr}T12:00:00`)
  if (Number.isNaN(d.getTime())) return timeStr || '—'
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return timeStr ? `${mm}-${dd} ${timeStr}` : `${mm}-${dd}`
}

export function formatHeartDuration(data) {
  if (data?.duration_minutes != null && Number.isFinite(Number(data.duration_minutes))) {
    const m = Math.floor(Number(data.duration_minutes))
    const s = data.duration_seconds != null && Number.isFinite(Number(data.duration_seconds))
      ? Math.round(Number(data.duration_seconds)) % 60
      : null
    if (s != null && s > 0) return `${m}分${s}秒`
    return `${m}分钟`
  }
  if (data?.duration_seconds != null && Number.isFinite(Number(data.duration_seconds))) {
    const sec = Math.round(Number(data.duration_seconds))
    if (sec < 60) return `${sec}秒`
    return `${Math.floor(sec / 60)}分${sec % 60}秒`
  }
  return '—'
}
