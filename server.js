// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const fs = require( "fs" );
const xml2js = require( "xml2js" );
 
// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/parse.html");
  });
  app.get("/public/parse.js", (request, response) => {
    response.sendFile(__dirname + "/public/parse.js");
});
app.get("/public/OrbitControls.js", (request, response) => {
    response.sendFile(__dirname + "/public/OrbitControls.js");
});

app.get("/apinum", (request, response) => {
    const xmlData = fs.readFileSync( __dirname + "/assets/bldg/53392546_bldg_6697.gml","utf-8" );

    fs.readdir(__dirname + "/assets/bldg", function(err, files){
        if (err) throw err;


        for (const file of files) {
        app.get("/api" + file, (request, response) => {
            let count = 0;
            let result = [];
//            const xmlData = fs.readFileSync( __dirname + "/assets/bldg/53392546_bldg_6697.gml","utf-8" );
        
            fs.readdir(__dirname + "/assets/bldg", function(err, files){
                if (err) throw err;
                // var fileList = files.filter(function(file){
                //     return fs.statSync(file).isFile() && /.*\.gml$/.test(file); //絞り込み
                // })
        
                const data = fs.readFileSync(__dirname + "/assets/bldg/" + file);
        
                // for (const d of data) {
                xml2js.parseString( data , function (err, result2) {
                    if( err ) {
                        console.log( err.message );
                    }else{
                        result.push(result2);
                        // console.log(count--);
                        response.json(result);
                    }
                        
                });
            
                // }
        
        
            });
        });
        }

        // var fileList = files.filter(function(file){
        //     return fs.statSync(file).isFile() && /.*\.gml$/.test(file); //絞り込み
        // })
        console.log(files);
        response.json(files);

    });
});
    
// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(80, () => {
  console.log("Your app is listening on port " + 80);
});

