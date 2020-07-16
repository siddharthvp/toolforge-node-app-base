# toolforge-node-app-base
Base for creating a node.js app hosted on Toolforge, per https://wikitech.wikimedia.org/wiki/Help:Toolforge/Web#node.js_web_services

## How to use

- Git clone this repository and put it in your Toolforge tool's $HOME/www/js directory
- Write your server application in the `server.js` file. Remove the boilerplate code that you don't need.
- Put the static assets in the `static` directory. These will be served as-is.
- Modify the package.json file filling in your details. Modify the copyright notice on the LICENSE file.
- Put your account and toolforge database access credentials in credentials.json, if they're being used.
   - Database access credentials are available from `replica.my.cnf` file in the tool's $HOME.
   - This file is set to be ignored by git. Either you can create this file directly on the Toolforge host, or you can securely transfer it using scp or rsync (linux/mac) or winscp or pscp (Windows).
- Run `npm run test` to test your app locally. This sets up a localhost server on port 3000, which should behave the same way as your tool would on `yourtoolname.toolforge.org`.
   - Use relative URLs to make any API calls to your tool's backend, and for any static loads of resources, so that they work correctly on the test environment as well.
   - But note that Toolforge database accesses will not work correctly on your local. See this [help page](https://wikitech.wikimedia.org/wiki/Help:Toolforge/Database#Connecting_to_the_database_replicas_from_your_own_computer) to connect to database replicas from your own computer.
- Run `npm run deploy` while in Toolforge to start the webservice, or to restart it after a code change.
- To check the logs of your live application running in the Kubernetes container, enter `npm run logs`