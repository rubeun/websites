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

let show

function populateVODMenu(showsArr, populateCompleted) {
	let $vodBox = $('#vod-box');
	//console.log(showsArr);
	showsArr.forEach(show => {
		let showTemplate = `
			<h4 id="${show['show-id']}">${show['show-title']}</h4>
			<div>
				<p>${show['show-name']}</p>
				<p>${show['note']}</p>
				<p>Performers:
					<ul>
					</ul>
				</p>
				<p><a href="${show['facebook-event-url']}" target="_blank">Facebook Event Page</a></p>
			</div>`;
		$vodBox.append(showTemplate);
		
	});
	
	populateCompleted();

}


function loadShows(loadCompleted) {
	// get show info from JSON
	fetch('../show-info.json')
		.then(function(response) {
			return response.json();
		})
		.then(function(showsObj) {
			populateVODMenu(showsObj.shows, function() {
				loadCompleted();
			});
		});
}


$( document ).ready(function() {	

	loadShows(function() {
		console.log("Shows loaded");
	});
	

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
		}
		// Change iFrame source to new Video's source & update the video's title		
		document.getElementById('video-iframe').src = dacastSrc;
		document.getElementById('video-title').innerHTML = "Now Playing: " + videoTitle;
		
	});  
    
});