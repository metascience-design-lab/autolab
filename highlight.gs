function myFunction() {
  
  var sheet = SpreadsheetApp.getActive().getSheets()[0];
  var range = sheet.getDataRange();
  var objects = range.getValues();
  
  var colors = [];
  
  for (var i = 0; i < objects.length; i++) {
    var lastIndex = 23;
    var colorRow = [];
    var currentColor = "white";
    
    if (objects[i][lastIndex] == "Accept") {
      currentColor = "lime";
    } else if (objects[i][lastIndex] == "Maybe") {
      currentColor = "yellow";
    } else if (objects[i][lastIndex] == "Reject") {
      currentColor = "red";
    }
    Logger.log(objects[i][23]);
    Logger.log(currentColor);
    for (var j = 0; j < objects[i].length; j++) {
        colorRow.push(currentColor);
    }
    
    colors.push(colorRow);
    
  }
  
  range.setBackgrounds(colors);
}
