// Hide "add new task" form
document.getElementById("newSite").style.display = "none";

// Hide "edit task" form
document.getElementById("newInterest").style.display = "none";


/* ----------    Interests     ---------- */

Interests = function() {
  this.init();
  return this;
}

Interests.prototype = {
  interestList: [],
  interestIndex: 0,

  init: function() {
    this.load();
  },

  load: function() {
    this.interestList = localStorage['interests'] ? JSON.parse(localStorage['interests']) : [];
    this.interestIndex = localStorage['interestIndex'] ? JSON.parse(localStorage['interestIndex']) : 0;
  },

  save: function() {
    localStorage['interests'] = JSON.stringify(this.interestList);
    localStorage['interestIndex'] = this.interestIndex;
  },

  interestExists: function(interest) {
    return (this.interestList.indexOf(interest) > -1);
  },

  create: function(interest) {
    if (!this.interestExists(interest)) {
      interest.id = this.interestIndex++;
      this.interestList.push(interest);
      this.save();
    }
  },

  delete: function(interest) {
    var self = this;
    this.interestList.forEach(function(t, i) {
      if (t == interest) {
        self.interestList.splice(i, 1);
      }
    });
    this.save();
  }

}


/* ----------    Event listeners     ---------- */

var interests = new Interests();

$(document).ready(function() {
    interests.load();

    // Show list of blocked sites
    for (var i = 0; i < blockedSites.urls.length; i++) {
        renderListItem(blockedSites.urls[i], "siteList");
    }

    // Show list of interests
    for (var i = 0; i < interests.interestList.length; i++) {
        renderListItem(interests.interestList[i], "interestList");
    }

    // Add "close" buttons
    makeXsCloseable();
});

// Event listeners for adding new site to blocking list
document.getElementById("addSiteButton").addEventListener("click", function() {
    toggleAddSite();
});
document.getElementById("addSite").addEventListener("click", function() {
    blockedSites.create($("#addSiteInput")[0].value);
	populateBlockedUrls();

	renderListItem($("#addSiteInput")[0].value, "siteList");
	makeXsCloseable();

	$("#addSiteInput")[0].value = "";
	toggleAddSite();
});
document.getElementById("cancelAddSite").addEventListener("click", function() {
    toggleAddSite();
});

// Event listeners for adding new interest
document.getElementById("addInterestButton").addEventListener("click", function() {
    toggleAddInterest();
});
document.getElementById("addInterest").addEventListener("click", function() {
    interests.create($("#addInterestInput")[0].value);

	renderListItem($("#addInterestInput")[0].value, "interestList");
	makeXsCloseable();

	$("#addInterestInput")[0].value = "";
	toggleAddInterest();
});
document.getElementById("cancelAddInterest").addEventListener("click", function() {
    toggleAddInterest();
});


/* ----------    Functions     ---------- */

// Appends textNode to tagged element to parent node
function addTextElement(parent, tag, className, text) {
    var child = document.createElement(tag);
    var textNode = document.createTextNode(text);
    child.className = className;
    child.appendChild(textNode);
    parent.appendChild(child);
}

// Click on a close button to delete the current list item
function makeXsCloseable() {
    var close = document.getElementsByClassName("close");
    for (var i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var li = this.parentElement;
            blockedSites.delete(li.firstChild.textContent);
            interests.delete(li.firstChild.textContent);
            li.parentElement.removeChild(li);
        }
    }
}

// Populates lists
function renderListItem(text, id) {
	var ul = document.getElementById(id);
	var li = document.createElement("li");
	li.innerText = text;
	addTextElement(li, "span", "close", "\u00D7");
	ul.appendChild(li);
}

// Toggles visibility of input field to add new site to blocking list
function toggleAddSite() {
	var newSite = document.getElementById("newSite");
	var addSiteButton = document.getElementById("addSiteButton");
	toggleVisibility(newSite, addSiteButton);
}

// Toggles visibility of input field to add new interest
function toggleAddInterest() {
	var newInterest = document.getElementById("newInterest");
	var addInterestButton = document.getElementById("addInterestButton");
	toggleVisibility(newInterest, addInterestButton);
}

// Helper function for the toggleAddSite and toggleAddInterest functions
function toggleVisibility(inputField, button) {
	if (inputField.style.display == "none"){
		inputField.style.display = "flex";
		button.style.display = "none";
	} else {
		inputField.style.display = "none";
		button.style.display = "inline";
	}
}
