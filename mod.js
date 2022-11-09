import {stringToNumber} from 'https://cdn.jsdelivr.net/gh/djedr/stringToNumber@v0.1.0/mod.js'

export const convert = (jevko, {
  uctx = new Map(),
  top = '',
} = {}) => ctx.get(top)(prep(jevko), uctx)

const prep = jevko => {
  const {subjevkos, suffix} = jevko

  const subs = []
  for (const {prefix, jevko} of subjevkos) {
    const trimmed = prefix.trim()
    if (trimmed === '--') continue
    subs.push({prefix: trimmed, jevko: prep(jevko)})
  }
  return {subjevkos: subs, suffix}
}

const infer = (jevko, uctx) => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length === 0) return suffix
  return list(jevko, uctx)
}

const subToVal = ({prefix, jevko}, uctx) => {
  const op = ctx.get(prefix) ?? uctx.get(prefix)
  if (op === undefined) {
    console.error(`|${prefix}|`, op)
    throw Error('oops')
  }
  return op(jevko, uctx)
}

const list = (jevko, uctx) => {
  const {subjevkos, suffix} = jevko
  if (suffix.trim() !== '') throw Error('oops')
  return subjevkos.map(s => subToVal(s, uctx))
}

const string = (jevko) => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length === 0) return suffix
  throw Error('oops')
}

const number = jevko => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length === 0) return stringToNumber(suffix)
  throw Error('oops')
}

const boolean = jevko => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length !== 0) throw Error('oops')
  const trimmed = suffix.trim()

  if (trimmed === 'true') return true
  else if (trimmed === 'false') return false

  throw Error('oops')
}

const nil = jevko => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length !== 0) throw Error('oops')
  const trimmed = suffix.trim()

  if (trimmed !== '') throw Error('oops')
  
  return null
}

const map = (jevko, uctx) => {
  const {subjevkos, suffix} = jevko
  if (suffix.trim() !== '') throw Error('oops')
  const {length} = subjevkos
  if (length % 2 !== 0) throw Error('oops')
  const ret = new Map()
  for (let i = 0; i < length; i += 2) {
    const ks = subjevkos[i]
    const vs = subjevkos[i + 1]
    const k = subToVal(ks, uctx)
    if (ret.has(k)) throw Error('duplicate')
    ret.set(k, subToVal(vs, uctx))
  }
  return ret
}


const ctx = new Map([
  ['', infer],
  ['list', list],
  ['map', map],
  ['string', string],
  ['number', number],
  ['boolean', boolean],
  ['null', nil],
])