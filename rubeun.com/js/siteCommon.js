/*
 *	Rubeun.com Javascript Functions 
 *	Created by: Rubeun Tan 
 *	Updated: 8/4/2015
*/


// init the local namespace. All functions should be part of this namespace
var $rubeuncommon = window.$rubeuncommon || {};

// initialize all functions on document ready
$(document).ready(function() {
	
	
	$('.page-inner').fadeOut();
	
	$('.intro-content').on('click', function() {
		$('.page-inner').fadeIn(1000);
	
	});

	$('.back').on('click', function() {
		$('.page-inner').fadeOut();
	
	});
	
});