# tempura-fouled
A series of scripts to stuff IMDB datasets into mongodb.

## How
-Clone or download this project, move into the `tempura-fouled` folder, then run `npm install` in the cloned repo directory.
-Download and unpack the IMDB datasets from [here](https://datasets.imdbws.com/) into a folder called 'imdb' under `tempura-fouled`. 
-Run the scripts one by one, all values are hardcoded atm. 
 For example running `node title.principals.importDb.js` will import `imdb\title.principals.tsv` to mongodb locally.

## TODO
The whole pile of code smells, and you have to run the scripts one by one. I would like to fix that.
