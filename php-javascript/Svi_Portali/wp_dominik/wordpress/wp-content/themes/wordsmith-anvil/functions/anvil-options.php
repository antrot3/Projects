<?php
	$themename = "Wordsmith Anvil";
	$shortname = "anvil";
	$stylesheet_uri = get_stylesheet_uri();  
	
	define('THEME_NAME', 'Wordsmith Anvil');
	define('THEME_AUTHOR', 'Toms Skyline Design');
	define('THEME_AUTHOR_HOMEPAGE', 'http://www.tomsskylinedesign.com/');
	define('THEME_HOMEPAGE', 'http://www.tomsskylinedesign.com/themes/wordsmith-anvil/');
	define('THEME_VERSION', '2.2.1'); 

	$themeurl = "http://www.tomsskylinedesign.com/themes/wordsmith-anvil";
	
	$directory =  get_template_directory_uri();
	$fcimgalt = 'Theme Developed by Toms Skyline Design';
	$fcimg = '<img src="' . $directory . '/images/hrbg.png" alt="'.$fcimgalt.'" />';
	
	$fc = '<a href="'.THEME_AUTHOR_HOMEPAGE.'" target="_blank" rel="follow">' .$fcimg. '</a>';
	
	// pesky auto p tag removal
	$noexcerptp = remove_filter('the_excerpt', 'wpautop', 9);
	$nocommentp = remove_filter('the_content', 'wpautop', 9);
	
	// user info
	global $current_user;
	get_currentuserinfo();
	if ( is_user_logged_in() ) {
	$themeuser = $current_user->display_name;
	} else {
		$themeuser = 'The Author';
	}
		
	//$options = array();
	  
	$option_group = $shortname.'_theme_option_group';
	$option_name = $shortname.'_theme_options';
	
	// Now let's create a custom menu
	add_action('admin_menu', 'anvil_create_menu');
	
	function anvil_create_menu() {
	
	//we are creating a new top-level menu
	$anvil_menu = add_theme_page( __( THEME_NAME .' Theme Options' ), __( 'Anvil Theme Options' ), 'edit_theme_options', basename(__FILE__), 'anvil_theme_options_page' );
	}
	
	// Load Stylesheet and JavaScript

	function anvil_admin_enqueue_scripts_n_styles(  ) {
		if ( $hook_suffix = 'appearance_page_anvil-options' ) {

		echo "<!-- The hook for the current page is \"";
    	print_r( $hook_suffix );
		echo "\" -->\n";
		
	wp_enqueue_style( 'anvil-admin-css', get_template_directory_uri() . '/functions/styles/admin.css', false, '2.1.1', 'screen' );
	wp_enqueue_script( 'anvil-admin-js', get_template_directory_uri() . '/functions/js/admin.js', false, '2.1.1', false );
		}
}
	add_action( 'admin_print_styles', 'anvil_admin_enqueue_scripts_n_styles' );

	$template_uri = get_template_directory_uri();

	 // We must register the settings
	add_action( 'admin_init', 'register_settings' );
	
	function register_settings() {
	   global $shortname, $anvil_options, $option_group, $option_name, $template_uri, $directory;
	   // Sanitize and validate input. Accepts an array, return a sanitized array.
	function anvil_theme_options_validate($value) {
		
		if ( isset( $value['removewpautop'] ) && ($value['removewpautop']!="") ) $value['removewpautop'] = ( $value['removewpautop'] == true ? true : false );
		
		if ( isset( $value['logo'] ) && ($value['logo']!="") ) $value['logo'] = ( $value['logo'] == true ? true : false );
		if ( isset( $value['anvillogo'] ) && ($value['anvillogo']!="") ) $value['anvillogo'] = ( $value['anvillogo'] == true ? true : false );
		if ( isset( $value['logo_img'] ) && ($value['logo_img']!="") ) $value['logo_img'] = wp_filter_nohtml_kses($value['logo_img']);
		if ( isset( $value['logo_img_alt'] ) && ($value['logo_img_alt']!="") ) $value['logo_img_alt'] = wp_filter_nohtml_kses($value['logo_img_alt']);
		
		if ( isset( $value['tagline'] ) && ($value['tagline']!="") ) $value['tagline'] = ( $value['tagline'] == true ? true : false );
		
		if ( isset( $value['title'] ) && ($value['title']!="") ) $value['title'] = ( $value['title'] == true ? true : false );
		
		if ( isset( $value['sidebar_search'] ) && ($value['sidebar_search']!="") ) $value['sidebar_search'] = ( $value['sidebar_search'] == true ? true : false );
		if ( isset( $value['latest_post'] ) && ($value['latest_post']!="") ) $value['latest_post'] = ( $value['latest_post'] == true ? true : false );
		if ( isset( $value['follow_disable'] ) && ($value['follow_disable']!="") ) $value['follow_disable'] = ( $value['follow_disable'] == true ? true : false );
		if ( isset( $value['twitter_toggle'] ) && ($value['twitter_toggle']!="") ) $value['twitter_toggle'] = ( $value['twitter_toggle'] == true ? true : false );
		if ( isset( $value['twitter'] ) && ($value['twitter']!="") ) $value['twitter'] = wp_filter_nohtml_kses($value['twitter']);
		if ( isset( $value['facebook_toggle'] ) && ($value['facebook_toggle']!="") ) $value['facebook_toggle'] = ( $value['facebook_toggle'] == true ? true : false );
		if ( isset( $value['facebook'] ) && ($value['facebook']!="") ) $value['facebook'] = wp_kses($value['facebook'],'','');

		if ( isset( $value['flickr_toggle'] ) && ($value['flickr_toggle']!="") ) $value['flickr_toggle'] = ( $value['flickr_toggle'] == true ? true : false );
		if ( isset( $value['flickr'] ) && ($value['flickr']!="") ) $value['flickr'] = wp_filter_nohtml_kses($value['flickr']);
		if ( isset( $value['youtube_toggle'] ) && ($value['youtube_toggle']!="") ) $value['youtube_toggle'] = ( $value['youtube_toggle'] == true ? true : false );
		if ( isset( $value['youtube'] ) && ($value['youtube']!="") ) $value['youtube'] = wp_filter_nohtml_kses($value['youtube']);
		if ( isset( $value['foursquare_toggle'] ) && ($value['foursquare_toggle']!="") ) $value['foursquare_toggle'] = ( $value['foursquare_toggle'] == true ? true : false );
		if ( isset( $value['foursquare'] ) && ($value['foursquare']!="") ) $value['foursquare'] = wp_filter_nohtml_kses($value['foursquare']);
		if ( isset( $value['googleplus_toggle'] ) && ($value['googleplus_toggle']!="") ) $value['googleplus_toggle'] = ( $value['googleplus_toggle'] == true ? true : false );
		if ( isset( $value['googleplus'] ) && ($value['googleplus']!="") ) $value['googleplus'] = wp_filter_nohtml_kses($value['googleplus']);
		
		if ( isset( $value['news'] ) && ($value['news']!="") ) $value['news'] = ( $value['news'] == true ? true : false );
		if ( isset( $value['news_feed'] ) && ($value['news_feed']!="") ) $value['news_feed'] = wp_filter_nohtml_kses($value['news_feed']);
		if ( isset( $value['news_name'] ) && ($value['news_name']!="") ) $value['news_name'] = wp_filter_nohtml_kses($value['news_name']);
		if ( isset( $value['external_feed'] ) && ($value['external_feed']!="") ) $value['external_feed'] = ( $value['external_feed'] == true ? true : false );
		if ( isset( $value['feed_name'] ) && ($value['feed_name']!="") ) $value['feed_name'] = wp_filter_nohtml_kses($value['feed_name']);
		if ( isset( $value['feed_url'] ) && ($value['feed_url']!="") ) $value['feed_url'] = wp_kses($value['feed_url'],'','');
		
		if ( isset( $value['enable_formatted_short_posts'] ) && ($value['enable_formatted_short_posts']!="") ) $value['enable_formatted_short_posts'] = ( $value['enable_formatted_short_posts'] == true ? true : false );
		if ( isset( $value['enable_custom_more_link'] ) && ($value['enable_custom_more_link']!="") ) $value['enable_custom_more_link'] = ( $value['enable_custom_more_link'] == true ? true : false );
		if ( isset( $value['show_excerpt'] ) && ($value['show_excerpt']!="") ) $value['show_excerpt'] = ( $value['show_excerpt'] == true ? true : false );
		if ( isset( $value['anvil_post_length'] ) && ($value['anvil_post_length']!="") ) $value['anvil_post_length'] = intval($value['anvil_post_length']);
		if ( isset( $value['anvil_excerpt_length'] ) && ($value['anvil_excerpt_length']!="") ) $value['anvil_excerpt_length'] = intval($value['anvil_excerpt_length']);
		if ( isset( $value['no_pseudo_first_letter'] ) && ($value['no_pseudo_first_letter']!="") ) $value['no_pseudo_first_letter'] = ( $value['no_pseudo_first_letter'] == true ? true : false );
		if ( isset( $value['display_coupon'] ) && ($value['display_coupon']!="") ) $value['display_coupon'] = ( $value['display_coupon'] == true ? true : false );
		if ( isset( $value['display_coupon_blog'] ) && ($value['display_coupon_blog']!="") ) $value['display_coupon_blog'] = ( $value['display_coupon_blog'] == true ? true : false );
		if ( isset( $value['disablethemeta'] ) && ($value['disablethemeta']!="") ) $value['disablethemeta'] = ( $value['disablethemeta'] == true ? true : false );
		
		if ( isset( $value['footer_links'] ) && ($value['footer_links']!="") ) $value['footer_links'] = ( $value['footer_links'] == true ? true : false );
		if ( isset( $value['ftr_title_1'] ) && ($value['ftr_title_1']!="") ) $value['ftr_title_1'] = wp_filter_nohtml_kses($value['ftr_title_1']);
		if ( isset( $value['ftr_url_1'] ) && ($value['ftr_url_1']!="") ) $value['ftr_url_1'] = wp_kses($value['ftr_url_1'],'','');
		if ( isset( $value['ftr_title_2'] ) && ($value['ftr_title_2']!="") ) $value['ftr_title_2'] = wp_filter_nohtml_kses($value['ftr_title_2']);
		if ( isset( $value['ftr_url_2'] ) && ($value['ftr_url_2']!="") ) $value['ftr_url_2'] = wp_kses($value['ftr_url_2'],'','');
		if ( isset( $value['ftr_title_3'] ) && ($value['ftr_title_3']!="") ) $value['ftr_title_3'] = wp_filter_nohtml_kses($value['ftr_title_3']);
		if ( isset( $value['ftr_url_3'] ) && ($value['ftr_url_3']!="") ) $value['ftr_url_3'] = wp_kses($value['ftr_url_3'],'','');
		if ( isset( $value['ftr_title_4'] ) && ($value['ftr_title_4']!="") ) $value['ftr_title_4'] = wp_filter_nohtml_kses($value['ftr_title_4']);
		if ( isset( $value['ftr_url_4'] ) && ($value['ftr_url_4']!="") ) $value['ftr_url_4'] = wp_kses($value['ftr_url_4'],'','');
		if ( isset( $value['ftr_title_5'] ) && ($value['ftr_title_5']!="") ) $value['ftr_title_5'] = wp_filter_nohtml_kses($value['ftr_title_5']);
		if ( isset( $value['ftr_url_5'] ) && ($value['ftr_url_5']!="") ) $value['ftr_url_5'] = wp_kses($value['ftr_url_5'],'','');
		if ( isset( $value['ftr_title_6'] ) && ($value['ftr_title_6']!="") ) $value['ftr_title_6'] = wp_filter_nohtml_kses($value['ftr_title_6']);
		if ( isset( $value['ftr_url_6'] ) && ($value['ftr_url_6']!="") ) $value['ftr_url_6'] = wp_kses($value['ftr_url_6'],'','');
		if ( isset( $value['copyright_name'] ) && ($value['copyright_name']!="") ) $value['copyright_name'] = wp_filter_nohtml_kses($value['copyright_name']);
		if ( isset( $value['wordpress_credits'] ) && ($value['wordpress_credits']!="") ) $value['wordpress_credits'] = ( $value['wordpress_credits'] == true ? true : false );
		if ( isset( $value['developer_credit'] ) && ($value['developer_credit']!="") ) $value['developer_credit'] = ( $value['developer_credit'] == true ? true : false );
		if ( isset( $value['hidden_developer_link'] ) && ($value['hidden_developer_link']!="") ) $value['hidden_developer_link'] = ( $value['hidden_developer_link'] == true ? true : false );
		
		if ( isset( $value['enable_mac_editor'] ) && ($value['enable_mac_editor']!="") ) $value['enable_mac_editor'] = ( $value['enable_mac_editor'] == true ? true : false );
		
		return $value;
	}
	   
		//register our settings
		register_setting( $option_group, $option_name, 'anvil_theme_options_validate' );  
	}
        // Create theme options
		/*
          OPTION TYPES:
          - checkbox: name, id, desc, std, type
          - radio: name, id, desc, std, type, options
          - text: name, id, desc, std, type
          - textarea: name, id, desc, std, type, options
        */ 

		global $anvil_options, $current_user, $themeuser;
		
		$anvil_options = array (
		//Remove Wordpress Auto Paragraph Tags
        array( "name" => __('Disable the Auto-Generated Paragraph Tags', 'wordsmith-anvil'),
               "type" => "section"),
		array( "name" => __('<span>Select if you would like to disable auto paragraph tags.</span>', 'wordsmith-anvil'),

               "type" => "section-desc"),		
		array( "type" =>"open"),
		
        array( "name" => __('Remove From Content &amp; Formatted Short Posts', 'wordsmith-anvil'),
               "id" => "removewpautop",
               "desc" => __('By default Wordpress places opening and closing paragraph tags where they think they belong. However, sometimes their good intent results in your page looking horribly distorted. If you have pages that do not display correctly, try enabling this feature. It might possibly fix the display issue.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "type" =>"close"),		
		
		// Logo  		  
        array( "name" => __('Custom Logo', 'wordsmith-anvil'),
               "type" => "section"),
		array( "name" => __('<span>Insert a 400 x 200 default or custom logo image at the top left of the header. No logo displayed by default.</span>', 'wordsmith-anvil'),
               "type" => "section-desc"),
		array( "type" =>"open"),
   
        array( "name" => __('Enable Default Logo Image', 'wordsmith-anvil'),
               "id" => "anvillogo",
               "desc" => __('Check this box to enable the default logo supplied with this theme. However, if you have this option enabled and you enable the custom logo image, you will not see the default logo displayed. Only your custom logo image will be displayed.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),    
        array( "name" => __('Enable custom logo image', 'wordsmith-anvil'),
               "id" => "logo",
               "desc" => __('Check this box to use a custom logo in the header. <strong>It is advisable to use a 32-bit transparent png file for your logo.</strong> Odds are your logo is not exactly 400px x 200px. So, create a new png image that is 400x200 and import your logo into this new image so it displays properly. Save the image and upload it to the directory listed below.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
        array( "name" => __('Logo image file name', 'wordsmith-anvil'),
               "id" => "logo_img",
               "desc" => __('Upload your logo image here: ', 'wordsmith-anvil') .'<code>' . $directory . '/images/</code>',
               "std" => "",
               "type" => "text"),
        array( "name" => __('Logo image <code>&lt;alt&gt;</code> tag', 'wordsmith-anvil'),
               "id" => "logo_img_alt",
               "desc" => __('Specify the <code>&lt;alt&gt;</code> tag for your logo image.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"),
		array( "type" =>"close"),
			   
		// Title		  
        array( "name" => __('Title', 'wordsmith-anvil'),
               "type" => "section"),
		array( "name" => __('<span>Select whether or not you want to display your site title.</span>', 'wordsmith-anvil'),

               "type" => "section-desc"),		
		array( "type" =>"open"),
		
        array( "name" => __('Do NOT Display Title', 'wordsmith-anvil'),
               "id" => "title",
               "desc" => __('Check to disable the display your Site Title in the Header/Masthead area.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "type" =>"close"),
		
		// Tagline		  
        array( "name" => __('Tagline', 'wordsmith-anvil'),
               "type" => "section"),
		array( "name" => __('<span>Select whether or not you want to display your tagline</span>', 'wordsmith-anvil'),

               "type" => "section-desc"),		
		array( "type" =>"open"),
		
        array( "name" => __('Display tagline', 'wordsmith-anvil'),
               "id" => "tagline",
               "desc" => __('Check to display your tagline in the footer (left side).', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "type" =>"close"),
			   
        // Subscribe and RSS            
        array( "name" => __('Subscribe Links', 'wordsmith-anvil'),
               "type" => "section"),
		array( "name" => __('<span>Enable your subscribe links &amp; add your social network usernames below the checkboxes.</span>', 'wordsmith-anvil'),
               "type" => "section-desc"),		
		array( "type" =>"open"),

        array( "name" => __('Disable all', 'wordsmith-anvil'),
               "id" => "follow_disable",
               "desc" => __('Check this box to hide all follow icons (yes ... even including RSS). Checking this opion will override any other settings for this section.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),             
        array( "name" => __('Enable Twitter', 'wordsmith-anvil'),
               "id" => "twitter_toggle",
               "desc" => __('Using Twitter? Check this box.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),     
        array( "name" => __('Twitter Username', 'wordsmith-anvil'),
               "id" => "twitter",
               "desc" => __('Enter your Twitter username.', 'wordsmith-anvil'),
               "type" => "text"),			        
        array( "name" => __('Enable Facebook', 'wordsmith-anvil'),
               "id" => "facebook_toggle",
               "desc" => __('Check this box to display a link to your Facebook page.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
        array( "name" => __('Facebook link', 'wordsmith-anvil'),
               "id" => "facebook",
               "desc" => __('Enter your Facebook link.', 'wordsmith-anvil'),
               "type" => "text"),			   
        array( "name" => __('Enable Flickr', 'wordsmith-anvil'),
               "id" => "flickr_toggle",
               "desc" => __('Check this box to display a link to your Flickr page.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
        array( "name" => __('Flickr Username', 'wordsmith-anvil'),
               "id" => "flickr",
               "desc" => __('Enter your Flickr username.', 'wordsmith-anvil'),
               "type" => "text"),  			   
		array( "name" => __('Enable YouTube', 'wordsmith-anvil'),
               "id" => "youtube_toggle",
               "desc" => __('Check this box to display a link to your YouTube page.', 'wordsmith-anvil'),
               "std" => "",
				  "type" => "checkbox"),
        array( "name" => __('You Tube Username', 'wordsmith-anvil'),
               "id" => "youtube",
               "desc" => __('Enter your You Tube username.', 'wordsmith-anvil'),
               "type" => "text"), 	 				  
		array( "name" => __('Enable FourSquare', 'wordsmith-anvil'),
               "id" => "foursquare_toggle",
               "desc" => __('Check this box to display a link to your Foursquare page.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
        array( "name" => __('Foursquare Username', 'wordsmith-anvil'),
               "id" => "foursquare",
               "desc" => __('Enter your Foursquare username.', 'wordsmith-anvil'),
               "type" => "text"),  
		array( "name" => __('Enable Google+', 'wordsmith-anvil'),
               "id" => "googleplus_toggle",
               "desc" => __('Check this box to display a link to your Google+ page.', 'wordsmith-anvil'),
               "std" => "",
				  "type" => "checkbox"),
        array( "name" => __('Google+ Account Number', 'wordsmith-anvil'),
               "id" => "googleplus",
               "desc" => __('Enter your Google+ Account Number.', 'wordsmith-anvil'),
               "type" => "text"), 	   			   
		array( "type" =>"close"),
						  
		// Sidebar AKA Aside		   
        array( "name" => __('Sidebar/Aside', 'wordsmith-anvil'),
               "type" => "section"),
		array( "name" => __('<span>Customize your aside AKA sidebar</span>', 'wordsmith-anvil'),
               "type" => "section-desc"),		
		array( "type" =>"open"),
		
        array( "name" => __('Disable Search Bar at top of Sidebar', 'wordsmith-anvil'),
               "id" => "sidebar_search",
               "desc" => __('Check this box to disable display of the search bar at the top of the sidebar, above the menu.', 'wordsmith-anvil'),
               "std" => "",
			   "type" => "checkbox"),
		array( "name" => __('Disable Latest Post in Sidebar', 'wordsmith-anvil'),
               "id" => "latest_post",
               "desc" => __('Check this box to disable display of the latest post in the sidebar, under the menu.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "name" => __('Enable newsletter', 'wordsmith-anvil'),
               "id" => "news",
               "desc" => __('The newsletter sign-up uses Feedburner by default.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
        array( "name" => __('Feed Title', 'wordsmith-anvil'),
               "id" => "news_feed",
               "desc" => __('Title displayed inside the newsletter signup box', 'wordsmith-anvil'),
               "std" =>  "Sign up. Get our newsletter!",
               "type" => "text"),
        array( "name" => __('Feedburner feed name', 'wordsmith-anvil'),
               "id" => "news_name",
               "desc" => __('Click the <em>Edit Feed Details</em> link inside FeedBurner', 'wordsmith-anvil'),
               "type" => "text"),  
		array( "name" => __('Enable external feed', 'wordsmith-anvil'),
               "id" => "external_feed",
               "desc" => __('Add an industry or other external feed.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "name" => __('Name for Feed', 'wordsmith-anvil'),
               "id" => "feed_name",
               "desc" => __('Give your external feed a name. <em>e.g., Industry News</em>', 'wordsmith-anvil'),
			   "std" => "",
               "type" => "text"),  	   
		array( "name" => __('External feed link', 'wordsmith-anvil'),
               "id" => "feed_url",
               "desc" => __('Place the url for an exernal feed here, including <code>http</code>', 'wordsmith-anvil'),
			   "std" => "",
               "type" => "text"),  	    
		array( "type" =>"close"),
		
		// Pages
		array( "name" => __('Page &amp; Post Display Options', 'wordsmith-anvil'),
               "type" => "section"),
		array( "name" => __('<span>Customize your pages/posts. More options in future versions.</span>', 'wordsmith-anvil'),
               "type" => "section-desc"),		
		array( "type" =>"open"),
		
		array( "name" => __('Enable Formatted Short Posts <small>(Like Excerpts)</small>', 'wordsmith-anvil'),
               "id" => "enable_formatted_short_posts",
               "desc" => __('By default, full posts are displayed on the front page. If you do not enable this option you can still use <code>&lt;!--more--&gt;, &lt;!--nextpage--&gt;</code>. However, by enabling this option the posts displayed on the Front Page will be short, like excerpts. However, they will display html formatting and include a custom more link. <strong>If you would prefer to show Full Posts, then do not enable this option.</strong> <em>If you want to display excerpts on the front page, there is an option below for to enable excerpts.</em> Using this <em>Formatted Short Posts</em> option works well, as long as you adhere to the following words of caution.<strong>CAVEAT:</strong> Do not you use these tags <code>&lt;!--more--&gt;, &lt;!--nextpage--&gt;</code> in the first XX number of words in your post [where XX is equal to the number of words you select in the option below]. Also, if you use any of the following tags <code>&lt;a href=&quot;&quot;&gt;,  &lt;p&gt;, &lt;div&gt;, &lt;table&gt;, &lt;caption&gt;, &lt;ul&gt;, &lt;li&gt; etc</code> within those XX number of words, then you need to make sure their corresponding closing tags (ie ... <code>&lt;/a&gt;,  &lt;/p&gt;, &lt;/div&gt;, &lt;/table&gt;, &lt;/caption&gt;, &lt;/ul&gt;, &lt;/li&gt; etc</code> ) are also used, or you will break the display of the page.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "name" => __('How many words do you want to display on Formatted Short Posts?', 'wordsmith-anvil'),
               "id" => "anvil_post_length",
               "desc" => __('<strong>Use this option if you enabled the Formatted Short Posts options above!</strong>  The default number of words in a Formatted Short Post are 65. If you would like to display more or less words, then enter the number of words here; as an integer. <span class="redcapnotice">(eg, 50, 75, 120)</span>', 'wordsmith-anvil'),
               "std" => 65,
               "type" => "text"),
		array( "name" => __('Display Excerpts <small>(on Blog &amp; Front Page)</small>', 'wordsmith-anvil'),
               "id" => "show_excerpt",
               "desc" => __('By default, full posts are displayed on the front page. If you do not enable this option you can still use <code>&lt;!--more--&gt;, &lt;!--nextpage--&gt;</code>. However, by enabling this option standard excerpts will be displayed. So, select this option if you would like to show a standard excerpt without html formatting.  <strong>CAVEAT: You cannot select both options: <em>Show Excerpts</em> and <em>Formatted Short Posts</em></strong>. You must choose one or the other, or neither. To Recap: Choosing neither will result in the display of full posts on the front page.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "name" => __('How many words do you want to display on front page EXCERPTS?', 'wordsmith-anvil'),
               "id" => "anvil_excerpt_length",
               "desc" => __('<strong>Use this option if you enabled the <em>Show Excerpts</em> options above!</strong> The default number of words are 55. If you would like to display more or less words, enter the number of words here; as an integer. <span class="redcapnotice">(eg, 50, 75, 120)</span> Additionally, if you decide to use the <em>Front Page Template</em> that comes with this theme, it displays two sticky post excerpts at the bottom of the page. Even if you do not use excerpts on your blog, you can use this option to select the number of words you want to display in the <em>Front Page Template</em> excerpts, too.', 'wordsmith-anvil'),
               "std" => 55,
               "type" => "text"),
		array( "name" => __('Enable Custom Formatted More Link on Excerpts OR Full Posts', 'wordsmith-anvil'),
               "id" => "enable_custom_more_link",
               "desc" => __('By default the Custom Formatted Short Posts will include a custom more link. It has some additional styling that helps the link stand out. If you would like to use the Full Posts and the <code>&lt;!--more--&gt;,</code> tag; and would like to enable the custom More Links, then select this option. Likewise, if you selected to use Excerpts and want the Custom Formatted More Links, then select this option. Otherwise, the default More link for full posts will look like this: <code>[Read the full story ...]</code>', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "name" => __('Disable Large First Letter', 'wordsmith-anvil'),
               "id" => "no_pseudo_first_letter",
               "desc" => __('If you do not want the <span class="twoc">f</span>irst <span class="twoc">l</span>etter of your <span class="twoc">p</span>aragraphs to be displayed larger, then select this option.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
			   
		array( "name" => __('Display Coupon or Text Box on Front Page Template', 'wordsmith-anvil'),
               "id" => "display_coupon",
               "desc" => __('Check this box to enable display of a coupon on the front page. Currently, the only pages this is setup for are the front page template and blog home page template. You will also need to add a custom field to display the text of your coupon. <br /><em>e.g., Get 15% Off On All Orders Today.<br />Use this Code: 15OFF2DAY </em> <br /><strong>Note:</strong> The front page template also includes several other custom codes built-in to enable page customization. Currently, customization of the product page template and product categories page templates can be acheived by implementing the numerous custom codes built-in to those pages, too.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "name" => __('Display Coupon or Text Box on Blog Home Template', 'wordsmith-anvil'),
               "id" => "display_coupon_blog",
               "desc" => __('Check this box to enable display of a coupon on the blog home page. Currently, the only pages this is setup for are the front page template and blog home page template. You will also need to add a custom field to display the text of your coupon. <br /><em>e.g., Get 15% Off On All Orders Today.<br />Use this Code: 15OFF2DAY </em> <br /><strong>Note:</strong> Currently, customization of the product page template and product categories page templates can be acheived by implementing the numerous custom codes built-in to those pages, too.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "name" => __('Disable Display of PostMeta Information', 'wordsmith-anvil'),
               "id" => "disablethemeta",
               "desc" => __('Check this box to disable display of the postmeta information <strong>{ <span class="yes"><em>ie Posted by</em> ' .$themeuser. ', on ' . date("F j, Y, g:i a") . ' </span>}</strong>, which is displayed in a bar above the content area of the post, or page.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),  
		
        array( "type" =>"close"),
		        
        // Footer     
        array( "name" => __('Footer', 'wordsmith-anvil'),
               "type" => "section"),
		array( "name" => __('<span>Customize your footer</span>', 'wordsmith-anvil'),
               "type" => "section-desc"),		
		array( "type" =>"open"),
		
        array( "name" => __('Enable footer links', 'wordsmith-anvil'),
               "id" => "footer_links",
               "desc" => __('Check this box to enable footer links. For example, privacy policy, careers, contacts, sitemap or other similar pages.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
        array( "name" => __('Title of first footer link.', 'wordsmith-anvil'),
               "id" => "ftr_title_1",
               "desc" => __('The title of your first link', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"), 
        array( "name" => __('First footer link', 'wordsmith-anvil'),
               "id" => "ftr_url_1",
               "desc" => __('Link for the first title', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"),
        array( "name" => __('Title of second footer link.', 'wordsmith-anvil'),
               "id" => "ftr_title_2",
               "desc" => __('The title of your second link', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"), 
        array( "name" => __('Second footer link', 'wordsmith-anvil'),
               "id" => "ftr_url_2",
               "desc" => __('Link for the second title', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"),
        array( "name" => __('Title of third footer link.', 'wordsmith-anvil'),
               "id" => "ftr_title_3",
               "desc" => __('The title of your third link', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"), 
        array( "name" => __('Third footer link', 'wordsmith-anvil'),
               "id" => "ftr_url_3",
               "desc" => __('Link for the third title', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"),
        array( "name" => __('Title of fourth footer link.', 'wordsmith-anvil'),
               "id" => "ftr_title_4",
               "desc" => __('The title of your fourth link', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"), 
        array( "name" => __('Fourth footer link', 'wordsmith-anvil'),
               "id" => "ftr_url_4",
               "desc" => __('Link for the fourth title', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"),
        array( "name" => __('Title of fifth footer link.', 'wordsmith-anvil'),
               "id" => "ftr_title_5",
               "desc" => __('The title of your fifth link', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"), 
        array( "name" => __('Fifth footer link', 'wordsmith-anvil'),
               "id" => "ftr_url_5",
               "desc" => __('Link for the fifth title', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"),
        array( "name" => __('Title of sixth footer link.', 'wordsmith-anvil'),
               "id" => "ftr_title_6",
               "desc" => __('The title of your sixth link', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"), 
        array( "name" => __('Sixth footer link', 'wordsmith-anvil'),
               "id" => "ftr_url_6",
               "desc" => __('Link for the sixth title', 'wordsmith-anvil'),
               "std" => "",
               "type" => "text"),
        array( "name" => __('Copyright notice', 'wordsmith-anvil'),
               "id" => "copyright_name",
               "desc" => __('Your name or the name of your business.', 'wordsmith-anvil'),
               "std" => __('Your Name Here', 'wordsmith-anvil'),
               "type" => "text"),  
		array( "name" => __('Enable WordPress credits', 'wordsmith-anvil'),
               "id" => "wordpress_credits",
               "desc" => __('Check this box to enable Powered by Wordpress Semantic Pubishing Platform Credits.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "name" => __('Enable Developer credit', 'wordsmith-anvil'),
               "id" => "developer_credit",
               "desc" => __('Check this box to enable the Developer Credit. <em>Wordsmith Anvil Theme &bull;  Designed by Toms Skyline Design</em>', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),
		array( "name" => __('Enable Hidden Developer Link', 'wordsmith-anvil'),
               "id" => "hidden_developer_link",
               "desc" => __('If you do not want to display a Developer credit check this box to show your support with a hidden developer link that is not displayed on your site.', 'wordsmith-anvil'),
               "std" => true,
               "type" => "checkbox"),
		array( "type" =>"close"),
		
		// Visual Editor
		array( "name" => __('Visual Editor Option', 'wordsmith-anvil'),
               "type" => "section"),
		array( "name" => __('<span>Targeted to resolve Visual Editor Display Issues on Macs.</span>', 'wordsmith-anvil'),
               "type" => "section-desc"),		
		array( "type" =>"open"),
		array( "name" => __('Try this option if the Visual Editor Has Display Issues.', 'wordsmith-anvil'),
               "id" => "enable_mac_editor",
               "desc" => __('In prior versions some users had troubles when pasting content into the visual editor. This issue seemed to be confined to Mac users. Regardless, if you are trying to paste content into the Visual Editor and you experience display issues, try enabling this option. It may resolve the issue for you.', 'wordsmith-anvil'),
               "std" => "",
               "type" => "checkbox"),	   
        array( "type" =>"close"),
		);

	function anvil_theme_options_page() {
	   global $shortname, $anvil_options, $option_group, $option_name, $current_user;
?>

    <div class="wrap">
        <div class="options_wrap">
        <?php screen_icon(); ?><?php _e('<h2>' . THEME_NAME . ' Theme Options','wordsmith-anvil'); ?> </h2>
            <?php _e('<h3 class="title_section_block">Welcome <em>&quot;' .$current_user->display_name. '&quot;</em> to the options panel</h3><p class="top-notice"> ... Customize your WordPress Theme with the <span class="bluebacks">~50</span> options in the custom admin options panel below. <span class="tsd-logo"><a href="'.THEME_AUTHOR_HOMEPAGE.'themes/">Toms Skyline Design WordPress Themes</a></span> To configure your navigation menu, add widgets to the widgetized areas of this theme, or to change your background or header image, follow the dots to the left and under the Appearance Menu you will see options for Menu, Widgets, Header and Background. Select the appropriate option to make the changes you need. <span class="notice"><strong>**** Please Read the FAQs ****</strong> They will help you to setup this theme and utilize the custom templates and custom options.</span><br /></p><p class="dots">&nbsp;</p>','wordsmith-anvil'); ?>
        <?php if ( isset ( $_POST['reset'] ) ): ?>
        <?php // Delete Settings ... if you really must :(
            global $wpdb, $shortname, $anvil_options, $option_group, $option_name;
            delete_option('anvil_theme_options');
            wp_cache_flush(); ?>
            <div class="updated fade"><p><strong><?php _e( THEME_NAME. ' options reset.' ); ?></strong></p></div>
            
        <?php elseif ( isset ( $_REQUEST['updated'] ) ): ?>
            <div class="updated fade"><p><strong><?php _e( THEME_NAME. ' options saved.' ); ?></strong></p></div>
        <?php endif; ?>
    
    	<form method="post" action="options.php">
    
			<?php settings_fields( $option_group ); ?>
            
            <?php // do_settings_sections(__FILE__); // added temporarily for new sanitation cb?>
            
            <?php $options = get_option( $option_name ); ?>        
            
            <?php foreach ($anvil_options as $value) {
                if ( isset($value['id']) ) { $valueid = $value['id'];}
            
                switch ( $value['type'] ) {
                
                case "section":
        
            ?>
                <div class="section_wrap title_section_block">
                
                <h3 class="section_title"><?php echo $value['name']; ?> 
        
            <?php break; 
            
                case "section-desc": ?>
            
                <span><?php echo $value['name']; ?></span></h3>
                <div class="section_body">
        
            <?php break;
            
                case 'text': ?>
        
                <div class="options_input options_text">
                <div class="options_desc"><?php echo $value['desc']; ?></div>
                <span class="labels"><label for="<?php echo $option_name.'['.$valueid.']'; ?>"><?php echo $value['name']; ?></label></span>
                <input name="<?php echo $option_name.'['.$valueid.']'; ?>" id="<?php echo $option_name.'['.$valueid.']'; ?>" type="<?php echo $value['type']; ?>" value="<?php if ( isset( $options[$valueid]) ){ esc_attr_e($options[$valueid]); } else { if ( isset($value['std'])) esc_attr_e($value['std']); } ?>" />	</div>

			<?php break;
            
                case 'textarea': ?>
                
                <div class="options_input options_textarea">
                <div class="options_desc"><?php echo $value['desc']; ?></div>
                <span class="labels"><label for="<?php echo $option_name.'['.$valueid.']'; ?>"><?php echo $value['name']; ?></label></span>
                <textarea name="<?php echo $option_name.'['.$valueid.']'; ?>" type="<?php echo $option_name.'['.$valueid.']'; ?>" cols="" rows=""><?php if ( isset( $options[$valueid]) ){ esc_attr_e($options[$valueid]); } else { esc_attr_e($value['std']); } ?></textarea></div>
        <?php // using esc_textarea or esc_attr breaks the page ?>
        
            <?php break;
            
            case "radio": ?>
            
                <div class="options_input options_select">
                <div class="options_desc"><?php echo $value['desc']; ?></div>
                <span class="labels"><label for="<?php echo $option_name.'['.$valueid.']'; ?>"><?php echo $value['name']; ?></label></span>
                    <?php foreach ($value['options'] as $key=>$option) { 
                        $radio_setting = $options[$valueid];
                        if($radio_setting != ''){
                        if ($key == $options[$valueid] ) {
                            // $checked = checked( $options[$valueid], 'desc' ); this breaks the page if you have radio options
							$checked = "checked=\"checked\"";
                            } else {
                                $checked = "";
                            }
                        }else{
                            if($key == $value['std']){
                               // $checked = checked( $options[$valueid], 'desc' ); ditto the msg above
								$checked = "checked=\"checked\"";
                        }else{
                            $checked = "";
                        }
                    }?>
        
                    <input type="radio" id="<?php echo $option_name.'['.$valueid.']'; ?>" name="<?php echo $option_name.'['.$valueid.']'; ?>" value="<?php echo $key; ?>" <?php echo $checked; ?> /><?php echo $option; ?><br />
        
                    <?php } ?>	</div>

			<?php break;
            
            case "checkbox": ?>
            
                <div class="options_input options_checkbox">
                <div class="options_desc"><?php echo $value['desc']; ?></div>
                <?php // if( isset( $options[$valueid] ) ){ $checked = checked( $options[$valueid], 'desc' ); }else{ $checked = "";} This also breaks the page ?>
                <?php if( isset( $options[$valueid] ) ){ $checked = "checked=\"checked\""; }else{ $checked = "";} ?>
                <input type="checkbox" name="<?php echo $option_name.'['.$valueid.']'; ?>" id="<?php echo $option_name.'['.$valueid.']'; ?>" value="true" <?php echo $checked; ?> />
                <label for="<?php echo $option_name.'['.$valueid.']'; ?>"><?php echo $value['name']; ?></label>	 </div>
        
            <?php break;
            
            case "close": ?>
        
                </div><!--END section body-->
               </div><!--END section wrap-->
        
            <?php break;
            }
        } ?>

            <span class="submit">
            <input class="button button-primary" type="submit" name="save" value="<?php _e('Save All Changes', 'wordsmith-anvil'); ?>" />
            </span>
            </form>
            
            <form method="post" action="">
            
            <input class="button button-secondary button-right" type="submit" name="reset" value="<?php _e('Reset/Delete Settings', 'wordsmith-anvil'); ?>" />       <input type="hidden" name="action" value="reset" />
           <?php _e('<p class="clearshim">&nbsp;</p>
            <span class="caveat"><em>Caveat:</em> When you submit the Reset/Delete Settings Button, all entries for this theme will be deleted from the database; and forever lost. Press if you want to start over or if you desire to completely remove the theme. If you simply desire to switch themes it is not necessary to delete the settings for this theme.
            </span>','wordsmith-anvil'); ?>
            
            </form>
             <?php _e('<h3 class="btw"><a href="'.THEME_HOMEPAGE.'/feedback/" target="_blank">Post Feedback.</a>  </h3>
             <h3 class="btw"><a href="'.THEME_HOMEPAGE.'/faqs/" target="_blank">Read the FAQs!</a></h3>','wordsmith-anvil'); ?>
      </div><!--END o wrap-->
     
	    <div class="under">
      <?php _e('<h2>' .THEME_NAME.  ' Support!</h2>','wordsmith-anvil'); ?>
    
      <?php _e('<p>Thanks and Congrats on downloading and installing <strong>' . THEME_NAME . ' Version: ' .THEME_VERSION . '</strong>, a WordPress Theme by <a href="'.THEME_AUTHOR_HOMEPAGE.'">Toms Skyline Design</a>.</p>','wordsmith-anvil'); ?>
        
      <?php _e('<p>If you like this theme or if you love this theme ... and especially, if you are using it for commercial purposes, please consider showing your support. Your generostity and gratuity, regardless of size, will definitely be appreciated. Also, you can show your support by enabling the Developer footer credits. <strong>Noooo ... of course, it&rsquo;s not required, but wouldn&rsquo;t you feel warm and fuzzy by donating a little and showing your support?</strong> </p>','wordsmith-anvil'); ?>
      <div class="centerit">
    	<div class="squeezepad">
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
            <input type="hidden" name="cmd" value="_s-xclick">
            <input type="hidden" name="hosted_button_id" value="MCKTEMUW5UVM8">
            <table class="centerit">
            <tr><td><input type="hidden" name="on0" value="Attaboy Incentives">Attaboy Incentives</td></tr><tr><td><select name="os0">
            	<option value="$1">Take this $1 &amp; be happy!</option>
                <option value="$2">Get a tall coffee with this $2.</option>
                <option value="$5">Here's $5 for a Venti Americano &amp; Donut.</option>
                <option value="$10">For all your theme does, here's $10.00</option>
                <option value="$15">Here's $15.00 cuz I love your theme, dude.</option>
                <option value="$20">Keep up the good work with this $20.00</option>
                <option value="$25">Reward yourself with $25.00. You deserve it.</option>
                <option value="$50">I am buying you dinner &amp; drinks. ($50 value) Enjoy!</option>
            </select> </td></tr>
            </table>
            <input type="hidden" name="currency_code" value="USD">
            <input type="image" src="https://www.paypalobjects.com/WEBSCR-640-20110306-1/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
            <img alt="" border="0" src="https://www.paypalobjects.com/WEBSCR-640-20110306-1/en_US/i/scr/pixel.gif" width="1" height="1">
            </form>
         </div><!-- END squeezepad -->
       </div><!-- END centerit -->
      <hr />
      <div class="centerit">
    
      <?php _e('<ul>
                <li><a href="'.THEME_AUTHOR_HOMEPAGE.'">Theme Developer</a></li>
                <li><a href="'.THEME_HOMEPAGE.'">Wordsmith Anvil Demo Site</a></li>
				<li><a href="'.THEME_HOMEPAGE.'feedback/" target="_blank"><span class="redcapnotice">' . THEME_NAME . ' Support &amp; Feedback Forum!<span></a></li>
        <li><a href="'.THEME_AUTHOR_HOMEPAGE.'service-support/contacts/"><span class="bluebacks">Request Customizations</span></a></li>
      </ul></div>
      <p><strong>Important message from Tom ...</strong> <em>You will probably have some questions about setting up this theme ... For your convenience I have created a fairly extensive FAQ section that should address most questions about setting up this theme; except for questions regarding customization. Use the link below if you need an answer.</em></p>
      <h3 class="btw centerit"><a href="'.THEME_HOMEPAGE.'faqs/" target="_blank">' . THEME_NAME . ' FAQs!</a></h3>','wordsmith-anvil'); ?>
      
<?php _e('<p>Regardless whether you need to use the FAQ section, your comments and suggestions about the theme are welcomed. In the event you do have one or more questions, or if you have comments or suggestions <a href="'.THEME_HOMEPAGE.'feedback/"><strong>POST THEM HERE</strong></a>. <span class="redcapnotice">Please use the comment form on the feedback page for any help or support questions, unless you are requesting customization services. I have decided to discontinue providing email support because it is more valuable for all users of this theme if questions are answered publicly.</span> Also, it is much more efficient for me to answer the same question once on the feedback page, rather than rewrite the answers multiple times in separate emails (which, unfortunatley do not benefit any other users) ... Thank you for your anticipated understanding and support. <em>However, if you need some customizations for this theme then use the link above <span class="bluebacks">Request Customizations.</span></em></p>','wordsmith-anvil'); ?>
            
            <?php _e('<hr />','wordsmith-anvil'); ?>
            
            <?php _e('<p><strong><span class="notice">Recommended Plug-Ins</span></strong></p>
            <div class="centerit">
            <ul>
                <li><a href="http://wordpress.org/extend/plugins/wp-pagenavi/">WP Navi</a></li>
                <li><a href="http://wordpress.org/extend/plugins/wp-postviews/">WP Post Views</a></li>
                <li><a href="http://wordpress.org/extend/plugins/breadcrumb-navxt/">Breadcrumb NavXT</a></li>
            </ul>
            <p>This theme was designed to take advantage of the functionality of the above plugins.</p></div>','wordsmith-anvil'); ?>
  </div><!--END under --> 
        

	</div><!--END a-wrap-->
<?php } ?>