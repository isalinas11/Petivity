// Hide "add new task" form
newTask.style.display =  "none";

// Hide "edit task" form
editTask.style.display =  "none";

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Give closing functionality to "close" buttons
makeXsCloseable();

// Add a "selected" class to clicked list item and open the edit window
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'SPAN' && ev.target.classList != "close") {
    ev.target.classList.toggle('selected');
    document.getElementById("taskname").value = document.getElementsByClassName("selected")[0].parentNode
                                                        .getElementsByClassName("col-9 remove-padding offset-task")[0].innerText;
    document.getElementById("daysremaining").value = document.getElementsByClassName("selected")[0].parentNode
                                                             .getElementsByClassName("col-3 remove-padding text-center")[0].innerText;
    toggleEditTaskVis();
  }
}, false);

// Click on a close button to hide the current list item
function makeXsCloseable() {
  var close = document.getElementsByClassName("close");
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

// Toggles visibility of form to add new task
function toggleAddTaskVis() {
    document.getElementById("editTask").style.display = "none";
    var newTask = document.getElementById("newTask");
    toggleVisibility(newTask);
}

// Toggles visibility of form to edit existing task
function toggleEditTaskVis() {
  // document.getElementById("addTask").style.display = "none";
  var editTask = document.getElementById("editTask");
  toggleVisibility(editTask);
}

// Helper function for the toggleAddTaskVis and toggleEditTaskVis functions
function toggleVisibility(task) {
  if (task.style.display == "none") {
      task.style.display = "block";
  } else {
      task.style.display = "none";
  }
}

// Hit the cancel button when editing an task
function cancelEdit() {
    document.getElementsByClassName('selected')[0].classList.toggle("selected");
}

// Edit an item
function editElement() {
  var elem = document.getElementsByClassName("selected")[0].parentNode;
  var oldDays = elem.getElementsByClassName("col-3 remove-padding text-center")[0];
  var newDays = document.getElementById("daysremaining").value;
  var newTask = document.getElementById("taskname").value;

  var li = document.createElement("LI");
  var task = document.createElement("SPAN");
  var days_remaining = document.createElement("SPAN");
  var x = document.createElement("SPAN");

  var t = document.createTextNode(newTask);
  task.className = "col-9 remove-padding offset-task";
  task.appendChild(t);
  li.appendChild(task);

  var d = document.createTextNode(newDays);
  days_remaining.className = "col-3 remove-padding text-center";
  days_remaining.appendChild(d);
  li.appendChild(days_remaining);

  txt = document.createTextNode("\u00D7");
  x.className = "close";
  x.appendChild(txt);

  li.appendChild(x);
  li.className = "row no-gutter remove-padding task";

  myNodelist = document.getElementsByTagName("LI");
  for (i = 0; i < myNodelist.length; i++) {
    var c = myNodelist[i].getElementsByClassName("col-3 remove-padding text-center");
    if ((c[0].innerText > newDays)) {
      document.getElementById("myUL").insertBefore(li, myNodelist[i]);
      break;
    } else if (i == myNodelist.length-1) {
      document.getElementById("myUL").appendChild(li);
    } 
  }

  document.getElementById("taskname").value = "";
  document.getElementById("daysremaining").value = "";
  elem.parentNode.removeChild(elem);
  toggleEditTaskVis();
  makeXsCloseable();
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var txt = document.getElementById("new_taskname").value;
  var days = document.getElementById("new_daysremaining").value;
  if (!days) days = 0;      // Add alert feature for user

  var li = document.createElement("LI");
  var task = document.createElement("SPAN");
  var days_remaining = document.createElement("SPAN");
  var x = document.createElement("SPAN");

  var t = document.createTextNode(txt);
  task.className = "col-9 remove-padding offset-task";
  task.appendChild(t);
  li.appendChild(task);

  var d = document.createTextNode(days);
  days_remaining.className = "col-3 remove-padding text-center";
  days_remaining.appendChild(d);
  li.appendChild(days_remaining);

  txt = document.createTextNode("\u00D7");
  x.className = "close";
  x.appendChild(txt);

  li.appendChild(x);
  li.className = "row no-gutter remove-padding task";

  myNodelist = document.getElementsByTagName("LI");
  for (i = 0; i < myNodelist.length; i++) {
    var c = myNodelist[i].getElementsByClassName("col-3 remove-padding text-center");
    if ((c[0].innerText > days)) {
      document.getElementById("myUL").insertBefore(li, myNodelist[i]);
      break;
    } else if (i == myNodelist.length-1) {
      document.getElementById("myUL").appendChild(li);
    }
  }

  document.getElementById("new_taskname").value = "";
  document.getElementById("new_daysremaining").value = "";
  toggleAddTaskVis();
  makeXsCloseable();
}


/*
 * Angular popover code.
 * No longer in use; kept for historical reasons.
 */

// $( function () {
//   $('[data-toggle="popover"]').popover();

//   //makes popovers disappear if you click outside of them, but stay if you click on popover
//   $('body').on('click', function (e) {
//     $('[data-toggle="popover"]').each(function () {
//       //the 'is' for buttons that trigger popups
//       //the 'has' for icons within a button that triggers a popup
//       if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
//         $(this).popover('hide');
//       }
//     });
//   });
// });