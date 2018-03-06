
const pg           = require('pg');
const cool         = require('cool-ascii-faces');
const express      = require('express')
const path         = require('path')
const PORT         = process.env.PORT || 5000
const formidable   = require('formidable');
var   http         = require('http');
var   https        = require('https');
var   querystring  = require('querystring');
var   MTGO_host    = 'api.magicthegathering.io';
var   searchcard   = "";
var   savestr      = '';
var   saveres;
var   events       = require('events');
var   eventEmitter = new events.EventEmitter();

var   printResultEventHandler = function() {
    console.log('inside printResultEventHandler');
}

eventEmitter.on('printresult', printResultEventHandler);

function savemydata(data) {
    savestr += data;
}

function endbattleaxe() {
    console.log("inside endbattleaxe take a look at savestr");
    console.log(savestr);
    saveres.write("<p>" + savestr + "</p>");
    saveres.end();
}

function battleaxe(res) {
    console.log("inside battleaxe");
    res.setEncoding('utf-8');
    res.on('data', savemydata);
    res.on('end', endbattleaxe);
}


function DoMTGOGetRequest(searchcard, res) {
  var data       = { name: searchcard, };
  var endpoint = '/v1/cards?' + querystring.stringify(data);
  var headers  = {};

  var options = {
    host:   MTGO_host,
    path:   endpoint,
    method: 'GET',
    headers: headers
  };

  res.write("<p>calling mtgo api call to get card data .....</p>");
  saveres = res;

  //ok i think i get it ..... async call to https.request.....
  //it does not wait for return.....
  //straight to execute writeHead writedogdog and write savestr 
  //which has not been filled yet
  //that is why so confusing


  var mtgoreq = https.request(options, battleaxe);
  mtgoreq.write("");
  mtgoreq.end();
}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/mtgo', (req, res) => res.render('pages/mtgo'))
  .post('/aftersubmit', (req, res) => {
      var form = new formidable.IncomingForm();

      //***** do not get confused these console.log are server-side *****
      form.parse(req)
        .on('field', function(name,field) {
            console.log('Got a field:', name);
            res.write('<p>field name: ' + name + '</p>');
            res.write('<p>field: ' + field + '</p>');
            if (name == "cardname_name")
               searchcard = field;
        })
        .on('error', function(err) {
            console.log('Got error: ');
            console.log(err);
            res.write('<p>got an error check console log</p>');
            res.end();
        })
        .on('end', function() {
            console.log('Got to end');
            DoMTGOGetRequest(searchcard, res);
        });
  })
  .get('/cool', (req, res) => res.send(cool()))
  .get('/ejstest', (req, res) => {
      var ejs = require('ejs'),
      animals = ['dog', 'cat', 'cow'],
      html = ejs.render('<%= mystuff.join("++"); %>', {mystuff: animals});
      res.send(html);
  })
  .get('/times', (req, res) => {
      var result = ''
      var times = process.env.TIMES || 5
      for (i=0; i < times; i++)
          result += i + ' ';
      res.send(result);
  })
  .get('/db', (req,res) => {
      pg.connect(process.env.DATABASE_URL, function(err, client, done) {
          client.query('SELECT * FROM test_table', function(err,result) {
              done();
              if (err)
              { console.error(err); res.send("Error " + err); }
              else
              { res.render('pages/db', {results: result.rows} ); }
          });
      });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
