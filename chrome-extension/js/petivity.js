// Hide "add new task" form
document.getElementById("newTask").style.display = "none";

// Hide "edit task" form
document.getElementById("editTask").style.display = "none";

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
    addTextElement(myNodelist[i], "span", "close", "\u00D7");
}

// Add "close" buttons
makeXsCloseable();


/* ----------     Event listeners     ---------- */

// Add a "selected" class to clicked list item and open the edit window
document.getElementById("taskList").addEventListener('click', function(ev) {
    if (ev.target.tagName === 'SPAN' && ev.target.classList != "close") {
        ev.target.classList.toggle("selected");
        document.getElementById("taskname").value = document.getElementsByClassName("selected")[0].parentNode
                                                            .getElementsByClassName("col-9 remove-padding offset-task")[0].innerText;
        document.getElementById("daysremaining").value = document.getElementsByClassName("selected")[0].parentNode
                                                                 .getElementsByClassName("col-3 remove-padding text-center")[0].innerText;
        toggleEditTask();
    }
}, false);

// Event listeners for buttons in newTask form
document.getElementById("newElement").addEventListener("click", event => {
    event.preventDefault();
    newElement();
});
document.getElementById("addButton").addEventListener("click", function() {
    toggleAddTask();
});
document.getElementById("cancelAdd").addEventListener("click", function() {
    toggleAddTask();
});

// Event listeners for buttons in editTask form
document.getElementById("editElement").addEventListener("click", event => {
    event.preventDefault();
    editElement();
});
document.getElementById("cancelEdit").addEventListener("click", function() {
    toggleEditTask();
    cancelEdit();
});

// Adds animations any time an item is completed
$(".close").click(function() {

    //for the fruit
    var child = new Image();
    var parent = document.getElementById("tempFruit");
    child.setAttribute("src", "images/mango.png");
    child.setAttribute("width", "50px");
    child.style.marginLeft = "180px";
    parent.appendChild(child);
    child.style.display = "block";

    //for the heart
    var heart = new Image();
    heart.setAttribute("src", "images/heart.png");
    heart.setAttribute("width", "50px");
    //child.setAttribute("float", "right");

    heart.style.display = "block";
    heart.style.marginLeft = "220px";
    heart.style.marginTop = "70px";

    //happens first
    setTimeout(function() {
        $(child).toggleClass('transform-active');
        //happens second
        setTimeout(function() {
            $(child).toggleClass('fade');
            $(heart).toggleClass('tranform-scale');
            //happens third to last
            setTimeout(function() {
                $(child).toggleClass('transform-active');
                $(child).toggleClass('fade');
                parent.removeChild(child);
                parent.appendChild(heart);
                //happens second to last
                setTimeout(function() {
                    $(heart).toggleClass('pulse');
                    // happens last
                    setTimeout(function() {
                        parent.removeChild(heart);
                    }, 5000);
                }, 2000);
            }, 1500);
        }, 2000);
    }, 500);
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
            var div = this.parentElement;
            div.parentElement.removeChild(div);
        }
    }
}

// Toggles visibility of form to add new task
function toggleAddTask() {
    var newTask = document.getElementById("newTask");
    toggleVisibility(newTask);
}

// Toggles visibility of form to edit existing task
function toggleEditTask() {
    var editTask = document.getElementById("editTask");
    toggleVisibility(editTask);
}

// Helper function for the toggleAddTask and toggleEditTask functions
function toggleVisibility(task) {
    const display = task.style.display
    display === "none" ? display = "block" : display = "none"
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
    toggleEditTask();
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
    toggleAddTask();
}

// Inserts task into to-do list by order of days remaining
function insertTask(task, nodeList, daysRemaining) {
    for (i = 0; i < nodeList.length; i++) {
        var c = nodeList[i].getElementsByClassName("col-3 remove-padding text-center");

        if ((c[0].innerText > daysRemaining)) {
            document.getElementById("taskList").insertBefore(task, nodeList[i]);
            break;
        } else if (i == nodeList.length-1) {
            document.getElementById("taskList").appendChild(task);
        }
    }
}
