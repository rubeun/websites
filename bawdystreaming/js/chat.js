/**
 * chat.js v1.0.0
 * http://www.bawdystreaming.com
 *
 * JS file handling the real-time Anonymous Chat (no login required) using HTML5 SSE (Server Sent Event) 
 * Chatlog using a rudimentary TXT file since there is no need to security.
 * 
 * Copyright 2017, Rubeun Tan
 * http://www.rubeun.com
 */
 
let LiveChat = function() {
  let name = " ";
  let inputName = "";
  let msg = "";
  let $chatBox = $("#chat-box");
  let oldata = "";
  let server = " ";
  let xhr = " ";
  //Initialisation
  this.init = function() {
    if (EventSource){
      this.setChatName("");
      this.initServer(); 
    } else {
      alert("Please update your browser");
    }
  };
  //Setting user name
  this.setChatName = function(inputName) {
    if (!name || name === "" || name === " ") {
      name = "anonymous" + Math.floor(Math.random() * 90 + 10);  
    } else if (inputName !== "") {
      name = inputName;
    }
    name = name.replace(/(<([^>]+)>)/ig,"");
    console.log("Name set to: " + name);
  };
  //For sending message
  this.sendMessage = function() { 
    msg = $("#msg-input").val();
    $chatBox.append('<div class="chatmsg"><b>' + name + '</b>: ' + msg + '<br/></div>');
    oldata = '<div class="chatmsg"><b>' + name + '</b>: ' + msg + '<br/></div>';
    $("#chat-box").scrollTop($('#chat-box')[0].scrollHeight);
    $("#msg-input").val("").focus();     
    this.ajaxSent();
    console.log("Sending Message...");            
    return false;
  };
  //sending message to server
  this.ajaxSent = function() {
    try {
      xhr = new XMLHttpRequest();
    } catch(error) {
      console.log("ajaxSent Error: ", error);
    }
    xhr.open('GET','../chat-controller.php?msg=' + msg + '&name=' + name, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
              msg = "";
        }
      }     
    };
    xhr.send();
    console.log("Message Sent to Server");
  };
  //HTML5 SSE(Server Sent Event) initilization
  //If new message received, update $chatBox for page & scroll to bottom to keep latest message in view
  this.initServer = function() {
    server = new EventSource('../chat-controller.php');
    server.onmessage = function(event) { 
      if (oldata != event.data){
        console.log("Old Data: " + oldata + "vs New Data: " + event.data);
        $chatBox.append(event.data);
        oldata = event.data;
        console.log("Incoming Message");
        $("#chat-box").scrollTop($('#chat-box')[0].scrollHeight);	     
      }
    };
  };
};


// ###### Initialise Chat ######
$(document).ready(function(){

  // Create & Initialise Chat Engine
  let chat = new LiveChat();
  chat.init();

  // ###### KeyPress Events ######
  // Detect when Return key is pressed after chat name is input, then focus on message input box
  $("#chat-name-input").keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      chat.setChatName( $('#chat-name-input').val() );
      $(".blink").removeClass("blink");
      $("#chat-name-input").addClass("chat-name-set");
      $("#msg-input").focus();
      $("#msg-title").addClass("blink");
      console.log("Return Pressed in Name Input");		  
    }
  });

  // Detect when Return key is pressed after Message is input
  $("#msg-input").keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      chat.sendMessage();
      $("#msg-input").focus();	
      console.log("Return Pressed in Chat Input");		  
    }
  });
});