function myFunction() {
  var sheetId = '1-F8l2l6wr21t2rzlGvQSVDo3Rq8xLLSnVHm8m5ALp8c';  //id sheet, taken from the URL
  var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0]; //since we only use one spreadsheet, we just take the first one
  var range = sheet.getDataRange(); //a range of all the cells
  var objects = range.getValues(); //gets the values
  
  var eligibilityColumn = 'x';
  
  
  var rejectEmails = [] 
  for (var i = 0; i < objects.length; i++) { //collect all the emails that we need to reject from.
    if (objects[i][eligibilityColumn.charCodeAt(0) - 'a'.charCodeAt(0)] == 'Reject') {
      rejectEmails.push(objects[i][1]);
    }
  }
  
  
  var now = new Date();
  var yearLater = new Date(now.getTime() + (365 *24 * 60 * 60 * 1000)); // next year
  
  var calendarId = "ldmlt0n144ic4vn6ee5973256o@group.calendar.google.com";  //calendar also needs an id
  var events = CalendarApp.getCalendarById(calendarId).getEvents(now, yearLater); 
  for (var i = 0; i < events.length; i++) { //each event
    var guestList = events[i].getGuestList(false); 
    for (var j = 0; j < guestList.length; j++) { //check its guest list for people that are in the reject email list
      Logger.log(guestList[j].getEmail());
      if (rejectEmails.indexOf(guestList[j].getEmail()) >= 0) { //the event contains a reject
        events[i].deleteEvent();
      }
    }
  }
  Logger.log(rejectEmails);
}
