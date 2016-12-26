// JavaScript Document
jQuery(document).ready(function($) {
	$() 


});

$(document).ready(function() {
    var posttitle = $('div#post-title h2').text().split(' ');
    var html = '';
    $.each(posttitle, function() {
        html += '<span style="font-size:130%; vertical-align:middle;">'+this.substring(0,1)+'</span>'+this.substring(1) + ' ';
    });
    $('div#post-title h2').html(html);
});