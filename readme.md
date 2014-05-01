# TempoDB

There are two entities. Series and datapoints. 

## Series

Key must be unique. Tags and attributes are indexed for filtering. 

```
{
  id: 'used-internally',
  key: 'your-unique-key',
  name: 'Human Name',
  tags: [ 'filters', 'here' ],
  attributes: { key: 'value' }
}
```

#### POST /series

```
{ key: 'unique-key' }
```

#### PUT /series/key/:key

```
{
  name: 'Series Name',
  tags: [ 'new', 'tags' ],
  attributes: { a: 'a', b: 'b' }
}
```

#### GET /series/key/:key
#### GET /series

```
key=some-key
tag=x & tag=y
attr[x]=1 & attr[x]=2
```

#### DELETE /series

Allow truncation is mutually exclusive with other params.

```
key=some-key
tag=x & tag=y
attr[x]=1 & attr[x]=2
allow_truncation=true
```

## Datapoints

T is an iso-format string. V is a float. Datapoints belong to a series. 

```
{
  t: '2014-01-03T14:23:33.000-0500',
  v: 234.928374
}
```

#### POST /series/key/:key/data

```
[
  { t: '2012-01-08T00:21:54.000+0000', v: 3.121 },
  { t: '2012-01-08T00:21:55.000+0000', v: 3.629 }
]
```

#### POST /multi

```
[
  { key: 'unique-key', t: '2012-01-08T00:21:54.000+0000', v: 3.121 },
  { key: 'other-key', t: '2012-01-08T00:21:55.000+0000', v: 3.629 }
]
```

#### GET /series/key/:key/single

```
ts=2012-01-08T00:21:54.000+0000
direction=exact  (before, after, nearest)
```

#### GET /series/key/:key/segment

Start and end are requried.

```
start=2012-01-08T00:21:54.000+0000
end=2012-01-09T00:21:54.000+0000

rollup.fold=sum  (min, max, avg)
rollup.period=1min  (6min, 1hour, 2day, PT5M, PT6H)

interpolation.function=linear  (zoh)
interpolation.period=1min  (6min, 1hour, 2day, PT5M, PT6H)

tz=America/Montreal
limit=5000  (10000)
```

#### GET /series/key/:key/data/rollups/segment

Same as GET /series/key/:key/segment, except multiple rollup.fold are possible. Returns multipoints, for example with min and max.

```
{ t: '2012-01-08T00:21:54.000+0000', v: { max: 23.4, min: 42.7 } }
```

#### GET /segment

Here's where it gets interesting. 2D rollups. The key is aggregation.fold. 

```
start=2012-01-08T00:21:54.000+0000
end=2012-01-09T00:21:54.000+0000

key=some-key
tag=x & tag=y
attr[x]=1 & attr[x]=2

aggregation.fold=sum  (min, max, avg)

rollup.fold=sum  (min, max, avg)
rollup.period=1min  (6min, 1hour, 2day, PT5M, PT6H)

interpolation.function=linear  (zoh)
interpolation.period=1min  (6min, 1hour, 2day, PT5M, PT6H)

tz=America/Montreal
limit=5000  (10000)
```

#### GET /series/key/:key/summary

Basically all rollups. 

```
start=2012-01-08T00:21:54.000+0000
end=2012-01-09T00:21:54.000+0000
tz=America/Montreal
```
