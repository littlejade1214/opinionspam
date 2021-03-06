var https = require('https'); 
var querystring = require('querystring'); 
var fs = require('fs'); 

var contents = fs.readFileSync("params.json");
var jsonContent = JSON.parse(contents);
var postData = querystring.stringify(jsonContent); 
var protohandler = module.exports = function() { 
    this._appkey = "";	
    this._appsecret = "";	
    this._accesstoken = "";	
}

protohandler.prototype = {

    token: function(url, params, callback) {
        var postData = querystring.stringify(params);
        var postHeaders = {  
            'Content-Type': 'application/x-www-form-urlencoded'  
        }; 
        this._request("POST", url, postHeaders, postData, null, fuction(error, data, response) {
            if (error) {
                console.log("error:" + error);
                callback(error, data);
            } else {
                var results = querystring.parse(data);
                // var results = JSON.parse(data);
                this._accesstoken = results["access_token"];
                callback({
                    data: results
                });
            }
        });
    }

    post: function(url, params, callback) {  
        if (!this._accesstoken) return callback("authentication process failed.");  
        var postData = querystring.stringify(params);  
        var postHeaders = {  
            'Content-Type': 'application/x-www-form-urlencoded'  
        };  
        if (params.ContentType) {  
            postHeaders['Content-Type'] = params.ContentType;  
        }  
        this._request("POST", url, postHeaders, postData, this._accesstoken, callback);  
    }

    _request: function(method, url, headers, post_body, access_token, callback) {
    	
    }
}
