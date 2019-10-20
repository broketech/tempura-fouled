// for importing pricipals (names) to each title record
var fs = require('fs');
var mongo = require('mongodb');
const csv = require('fast-csv');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'bibtest';


MongoClient.connect(url, function(err, client) {
  //console.log("Connected correctly to server");
  if(err){ console.log(err)}
  const db = client.db(dbName);
  const titles = db.collection('titles');
  const stream = fs.createReadStream('imdb/title.new.principals.tsv');
    csv.parseStream(stream,
      {
       delimiter: '\t',
       headers: true,
       escape:   '\\',
       quote:     '"',
       discardUnmappedColumns: true,
       ignoreEmpty: true,
    })
    .on('data', row => {

      if(row.category.includes('actor') || row.category.includes('actress')){
       //console.log(row)
       process.stdout.write(row.nconst + ' ');
        titles.updateOne(
          { _id: row.tconst, tconst: row.tconst },
          {
            $addToSet: { principals: row.nconst }
          },
          {
            upsert: true
          }
        )
      }


    })
    .on('data-invalid', dataInvalid => console.log('INVALID BEEP: ' + data-invalid))
    .on('error', error => {
      console.log(error);

    })
    .on('end', totalRows => {
      console.log('totalRows: '+ totalRows)
    });
    });
