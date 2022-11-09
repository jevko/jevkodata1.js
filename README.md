NOTE: this is a sketch

# jevkodata1.js

Codename Jevko Data 1.

A Jevko format for data that encodes this:

```js
Map {
  "first name" => "John",
  "last name" => "Smith",
  "is alive" => true,
  "age" => 27,
  "address" => Map {
      "street address" => "21 2nd Street",
      "city" => "New York",
      "state" => "NY",
      "postal code" => "10021-3100"
    },
  "phone numbers" => [ 
    Map { "type" => "home", "number" => "212 555-1234" },
    Map { "type" => "office", "number" => "646 555-4567" }
  ],
  "children" => [],
  "spouse" => null
}
```

as this:

```
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
```

i.e. prefixes determine the type of a value.

An empty prefix means that the type is inferred according to whether a jevko is trivial (then it's interpreted as a string) or not (then it is interpreted as a list).

Built-in types are:

* list
* map
* string
* number
* boolean
* null

It's possible to extend that by providing custom converters to `convert`.

The built-in types cannot be overwritten.

# usage

(todo)

```js
const str = `[first name] [John]
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
[spouse] null []`
const jevko = parseJevko(str)
convert(jevko, {top: 'map'})
```