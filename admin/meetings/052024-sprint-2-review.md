# Sprint 2 Review Meeting

## Attendance
- Bernico Jansen Chandra
- Minsang Kim
- Michael Cheung
- Sam Hormozian
- Aritra Dutta
- Ryan Seidl
- Taiki Yoshino
- Rick Rodness
- Elijah Hosaka
- Sarena Pham
- Ishika Agrawal

## Quick Review on Past Sprint
### Skeleton
- 

### Sleep Widget
- 

### Emotion Widget
- 

### Lines of Codes Widget
- 

### Summary Widgets
- 

### Text Editor (Ryan, Elijah, Michael)
- The text editor consists of a text area where journal entries can be edited with the use of some text tools. This includes using bolding, italics, underlining, and color. Editing text in the text editor would send live updates to the database and we made this choice because the application itself is very lightweight and we could afford to. The alternative to this was to do a time based auto saving system with a manual saving feature, but we did not have time to implement this. Aside from this, we also added a way to change the title easily by clicking on the existing title at the top of the screen and editing it directly. We think this is good and makes it easy. However, it is not completely intuitive so we will be adding a small icon next to it to signify this. Overall, the text editor is a text area with some text editing features which updates the database.

### Backend (Michael)
- The backend consisted on a file system that interfaced with the local storage through the use of JSON files. This would let the different components interact with the existing journal database in the local storage and affect different elements like color, data, etc. We used JSON strings for this because it was an easy way to convert dictionaries into a string format that could be stored. This also allowed us to store a lot of information easily and locally, which is something we focused on. The main component visually worked on alongside the backend was the journal navigation because changes to the journal navigation had to refresh this component to match. Overall, this involved the creation of the file system with a database, a file navigation/search system, and filtering integrated.

## Notes On What We Should Do Next Time
- Add header section for UI with logo, name, and date.
- Update filtering options for navigation.
- Add widgets buttons and widgets.
- Fix the various bugs in issues.
- Update UI to be more unified.
- Add tests for each component.
