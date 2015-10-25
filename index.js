var request = require('request')
var xpath = require('xpath')
var dom = require('xmldom').DOMParser
var Feed = require('feed')

module.exports = function (username, cb, rssFormat) {

  rssFormat = rssFormat || 'rss-2.0'

  var url = 'https://twitter.com/' + username

  request(url, function (err, res, body) {
    if (err) {
      cb(err)
    } else {
      var feed = new Feed({
        title: 'Twitter RSS',
        description: 'A generated feed of the tweets from ' + username,
        link: url,
        image: '???',

        author: {
          name: '???',
          email: '',
          link: url
        }
      })

      var doc = new dom({errorHandler: function() {}}).parseFromString(body)

      var tweets = xpath.select('//li[contains(@class, \'js-stream-item\')]', doc)

      tweets.forEach(function (n) {
        var tweet = xpath.select('./div[contains(@class, \'tweet\')]/div[contains(@class, \'content\')]', n)[0]
        if (!tweet) {
          // bad tweet?
          return
        }
        var header = xpath.select('./div[contains(@class, \'stream-item-header\')]', tweet)[0]
        var item = {
          username: '@' + xpath.select('./a/span[contains(@class, \'username\')]/b/text()', header)[0].data,
          body: xpath.select('./p[contains(@class, \'tweet-text\')]/text()', tweet)[0].data,
          fullname: xpath.select('./a/strong[contains(@class, "fullname")]/text()', header)[0].data,
          avatar: xpath.select('./a/img[contains(@class, "avatar")]/@src', header)[0].value,
          url: 'https://twitter.com' + xpath.select('./small[contains(@class, "time")]/a[contains(@class, "tweet-timestamp")]/@href', header)[0].value,
          timestamp: xpath.select('./small[contains(@class, "time")]/a[contains(@class, "tweet-timestamp")]/span/@data-time', header)[0].value
        }

        var date = new Date(1970, 0, 1)
        date.setSeconds(item.timestamp)
        item.timestamp = date.toISOString()

        feed.addItem({
          title: item.body,
          link: item.url,
          content: item.body,
          date: date
        })
      })

      cb(null, feed.render(rssFormat))
    }
  })
}

