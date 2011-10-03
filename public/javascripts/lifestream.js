    (function(){
      var count = 0,
      list = [
        {
          service: 'github',
          user: 'etano'
        },
        // Run javascript:alert(_USER_ID); when you're logged in at google reader
        {
          service: 'googlereader',
          user: '12090471747753652738'
        },
        {
          service: 'reddit',
          user: 'etano'
        },
        {
          service: 'twitter',
          user: 'ethanwbrown'
        },
        {
          service: 'lastfm',
          user: 'etano'
        }
      ];

      Date.prototype.toISO8601 = function(date) {
          var pad = function (amount, width) {
              var padding = "";
              while (padding.length < width - 1 && amount < Math.pow(10, width - padding.length - 1))
                  padding += "0";
              return padding + amount.toString();
          }
          date = date ? date : new Date();
          var offset = date.getTimezoneOffset();
          return pad(date.getFullYear(), 4)
              + "-" + pad(date.getMonth() + 1, 2)
              + "-" + pad(date.getDate(), 2)
              + "T" + pad(date.getHours(), 2)
              + ":" + pad(date.getMinutes(), 2)
              + ":" + pad(date.getUTCSeconds(), 2)
              + (offset > 0 ? "-" : "+")
              + pad(Math.floor(Math.abs(offset) / 60), 2)
              + ":" + pad(Math.abs(offset) % 60, 2);
      };

      $("#lifestream").lifestream({
        limit: 10,
        list: list,
        feedloaded: function(){
          count++;
          // Check if all the feeds have been loaded
          if( count === list.length ){
            $("#lifestream li").each(function(){
              var element = $(this);
              date = new Date(element.data("time"));
              url = element.data("url");
              name = element.data("name");
              element.append('<span class="via"><a href="' + url + '">' + name + '</a></span>' 
                + '<span class="date timeago" title="' + date.toISO8601(date) + '">' + date + "</span>");
            })
            $("#lifestream .timeago").timeago();
          }
        }
      });
      
    })();
 
