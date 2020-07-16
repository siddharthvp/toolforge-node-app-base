/* eslint-env node, es6 */

// framework for setting up a server, see https://www.npmjs.com/package/express
const express = require('express');

// bot framework for interacting with the wiki, see https://www.npmjs.com/package/mwn
const mwn = require('mwn');

// sql library for making database accesses, see https://www.npmjs.com/package/mysql
const mysql = require('mysql');

// bot account and database access credentials, if needed
const crendentials = require('./credentials.json');

const app = express();

app.use(express.json()); // for parsing the body of POST requests

app.use(express.static('static')); // serve files in the static directory

const port = parseInt(process.env.PORT, 10); // necessary for the tool to be discovered by the nginx proxy

const sql = mysql.createConnection({
	host: 'enwiki.analytics.db.svc.eqiad.wmflabs',
	port: 3306,
	user: crendentials.db_user,
	password: crendentials.db_password,
	database: 'enwiki_p'
});

// You may want to sign in with a bot account if you want to make use of high bot
// API limits, otherwise just remove the username and password fields below.
const client = new mwn({
	apiUrl: 'https://en.wikipedia.org/w/api.php',
	username: crendentials.bot_username,
	password: crendentials.bot_password
});

// need to do either a .getSiteInfo() or .login() before we can use the client object
client.getSiteInfo().then(() => {

	// Serve index.html as the homepage
	app.get('/', (req, res) => {
		res.sendFile(__dirname + '/static/index.html');
	});

	app.get('/get_endpoint', (req, res) => {
		// req.query gives the GET parameters
		res.send('Hello World!');
	});

	app.post('/post_endpoint', (req, res) => {
		// req.body gives the POST body
		res.send('Hello World!');
	});

	// Sample GET endpoint that returns the wikitext of a specified page
	app.get('/read_wiki_page', (req, res) => {
		var page_name = req.query.page;
		client.read(page_name).then(pg => {
			var page_text = pg.revisions[0].content;
			res.send(page_text);
		});
	});

	app.listen(port, () => console.log(`Example app listening at port ${port}`));

});