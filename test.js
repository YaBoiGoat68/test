//https://codepen.io/juanv/pen/gbgjLe
//Use the code as you want, just replace the access tokens, I don't mind, but it would be
//better if you use your own because I might delete the tokens and the code might no longer work.
//The Twitter and Vine counter require PHP, all other counters only use jQuery.
//PHP code that was used to get Vine followers is at the bottom of the page
//The Twitter counter requires two PHP files, I left some references so you can download those PHP files
//Instagram API - New client apps created on Instagram only give access token for your own photos only. New clients appear as "Sandbox Mode", this doesn't apply for clients you created prior to Instagram adding that restriction. If you want to be able to access your own photos, private or public, you can use http://instagram.pixelunion.net to generate an access token, or you can send you client for review to Instagram. With your access token you can access your own private photos and any other public profile, but you cannot access other people's private photos unless you are following them.
//Code for Twitter and Vine is working, but I don't have a hosting to upload the PHP files.
//Instagram made some changes to their API, now my access token doesn't work, I would have to send my application for review to instagram to get a valid access token. 
//Instagram counter will only work with your access token, my access token only allows me to retrieve information of my profile
//This is not a plugin, this is just to show you how easy it is to retrieve information from APIs...

//Get Usernames
var dribbble = 'juanvargas';
var facebook = 'envato';
var instagram = 'juanv911';
var google_plus = '100542012590159373204';
var youtube = 'envato';
var pinterest = 'envato';
var soundcloud ="3207";
var vimeo = "vimeocuration";
var github = 'desandro';
var twitter = 'codepen';
var behance ="juanv911";
var vine = "1150982282283315200";

//Pinterst API V3
$.ajax({
  url: 'https://api.pinterest.com/v3/pidgets/users/'+pinterest+'/pins',
  dataType: 'jsonp',
  type: 'GET',
  success: function(data) {   
    var followers = data.data.user.follower_count;
    var k = kFormatter(followers);
    $('#posts .pinterest .count').append(k); 
    getTotal(followers); 
  } 
}); 

//Dribble API
//Dribble Access Token
var dr_token = '1c73ffb7859f2c1c37450789dce2369af5caa9e18c3df1fa30485cfad79081d8';
$.ajax({
  url: 'https://api.dribbble.com/v1/users/'+dribbble,
  dataType: 'json',
  type: 'GET',
  data:{access_token: dr_token},
  success: function(data) {   
    var followers = data.followers_count;
    var k = kFormatter(followers);
    $('#posts .dribbble .count').append(k); 
    getTotal(followers); 
  } 
}); 

//Facebook API
//60 Day Access Token - Regenerate a new one after two months
//https://neosmart-stream.de/facebook/how-to-create-a-facebook-access-token/
var token = "EAAXIDV9mIJgBAAQCw78SYNSmLlCmfoTVyaJdqG27BDyU3DdWxz63HVXDvlc4FHaxrsuzyb9Nyd6vJoBYgirPveuZBZBLgkGTV6QZAY4iN4KMclQgZAGUBLI7dA2qyggqtEOSxY4DEwZAct0rNWybHaSzgKZCDBxlkZD";
$.ajax({
  url: 'https://graph.facebook.com/'+facebook,
  dataType: 'json',
  type: 'GET',
  data: {access_token:token,fields:'likes'},
  success: function(data) {   
    var followers = parseInt(data.likes);
    var k = kFormatter(followers);
    $('#posts .facebook .count').append(k); 
    getTotal(followers); 
  } 
}); 

//Instagram API - Retrieve ID from username, then use ID to retrieve follower count
//Create access tokens
//https://www.youtube.com/watch?v=LkuJtIcXR68
//http://instagram.pixelunion.net
var clientID = 'b8ae3c3360824dfe97586571c5ba9b11';
var accessToken = '1466232857.b8ae3c3.bd20e51e608a47ebbf181e9a52026943';
$.ajax({
  url: 'https://api.instagram.com/v1/users/search?q='+instagram+'',
  dataType: 'jsonp',
  type: 'GET',
  data: {access_token: accessToken},
  success: function(data) {
    $.each(data.data, function(i, item) {
      if(instagram == item.username){
        $.ajax({
          url: "https://api.instagram.com/v1/users/" + item.id,
          dataType: 'jsonp',          
          type: 'GET',
          data: {access_token: accessToken},
          success: function(data) {
            var followers = parseInt(data.data.counts.followed_by);
            var k = kFormatter(followers);
            $('#posts .instagram .count').append(k);
            getTotal(followers); 
          }
        });
      } 
    });
  }
});

//Google Plus API
var apikey = 'AIzaSyDXpwzqSs41Kp9IZj49efV3CSrVxUDAwS0';
$.ajax({
  url: 'https://www.googleapis.com/plus/v1/people/' + google_plus,
  type: "GET",
  dataType: "json",
  data:{key:apikey},
  success: function (data) {
    var followers = parseInt(data.circledByCount);
    var k = kFormatter(followers);
    $("#posts .google .count").append(k);
    getTotal(followers); 
  }
});

//YouTube API V3
$.ajax({
  url: 'https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername='+youtube,
  dataType: 'jsonp',
  type: 'GET',
  data:{key:'AIzaSyDXpwzqSs41Kp9IZj49efV3CSrVxUDAwS0'},
  success: function(data) {   
    var subscribers = parseInt(data.items[0].statistics.subscriberCount);
    var k = kFormatter(subscribers);
    $('#posts .youtube .count').append(k); 
    getTotal(subscribers); 
  } 
}); 

//SoundCloud API
var client_id="5a9f3b72a723aac2cffb7ee684a80d9b";
$.ajax({
  url: 'https://api.soundcloud.com/users/'+soundcloud,
  dataType: 'json',
  type: 'GET',
  data:{client_id:client_id},
  success: function(data) {   
    var followers = parseInt(data.followers_count);
    var k = kFormatter(followers);
    $('#posts .soundcloud .count').append(k); 
    getTotal(followers); 
  } 
}); 

//Vimeo V3 API
var vimeo_a_t="961a0b29198b9ed293a6a70d2c160b0f";
$.ajax({
  url: 'https://api.vimeo.com/users/'+vimeo+'/followers',
  dataType: 'json',
  type: 'GET',
  data:{access_token:vimeo_a_t},
  success: function(data) {   
    var followers = parseInt(data.total);
    $('#posts .vimeo .count').append(followers).digits(); 
    getTotal(followers); 
  } 
}); 

//Twitter API - Requires PHP.
//References
//http://stackoverflow.com/questions/17409227/follower-count-number-in-twitter
//https://github.com/J7mbo/twitter-api-php

$.ajax({
  url: 'http://54.175.100.62/twitter/index.php',
  dataType: 'json',
  type: 'GET',
  data:{user:twitter},
  success: function(data) {   
    var followers = parseInt(data.followers);
    $('#posts .twitter .count').append(followers).digits(); 
    getTotal(followers); 
  } 
}); 

//Github
$.ajax({
  url: 'https://api.github.com/users/'+github,
  dataType: 'json',
  type: 'GET',
  success: function(data) {   
    var followers = parseInt(data.followers);
    var k = kFormatter(followers);
    $('#posts .github .count').append(k); 
    getTotal(followers); 
  } 
}); 
//Behance
var bh_client = 'mpX9kGiySp7YxrTCCw6FwNmKvDLNAt49';
$.ajax({
  url: 'https://api.behance.net/v2/users/'+behance,
  dataType: 'jsonp',
  type: 'GET',
  data:{client_id:bh_client},
  success: function(data) {   
    var followers = parseInt(data.user.stats.followers);
    var k = kFormatter(followers);
    $('#posts .behance .count').append(k); 
    getTotal(followers); 
  } 
}); 

//Vine API requires PHP. PHP code is included at the bottom of the page
$.ajax({
  url: 'http://54.175.100.62/vine.php',
  dataType: 'json',
  type: 'GET',
  data:{
    user: vine
  },
  success: function(data) {
    var followers = parseInt(data.followers);
    var k = kFormatter(followers);
    $('#posts .vine .count').append(k); 
    getTotal(followers); 
  } 
});

//Function to add commas to the thousandths
$.fn.digits = function(){ 
  return this.each(function(){ 
    $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
  })
}

//Function to add K to thousands
function kFormatter(num) {
  return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
}
//Total Counter
var total = 0;
//Get an integer paramenter from each ajax call
function getTotal(data) {
  total = total + data;
  $("#total").html(total).digits();
  $("#total_k").html(kFormatter(total));
}

//PHP Code for Vine API
/*
<?php
header('Access-Control-Allow-Origin: *'); 
$vine_username = $_GET['user'];
$json = file_get_contents('https://api.vineapp.com/users/profiles/'.$vine_username);
$obj = json_decode($json,true);
$followers_count = $obj['data']['followerCount'];
$json_array = array('followers'=>$followers_count);
echo json_encode($json_array);
?>
*/