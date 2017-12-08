chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    // Use the token.
    $(document).ready(function() {
        $('#calendar').fullCalendar({
            header: {
                center: 'month,agendaFourDay' // buttons for switching between views
            },
            views: {
                agendaFourDay: {
                    type: 'agenda',
                    duration: { days: 4 },
                    buttonText: '4 day'
                }
            },
            defaultView: 'agendaFourDay',
            allDaySlot: false,
            height: 410,
            googleCalendarApiKey: 'AIzaSyAPN-aehQgywNZcTlwjaIqZ4QDBCGLB5P4',
            events: {
                googleCalendarId: 'q5a68m5hln3dspsc1gmt9vp76c@group.calendar.google.com'
            }
        });
    });

});


// $(document).ready(function() {
//     $('#calendar').fullCalendar({
//         defaultView: 'agendaDay',
//         googleCalendarApiKey: 'AIzaSyBm7TIWmFrSQBv_BKTZQWFIZP8QRTmk0_Y',
//         events: {
//             googleCalendarId: 'q5a68m5hln3dspsc1gmt9vp76c@group.calendar.google.com'
//         }
//     });
// });
