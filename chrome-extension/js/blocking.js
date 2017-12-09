// handles blocked sites when new tab is open
chrome.tabs.onUpdated.addListener(blockSite);


/* ----------    Settings and Blocked URLs     ---------- */

Settings = function() {
  this.init();
  return this;
}

Settings.prototype = {
  all: {},

  init: function() {
    this.load();
  },

  load: function() {
    this.all = localStorage['settings'] ? JSON.parse(localStorage['settings']) : {};
  },

  save: function() {
    localStorage['settings'] = JSON.stringify(this.all);
  },

  toggle_site_blocking: function(element_id) {
    if (this.all.blockSites) {
      this.all.blockSites = false;
    } else {
      this.all.blockSites = true;
    }
    this.save();
  }

}

BlockedSites = function() {
  this.init();
  return this;
}

BlockedSites.prototype = {
  urls: [],
  urlIndex: 0,

  init: function() {
    this.load();
  },

  load: function() {
    this.urls = localStorage['urls'] ? JSON.parse(localStorage['urls']) : [];
    this.urlIndex = localStorage['urlIndex'] ? JSON.parse(localStorage['urlIndex']) : 0;
  },

  save: function() {
    localStorage['urls'] = JSON.stringify(this.urls); 
    localStorage['urlIndex'] = this.urlIndex; 
  },

  urlExists: function(url) {
    return (this.urls.indexOf(url) > -1);
  },

  create: function(url) {
    if (!this.urlExists(url)) {
      url.id = this.urlIndex++;
      this.urls.push(url);
      this.save();
    }
  },

  delete: function(url) {
    var self = this;
    this.urls.forEach(function(t, i) {
      if (t == url) {
        self.urls.splice(i, 1);
      }
    });
    this.save();
  }

}


/* ----------    Event listeners     ---------- */

var settings = new Settings();
var blockedSites = new BlockedSites();

$(document).ready(function() {
  blockedSites.load();
  settings.load();

  updateButtonAndBadge();
  populateBlockedUrls();

  // Toggle site blocking
  $(document).on('click', '#start_blocking_button', function (e) {
    settings.toggle_site_blocking('#start_blocking_button');
    updateButtonAndBadge();
  });

  // Add current site to list of blocked site
  $(document).on('click', '#block_this_site_button', function (e) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
      blockedSites.create(tabs[0].url);
      populateBlockedUrls();
    });
  });

});

$(document).on('click', '#settings_icon', function (e) {
  chrome.tabs.update({url: 'petivity-settings.html'});
});


/* ----------    Functions     ---------- */

// Blocks access to sites when feature is enabled
function blockSite(tabId, changeInfo, tab) {
  settings.load();
  if (settings.all.blockSites) {
    blockedSites.load();
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
      var url = tab.url;
      if (blockedSites.urls.indexOf(url) > -1) {
        chrome.tabs.update(tabId, {url: 'blocked.html'});
      }
    });
  }
}

// Updates blocking button and red badge over popup when blocking is toggled
function updateButtonAndBadge() {
  var sitesBlockElem = $('#start_blocking_button');
  if (settings.all.blockSites) {
    sitesBlockElem.text("Disable Site Blocking"); 
    toggleBadge("red", " ");
  } else {
    sitesBlockElem.text("Start Blocking Now");
    toggleBadge("green", "");
  }
}

function toggleBadge(rgbColor, badgeText) {
  chrome.browserAction.setBadgeBackgroundColor({'color': rgbColor});
  chrome.browserAction.setBadgeText({'text': badgeText});
}

// Display blocked sites
function populateBlockedUrls() {
  var urlList = $("<ul class='blocked_list'></ul>");
  for (var i = 0; i < blockedSites.urls.length; i++) {
    urlList.append("<li><button class='grey remove_button' data-url='" + blockedSites.urls[i] + "'>" + blockedSites.urls[i] + '</button></li>');
  }
  $('#blocked_sites').html(urlList);

  removeButtons();
}

// Rmove blocked URLs from list when pressed
function removeButtons() {
  $('#blocked_sites li button').each(function(i) {
    $(this).click(function() {
      blockedSites.delete($(this).data('url'));
      populateBlockedUrls();
    });
  });
}
