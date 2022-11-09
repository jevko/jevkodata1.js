import {parseJevko} from "https://cdn.jsdelivr.net/gh/jevko/parsejevko.js@v0.1.6/mod.js"
import {convert} from './mod.js'

const ret = convert(parseJevko(`
[first name] [John]
[last name] [Smith]
[is alive] boolean [true]
[age] number [27]
[address] map [
  [street address] [21 2nd Street]
  [city] [New York]
  [state] [NY]
  [postal code] [10021-3100]
]
[phone numbers] [
  map [
    [type] [home]
    [number] [212 555-1234]
  ]
  map [
    [type] [office]
    [number] [646 555-4567]
  ]
]
[children] list []
[spouse] null []
[fred] fred []
`), {
  uctx: new Map([['fred', jevko => 'FRED']]),
  top: 'map',
})

console.log(ret)
console.log(ret.get("phone numbers"))