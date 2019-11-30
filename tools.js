const request = require('request');
const mysql = require('mysql');

module.exports = {
    
/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random imaes
 * @return array of image URLs
 */
getRandomImages_cb: function (keyword, imageCount, callback){
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=350da2e9928b6801d2800e6135025b932dd9e408d07c90fb056d1f07a0c289bd";
    request(requestURL, function (error, response, body) {
        if (!error) {
            var parsedData = JSON.parse(body);
            //console.log("image url:", parsedData["urls"]["regular"]);
            var imageURLs = [];
            for (let i = 0; i < 9; i++){
                imageURLs.push(parsedData[i].urls.regular);
            }
            //console.log(imageURLs);
            
            //return imageURLs;
            callback(imageURLs);
        }else {
            console.log("error", error);
        }
        
    });
},




/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random imaes
 * @return array of image URLs
 */
getRandomImages: function(keyword, imageCount){
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=350da2e9928b6801d2800e6135025b932dd9e408d07c90fb056d1f07a0c289bd";
    
    return new Promise(function(resolve, reject){
        request(requestURL, function (error, response, body) {
            var imageURLs = [];
            if (!error) {
                var parsedData = JSON.parse(body);
                var errorParsedData = JSON.parse('{"errors:":["No photos found."]}');
                
                if (parsedData.error == "No Photos Found."){
                    alert("Invalid search");
                }else {
                    if(imageURLs != null && parsedData[0].urls.regular != errorParsedData){
                        //console.log("image url:", parsedData["urls"]["regular"]);
                        for (let i = 0; i < imageCount; i++){
                            imageURLs.push(parsedData[i].urls.regular);
                        }
                        //console.log(imageURLs);
                        
                        //return imageURLs;
                        //callback(imageURLs);
                        resolve(imageURLs);
                    }
                }
            }else {
                console.log("error", error);
            }
        });
        
    });
},

/**
 * created database connection
 * @return db connection
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