## Petivity Chrome Extension

One complaint we heard during our needfinding process was that people would often forget events or tasks they intended to complete, necessitating multiple calendars and/or reminders. Our chrome extension replaces the homescreen so that the user can easily be reminded of tasks and events every time they open a new tab.

Every time a task is crossed off the to-do list, food is dropped down to the pet; this is intended to serve as positive reinforcement for staying productive.

Our extension also features a user calendar, such that all upcoming events are readily displayed. Our team recognized that people often don't schedule personal goals or general self-care items in their calendar, such as learning a new language, working out, or calling family. Because we believe that a person who feels well performs well, we included a self-care calendar which makes activity suggestions based on an editable interest list, which you can find in the settings menu (by pressing the gear at the top-right of the screen).

The calendar uses multiple Google Calendars, which I made public for the purposes of testing our chrome extension, as a backend. Pressing one of the events on the user calendar (blue events) will take the user to the Google Calendar page to edit this event. Pressing on one of the suggested events (green) will turn that event blue, simulating the act of adding that event to the user calendar. Additionally, the left checkboxes will toggle different calendar views.
The calendar was implemented using FullCalendar. For more information about FullCalendar, visit their page here: https://fullcalendar.io/.

The extension also provides a website blocking functionality. By pressing the "Start Blocking Now" button, you enable blocking of all specified websites. You can find the list of blocked websites on the settings page or by pressing the Petivity popup icon at the top-right corner of your Chrome browser. The popup icon also has a button which enables the blocking feature.

To add websites to the blacklist, go to the settings page and use the "Add" button under the blocked websites section. Blocking is performed using these list items as substrings, so typing "facebook" is enough to block any sites which contain the string "facebook" in them. Additionally, you can go to the specific website you wish to block and press the "Block this website" button on your popup icon. To remove websites from the blacklist, press the red "x" on the settings page or select the website in the popup menu.
Functionality of this feature inspired by this website blocker: https://github.com/tetsuwo/website-blocker-chrome.ext
