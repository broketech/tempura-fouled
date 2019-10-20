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
  fs.createReadStream('imdb/title.basics.tsv')
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

         titles.insert(//{ _id: row.tconst, tconst: row.tconst },
          { _id: row.tconst,
            tconst: row.tconst,
            titleType: row.titleType,
            primaryTitle: row.primaryTitle,
            startYear: row.startYear,
            runtimeMinutes: row.runtimeMinutes,
            genres: row.genres
          }

        )

       process.stdout.write(row.tconst + ' ');
    })
    .on('error', error => console.log(error));
    });
