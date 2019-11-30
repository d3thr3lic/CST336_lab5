const request = require('request');
const mysql = require('mysql');

module.exports = { 

    /**
     * Returns random images URLS from an API
     * @param string keyword-search term
     * @param int imageCount - num of images
     * @return array of images of URLs
     */
    getRandomImages_cb: function (keyword, imageCount, callback){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=5991dbc45fea39d95fbd6f48422cc704fb11b861750959a6918de01df02e2174&orientation=landscape";
        request(requestURL,function(error, response, body){
            if(!error){
                var parsedData = JSON.parse(body);
                var imageURL = [];
                for (let i = 0; i < imageCount; i++){
                    imageURL.push(parsedData[i]['urls']['regular']);
                }
                //console.log(imageURL);
                callback(imageURL);
            }else{
                console.log("error: ",error);
            }
        });//request   
    
    },
    
    
    /**
     * Returns random images URLS from an API
     * @param string keyword-search term
     * @param int imageCount - num of images
     * @return array of images of URLs
     */
    getRandomImages: function (keyword, imageCount){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=350da2e9928b6801d2800e6135025b932dd9e408d07c90fb056d1f07a0c289bd";
        return new Promise( function(resolve, reject){
            var imageURL = [];
             request(requestURL,function(error, response, body){
                if(!error){
                    var parsedData = JSON.parse(body);
                    var errorParse = JSON.parse('{"errors:":["No photos found."]}');
                    //console.log(errorParse);
                    if (parsedData.errors != "No photos found."){
                        if(imageURL != null && parsedData[0].urls.regular != errorParse){
                        for (let i = 0; i < imageCount; i++){
                        imageURL.push(parsedData[i].urls.regular);
                        }
                        resolve(imageURL);
                    }
                    else{
                        alert("Invalid Search Result, please try again.");
                        }
                    
                    }
                }else{
                    
                    console.log("error: ",error);
                }
            });//request   
        });//promise  
        
        
        },
     /**
      * creates database connection
      * @returns db connection
      */
    createConnection: function(){
        var conn = mysql.createConnection({
            host: "cst336db.space",
            user: "cst336_dbUser030",
            password: "qq0mon",
            database: "cst336_db030"
        });
        return conn;
    }  
        
        
};