function call_rest(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener('load', callback);
  xhttp.addEventListener('error', function() { console.log("Request to "+url+" failed") });
  xhttp.open("GET", url, true);
  xhttp.send();
}

function get_entries(feed, callback) {
  call_rest(feed.url, function() {
    callback(feed.parser(JSON.parse(this.responseText)));
  });
}

function get_link(href, text) {
  a = document.createElement("a");
  a.setAttribute("href", href);
  a.textContent = text;
  return a.outerHTML;
}

var parse_pocket = function(res) {
  var entries = [];
  res.query.results.rss.channel.item.forEach(function(entry) {
    entries.push({
      name: "pocket",
      date: new Date(entry.pubDate),
      html: "read "+get_link(entry.link, entry.title),
      url: "https://getpocket.com/@efang"
    });
  });
  return entries;
}

function get_repo_url(entry) {
  return 'https://github.com/' + entry.repo.name;
}

function get_repo_link(entry) {
  return get_link(get_repo_url(entry), entry.repo.name);
}

var parse_github = function(res) {
  var entries = [];
  res.forEach(function(entry) {
    var html = ""
    if (entry.type === 'CommitCommentEvent' ) {
      html = 'commented on ' + get_repo_link(entry);
    } else if (entry.type === 'CreateEvent' && entry.payload.ref_type === 'branch') {
      html = 'created branch ' + get_link(get_repo_url(entry)+'/tree/'+entry.payload.ref, entry.payload.ref) + ' at ' + get_repo_link(entry);
    } else if (entry.type === 'CreateEvent' && entry.payload.ref_type === 'repository') {
      html = 'created repository ' + get_repo_link(entry);
    } else if (entry.type === 'CreateEvent' && entry.payload.ref_type === 'tag') {
      html = 'created tag ' + get_link(get_repo_url(entry)+'/tree/'+entry.payload.ref, entry.payload.ref) + ' at ' + get_repo_link(entry);
    } else if (entry.type === 'DeleteEvent' && entry.payload.ref_type === 'branch') {
      html = 'deleted branch ' + entry.payload.ref + ' at ' + get_repo_link(entry);
    } else if (entry.type === 'DeleteEvent' && entry.payload.ref_type === 'tag') {
      html = 'deleted tag ' + entry.payload.ref + ' at ' + get_repo_link(entry);
    } else if (entry.type === 'FollowEvent' ) {
      html = 'started following ' + get_link('https://github.com/'+entry.payload.target.login, entry.payload.target.login);
    } else if (entry.type === 'ForkEvent' ) {
      html = 'forked ' + get_repo_link(entry);
    } else if (entry.type === 'GistEvent' ) {
      if (entry.payload.action === 'create') {
        entry.payload.action = 'created';
      } else if (entry.payload.action === 'update') {
        entry.payload.action = 'updated';
      }
      html = entry.payload.action + ' gist ' + get_link('https://gist.github.com/'+entry.payload.gist.id, entry.payload.gist.id);
    } else if (entry.type === 'IssueCommentEvent' ) {
      html = 'commented on issue ' + get_link(get_repo_url(entry)+'/issues/'+entry.payload.issue.number, entry.payload.issue.number) +
             ' on ' + get_repo_link(entry);
    } else if (entry.type === 'IssuesEvent' ) {
      html = entry.payload.action + ' issue ' + get_link(get_repo_url(entry)+'/issues/'+entry.payload.issue.number, entry.payload.issue.number) +
             ' on ' + get_repo_link(entry);
    } else if (entry.type === 'PullRequestEvent' ) {
      html = entry.payload.action + ' pull request ' + get_link(get_repo_url(entry)+'/pull/'+entry.payload.number, entry.payload.number) +
             ' on ' + get_repo_link(entry);
    } else if (entry.type === 'PushEvent' ) {
      entry.payload.ref = entry.payload.ref.split('/')[2];
      html = 'pushed to ' + get_link(get_repo_url(entry)+'/tree/'+entry.payload.ref, entry.payload.ref) + ' at ' + get_repo_link(entry);
    } else if (entry.type === 'WatchEvent' ) {
      html = 'started watching ' + get_repo_link(entry);
    }
    entries.push({
      name: "github",
      date: new Date(entry.created_at),
      html: html,
      url: "https://github.com/etano"
    });
  });
  return entries;
};

/**
 * Add links to the twitter feed.
 * Hashes, @ and regular links are supported.
 * @private
 * @param {String} tweet A string of a tweet
 * @return {String} A linkified tweet
 */
var linkify = function(tweet) {
  var link = function(t) {
    return t.replace(
      /([a-z]+:\/\/)([-A-Z0-9+&@#\/%?=~_|(\)!:,.;]*[-A-Z0-9+&@#\/%=~_|(\)])/ig,
      function(m, m1, m2) {
        return get_link(m, ( m2.length > 35 ) ? m2.substr( 0, 34 ) + '...' : m2);
      }
    );
  },
  at = function( t ) {
    return t.replace(
      /(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g,
      function(m, m1, m2) {
        return m1 + get_link("https://twitter.com/" + m2, "@" + m2);
      }
    );
  },
  hash = function( t ) {
    return t.replace(
      /<a.*?<\/a>|(^|\r?\n|\r|\n|)(#|\$)([a-zA-Z0-9ÅåÄäÖöØøÆæÉéÈèÜüÊêÛûÎî_]+)(\r?\n|\r|\n||$)/g,
      function( m, m1, m2, m3, m4 ) {
        if (typeof m3 == "undefined") return m;
        var elem = "";
        if (m2 == "#") {
            elem = get_link("https://twitter.com/hashtag/" + m3 + "?src=hash", "#" + m3);
        } else if (m2 == "$") {
            elem = get_link("https://twitter.com/search?q=%24" + m3 + "&src=hash", "#" + m3);
        }
        return (m1 + elem + m4);
      }
    );
  };
  return hash(at(link(tweet)));
}

var parse_twitter = function(res) {
  var entries = [];
  res.tweets.forEach(function(entry) {
    entries.push({
      name: "twitter",
      date: new Date(entry.createdAt * 1000),
      html: "tweeted "+linkify(entry.text),
      url: "https://twitter.com/ethanwbrown/status/" + entry.id
    });
  });
  return entries;
};

var feeds = [{
  name: 'github',
  url: 'https://api.github.com/users/etano/events?page=1&per_page=10',
  parser: parse_github
},{
  name: 'pocket',
  url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http%3A%2F%2Fwww.getpocket.com%2Fusers%2Fefang%2Ffeed%2Fall%2F%22&format=json&callback=',
  parser: parse_pocket
},{
  name: 'twitter',
  url: 'https://twittery.herokuapp.com/ethanwbrown',
  parser: parse_twitter
}];

var one_week_ago = new Date()
one_week_ago.setDate(one_week_ago.getDate() - 7);
var all_entries = [];
feeds.forEach(function(feed) {
  get_entries(feed, function(entries) {
    entries.forEach(function(entry) { all_entries.push(entry); });
    all_entries.sort(function(a, b) { return b.date - a.date; });

    var ul = document.getElementById("lifestream");
    while (ul.firstChild)
      ul.removeChild(ul.firstChild);

    for(var i=0; i<all_entries.length; i++) {
      if (all_entries[i].date > one_week_ago) {
        var date = document.createElement("span");
        date.textContent = timeago().format(all_entries[i].date);
        date.setAttribute("id", "date");

        var source = document.createElement("span");
        var a = document.createElement("a");
        a.textContent = all_entries[i].name;
        a.setAttribute("href", all_entries[i].url);
        source.appendChild(a);
        source.setAttribute("id", "source");

        var html = document.createElement("span");
        html.innerHTML = all_entries[i].html;
        html.setAttribute("id", "html");

        var li = document.createElement("li");
        li.appendChild(html);
        li.appendChild(source);
        li.appendChild(date);
        ul.appendChild(li);
      }
    }
  });
});
