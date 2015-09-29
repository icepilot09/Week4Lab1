var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('TweetsController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.tweets = [];
    $scope.tweetUser = $routeParams.user + ': ';
    $http.get('/messages')
        .success(function (messages) {
            //$scope.tweets = messages.reverse();
            messages.forEach(function (message) {
                if (message.userName === $scope.tweetUser) {
                    $scope.tweets.unshift(message);
                }
            })

        })
        .error(function (err) {
            console.error(err);
        })
    $scope.postTweet = function () {
        var tweet = {
            text: $scope.tweet,
            userName: $scope.tweetUser
        };
        $http.post('/messages', tweet)
            .success(function () {
                $scope.tweets.unshift(tweet);
            })
            .error(function (err) {
                console.error(err);
            })
    }
}]);

myApp.controller('welcomeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.username = '';
    $scope.login = function () {
        $location.path('/tweets/' + $scope.username);
    }

}]);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '../views/welcome.html',
            controller: 'welcomeController'
        })
        .when('/tweets/:user', {
            templateUrl: '../views/tweets.html',
            controller: 'TweetsController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});




//     myApp.controller('tweetsController', ['$scope', $http, function($scope, $http){
//         
//         getTweets();
//         $scope.user = 'Michael';
//         $scope.text = '';
//         $scope.tweet(){
//             username: $scope.user
//             text: $scope.text
//         };
//         $scope.sendTweet = function(){
//             $http.post('/messages', JSON.stringify($scope.text))
//                 .then(function(){
//                     $scope.tweets.shift($scope.text)
//                     $scope.text = ';'
//                 }).catch function(err){
//                     alert('Something is wrong');
                
//                 }
//         }
//     }])
// function getTweets(){
//     $http.get('/messages')
//     .then (function(result){
//         var arr = result.split('\n');
//         result.data.forEach(function(tweets){
//             $scope.tweets.unshift(JSON.parse(tweet))
//         });
//     })};

















// $(document).ready(function(){

//     var tweets = [];

//     $('.tweet-button').click(function(){
//         if(!validateTweet()) {
//             alert('Missing data!');
//             return;
//         }
        
//         var tweetText = $('.tweet-text').val();
//         postData(tweetText, $('.tweet-user').val());
//     });

//     function postData(text, userName) {
//         var tweet = {};
//         tweet.text = text;
//         tweet.userName = userName;
//         $.ajax({
//             url: '/messages',
//             method: 'POST',
//             data: JSON.stringify(tweet)
//         }).done(function(result) {
//             addTweet(tweet);
//             clearTweet();
//         }).fail(function(err) {
//             alert(err);
//         });
//     }

//     function getData() {
//         $.ajax({
//             url: '/messages'
//         }).done(function(results){
//             var t = results.split('\n');
//             var totTweets = tweets.length == 0 ? 0 : tweets.length - 1;
//             for (var i = totTweets; i < t.length; i++) {
//                 var tweet = JSON.parse(t[i]);
//                 tweets.push(tweet);
//                 addTweet(tweet);
//             }
//         });
//     }
    
//     function addTweet(tweet) {
//         var divTweets = $('.tweets');
//         divTweets.prepend(createTweetDiv(tweet));
//     }

//     function createTweetDiv(tweet){
//         var tdiv = $('<div class="tweet col-md-12"></div>');
//         tdiv.text(tweet.userName + ': ' + tweet.text);
//         return tdiv;
//     }

//     function validateTweet() {
//         if($('.tweet-text').val() === '' || 
//             $('.tweet-user').val() === '') {
//                 return false;
//             }
//         return true;
//     }

//     function clearTweet() {
//         $('.tweet-text').val('');
//     }

//     setInterval(
//         getData, 
//         1000
//     );
// });