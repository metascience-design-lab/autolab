# Metascience Design Lab - Project Team 4

Scripts for automating the screening and scheduling of human participants for laboratory research.


## highlighter.gs

Highlights the applicant's data based on whether it is 'Accept' (green), 'Reject' (red) or 'Maybe' (orange).  


## scheduler.gs

Takes a list of people from the spreadsheet, finds the ones that are not eligible, and cancels all of their appointments.
To generalize its use, change the variables `sheetId`, `calendarId` and `eligibilityColumn` to the correct fields.
