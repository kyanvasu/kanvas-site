---
sidebar_position: 18
---

# Creating Apps via CLI

For rapid development or testing purposes, we have created a CLI to create new Apps with all their default settings. Before using it, developers must make sure that:

 - The project's containers are running without errors
 - All dependencies have been installed via **composer install**
 - Connection to Kanvas database is successfull
 - Kanvas database migrations ran successfully
 
 After those prerequisites, the following command is used to create a new App:
 
``` bash
 php cli/cli.php setup newapp name_of_app
````

Note: You must be inside the project's main docker container to run this command.
