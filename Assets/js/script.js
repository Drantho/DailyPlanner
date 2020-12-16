
$(document).ready(function () {

    // console.log("document ready jQuery loaded");

    // retreive data from localStorage or empty array
    var scheduleArray = JSON.parse(localStorage.getItem("schedule")) || []

    // loop through each item from localStorage and add its value to the appropriate textarea
    scheduleArray.forEach(element => {
        $("#text" + element.hour).val(element.event);
    })

    // get today's date in readable format for display
    var currentDate = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    // display date at top of page
    $("#currentDay").text(currentDate);

    // get current hour to format time blocks
    var currentHour = new Date().getHours();    

    // console.log("Current Date: " + currentDate)
    // console.log("Current Hour: " + currentHour)

    // loop through work hours in 24 hour format
    for(var i=9; i<=17; i++){
        
        // sets past hours textareas to disabled
        if(i < currentHour){            
            // $("#text" + i).attr("disabled", "disabled")
        }
        // set current hour css class and remove past class
        else if(i === currentHour){            
            $("#container" + i).removeClass("past");
            $("#container" + i).addClass("present");
        }
        // set future hour css class and remove past class
        else{            
            $("#container" + i).removeClass("past");
            $("#container" + i).addClass("future");
        }
    }

    // make event listener for all save buttons by selecting .saveBtn class 
    $(".saveBtn").click(function () {        

        // get the data-time attribute of the button clicked and store in variable
        var hourSaved = $(this).data("time");        
        // console.log("hourSaved: ", hourSaved)

        // create object to save in localStorage with hour clicked and event text
        var hourSchedule = {
            hour: hourSaved,
            event: $("#text" + hourSaved).val()
        }

        // test if hour block is a create or update
        // update array at position found
        if(findHour(hourSaved, scheduleArray) > -1){
            scheduleArray.splice(findHour(hourSaved, scheduleArray), 1, hourSchedule)
        }
        // push new object to schedule array
        else{
            scheduleArray.push(hourSchedule);
        }

        // console.log($("#text" + hourSaved).val())
        // console.log('hourSchedule: ', hourSchedule)
        // console.log('scheduleArray: ', scheduleArray);

        // save schedule array in localStorage
        localStorage.setItem(
            "schedule", JSON.stringify(scheduleArray)
        )
    })

    // findHour() takes an hour integer and an array of event objects and finds position of object in array
    // returns -1 if not found
    function findHour(hour, array){
        array.forEach((element, index) => {
            if(element.hour == hour){
                return index;
            }
        });
        return -1;
    }

});