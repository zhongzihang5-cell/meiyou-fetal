/** 展示孕周+天数，如 孕29周1天；缺省或非正整数时按第 1 天展示 */
export function formatPregnancyWeekDay(week, day) {
  let d = Number(day)
  if (!Number.isFinite(d) || d < 1) d = 1
  return `孕${week}周${d}天`
}

const MOVEMENT_CLICK_DEFAULTS = [10, 22, 30]

/**
 * 数胎动卡片：从后端字段 valid_count / total_count / duration_minutes 推导展示数据；
 * 兼容旧字段 count、actualClicks、duration、twelveHourTotal。
 */
export function deriveFetalMovementMetrics(data, entry) {
  const raw =
    Array.isArray(data?.sessions) && data.sessions.length > 0
      ? data.sessions
      : [
          {
            time: entry?.time || '--:--',
            count: data?.count,
            valid_count: data?.valid_count,
            total_count: data?.total_count,
            duration_minutes: data?.duration_minutes,
          },
        ]

  const defaultMin = Number(data?.duration ?? data?.default_session_minutes ?? 60)
  const defaultMinSafe = Number.isFinite(defaultMin) && defaultMin > 0 ? defaultMin : 60

  const rows = raw.map((row, i) => {
    let valid = row.valid_count != null ? Number(row.valid_count) : NaN
    if (!Number.isFinite(valid) && row.count != null) valid = Number(row.count)
    const validFinal = Number.isFinite(valid) ? valid : NaN

    let clicks = row.total_count != null ? Number(row.total_count) : NaN
    if (!Number.isFinite(clicks) && row.actualClicks != null) clicks = Number(row.actualClicks)
    if (!Number.isFinite(clicks)) clicks = MOVEMENT_CLICK_DEFAULTS[i % MOVEMENT_CLICK_DEFAULTS.length]

    let durationMin = row.duration_minutes != null ? Number(row.duration_minutes) : NaN
    if (!Number.isFinite(durationMin)) durationMin = defaultMinSafe

    return {
      time: row.time || '--:--',
      valid: validFinal,
      clicks,
      durationMin,
    }
  })

  let totalValid = data?.twelveHourTotal != null ? Number(data.twelveHourTotal) : NaN
  if (!Number.isFinite(totalValid)) {
    totalValid = rows.reduce((s, r) => s + (Number.isFinite(r.valid) ? r.valid : 0), 0)
  }

  const totalMinutes = rows.reduce((s, r) => s + r.durationMin, 0)
  /** 卡片顶部文案「N分钟」：当天会话次数 × 60 */
  const headlineMinutes = rows.length * 60

  return { rows, totalValid, totalMinutes, headlineMinutes }
}

export const MILESTONES = {
  1:  { title: '记录第一次发现宝宝存在', sub: '验孕棒、早早孕试纸，留下这珍贵的一刻', emoji: '🌱' },
  8:  { title: '第一次听到心跳', sub: '拍下产检报告，留住这个珍贵瞬间', emoji: '💓' },
  12: { title: 'NT 检查', sub: '留下第一张正式的产检影像', emoji: '📋' },
  16: { title: '第一次感受到胎动', sub: '记录下来，这一刻无比珍贵', emoji: '🤲' },
  22: { title: '四维彩超', sub: '看看宝宝长什么样', emoji: '🔬' },
  28: { title: '孕 28 周，拍一张大肚照吧', sub: '进入孕晚期，留下最美的孕肚时光', emoji: '📸' },
  29: { title: '孕 29 周，拍一张大肚照吧', sub: '进入孕晚期，留下最美的孕肚时光', emoji: '📸' },
  30: { title: '孕 30 周，拍一张大肚照吧', sub: '进入孕晚期，留下最美的孕肚时光', emoji: '📸' },
  36: { title: '待产倒计时', sub: '记录最后的孕肚时光，宝宝快来了', emoji: '⏰' },
}

const TODAY = new Date().toISOString().split('T')[0]

// Helper to get a past date string
function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

export const INITIAL_TIMELINE = [
  // ── 第 29 周：分散在两天 ──
  {
    id: 'e-001',
    type: 'data',
    subtype: 'weight_estimate',
    date: '2026-03-27',
    week: 29, day: 1,
    title: '胎儿估重',
    data: { weight: 1120, percentile: 52, bpd: 72, head: 248, belly: 220, femur: 42 },
    author: '妈妈',
    time: '09:30',
  },
  {
    id: 'e-002',
    type: 'photo',
    subtype: 'ultrasound',
    date: daysAgo(12),   // 4月1日
    week: 29, day: 1,
    title: '产检报告',
    author: '妈妈',
    color: '#C8D8E8',
    time: '15:20',
  },
  {
    id: 'e-008',
    type: 'photo',
    subtype: 'belly',
    date: daysAgo(11),   // 4月2日
    week: 29, day: 2,
    title: '大肚照',
    note: '29 周了，肚子超级圆 🌕',
    author: '妈妈',
    color: '#E8D4C8',
    time: '10:05',
  },
  // ── 第 27 周 ──
  {
    id: 'e-003',
    type: 'data',
    subtype: 'fetal_movement',
    date: daysAgo(18),
    week: 27, day: 4,
    title: '数胎动',
    data: {
      sessions: [
        { time: '08:12', valid_count: 8, total_count: 22, duration_minutes: 60 },
        { time: '12:34', valid_count: 11, total_count: 23, duration_minutes: 60 },
        { time: '22:34', valid_count: 12, total_count: 23, duration_minutes: 60 },
      ],
      count: 12,
      duration: 60,
      session: '晚',
    },
    author: '妈妈',
    time: '21:10',
  },
  {
    id: 'e-004',
    type: 'data',
    subtype: 'heart_rate',
    date: daysAgo(21),
    week: 27, day: 1,
    title: '测胎心',
    data: {
      bpm: 142,
      abnormal: false,
      duration_minutes: 1,
      duration_seconds: 18,
      heart_curve: [
        0.52, 0.48, 0.54, 0.5, 0.56, 0.51, 0.58, 0.53, 0.55, 0.5, 0.57, 0.52, 0.59, 0.49, 0.54, 0.51,
        0.56, 0.48, 0.53, 0.55, 0.5, 0.58, 0.52, 0.57, 0.5, 0.54, 0.49, 0.56, 0.53, 0.6, 0.51, 0.55,
        0.48, 0.53, 0.52, 0.56, 0.5, 0.54, 0.51, 0.57,
      ],
    },
    author: '妈妈',
    time: '09:30',
  },
  {
    id: 'e-004b',
    type: 'data',
    subtype: 'heart_rate',
    date: daysAgo(9),
    week: 28, day: 2,
    title: '测胎心',
    data: { bpm: 89, abnormal: true, duration_minutes: 1, duration_seconds: 28 },
    author: '妈妈',
    time: '14:20',
  },
  // ── 第 26 周 ──
  {
    id: 'e-005',
    type: 'photo',
    subtype: 'belly',
    date: daysAgo(28),
    week: 26, day: 3,
    title: '大肚照',
    note: '26 周，肚子越来越圆了 🌙',
    author: '妈妈',
    color: '#E8D4C8',
    time: '18:40',
  },
  // ── 里程碑 ──
  {
    id: 'e-006',
    type: 'milestone',
    subtype: 'heartbeat',
    date: daysAgo(140),
    week: 8, day: 1,
    title: '第一次听到心跳',
    note: '168次/分钟，好快！眼泪都出来了',
    author: '妈妈',
    time: '10:05',
    color: '#D8C4D4',
  },
  {
    id: 'e-007',
    type: 'milestone',
    subtype: 'found',
    date: '2025-10-06',
    week: 1, day: 1,
    title: '发现宝宝存在',
    note: '两条线，手都在抖！',
    author: '妈妈',
    time: '08:12',
    color: '#DDC8D8',
  },
]

// 柚柚（已出生宝宝）的时间轴数据
export const BABY_TIMELINE_AFTER = [
  {
    id: 'b-001',
    type: 'photo',
    subtype: 'daily',
    date: new Date().toISOString().split('T')[0],
    ageLabel: '2 岁 6 天',
    title: '在公园玩耍',
    note: '第一次自己爬上滑梯！',
    author: '妈妈',
    color: '#B8D8D0',
    isToday: true,
  },
  {
    id: 'b-002',
    type: 'milestone',
    subtype: 'firstStep',
    date: '2025-05-26',
    ageLabel: '1 岁 1 个月 23 天',
    title: '第一次独立走路',
    note: '摇摇晃晃走了 3 步，太激动了',
    author: '妈妈',
    emoji: '👣',
    color: '#D4C8E8',
  },
  {
    id: 'b-003',
    type: 'photo',
    subtype: 'daily',
    date: '2025-05-10',
    ageLabel: '1 岁 1 个月 7 天',
    title: '在海边玩耍',
    note: '第一次看海，兴奋得不得了',
    author: '妈妈',
    color: '#B8D0E8',
  },
]

export const BIRTH_INFO = {
  date: '2024-04-09',
  name: '柚柚',
  height: 50,
  weight: 3.2,
  head: 34,
  zodiac: '白羊座',
  lunar: '农历 二月廿二',
}

export const CURRENT_WEEK = 30
export const CURRENT_DAY = 1
export const DAYS_UNTIL_DUE = 69
