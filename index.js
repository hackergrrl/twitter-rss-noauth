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

      tweets.forEach(function (item) {
        feed.addItem({
          title: item.content,
          link: item.url,
          content: item.content,
          date: item.date
        })
      })

      cb(null, feed.render(rssFormat))
    }
  })
}

