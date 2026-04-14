/** 胎儿估重卡片：莫兰迪绿主题与字段解析 */

export function getWeightEstimateTheme() {
  return {
    border: '#C0D8CE',
    blockBg: '#F2F8F5',
    numStrong: '#4A8270',
    unitMm: '#7A9E92',
    label: '#7A9E92',
    pctSub: '#B0CCBF',
    footTag: '#4A8270',
    footBg: '#EEF6F2',
    footBorder: '#C0D8CE',
    footprint: '#7AAE9A',
    divider: '#D0E5DC',
    headline: '#4A8270',
  }
}

const METRICS = [
  { key: 'bpd', legacy: null, label: '双顶径 BPD' },
  { key: 'hc', legacy: 'head', label: '头围 HC' },
  { key: 'ac', legacy: 'belly', label: '腹围 AC' },
  { key: 'fl', legacy: 'femur', label: '股骨长 FL' },
]

export function getWeightMetricValue(data, spec) {
  if (!data) return null
  const raw = data[spec.key] ?? (spec.legacy != null ? data[spec.legacy] : undefined)
  if (raw == null || raw === '') return null
  const n = Number(raw)
  return Number.isFinite(n) ? n : null
}

export function getWeightMetricsDisplay(data) {
  return METRICS.map(spec => ({
    ...spec,
    value: getWeightMetricValue(data, spec),
  }))
}
