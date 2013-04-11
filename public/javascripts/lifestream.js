function loadLifeStream(lim) {
    var b = [ {
        service: "github",
        user: "etano"
    }, {
        service: "twitter",
        user: "ethanwbrown"
    }, {
        service: "bitbucket",
        user: "efang"
    },
    //{
    //    service: "lastfm",
    //    user: "etano"
    //},
    // {
    //    service: "tumblr",
    //    user: "ohgreatthatsreallywonderful"
    //},
      {
        service: "mendeley",
        user: "2855521/ethan-brown",
    } ];
//        service: "zotero",
//        user: "820015"
//    }, {

    Date.prototype.toISO8601 = function(a) {
        var b = function(a, b) {
            var c = "";
            while (c.length < b - 1 && a < Math.pow(10, b - c.length - 1)) c += "0";
            return c + a.toString();
        };
        a = a ? a : new Date;
        var c = a.getTimezoneOffset();
        return b(a.getFullYear(), 4) + "-" + b(a.getMonth() + 1, 2) + "-" + b(a.getDate(), 2) + "T" + b(a.getHours(), 2) + ":" + b(a.getMinutes(), 2) + ":" + b(a.getUTCSeconds(), 2) + (c > 0 ? "-" : "+") + b(Math.floor(Math.abs(c) / 60), 2) + ":" + b(Math.abs(c) % 60, 2);
    };
    $("#lifestream").lifestream({
        limit: lim,
        list: b,
        feedloaded: function() {
            var i = 0;
            $("#lifestream li").each(function(i) {
                var a = $(this);
                date = new Date(a.data("time")), url = a.data("url"), name = a.data("name"), a.append('<span class="via"><a href="' + url + '">' + name + '</a></span>' + '<span class="date timeago" title="' + date.toISO8601(date) + '">' + date + '</span>');
                if (i > LSInit-1) {
                  a.hide();
                } else {
                  a.show();
                };
                i++;
            });
            $("#lifestream .timeago").timeago();
            updateColors();
        }
    });

};

function LSPlus() {
  var i = 0;
  $("#lifestream li").each(function(i) {
    if (i === LSIter + LSShown) {
      return false;
    };
    $(this).fadeIn('slow');
    i++;
  });
  if (LSShown < $("#lifestream li").length) {
    LSShown = LSShown + LSIter;
  };
};

function LSMinus() {
  var i = 0;
  $("#lifestream li").each(function(i) {
    if (i === LSShown || LSShown < LSIter) {
      return false;
    };
    if (i > LSShown - LSIter - 1) {
      $(this).fadeOut('slow');
    };
    i++;
  });
  if (LSShown >= LSIter) {
    LSShown = LSShown - LSIter;
  };
};

(function() {
  LSInit = 5;
  LSIter = 5;
  loadLifeStream(1000);
  LSShown = LSInit;
})();


