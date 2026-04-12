export const MILESTONES = {
  1:  { title: '记录第一次发现宝宝存在', sub: '验孕棒、早早孕试纸，留下这珍贵的一刻', emoji: '🌱' },
  8:  { title: '第一次听到心跳', sub: '拍下 B 超单，留住这个珍贵瞬间', emoji: '💓' },
  12: { title: 'NT 检查', sub: '留下第一张正式的 B 超照', emoji: '📋' },
  16: { title: '第一次感受到胎动', sub: '记录下来，这一刻无比珍贵', emoji: '🤲' },
  22: { title: '四维彩超', sub: '看看宝宝长什么样', emoji: '🔬' },
  28: { title: '孕 28 周，拍一张大肚照吧', sub: '进入孕晚期，留下最美的孕肚时光', emoji: '📸' },
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
  // ── 第 28 周：分散在两天 ──
  {
    id: 'e-001',
    type: 'data',
    subtype: 'weight_estimate',
    date: daysAgo(12),   // 4月1日
    week: 28, day: 0,
    title: '胎儿估重',
    data: { weight: 1120, head: 248, belly: 220, femur: 42 },
    note: '产检一切正常，医生说发育很好',
    author: '妈妈',
    time: '13:33',
  },
  {
    id: 'e-002',
    type: 'photo',
    subtype: 'ultrasound',
    date: daysAgo(12),   // 4月1日
    week: 28, day: 0,
    title: 'B 超单',
    note: '孕 28 周产检，看到小家伙在动',
    author: '妈妈',
    color: '#C8D8E8',
    time: '15:20',
  },
  {
    id: 'e-008',
    type: 'photo',
    subtype: 'belly',
    date: daysAgo(11),   // 4月2日
    week: 28, day: 1,
    title: '大肚照',
    note: '28 周了，肚子超级圆 🌕',
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
    title: '胎动记录',
    data: { count: 12, duration: 60, session: '晚' },
    author: '妈妈',
    time: '21:10',
  },
  {
    id: 'e-004',
    type: 'data',
    subtype: 'heart_rate',
    date: daysAgo(21),
    week: 27, day: 1,
    title: '胎心记录',
    data: { bpm: 152 },
    note: '宝宝心跳很有力',
    author: '妈妈',
    time: '09:30',
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
    week: 8, day: 0,
    title: '第一次听到心跳',
    note: '168次/分钟，好快！眼泪都出来了',
    author: '妈妈',
    time: '10:05',
  },
  {
    id: 'e-007',
    type: 'milestone',
    subtype: 'found',
    date: daysAgo(189),
    week: 1, day: 0,
    title: '发现宝宝存在',
    note: '两条线，手都在抖！',
    author: '妈妈',
    isPrivate: true,
    time: '08:12',
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

export const CURRENT_WEEK = 28
export const CURRENT_DAY = 3
export const DAYS_UNTIL_DUE = 83
