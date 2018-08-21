/* This Google App script screen participants using two functions.
The first function categorizes applicants as "accept", "reject", or
"maybe." The first function is called "highlight."
*/

function highlighter() {
  
/*
Get the values needed to screen participants from the Google Sheet.
Currently, the Google Sheet "Psychology Experiment - Recruit" is
"bound" to this 
*/

  var sheet = SpreadsheetApp.getActive().getSheets()[0];
  var range = sheet.getDataRange();
  var objects = range.getValues();
  
  
/*
This color array will later help keep track of all the colors later on.
*/

  var colors = [];
  
/*
In this for loop, search for the column containing the eligibility information. In this case, it is column X. But it
if you want to do so. The loop goes to each row, checks the eligiblity, and it assigns a color to the three possible eligibility
values. If the value is "accept," it is colored green. If the value is "reject," it is colored red. If the value is "maybe", it is
colored orange.
*/ 

  
  for (var i = 0; i < objects.length; i++) {
    var eligibilityColumn = 'x';
    var lastIndex = eligibilityColumn.charCodeAt(0) - 'a'.charCodeAt(0);
    var colorRow = [];
    var currentColor = "white";
    
    if (objects[i][lastIndex] == "Accept") {
      currentColor = "#99FFBB";
    } else if (objects[i][lastIndex] == "Maybe") {
      currentColor = "#FFDD99";
    } else if (objects[i][lastIndex] == "Reject") {
      currentColor = "#FF9999";
    }
    
      
/*
The logger.log functions simply keep track of the values.
It may be removed if desired. Doing so will not affect the script.
*/
    
    Logger.log(objects[i][23]);
    Logger.log(currentColor);
    
/*
Planning Step: this for loop helps highlight the entire row instead of just the eligibility column. 
*/    
    
    for (var j = 0; j < objects[i].length; j++) {
        colorRow.push(currentColor);
    }
    
    colors.push(colorRow);
    
  }
  
/*
Now, the colors are actually applied to the spreadsheet and made visible.
*/    
  range.setBackgrounds(colors);
}

/*
This second function creates a custom menu called "Autolab" in the Google Sheet "Psychology Experiment - Recruit"
It allows the user to highlight directly from the Google Sheet instead of needing to open up the highlighter.gs
script separately. This kind of integration will save time.
*/    

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Autolab Menu')
      .addItem('Highlighter', 'highlighter')
      .addToUi();
}
