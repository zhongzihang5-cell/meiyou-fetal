/** 数胎动藕紫主题 + 时间轴圆点（按条目类型） */

export const FETAL_MOVEMENT_THEME = {
  dot: '#A68BB5',
  border: '#DDD0E8',
  blockBg: '#F7F2FB',
  primary: '#7A5490',
  titleSecondLine: '#C8B8D8',
  secondary: '#9E8AAE',
  assist: '#9E8AAE',
  divider: '#E4DCEF',
  footTag: '#7A5490',
  footBg: '#F3EEF8',
  footBorder: '#DDD0E8',
  footprint: '#A68BB5',
  /** 12 小时汇总条：极浅紫底（约 5%），作表格收尾而非独立强调块 */
  summaryPillBg: 'rgba(122, 84, 144, 0.05)',
  summaryLabelMuted: '#888888',
  summaryNumberStrong: '#7A5490',
}

/** 测胎心玫瑰粉 / 数胎动藕紫 / 胎儿估重莫兰迪绿；其余默认玫瑰粉圆点 */
export function getTimelineDotColor(entry) {
  if (!entry) return '#E295A8'
  if (entry.subtype === 'heart_rate') {
    return entry.data?.abnormal === true ? '#E8845A' : '#E295A8'
  }
  if (entry.subtype === 'fetal_movement') return '#A68BB5'
  if (entry.subtype === 'weight_estimate') return '#7AAE9A'
  return '#E295A8'
}
