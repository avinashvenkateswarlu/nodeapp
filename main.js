    var rp = require('request-promise');
    
    var options = {
    method: 'POST',
    uri: 'https://chnsfbweb.hclt.corp.hcl.in/Autodiscover/AutodiscoverService.svc/root/oauth/user',
    headers:{
        Authorization : "Bearer cwt=AAEBHAEFAAAAAAAFFQAAABUk4xMYEWGJnC0K52Q5DACBEEYMR7YJluJdnKGJaeB-LGCCAqbsgyBMMr2IHBeal36sxkUF96MDiunTIjFvkGCo2-lZOpEe24YIdEdgFR6L1AgNEGIZMtLK71hUo_oohgmR6JE"
    },
    resolveWithFullResponse: true
};


        rp(options)
    .then(function (response) {
        console.log(response);
        
    })
    .catch(function (err) {
        console.log(err);
    });



/*
 {
  "conversationId": "4XmGbI9zwv69LIVEvc8Hjx",
  "token": "xtFDtPemROU.dAA.NABYAG0ARwBiAEkAOQB6AHcAdgA2ADkATABJAFYARQB2AGMAOABIAGoAeAA.8rEbp46y0gE.jgg983qV344.jpHr1EF1mhCku1JRPEO5pdBgOo3gpQnJJkoVUKsol64",
  "expires_in": 1800
}
 
 api key: 08DIypwMP9w.cwA.TTY.yZ75fhY90DNvtfi4ccV78GTrR7c_Xx2MQThRc0YzTIs

var app = angular.module("LMSChat", ['ngStorage','MyHCLApp']);
 app.controller('chatCtrl', ['$scope','$http','$localStorage','$timeout','network', function($scope,$http,$localStorage,$timeout,network) {


var baseURL = 'https://directline.botframework.com/api';
var employeeName;
// Get Employee Name
$scope.welcomeMessage = {};
$scope.Botmessages = [];
var header = $localStorage.header?$localStorage.header:{};
header.SapID = $localStorage.sap_id;
var params = {
    url: urls.getHolidayCalendar,
    data: {
        header: header,
        payload: {
         EmployeeCode:$localStorage.sap_id,HolidayParameter:"EMP"
        }
    }
}


network.makeNetworkRequest($http, params, function (response) {
                
        if(response){
         if(response.header.error_id == 0 && response.payload != null)
                 {
                   employeeName = response.payload.HolidayCalanderDetails[0].EmployeeName;
                   $scope.welcomeMessage.text = "Welcome "+employeeName+" to LMS ChatBot. You can query about your leave balance here";
                   $scope.welcomeMessage.from = "LMSChatBot_1";
                   $scope.Botmessages.push($scope.welcomeMessage)
                   console.log(employeeName);
                 }
        }
        });


// Get Token


getToken();


function getToken(){
        $http.defaults.headers.common.Authorization = 'BotConnector NYfN95fYB4k.cwA.Ck4.TRdaSliwJlKw5C8gu1UVCK6Pk9mGYGJcGqFCRD6DksI';
        $http({method: 'GET',
                url: baseURL+'/tokens'})
        .then(function successCallback(response) {
                $scope.botToken = response.data;
                createConversation(response.data)
    console.log('Token: ',$localStorage.botToken);
  }, function errorCallback(response) {
    console.log('Error: ',response);
  });


}


// Create conversation


function createConversation(tokenId){
        $http.defaults.headers.post.Authorization = 'BotConnector '+ tokenId; 
                $http({method: 'POST',
                        url: baseURL+'/conversations'
                })
                .then(function successCallback(response) {
                        $scope.conversationID = response.data.conversationId;
                console.log('ConversationID: ',response.data.conversationId);
        }, function errorCallback(response) {
                console.log('Error: ',response);
        });
}


// Post Message in Conversation


$scope.postMessage = function(){
//      var msg = $scope.message+"~"+$localStorage.header.device_id+"~"+$localStorage.header.expiry_timespan+"~"+$localStorage.header.session_token+"~"+$localStorage.sap_id;
//      console.log(msg);
        $http.defaults.headers.post.Authorization = 'BotConnector '+ $scope.botToken; 
                $http({method: 'POST',
                        url: baseURL+'/conversations/'+$scope.conversationID+'/messages',
                        data: { text: $scope.message,
                                        channelData: {
                                                sapID : $localStorage.sap_id,
                                                sessionID : $localStorage.header.session_token,
                                                deviceID : $localStorage.header.device_id,
                                                expiryTime : $localStorage.header.expiry_timespan,
                                                empName: employeeName
                                        }
                        }
                })
                .then(function successCallback(response) {
                        $scope.message = "";
                        getMessages();
                console.log('Post: ',response);
        }, function errorCallback(response) {
                console.log('Error: ',response);
        });
}


function getMessages(){
        $http.defaults.headers.common.Authorization = 'BotConnector '+ $scope.botToken; 
                $http({method: 'GET',
                        url: baseURL+'/conversations/'+$scope.conversationID+'/messages',
                })
                .then(function successCallback(response) {
                        $scope.Botmessages = response.data.messages;
                        $scope.Botmessages.splice(0, 0, $scope.welcomeMessage);
                                $timeout(function(){getBotMessages()}, 10000);
                        
                console.log('botreply: ',response);
        }, function errorCallback(response) {
                console.log('Error: ',response);
        });
}




function getBotMessages(){
        $http.defaults.headers.common.Authorization = 'BotConnector '+ $scope.botToken; 
                $http({method: 'GET',
                        url: baseURL+'/conversations/'+$scope.conversationID+'/messages',
                })
                .then(function successCallback(response) {
                        
                                $scope.Botmessages = response.data.messages;
                                $scope.Botmessages.splice(0, 0, $scope.welcomeMessage);
                console.log('botreply: ',response);
        }, function errorCallback(response) {
                console.log('Error: ',response);
        });
}


$scope.getClassName = function(message){
        if(message.from  == "LMSChatBot_1"){
                return "lmschat"
        }else{
                return "employeechat";
        }
}
}]);
 */