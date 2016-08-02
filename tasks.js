/*jslint browser: true*/
/*global $, window*/
var pageScope = [];

(function () {
    "use strict";
    function Task(name, date, assigned) {
        this.name = name;
        this.date = date;
        this.assigned = assigned;
    }

    //very simple functionality to add the task to the dom.  Since we're never removing
    //this works but if we ever removed tasks we would want clear or update functionality for the entire
    //array
    function addTaskToTable(task) {
        if (task === "undefined") {
            throw new Error("You must pass a task to function addTaskToTable");
        }
        /*Note: In production code I would be checking for name,date, and assigned parameters
                I would also potentially sanitize the inputs against injection*/
        var tableBody = $("#task-table").find("tbody");
        tableBody.append("<tr><td class='task-name'>" + task.name + "</td><td class='task-date'>" + task.date + "</td><td class='task-assigned'>" + task.assigned + "</td></tr>");
    }


    //Potentially modify to use a json file, however this doesn't work easily without a fileserver in chrome
    var initialTaskJson = "[ {\"name\": \"Test Task #1\", \"date\": \"12/01/2012\", \"assigned\": \"John Doe\" }, {\"name\": \"Test Task #2\", \"date\": \"12/02/2012\", \"assigned\": \"John Doe\" }, {\"name\": \"Test Task #3\", \"date\": \"12/03/2012\", \"assigned\": \"John Doe\" }, {\"name\": \"Test Task #4\", \"date\": \"12/04/2012\",\"assigned\": \"John Doe\" }, {\"name\": \"Test Task #5\", \"date\": \"12/05/2012\", \"assigned\": \"John Doe\" }, {\"name\": \"Test Task #6\", \"date\": \"12/06/2012\", \"assigned\": \"John Doe\" }, {\"name\": \"Test Task #7\", \"date\": \"12/07/2012\", \"assigned\": \"John Doe\" }]";

    var currentTasks = JSON.parse(initialTaskJson);

    pageScope.submitClicked = function () {
        var newTask = new Task($("#task-name").val(), $("#date").val(), $("#assigned-to").val());
        addTaskToTable(newTask);
        //this keeps current tasks up to date which isn't strictly necessary for this exercise
        //but is used to track tasks elsewhere other than the dom
        currentTasks.push(newTask);
    };

    window.onload = function () {
        currentTasks.forEach(addTaskToTable);
    };
}());