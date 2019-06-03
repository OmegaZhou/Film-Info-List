# Films-Info-List: Web Assignment
***
## Server address:
* The server address of the project is <a href="">134.209.103.188:1998 </a>
## Environment:
* Front-end:
	* HTML
	* CSS
	* JavaScript with jQuery
* Back-end:
	* Use mysql8.0 to save data
	* Based on Javascript with node.js
	* Use the express framework
	* Other module can be seen in the package.json
## Implemented Function
* Use mysql and JavaScript to get data
* Implement the paging function.
* Provide a simply user interface.
* Implement the seach function about the film name and casts name.
* Implement the film detail interface.
## How to use
* Client:
 * Enter the web through the server addresss
 * Click page link to get other page
 * Click the image or title of film to get the information of film
 * Use search bar to search the film by film title or casts name
* Server:
	* Download the project
	* Install mysql
	* Install node.js
	* Install forever module of node.js 
	* Create the database for the project by mysql
	* Modify the .config.json according to the information of your database
	* Run ``` source create_table.sql ```and ```source search.sql``` in mysql to build the database
	* Run ``` node init.js ``` to init save data from films_all.json to the database
	* Run ``` forever start server.js``` to start server

## Project folder structure
<pre>
|-- root
    |-- .config.json	
    |-- create_table.sql
    |-- detail.html
    |-- films_all.json
    |-- index.html
    |-- init.js
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- search.sql
    |-- server.js
    |-- public
        |-- ajax-loader.gif
        |-- jquery-3.4.1.min.js
</pre>
* README.md: Introduction to the project
* package.json/package-lock.json:Save the dependent package infotmation
* .config.json: Save the config for accessing mysql
* create_table.sql: Create table for database
* searche.sql: Create procedure for search
* films_all.json:The data of films
* init.js:Init the database
* server.js:Run as server
* index.html:Home page for user
* detail.html:Be used to display the detail information of a film
* public:Save the static file
## Technology stack introduction
### Front-end 
* use the html and css to display the page
* Use the Javascript to achieve interaction function
* Use jQuery library to connect with the server
### Back-end
* Use mysql to save the film data
* Use node.js to build the server
* Use the express framework assisting to build the server 
