// Hide fruit
document.getElementById("fruit").style.display = "none";

// Hide "add new task" form
newTask.style.display = "none";

// Hide "edit task" form
editTask.style.display = "none";

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
    addTextElement(myNodelist[i], "span", "close", "\u00D7");
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

// Event listeners for buttons in newTask form
document.getElementById("addButton").addEventListener("click", function() {
    toggleAddTaskVis();
});
document.getElementById("newElement").addEventListener("click", event => {
    event.preventDefault();
    newElement();
});
document.getElementById("cancelAdd").addEventListener("click", function() {
    toggleAddTaskVis();
});

// Event listeners for buttons in editTask form
document.getElementById("editElement").addEventListener("click", event => {
    event.preventDefault();
    editElement();
});
document.getElementById("cancelEdit").addEventListener("click", function() {
    toggleEditTaskVis();
    cancelEdit();
});


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
            var div = this.parentElement;
            div.parentElement.removeChild(div);
        }
    }
}

// Toggles visibility of form to add new task
function toggleAddTaskVis() {
    var newTask = document.getElementById("newTask");
    toggleVisibility(newTask);
}

// Toggles visibility of form to edit existing task
function toggleEditTaskVis() {
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
    var newDays = document.getElementById("daysremaining").value;

    var li = document.createElement("LI");
    li.className = "row no-gutter remove-padding task";

    addTextElement(li, "SPAN", "col-9 remove-padding offset-task", document.getElementById("taskname").value);
    addTextElement(li, "SPAN", "col-3 remove-padding text-center", newDays);
    addTextElement(li, "SPAN", "close", "\u00D7");

    insertTask(li, document.getElementsByTagName("LI"), newDays);
    elem.parentNode.removeChild(elem);
    makeXsCloseable();

    document.getElementById("taskname").value = "";
    document.getElementById("daysremaining").value = "";
    toggleEditTaskVis();
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    var days = document.getElementById("new_daysremaining").value;
    if (!days) days = 0;      // Add alert feature for user

    var li = document.createElement("LI");
    li.className = "row no-gutter remove-padding task";

    addTextElement(li, "SPAN", "col-9 remove-padding offset-task", document.getElementById("new_taskname").value);
    addTextElement(li, "SPAN", "col-3 remove-padding text-center", days);
    addTextElement(li, "SPAN", "close", "\u00D7");

    insertTask(li, document.getElementsByTagName("LI"), days);
    makeXsCloseable();

    document.getElementById("new_taskname").value = "";
    document.getElementById("new_daysremaining").value = "";
    toggleAddTaskVis();
}

// Inserts task into to-do list by order of days remaining
function insertTask(task, nodeList, daysRemaining) {
    for (i = 0; i < nodeList.length; i++) {
        var c = nodeList[i].getElementsByClassName("col-3 remove-padding text-center");

        if ((c[0].innerText > daysRemaining)) {
            document.getElementById("myUL").insertBefore(task, nodeList[i]);
            break;
        } else if (i == nodeList.length-1) {
            document.getElementById("myUL").appendChild(task);
        }
    }
}

//to add animations any time an item is completed
$(".close").click(function() { 
    /*
  var child = document.createElement("newFruit");
      var parent = document.getElementById("fruit");
  child.setAttribute("src", "mango.png");
  //child.className = className;
  //child.appendChild(textNode);
  parent.appendChild(child);
*/
    document.getElementById("fruit").style.display = "block";
    setTimeout(function() {
        $('#fruit').toggleClass('transform-active');
        setTimeout(function() {
            $('#fruit').toggleClass('fade');
            setTimeout(function() {
                $('#fruit').toggleClass('transform-active');
                $('#fruit').toggleClass('fade');
                document.getElementById("fruit").style.display = "none";

            }, 2000);
        }, 2000);
    }, 500);

});



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