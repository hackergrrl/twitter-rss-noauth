var latest = require('latest-tweets')
var Feed = require('feed')

module.exports = function (username, cb, rssFormat) {

  rssFormat = rssFormat || 'rss-2.0'

  var url = 'https://twitter.com/' + username

  latest(username, function (err, tweets) {
    if (err) {
      cb(err)
    } else {
      var feed = new Feed({
        title: username + ' Twitter feed',
        description: 'A generated feed of the tweets from ' + username,
        link: url,

        author: {
          name: '???',
          email: '',
          link: url
        }
      })

      tweets.forEach(function (item) {
        if (!item.content) {
          return
        }
        var title = item.content
        if (item.retweet) {
          title = '[RT ' + item.username + '] ' + title
        }
        feed.addItem({
          title: title,
          link: item.url,
          content: item.content,
          date: item.date
        })
      })

      cb(null, feed.render(rssFormat))
    }
  })
}

