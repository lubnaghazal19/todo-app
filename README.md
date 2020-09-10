# todo-app
There are two APIs in this project /add with POST method to enter records in database, and /list with GET method to fetch data from database.   A cron is scheduled which runs after every 1 minute and checks if the duration of the task has expired. If so, it deletes the document from collection.
