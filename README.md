# twitter-rss-noauth

> retrieves a Twitter timeline and outputs an RSS feed -- without Twitter API
> authentication!


## background

Like [rss-twitter](https://www.npmjs.com/package/rss-twitter), but without using
the restrictive Twitter API! Huzzah for open access without authentication!


## installation

```sh
$ npm i twitter-rss-noauth
```

## usage

```js
var twitterRss = require('twitter-rss-noauth')

twitterRss('noffle', function (err, feed) {
  // output an RSS 2.0 feed to stdout
  console.log(feed)
})
```


## api

```js
var twitterRss = require('twitter-rss-noauth')
```

### twitterRss(username, cb(err, feed))

Specify a `username` of the timeline you want. The callback `cb` will contain an
optional error as its first parameter, and a string containing the RSS feed as
its second parameter.


## license

MIT

