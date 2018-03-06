const pg = require('pg');
const cool = require('cool-ascii-faces');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
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
