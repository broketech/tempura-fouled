// Run this for the intial name collection import.
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
  const names = db.collection('names');
  fs.createReadStream('imdb/name.basics.new.tsv')
    .pipe(csv.parse({
       delimiter: '\t',
       headers: true,
       escape:   '\\',
       quote: '\"',
       discardUnmappedColumns: true,
       ignoreEmpty: true
    }))
    .on('data', row => {
    //   console.log(row)
      if(row.primaryProfession.includes('actor') || row.primaryProfession.includes('actress')){
        process.stdout.write(row.primaryName + ' ');
         names.insert(//{ _id: row.tconst, tconst: row.tconst },
          { _id: row.nconst,
            nconst: row.nconst,
            primaryName: row.primaryName,
            birthYear: row.birthYear,
            deathYear: row.deathYear,
            primaryProfession: row.primaryProfession
          }

        )
      }
    })
    .on('error', error => console.log(error));
  });
