jQuery(document).ready(function($) {
	$() 
	
	$("aside nav a").append("<span>&nbsp</span>");
	
	$("aside nav a").hover(function(e) {
	
		$(this)
			.hoverFlow(e.type, { width: 300 }, 200)
			.css('overflow', 'visible')
			.find('span')
			.hoverFlow(e.type, { width: 5 }, 200)
		
	}, function(e) {
		
		$(this)
			.hoverFlow(e.type, { width: 250 }, 200)
			.css('overflow', 'visible')
			.find('span')
			.hoverFlow(e.type, { width: 15 }, 200)
		
	});
	
})

jQuery(document).ready(function($) {
	$() 
	$("nav#leftNav ul li:nth-child(5n-4)").css("background", "#950070"); 
	$("nav#leftNav ul li:nth-child(5n-3)").css("background", "#701C5B"); 
	$("nav#leftNav ul li:nth-child(5n-2)").css("background", "#610049"); 
	$("nav#leftNav ul li:nth-child(5n-1)").css("background", "#CA33A4"); 
	$("nav#leftNav ul li:nth-child(5n-5)").css("background", "#CA5BAE");

});

//$(function() { // left this in so that if you want to convert to a superfish jQuery menu, you can uncomment this section as needed
 //       $("ul.menu").superfish(); 
//})

$(document).ready(function() {
    var words = $('div#header h1 a').text().split(' ');
    var html = '';
    $.each(words, function() {
        html += '<span style="color:#333300; font-size:130%; vertical-align:middle;">'+this.substring(0,1)+'</span>'+this.substring(1) + ' ';
    });
    $('div#header h1 a').html(html);
});