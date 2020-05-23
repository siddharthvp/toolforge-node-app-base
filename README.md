# toolforge-node-app-base
Base for creating a node.js app hosted on Toolforge

## How to use

- Git clone this repository to your Toolforge tool's $HOME/www/js directory
- Write your server application in the `server.js` file.
- Put the static assets in the `static` directory. These will be served as-is. 
- Modify the package.json file filling in your details. Modify the copyright notice on the LICENSE file.
- Run `npm run deploy` in Toolforge to start the webservice, or to restart it after a code change.
 
