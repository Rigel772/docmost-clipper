The Calendar is a special variant of docmost space.
It has tree srtucture for clipped pages:
the top level are pages for each year with page title in format YYYY eg 2026
under each year page there are pages for each month with page title in format "MM - MONTH_NAME" eg "01 - January"
under each month page there are pages for each day with page title in format "DD - DAY_OF_THE_WEEK" eg "01 - Monday"
and under current day page we place the clipped page

So for Space selector options in clipper window we need to add below "+ Add New Space" option: "Clip to Calendar"
If clip to calendar is selected we place the clipped content into calendar tree structure (we need to create all parent branches/pages if they don't exist)

For example if today is Tuesday February 2nd 2026 the workflow would be:
- check if space "Calendar" exists, if not create it
- check if page "2026" exists under "Calendar" space, if not create it
- check if page "02 - February" exists under "2026" page, if not create it
- check if page "02 - Tuesday" exists under "02 - February" page, if not create it
- place the clipped content into "02 - Tuesday" page

On provided screenshot you can see the spaces selector options in clipper window and example calendar tree structure

The API documentation in resources/Docmost API.postman_collection.json
