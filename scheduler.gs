function myFunction() {
  var sheetId = '1-F8l2l6wr21t2rzlGvQSVDo3Rq8xLLSnVHm8m5ALp8c';  
  var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
  var range = sheet.getDataRange();
  var objects = range.getValues();
  
  
  var rejectEmails = []
  for (var i = 0; i < objects.length; i++) {
    
    if (objects[i][20] == 'Reject') {
      rejectEmails.push(objects[i][1]);
    }
  }
  
  
  var now = new Date();
  var yearLater = new Date(now.getTime() + (365 *24 * 60 * 60 * 1000));
  
  
  var events = CalendarApp.getEvents(now, yearLater);
  for (var i = 0; i < events.length; i++) {
    var guestList = events[i].getGuestList(false);
    for (var j = 0; j < guestList.length; j++) {
      Logger.log(guestList[j].getEmail());
      if (rejectEmails.indexOf(guestList[j].getEmail()) >= 0) { //the event contains a reject
        events[i].deleteEvent();
      }
    }
  }
  Logger.log(rejectEmails);
}
