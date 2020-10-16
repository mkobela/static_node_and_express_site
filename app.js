/***
 * @author Michael Kobela <mkobela@gmail.com>
 ***/

/******************************************
Treehouse FSJS Techdegree:
Project 6 - Static Node and Express Site
******************************************/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));

// load JSON data
app.use('/static', express.static('public'));
const { projects } = require('./data.json');

// use PUG for view engine
app.set('view engine', 'pug');

// default route to projects page
app.get('/', (req, res) => {
  res.render('index', { projects });
});

// route for about page
app.get('/about', (req, res) => {
  res.render('about');
});

// route for individual projects
app.get('/project/:id', (req, res) => {
  const { id } = req.params;
  if(id >= projects.length){
    // unavailable project selected, process error
    errorHandler(res);
  }else{
    // render the selected project
    res.render('project', { project: projects[id], images: projects[id].images_urls.slice(1) });
  }
});

// all other routes handled as 404
app.use((req, res, next) => {
  errorHandler(res);
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});

/***
 * @function errorHandler 
 * @property {res} resonse - HTTP response object
***/
function errorHandler(res){
  // log error to console
  const error = new Error('Page Not Found');
  error.status = 404;
  console.log(error);

  // now send user friendly message to agent
  res.writeHead(error.status);
  res.write('<h1>Oops, that page does not exist!</h1>');
  res.end();
}