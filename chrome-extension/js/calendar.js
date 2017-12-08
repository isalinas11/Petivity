// chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    // Use the token.

    var petivity_calendar = { 
        googleCalendarId: 'q5a68m5hln3dspsc1gmt9vp76c@group.calendar.google.com',
        className: "petivity_calendar",
        color: 'rgb(50, 110, 190)'
    };
    var suggestions_calendar = { 
        googleCalendarId: '9kusj9b84jlt7jue931o6ifuno@group.calendar.google.com',
        color: '#29a725',
        // textColor: 'black',
        className: 'suggestions_calendar'
    };
    var blocking_calendar = { 
        googleCalendarId: 'r7f8al0a0dfp22hbacn0hi87kk@group.calendar.google.com',
        color: 'dimgray',
        className: 'blocking_calendar'
    };

    $(document).ready(function() {

        $('#calendar').fullCalendar({
            header: {
                center: 'month,agendaFourDay' // buttons for switching between views
            },
            views: {
                agendaFourDay: {
                    type: 'agenda',
                    duration: { days: 4 },
                    buttonText: '4 day',
                    selectable: true
                }
            },
            defaultView: 'agendaFourDay',
            allDaySlot: false,
            height: 410,
            editable: true,
            slotDuration: '00:30:00',
            googleCalendarApiKey: 'AIzaSyAPN-aehQgywNZcTlwjaIqZ4QDBCGLB5P4',
            eventSources: [petivity_calendar, suggestions_calendar, blocking_calendar],
            eventRender: function(event, element) {

                // Checkbox listeners
                $("#suggestions_calendar").click(function() {
                    if ($("#suggestions_calendar")[0].checked) {
                        $("#calendar").fullCalendar( 'refetchEventSources', suggestions_calendar);
                    } else {
                        $("#calendar").fullCalendar( 'removeEvents', function(event) {
                            return event.source.className[0] == 'suggestions_calendar';
                        });
                    }
                });
                $("#petivity_calendar").click(function() {
                    if ($("#petivity_calendar")[0].checked) {
                        $("#calendar").fullCalendar( 'refetchEventSources', petivity_calendar);
                    } else {
                        $("#calendar").fullCalendar( 'removeEvents', function(event) {
                            return event.source.className[0] == 'petivity_calendar';
                        });
                    }
                });
                $("#blocking_calendar").click(function() {
                    if ($("#blocking_calendar")[0].checked) {
                        $("#calendar").fullCalendar( 'refetchEventSources', blocking_calendar);
                    } else {
                        $("#calendar").fullCalendar( 'removeEvents', function(event) {
                            return event.source.className[0] == 'blocking_calendar';
                        });
                    }
                });
            },
            eventClick: function(event, jsEvent, view) {
                if (event.source.className[0] == 'suggestions_calendar') {
                    jsEvent.target.style.backgroundColor = 'rgb(105, 147, 205)';
                    jsEvent.target.parentElement.style.backgroundColor = 'rgb(105, 147, 205)';
                    jsEvent.target.parentElement.style.borderColor = "rgb(50, 110, 190)";
                    jsEvent.target.parentElement.style.color = "white";
                }
                if (event.url) {
                    return false;
                }
            }
                
        });

    });

// });
