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
