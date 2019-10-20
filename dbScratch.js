var mongo = require('mongodb');
const async = require('async');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'bibtest';
const actZero = "nm0000698";
const actOne = "nm0001640";

// bucket ... list  YEAAAHHHHHHHHHHHHHH
var titlesSeen = [];
var namesSeen = {
  "nm0000698": [
    'tt0075223', 'tt0081562', 'tt0098282', 'tt0101356'
  ]
};
var currentContacts = {};



/* MongoClient.connect(url, function(err, client){
  //console.log("Connected correctly to server");
  if(err){ console.log(err)}
  const db = client.db(dbName);
  const names = db.collection('names');
    //  process.stdout.write(row.primaryName + ' ');
       names.findOne({nconst: "nm0000102"}).then(data => {console.log(data.titles) ; client.close()})

  }); */

firstDegreeContact(actZero, actOne).then( data => {
  console.log(data)
});


async function secondDegreeContact(contactZero, contactOne){
  returnTitles(contactZero, function(dataZero){
    console.log("contactZero at titles")
    returnTitles(contactOne, function(dataOne){
      console.log("contactOne at titles")

    })
  })
}
async function firstDegreeContact(contactZero, contactOne){
  return new Promise( function(resolve, reject){
    returnTitles(contactZero, function(dataZero){
      console.log("contactZero at titles")
      returnTitles(contactOne, function(dataOne){
        console.log("contactOne at titles")
        matchTitles(dataZero, dataOne).then(data => {
            resolve(data);
        })
      })
    })
  })
}
async function matchTitles(titlesZero, titlesOne){ // compares arrays of tconst to return list of titles common to two different actors/actresses
  return new Promise( function(resolve, reject){
    let arr = titlesZero.filter(element => titlesOne.includes(element));
    resolve(arr);
  })
}
function returnTitles(nameConst, cb){ // returns tconst array of all titles an actor/actress has been in
  console.log(nameConst)
  if(nameConst in namesSeen){
    console.log('SO THIS WORKED')
    return cb(namesSeen[nameConst])
  } else {
    MongoClient.connect(url, function(err, client){
      //console.log("Connected correctly to server");
      if(err){ console.log(err)}
      const db = client.db(dbName);
      const names = db.collection('names');
        //  process.stdout.write(row.primaryName + ' ');
      names.findOne({nconst: nameConst }).then(data => {
        client.close();
        console.log("DB CALL");
        return cb(data.titles);
      })
    });
  }
}
