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
	var dacastSrc = "//iframe.dacast.com/b/52952/f/559508";
	var videoTitle = "Bawdy Storytelling May 2018";
	document.getElementById('video-title').innerHTML = "Now Playing: " + videoTitle;

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

			case "bawdy-05-2018":				
				videoTitle = "Bawdy Storytelling May 2018";
				dacastSrc = "//iframe.dacast.com/b/52952/f/559508";
			break;	 
			case "bawdy-04-2018":				
				videoTitle = "Bawdy Storytelling April 2018";
				dacastSrc = "//iframe.dacast.com/b/52952/f/547910";
			break;	 
			case "bawdy-03-2018":				
				videoTitle = "Bawdy Storytelling March 2018";
				dacastSrc = "//iframe.dacast.com/b/52952/f/534811";
			break;	 
			case "bawdy-01-2018":				
				videoTitle = "Bawdy Storytelling January 2018";
				dacastSrc = "//iframe.dacast.com/b/52952/f/510063";
			break;	 
			case "bawdy-12-2017":				
				videoTitle = "Bawdy Storytelling December 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/496088";
			break;	 
			case "bawdy-11-2017":				
				videoTitle = "Bawdy Storytelling November 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/477152";
			break;	 
			case "bawdy-10-2017":				
				videoTitle = "Bawdy Storytelling October 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/463595";
			break;	 
			case "bawdy-09-2017":				
				videoTitle = "Bawdy Storytelling September 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/449294";
			break;	 
			case "bawdy-07-2017":				
				videoTitle = "Bawdy Storytelling July 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/430243";
			break;	 
			case "bawdy-05-2017":				
				videoTitle = "Bawdy Storytelling May 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/410368";
			break;	 
			case "bawdy1-02-2017":				
				videoTitle = "Bawdy Storytelling February 2017 7pm";
				dacastSrc = "//iframe.dacast.com/b/52952/f/378991";
			break;	 
			case "bawdy2-02-2017":				
				videoTitle = "Bawdy Storytelling February 2017 10pm";
				dacastSrc = "//iframe.dacast.com/b/52952/f/378892";
			break;	 						
			case "bawdy-01-2017":				
				videoTitle = "Bawdy Storytelling January 2017";
				dacastSrc = "//iframe.dacast.com/b/52952/f/364902";
			break;	 
			case "bawdy-12-2016":				
				videoTitle = "Bawdy Storytelling December 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/354265";
			break;	 
			case "bawdy-11-2016":				
				videoTitle = "Bawdy Storytelling November 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/339340";
			break;	 
			case "bawdy-10-2016":				
				videoTitle = "Bawdy Storytelling October 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/333799";
			break;	 
			case "bawdy2-9-2016":				
				videoTitle = "Bawdy Storytelling September FSF 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/328452";
			break;	 
			case "bawdy1-9-2016":				
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
				dacastSrc = "//iframe.dacast.com/b/52952/f/327792";
			break;	 

			case "bonafide-5-2016":				
				videoTitle = "Bona Fide Storytelling May 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/f/327769";
			break;	 

			case "bawdy-summer-package-2016":				
				videoTitle = "Bawdy Storytelling Summer Package 2016";
				dacastSrc = "//iframe.dacast.com/b/52952/p/260148";
			break;	 		
				
		}
		
		// Change iFrame source to new Video's source & update the video's title		
		document.getElementById('video-iframe').src = dacastSrc;
		document.getElementById('video-title').innerHTML = "Now Playing: " + videoTitle;
		
	});  
    
});