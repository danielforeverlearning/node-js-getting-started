(1) heroku login
node -v
npm -v
git --version

(2) IF EDITING EXISTING CODE
git clone https://url_to_heroku_github_path

(3) IF BRAND NEW CODE
heroku create
(make sure to write down the "url to heroku github path")


If you have already created your Heroku app, you can easily add a remote to your local repository with the heroku git:remote command. All you need is your Heroku app’s name:

heroku git:remote -a thawing-inlet-61413
set git remote heroku to https://git.heroku.com/thawing-inlet-61413.git





(4) WHEN DONE EDITING CODE TO DEPLOY
git add .
git commit -m "asdfasdf"
git push (giturl) master

(5) MAKE SURE FILES ARE THERE
npm init --yes
(creates package.json)

npm install --save --save-exact cool-ascii-faces
(example: var cool = require('cool-ascii-faces');

npm install
(installs dependencies indicated in package.json)

(Procfile example:
web: node index.js)

(.env example:
TIMES=2)
heroku config:set TIMES=2

(view config .env variables)
heroku config

(6) ADDING A POSTGRES DATABASE
heroku addons:create heroku-postgresql:hobby-dev
heroku config
(edit package.json for example:)
"dependencies": {
    "pg": "6.x",
    "ejs": "2.5.6",
    "express": "4.15.2",
    "cool-ascii-faces": "1.3.4"
}

npm install

(example database code:)
var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

heroku pg:psql  (for database cli)

(6) RUNNING LOCALLY
heroku local
heroku local (route)
(example:
heroku local web
heroku local cool)

(5) RUNNING

heroku ps
heroku ps:scale web=0
heroku ps:scale web=1
heroku open
heroku open (route)
heroku logs --tail









GOT WORKING render.com webservice 6/29/2025 
environment variable BASE_URL 0.0.0.0
node index.js
******** simple custom module datetime example *********
fast-headland-54688




GOT WORKING render.com webservice 6/29/2025 
environment variable BASE_URL 0.0.0.0
node index.js
******** example form and upload file and opening file and reading file *****
stark-ridge-73380



https://api.magicthegathering.io/v1/cards?name=%22nicol%20bolas%22

GOT WORKING render.com webservice 6/29/2025 
environment variable BASE_URL 0.0.0.0
environment variable TIMES 8
node index.js
******** shows example of express.js *************
******** and changed it to use mtgo 3rd party api call ***********
node-js-getting-started





GOT WORKING render.com webservice 6/29/2025 environment variable BASE_URL 0.0.0.0
node index.js
********* simple mtgo 3rd-party api call ************
ancient-eyrie-45718



GOT WORKING render.com webservice 6/29/2025 environment variable BASE_URL 0.0.0.0
node index.js
******** example form *********************
agile-garden-92262


