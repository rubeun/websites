//##############################################################################################
// USCMC Database JS https://www.youtube.com/watch?v=BWXggB-T1jQ
//##############################################################################################

$(document).ready(function() {

    var config = new shinejs.Config({
      numSteps: 8,
      opacity: 0.3,
      shadowRGB: new shinejs.Color(255, 255, 255)
    });


	var shine = new Shine(document.getElementById('my-shine-object'), config);
	var str = "";
	
	window.addEventListener('mousemove', function(event) {
		shine.light.position.x = event.clientX;
		shine.light.position.y = event.clientY;
		shine.draw();
	}, false);


	// JQuery UI
	
	$('#accordion').accordion({
		animate: 500,
		active: 0,
		collapsible: true,
		event: "click",
		heightStyle: "content"
	});
	
	$('#shTabs').tabs({
		event: "click",
		show: { effect: "slide", direction: "right", duration: 500 },
		hide: { effect: "slide", direction: "left", duration: 500 },
		active: 0,
		collapsible: true,
		heightStyle: "fill"
	});


	// AJAX CALLS
	
	$("#getTextButton").on("click", getInfoFromServer);
	$("#doubleNumberButton").on("click", getDblFromServer);
	$("#getXMLDataButton").on("click", getXMLFromServer);


	function getInfoFromServer() {
	
		$.ajax({
			type: "GET",
			url: "../textFromServer.txt",
			success: postToPage
		
		});
	
	}
	
	function postToPage(data, status) {
		
		$("#serverMsg").text(data);
		$("").slideDown();
	
	}
	
	
	function getDblFromServer() {
	
		$("span").load("ajax.php", 
			$("#serverForm").serializeArray());
	
	}


	function getXMLFromServer() {
	
		$.ajax({
			type: "GET",
			url: "../uscmc-usssulaco.xml",
			datatype: "xml",
			success: postToPageTwo
		});
	
	}

	function postToPageTwo(data) {
		var str = "";
		
		$('html, body').animate({scrollTop: 1600}, 800);

		$(data).find('crewmember').each(function() {
			// load xml info into variables
			var id = $(this).attr('id');
			var name = $(this).find('name').text();
			var rank = $(this).find('rank').text();
			var role = $(this).find('role').text();
			var sex = $(this).find('sex').text();
			var crewID = $(this).find('crewId').text();
			
/*
			// create div's to append
			$('<div class="name"></div>').html('Name: ' + name).appendTo('#crew');
			$('<div class="rank"></div>').html('Rank: ' + rank).appendTo('#crew');
			$('<div class="role"></div>').html('Role: ' + role).appendTo('#crew');
			$('<div class="sex"></div>').html('Sex: ' + sex).appendTo('#crew');
			$('<div class="crewId"></div>').html('Crew ID: ' + crewID).appendTo('#crew');
*/

					
			str += "<li>" + rank + " " + name + " : " + role + " [" + crewID + "]</li>"; 
		
		
		});

		var i = 0, 
			isTag, 
			text;
	
		(function type() {
		    text = str.slice(0, ++i);
		    if (text === str) return;
		
		    document.getElementById('crew').innerHTML = text;
		
		    var char = text.slice(-1);
		    if( char === '<' ) isTag = true;
		    if( char === '>' ) isTag = false;
		
		    if (isTag) return type();
		    setTimeout(type, 60);
		}());
	}


	// JS Code for Typewriter effect

/*
	var str = "<p>This is my typewriter effect</p>", 
		i = 0, 
		isTag, 
		text;

	(function type() {
	    text = str.slice(0, ++i);
	    if (text === str) return;
	
	    document.getElementById('crew').innerHTML = text;
	
	    var char = text.slice(-1);
	    if( char === '<' ) isTag = true;
	    if( char === '>' ) isTag = false;
	
	    if (isTag) return type();
	    setTimeout(type, 80);
	}());
*/

	// Promises
	
	var getSulacoCrew = $.ajax({
		type: 'GET',
		url: '../uscmc-usssulaco.xml'
	});

	// Output to console if success or rejected
	getSulacoCrew.then(
		function(data){
			// do something with successful data
			console.log(data);
		}, function(xhr, state, error) {
			// do something with error message
			console.log(arguments);
		}
	);
	
	// OR call directly
	
	// Call promise one after the other, call .get, wait for first .then to finish, then pass it to next .then 
	$.get('../uscmc-usssulaco.xml').then(function(profile){
		// return profile data to next .get call
		return $.get('../uscmc-weapons.xml');
	}).then(function(weapon){
		// do something with weapon info
	}, function(xhr, status, error){
		//do something with error message
	});


	// Slideshow
		
	$(".slides > div:gt(0)").hide();
	
	
	
	
	// Tooltip
	
	$('.data-tooltip').on('mouseover', function(e){
		
			if( $(this).attr('data-tooltip-type') === "text" ) {
			
				$('#tooltip-container').html( $(this).attr('data-tooltip-src') );
			
			}

			if( $(this).attr('data-tooltip-type') === "html" ) {
			
				var elementToGet = '#' + $(this).attr('data-tooltip-source');
				var newHTML = $(elementToGet).html();
				$('#tooltip-container').html(newHTML);
			
			}
			
			$('#tooltip-container').css({'display': 'block', 'opacity': 0}).animate({'opacity': 1}, 250);
	
		}).on('mousemove', function(e){
			
			var tooltipWidth = $('#tooltip-container').outerWidth();
			var tooltipHeight = $('#tooltip-container').outerHeight();

			var offX = $('body').offset().left;
			var offY = $('body').offset().top;
//			var offX = 0;
//			var offY = 0;

			var pageWidth = $('body').width();
			
			//console.log('X:'+e.pageX+' Y:'+e.pageY+' top:'+(e.pageY-tooltipHeight+20-offY)+' left:'+(e.pageX-tooltipWidth+20-offX) + ' pageWidth:' + pageWidth);
			
			// If mouse is in right half of page
			if (e.pageX > pageWidth/2) {
				$('#tooltip-container').css('left', (e.pageX-tooltipWidth+20)+'px');		
			} else {
				$('#tooltip-container').css('left', (e.pageX-20)+'px');		
			}	
		
			// If mouse is not at the top of the page		
			if (e.pageY > 100) {
				$('#tooltip-container').css('top', (e.pageY-tooltipHeight-20)+'px');		
			
			} else {
				$('#tooltip-container').css('top', (e.pageY+20)+'px');		
			}
			
		
		}).on('mouseout', function(e){
	
			$('#tooltip-container').animate({'opacity': 0}, 250, function() {
				$('#tooltip-container').css('display', 'none').html('');
			});
			
			
		
		});
	

});
