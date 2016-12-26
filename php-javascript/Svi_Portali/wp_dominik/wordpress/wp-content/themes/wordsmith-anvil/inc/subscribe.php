<?php global $twitterurl, $flickrurl, $foursquareurl, $youtubeurl, $directory, $options;
$options = get_option('anvil_theme_options'); 
$twitterurl = 'http://twitter.com/';
$flickrurl = 'http://www.flickr.com/photos/';
$foursquareurl = 'http://foursquare.com/';
$youtubeurl = 'http://www.youtube.com/user/';
$googleplusurl = 'https://plus.google.com/';
?>

<?php if ( isset($options['follow_disable']) && ($options['follow_disable']!="")) { ?>
        <div class="subscribetxt iestxt"></div>
        <div class="subscribe iesub">
		<?php } else { ?>
        <div class="subscribetxt iestxt">Pratite nas</div>
        <div class="subscribe iesub">
        <a href="<?php bloginfo('rss2_url'); ?>"><img src="<?php echo get_template_directory_uri() . '/images/rss.png'; ?>" width="20" height="20"></a><?php if ( isset($options['facebook_toggle']) && ($options['facebook_toggle']!="") && ($options['facebook']!="")) echo '<a href="' . stripslashes($options['facebook']) . '" target="_blank"><img src="' . $directory . '/images/facebook.png" width="20" height="20"></a>';  else //do nothin here ?><?php if ( isset($options['twitter_toggle']) && ($options['twitter_toggle']!="") && ($options['twitter']!="")) echo '<a href="' . $twitterurl . stripslashes($options['twitter']) . '" target="_blank"><img src="' . $directory . '/images/twitter.png" width="20" height="20"></a>'; else //do nothin here ?><?php if ( isset($options['flickr_toggle']) && ($options['flickr_toggle']!="") && ($options['flickr']!="")) echo '<a href="' . $flickrurl . stripslashes($options['flickr']) . '" target="_blank"><img src="' . $directory . '/images/flickr.png" width="20" height="20"></a>' ; else //do nothin here ?><?php if ( isset($options['foursquare_toggle']) && ($options['foursquare_toggle']!="") && ($options['foursquare']!="")) echo '<a href="' . $foursquareurl . stripslashes($options['foursquare']) . '" target="_blank"><img src="' . $directory . '/images/foursquare.png" width="20" height="20"></a>'; else //do nothin here ?><?php if ( isset($options['youtube_toggle']) && ($options['youtube_toggle']!="") && ($options['youtube']!="")) echo '<a href="' . $youtubeurl . stripslashes($options['youtube']) . '" target="_blank"><img src="' . $directory . '/images/youtube.png" width="20" height="20"></a>'; else // do nothin here  ?><?php if ( isset($options['googleplus_toggle']) && ($options['googleplus_toggle']!="") && ($options['googleplus']!="")) echo '<a href="' . $googleplusurl . stripslashes($options['googleplus']) . '" target="_blank"><img src="' . $directory . '/images/googleplus.png" width="20" height="20"></a>'; else // do nothin here  ?><?php } ?>
</div><!-- END of subscribe  -->