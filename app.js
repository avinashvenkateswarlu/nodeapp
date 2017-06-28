var restify = require('restify');
var builder = require('botbuilder');
var rp = require('request-promise');

var endpoint = "http://localhost:8089/AI-Bot/process-message";

// Create bot and add dialogs
var connector = new builder.ChatConnector({
    appId: "ee12e421-b1a9-46c4-85cb-07af1a80bbf1",
    appPassword: "7WKH4uG2bLARMWi5K8VmuAq"
});
var bot = new builder.UniversalBot(connector);  
bot.dialog('/', function (session) {
    
    if(!session.userData.source || !session.userData.sesid)
    {
        session.userData={"source" : session.message.source, 'sesid' : 'unknown'};
    }
    
        session.userData.message=session.message.text;
    
    /*var options = {
                    method : "POST",
                    uri: 'http://bulgos.in/enter.php',
                    form: {
                        'email' : 'avinash',
                        'password' : 'avi123..' 
                    },
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
                        'content-type': 'application/x-www-form-urlencoded',
                        
                    },
                    resolveWithFullResponse: true
                };*/
    
    var tough = require('tough-cookie');
 
    // Easy creation of the cookie - see tough-cookie docs for details 
    var c = new tough.Cookie({
        key: "JSESSIONID",
        value: session.userData.sesid,
        domain: "localhost",
        httpOnly: true,
        maxAge: 108000
    });
    
    
    
    let cookiejar = rp.jar();
    cookiejar._jar.rejectPublicSuffixes = false;
    cookiejar.setCookie(c, "http://localhost");
    
    var op="";
    if(session.userData.sesid!="unknown")
    {
        op={ uri : endpoint, 
            method : 'POST', 
            form : session.userData, 
            jar: cookiejar
        };
    }
    else
    {
        op={ uri : endpoint, 
            method : 'POST', 
            form : session.userData
        };
    }
    
    

    rp(op).then(function (body) {
        console.log(body)
        response=JSON.parse(body);
        session.userData.sesid=response.sesid;
        
        session.send(response.message);
        //console.log(body);
    })
    .catch(function (err) {
        console.log(err)
    });
    
    
});



 

    
// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', connector.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});

//From iframe: Kw81Xn7wfAUDoVsEUgU8Vw
//From Agent:  0651854e133e48838d3d17a5973e8848

//cookie to set session is JSESSIONID=8E057C58480A72BAC6B508E4957CAFB1