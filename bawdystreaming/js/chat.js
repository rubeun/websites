/**
 * chat.js v1.0.0
 * http://www.bawdystreaming.com
 *
 * JS file handling the real-time Anonymous Chat (no login required) using HTML5 SSE (Server Sent Event) 
 * Chatlog using a rudimentary TXT file since there is no need to security.
 * 
 * Copyright 2016, Rubeun Tan
 * http://www.rubeun.com
 */

var ChatEngine=function(){
     var name=" ";
     var inputName = "";
     var msg="";
     var chatBox=document.getElementById("chat-box");
     var oldata ="";
     var sevr=" ";
     var xhr=" ";
     //initialzation
     this.init=function(){
          if(EventSource){
          this.setName("");
          this.initSevr(); 
          } else{
          alert("Use latest Chrome or FireFox");
        }
     };
     //Setting user name
     this.setName=function(inputName){
          if (!name || name === "" || name === " ") {
             name = "Anonymous";  
          } else if (inputName !== "") {
          	 name = inputName;
          }
          name = name.replace(/(<([^>]+)>)/ig,"");
          console.log("Name set to: " + name);
     };
     //For sending message
     this.sendMsg=function(){ 
          msg=document.getElementById("msg-input").value;
          chatBox.innerHTML+='<div class="chatmsg"><b>'+name+'</b>: '+msg+'<br/></div>';
          oldata='<div class="chatmsg"><b>'+name+'</b>: '+msg+'<br/></div>';
          $("#chat-box").scrollTop($('#chat-box')[0].scrollHeight);
          $("#msg-input").val("").focus();     
          this.ajaxSent();
          console.log("Sending Message");            
          return false;
     };
     //sending message to server
     this.ajaxSent=function(){
          try{
               xhr=new XMLHttpRequest();
          }
          catch(err){
               alert(err);
          }
          xhr.open('GET','../chat-controller.php?msg='+msg+'&name='+name,true);
          xhr.onreadystatechange = function(){
               if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                         msg.value="";
                    }
               }     
          };
          xhr.send();
          console.log("Message Sent to Server");
     };
     //HTML5 SSE(Server Sent Event) initilization
     this.initSevr=function(){
          sevr = new EventSource('../chat-controller.php');
          sevr.onmessage = function(e){ 
	          if(oldata!=e.data){
	          		console.log("Old Data: " + oldata + "vs New Data: " + e.data)
	               chatBox.innerHTML+=e.data;
	               oldata = e.data;
	               console.log("Incoming Message");
		            $("#chat-box").scrollTop($('#chat-box')[0].scrollHeight);	     
	          }
          };
     };
};

// Create & Initialise Object for Chat Engine
var chat= new ChatEngine();
chat.init();

// Detect when Return key is pressed after Name is typed in
$("#chat-name-input").keypress(function(event) {
	if (event.which == 13) {
		event.preventDefault();
		chat.setName( $('#chat-name-input').val() );
		$(".blink").removeClass("blink");
		$("#chat-name-input").addClass("chat-name-set");
		$("#msg-input").focus();
		$("#msg-title").addClass("blink");
		console.log("Return Pressed in Name Input");		  
   }
});

// Detect when Return key is pressed after Message is written
$("#msg-input").keypress(function(event) {
	if (event.which == 13) {
		event.preventDefault();
		chat.sendMsg();
		$("#msg-title").removeClass("blink");		
		console.log("Return Pressed in Chat Input");		  
   }
});

