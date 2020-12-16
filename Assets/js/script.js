
$(document).ready(function () {


    console.log("document ready jQuery loaded");

    var scheduleArray = JSON.parse(localStorage.getItem("schedule")) || []

    scheduleArray.forEach(element => {
        $("#text" + element.hour).val(element.event);
    })

    var currentDate = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    var currentHour = new Date().getHours();    

    console.log("Current Date: " + currentDate)
    console.log("Current Hour: " + currentHour)

    $("#currentDay").text(currentDate);

    for(var i=9; i<=17; i++){
        if(i < currentHour){
            
            $("#text" + i).attr("disabled", "disabled")
        }
        else if(i === currentHour){            
            $("#container" + i).removeClass("past");
            $("#container" + i).addClass("present");
        }else{            
            $("#container" + i).removeClass("past");
            $("#container" + i).addClass("future");
        }
    }


    $(".saveBtn").click(function () {
        

        var hourSaved = $(this).data("time");        
        console.log("hourSaved: ", hourSaved)

        var hourSchedule = {
            hour: hourSaved,
            event: $("#text" + hourSaved).val()
        }

        if(findHour(hourSaved, scheduleArray) > -1){
            scheduleArray.splice(findHour(hourSaved, scheduleArray), 1, hourSchedule)
        }
        else{
            scheduleArray.push(hourSchedule);
        }

        console.log($("#text" + hourSaved).val())
        console.log('hourSchedule: ', hourSchedule)
        console.log('scheduleArray: ', scheduleArray);

        localStorage.setItem(
            "schedule", JSON.stringify(scheduleArray)
        )
    })

    function findHour(hour, array){
        array.forEach((element, index) => {
            if(element.hour == hour){
                return index;
            }
        });
        return -1;
    }

});