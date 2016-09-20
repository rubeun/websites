/**
 * video.js v1.0.0
 * http://www.bawdystreaming.com
 *
 * JS file for VOD/Video On Demand page
 * Dynamically load VOD videos based on user selection
 * 
 * Copyright 2016, Rubeun Tan
 * http://www.rubeun.com
 */


$( document ).ready(function() {

	// Initialise & Set Default Video Source and Title for page
	var dacastSrc = "//iframe.dacast.com/b/52952/f/327345";
	var videoTitle = "Bawdy Storytelling September 2016";
	document.getElementById('video-title').innerHTML = videoTitle;

	$('#vod-box').accordion({
		animate: 500,
		active: 0,
		collapsible: true,
		event: "click",
		heightStyle: "content"
	});


	$("#vod-box h4").on("click", function() {

		//console.log("H4 Clicked");
		
		// Video page ID associates with DaCast video iframe source   
		switch (this.id) {
			//console.log("ID clicked: " + this.id);
			case "bawdy-9-2016":				
				videoTitle = "Bawdy Storytelling September 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/327345";
			break;	 
		
			case "bonafide-9-2016":
				videoTitle = "Bona Fide Storytelling September 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/327405";
			break;	 
		
			case "bawdy-7-2016":
				videoTitle = "Bawdy Storytelling July 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/317802";
			break;	 
		
			case "bonafide-7-2016":
				videoTitle = "Bona Fide Storytelling July 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/317799";
			break;	 		
		
			case "bawdy-6-2016":				
				videoTitle = "Bawdy Storytelling June 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/303760";
			break;	 

			case "bonafide-5-2016":				
				videoTitle = "Bona Fide Storytelling May 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/297500";
			break;	 

				
		}
		
		// Change iFrame source to new Video's source & update the video's title		
		document.getElementById('video-iframe').src = dacastSrc;
		document.getElementById('video-title').innerHTML = videoTitle;
		
	});  
    
});