const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const PORT        = process.env.PORT;
const api         = require('./controller/api.js');
const app         = express();

const MongoClient = require('mongodb').MongoClient;
const URL         = process.env.DB;
const dbName      = 'fcc_jtodd';
const client      = new MongoClient(URL, {useNewUrlParser: true});

app.use(express.static('public'));
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

client.connect(err => {
  if (err) console.log('Db connection error');
  const db = client.db(dbName);
  api(app, db);
  app.listen(PORT, () => console.log('Your app is listening on port ' + PORT));
});
