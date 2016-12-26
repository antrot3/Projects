<?php
		global $wp_version, $jQver, $options;
		$options = get_option('anvil_theme_options'); 
		$functions_path = TEMPLATEPATH . '/functions/';
		//Theme Options
		require_once ($functions_path . 'anvil-options.php'); 

	// Load jQuery
	if ( !is_admin() ) {
		if(wp_script_is('jquery','registered')) { $jQver = $wp_scripts->registered['jquery']->ver; 
			wp_deregister_script('jquery');
		}
		wp_register_script('jquery', '/wp-includes/js/jquery/jquery.js', false, $jQver, false);
		wp_enqueue_script('jquery');  

	// Load Navigation Hover Script

		$template_uri = get_template_directory_uri();
	   	wp_deregister_script('anvil-nav-hover');
	   	wp_register_script('anvil-nav-hover', $template_uri . '/js/jquery.hoverflow.min.js', '','1.0');
	   	wp_enqueue_script('anvil-nav-hover');
	
	// Load Superfish Navigation Script (left this in so just in case you want to add Superfish you can uncomment this section and add a line to your header to enqueue the script
	
	//if ( !is_admin() ) {
	//	$template_uri = get_template_directory_uri();
	//   	wp_deregister_script('anvil-superfish');
	//   	wp_register_script('anvil-superfish', $template_uri . '/js/superfish.js');
	//   	wp_enqueue_script('anvil-superfish');
	//}
	
	// Load Superfish HoverIntent Script (ditto here the statement above )
	
//	if ( !is_admin() ) {
	//	$template_uri = get_template_directory_uri();
	//   	wp_deregister_script('anvil-hover-intent');
	//   	wp_register_script('anvil-hover-intent', $template_uri . '/js/hoverIntent.js');
	//   	wp_enqueue_script('anvil-hover-intent');
	//}
	
	// Load Header Script

		$template_uri = get_template_directory_uri();
	   	wp_deregister_script('anvil-header');
	   	wp_register_script('anvil-header', $template_uri . '/js/wsmain.js', '','1.1');
	   	wp_enqueue_script('anvil-header');

	// Load Single Page Title Script

		$template_uri = get_template_directory_uri();
	   	wp_deregister_script('anvil-spt');
	   	wp_register_script('anvil-spt', $template_uri . '/js/wssingle.js', '','1.1');
	   	wp_enqueue_script('anvil-spt');
	} else {
		// If this is an admin page dont register or enquueue any of the above scripts and styles
	}
	
	// Sets content and images width
		if ( !isset($content_width) ) $content_width = 690; //reduced from 702 the actual size
	
	// Add default posts and comments RSS feed links to head
		if ( function_exists('add_theme_support') ) {
			add_theme_support('automatic-feed-links');
		}
    
	// Register sidebars using the anvil_widgets_init() on the widgets_init hook
		add_action('widgets_init', 'anvil_widgets_init');
	// Declare sidebar widget areas
	
		function anvil_widgets_init() {
			register_sidebar(array(
				'name' => 'Sidebar Widgets',
				'id'   => 'sidebar-widgets',
				'description'   => 'These are widgets for the sidebar.',
				'before_widget' => '<div id="%1$s" class="aside-widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h2>',
				'after_title'   => '</h2>'
			));
		
			register_sidebar(array(
				'name' => 'Above Footer Left Outer Widget',
				'id'   => 'above-footer-left-outer-widgets',
				'description'   => 'These are widgets for the above footer area.',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h5 class="leftout">',
				'after_title'   => '</h5>'
			));
	
			register_sidebar(array(
				'name' => 'Above Footer Left Inner Widget',
				'id'   => 'above-footer-left-inner-widgets',
				'description'   => 'These are widgets for the above footer area.',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h5 class="leftin">',
				'after_title'   => '</h5>'
			));
			
			register_sidebar(array(
				'name' => 'Above Footer Right Inner Widget',
				'id'   => 'above-footer-right-inner-widgets',
				'description'   => 'These are widgets for the above footer area.',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h5 class="rightin">',
				'after_title'   => '</h5>'
			));
			
			register_sidebar(array(
				'name' => 'Above Footer Right Outer Widget',
				'id'   => 'above-footer-right-outer-widgets',
				'description'   => 'These are widgets for the above footer area.',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h5 class="rightout">',
				'after_title'   => '</h5><p class="shim">&nbsp;</p>'
			));
		}

	// Primary Menu Functions

		function anvil_list_pages() {
		  if ( is_home() || is_front_page() ) { ?>
			<ul><?php wp_list_pages( 'title_li=&depth=1' ); ?></ul>
		  <?php } else { ?>
			<ul>
			  <li><a href="<?php echo home_url(); ?>"><?php _e( 'početna', 'wordsmith-anvil' ); ?></a></li>
			  <?php wp_list_pages( 'title_li=&depth=1' ); ?>
			</ul>
		  <?php }
		}
		
		function anvil_primary_menu() {
			if ( has_nav_menu( 'primary-menu' ) ) { 
			  wp_nav_menu( array(
					   'theme_location' => 'primary-menu',
					   'fallback_cb' => 'anvil_list_pages',
					   'depth' => 1
					   ) );
			} else 
			  anvil_list_pages();
		}
		
		add_action( 'init', 'register_anvil_primary_menu' );
		
		function register_anvil_primary_menu() {
			if (function_exists('register_nav_menu')) {
			register_nav_menu( 'primary-menu', __( 'Left Aside Animated Menu' ) );
			}	
		}
		
		// Secondary Menu Functions
		   
		function anvil_list_cats() { ?>
			<ul class="menu"><?php wp_list_categories( 'number=6&depth=0&orderby=slug&title_li=' ) ;?></ul>
        <?php } 
		
		function anvil_secondary_menu() {
			if ( has_nav_menu( 'secondary-menu' ) ) { 
			  wp_nav_menu( array(
					   'theme_location' => 'secondary-menu',
					   'fallback_cb' => 'anvil_list_cats',
					   'depth' => 0
					   ) );
			} else
			  anvil_list_cats();
		}
		
		add_action( 'init', 'register_anvil_secondary_menu' );
		
		function register_anvil_secondary_menu() {
			if (function_exists('register_nav_menu')) {
			register_nav_menu( 'secondary-menu', __( 'Top Nested Menu' ) );
			}
		}
	
	// Load Stylesheets
	
	function anvil_load_styles() { 
		$stylesheet_uri = get_stylesheet_uri();    
		$template_uri = get_template_directory_uri(); 
		     
		wp_register_style( 'default-style', $stylesheet_uri, '', '2.2.1' );
		wp_register_style( 'font-styles', $template_uri . '/fonts/fontstyles.css', '', '2.2.1' );
		wp_register_style( 'main-styles', $template_uri . '/stylesheets/main.css', '', '2.2.1' );
		wp_register_style( 'page-product', $template_uri . '/stylesheets/product.css', '', '2.2.1' );
		wp_register_style( 'page-categories', $template_uri . '/stylesheets/wastore.css', '', '2.2.1' ); 
		wp_register_style( 'page-home', $template_uri . '/stylesheets/home.css', '', '2.2.1' );
		wp_register_style( 'anythingslider', $template_uri . '/stylesheets/anythingslider.css', '', '2.2.1' );
	} 
	
	add_action( 'init', 'anvil_load_styles' ); 
	
	// Load IE stylesheet(s)
	
	function anvil_ie_styles() {     
		$template_uri = get_template_directory_uri();
		wp_register_style( 'ie-styles', $template_uri . '/stylesheets/ie.css', '', '2.2.1' );
		global $wp_styles;
		$wp_styles->add_data('ie-styles', 'conditional', 'lte IE 8'); 
	} 
	
	add_action( 'init', 'anvil_ie_styles' ); 
	
	// Load Custom Stylesheet
	if ( ! function_exists( 'anvil_load_custom_styles' ) ) :
	function anvil_load_custom_styles() { 
		$template_uri = get_template_directory_uri(); 
		wp_register_style( 'custom-styles', $template_uri . '/stylesheets/custom.css', '', '2.2.1' );
		wp_enqueue_style('custom-styles');
	}
	 endif; 
		//add_action( 'init', 'anvil_load_custom_styles' ); 
      
	
	// Developer Credit Link
	
	$anchor = '<a href="';
	$tld = 'http://www.';
	$target = '" target="_blank">';
	$anchorclose = '</a>';
	$devcredit = $anchor. $tld.'tomsskylinedesign.com' . $target .'Designed by Toms Skyline Design' . $anchorclose;
	// adapted from http://justintadlock.com/archives/2008/08/24/replacing-wordpress-content-with-an-excerpt-without-editing-theme-files
	
	// Limit the number of words to be displayed on search results and archive pages
	
	add_filter('the_content', 'anvil_search_archive_content');	
	function anvil_search_archive_content($content) {

	// If is an archive, or search results page
	if(is_archive() || is_search()) :
		global $post;
		$content = $post->post_content;
		if($content) :
			$thetitle = '<span class="readabout">' . get_the_title() . '</span>';
			$morestory = ' &hellip; <strong>Continue reading the story</strong> "' . $thetitle . '"';
			$thereturn = '<span class="read"><a href="'. get_permalink($post->ID) . '">' . $morestory . '</a></span>';
			$content = $post->post_content;
			$content_length = 65;
			$words = explode(' ', $content, $content_length + 1);
			if(count($words) > $content_length) :
				array_pop($words);
				array_push($words, $thereturn);
				$content = implode(' ', $words);
			endif;
			$content = $content . '<br class="clearboth">';
		endif;
	endif;

	// Make sure to return the content
	return $content;
	}
	
	// Limit the number of words to be displayed on posts on the front page and make the posts short like excerpts, except the short posts will not have tags stripped like excerpts do 
	if ( ! function_exists( 'anvil_formatted_content' ) ) :
	function anvil_formatted_content($content) {
		global $post, $options;
			$thetitle = '<span class="readabout">' . get_the_title() . '</span>';
			$morestory = ' &hellip; <strong>Continue reading the story</strong> "' . $thetitle . '"';
			$post_length =  $options['anvil_post_length']; 
			$thereturn = '<span class="read"><a href="'. get_permalink($post->ID) . '">' . $morestory . '</a></span>';

	// If is the front page ...
	if ( isset($options['enable_formatted_short_posts']) && ($options['enable_formatted_short_posts']!="") &&(is_front_page() || is_home() ) ):
		
		$content = $post->post_content;
		if($content) :

			$content = $post->post_content;
				if ( (isset($post_length)) && ($post_length !='') ) {
					$content_length = $post_length;
				} else {
				$content_length = 65;
				}
			$words = explode(' ', $content, $content_length + 1);
			if (count($words) > $content_length) :
				array_pop($words);
				array_push($words, $thereturn);
				$content = implode(' ', $words);
			endif; // end if count
			$content = $content . '<br class="clearboth">';
		endif; // end if content
	endif;  // end if options selected and is front or home page
	// Make sure to return the content
	return $content;
	}
	endif;  // end if function exists

		add_filter('the_content', 'anvil_formatted_content');

	// Altering the Default Excerpt Length from 55 to user defined
	
	if ( ! function_exists( 'anvil_new_excerpt_length' ) ) :
	function anvil_new_excerpt_length($excerpt_length) {
        global $options;
	$excerpt_length =  $options['anvil_excerpt_length']; 
	return $excerpt_length;
	}
	endif;
        add_filter('excerpt_length', 'anvil_new_excerpt_length');
	
	// Altering the Default More Excerpt 
	if ( ! function_exists( 'anvil_new_excerpt_more' ) ) :
	function anvil_new_excerpt_more($more) {
	global $more, $post, $options ;

	$thetitle = '<span class="readabout">' . get_the_title() . '</span>';
	$morestory = ' &hellip; <strong>Continue reading the story</strong> "' . $thetitle . '"';
	$thereturn = '<span class="read"><a href="'. get_permalink($post->ID) . '">' . $morestory . '</a></span>';
	$altmore = '<a href="'. get_permalink($post->ID) . '"> [Read the full story ...]</a>';
	if (isset($options['enable_custom_more_link']) && ($options['enable_custom_more_link'] !='') ) { 
		return $thereturn;
	     } else {
			return $altmore; }
		}
        endif;
	add_filter('excerpt_more', 'anvil_new_excerpt_more');
	 
	// Display a link when there is no title for a post thx to Getzel Rubashkin
	
	add_filter('the_title','anvil_has_title');
	function anvil_has_title($title){
		if($title == ''){
			return 'Read More About this Post Here';
		}else{
			return $title;
		}
	}

	// Add custom more link to full post content
	add_filter( 'the_content_more_link', 'anvil_content_more_link', 10, 2 );
	
	if ( ! function_exists( 'anvil_content_more_link' ) ) :
	function anvil_content_more_link( $more_link, $more_link_text ) {
		global $post, $options;
		$thetitle = '<span class="readabout">' . get_the_title() . '</span>';
		$morestory = ' &hellip; <strong>Continue reading the story</strong> "' . $thetitle . '"';
		$post_length =  $options['anvil_post_length']; 
		$thereturn = '<span class="read"><a href="'. get_permalink($post->ID) . '">' . $morestory . '</a></span>';
		$altmore = '<a href="'. get_permalink($post->ID) . '"> [Read the full story ...]</a>';
        if (isset($options['enable_custom_more_link']) && ($options['enable_custom_more_link'] !='') ) { 
			return str_replace($more_link_text, $thereturn, $more_link); }	
			else {
				return str_replace($more_link_text, $altmore, $more_link); }
	}
	endif;
	
	// Setup Option to Display Excerpt or Full Posts
	if ( ! function_exists( 'anvil_display_post' ) ) :
	function anvil_display_post() {
		global $options;

		if( isset($options['show_excerpt']) && ($options['show_excerpt']!='') ) {
				the_excerpt(); 
			} else { 
				the_content(); 
			}
	}
	endif;
	
	// Customizing the comment number display

	 function anvil_comments_number() { 
	 $zero = '<div class="postnocomments">Comments Requested</div>';
	 $one = '<div class="postcomments"><a href="#comments">1</a></div>';
	 $more = '<div class="postcomments"><a href="#comments">%</a></div>'; 
	 $number = ''; 
	 global $id, $comment; 
	   $number = get_comments_number( $id ); 
	   if ($number == 0) { 
			$wac = $zero; 
	   } elseif ($number == 1) { 
			$wac = $one; 
	   } elseif ($number  > 1) { 
			$wac = str_replace('%', $number, $more); 
	   } 
	   echo apply_filters('comments_number', $wac); 
	} 
	
	// Customizing the comment template
	
	if ( is_singular() && get_option( 'thread_comments' ) && comments_open() ) {
		wp_enqueue_script( 'comment-reply' );
	}
	
	if ( ! function_exists( 'anvil_comments' ) ) :
	function anvil_comments($comment, $args, $depth) {
			$GLOBALS['comment'] = $comment; 
		switch ( $comment->comment_type ) :
			case '' :
		?>
			<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
			<div id="comment-<?php comment_ID(); ?>">
			<div class="comment-author vcard">
				<?php echo get_avatar( $comment, 32 ); ?>
				
				<?php printf( __( '%s <span class="says">had this to say about that: </span>', 'wordsmith-anvil' ), sprintf( '<cite class="fn">%s</cite>', get_comment_author_link() ) ); ?>
			</div><!-- .comment-author .vcard -->
			<?php if ( $comment->comment_approved == '0' ) : ?>
				<em><?php _e( 'Your comment is awaiting moderation.', 'wordsmith-anvil' ); ?></em>
				<br />
			<?php endif; ?>
			
				<div class="comment-meta commentmetadata"><a href="<?php echo esc_url( get_comment_link( $comment->comment_ID ) ); ?>">
				<?php
					/* translators: 1: date, 2: time */
					printf( __( '%1$s at %2$s', 'wordsmith-anvil' ), get_comment_date(),  get_comment_time() ); ?></a><?php edit_comment_link( __( '(Edit)', 'wordsmith-anvil' ), ' ' );
				?>
			</div><!-- .comment-meta .commentmetadata -->
	
			<div class="comment-body"><?php comment_text(); ?></div>
	
			<div class="reply">
				<?php comment_reply_link( array_merge( $args, array( 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
			</div><!-- .reply -->
            
		</div><!-- #comment-##  -->
		<?php
				break;
			case 'pingback'  :
		?>
		<li class="post pingback">
			<p><?php _e( 'Pingback:', 'wordsmith-anvil' ); ?> <?php comment_author_link(); ?><?php edit_comment_link( __('(Edit)', 'wordsmith-anvil'), ' ' ); ?></p></li>
		<?php
				break;
			case 'trackback' :
		?>
		<li class="post trackback">
			<p><?php _e( 'Trackback:', 'wordsmith-anvil' ); ?> <?php comment_author_link(); ?><?php edit_comment_link( __('(Edit)', 'wordsmith-anvil'), ' ' ); ?></p></li>
		<?php
				break;
			default :
		?>
		<li class="post reply">
			<p><?php _e( 'The Comment:', 'wordsmith-anvil' ); ?> <?php comment_author_link(); ?><?php edit_comment_link( __('(Edit)', 'wordsmith-anvil'), ' ' ); ?></p></li>
		<?php
				break;	
		endswitch; 
	}
	endif; 
	// This theme styles the visual editor with editor-style.css to match the theme style. 
	// An optional visual editor stylesheet was created in an effort to resolve Visual Editor Display issues that
	// were reported by three or four Mac users the optional stylesheet is editor-fontsafe-style.css
	// it takes two functions to make this work correctly
	remove_editor_styles();
	remove_action('after_setup_theme', 'default_vis_editor');

	if ( ! function_exists( 'default_vis_editor' ) ) {
		function default_vis_editor() {
			global $options;
			$macenabled = isset($options['enable_mac_editor']);
			if ( (!$macenabled) || ($options['enable_mac_editor'] ="") ) {
			remove_editor_styles();
			add_editor_style('editor-style.css');
			}
		}
	}
	add_action('after_setup_theme', 'default_vis_editor');
	
	remove_action('after_setup_theme', 'mac_vis_editor');

	if ( ! function_exists( 'mac_vis_editor' ) ) {
		function mac_vis_editor() {
			global $options;
			if ( isset($options['enable_mac_editor']) && ($options['enable_mac_editor']!="") ) {
			remove_editor_styles();
			add_editor_style('editor-fontsafe-style.css');
			}
		}
	}
	add_action('after_setup_theme', 'mac_vis_editor');

	/** Tell WordPress to run anvil_setup() when the 'after_setup_theme' hook is run. */
	add_action( 'after_setup_theme', 'anvil_setup' );
	if ( ! function_exists( 'anvil_setup' ) ):
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which runs
	 * before the init hook. The init hook is too late for some features, such as indicating
	 * support post thumbnails.
	 *
	 * To override anvil_setup() in a child theme, add your own anvil_setup to your child theme's
	 * functions.php file.
	 *
	 * @uses add_custom_background() To add support for a custom background.
	 * @uses add_editor_style() to allow style editor to match theme style
	 * @uses load_theme_textdomain() For translation/localization support.
	 * @uses add_custom_image_header() To add support for a custom header.
	 * @uses register_default_headers() To register the default custom header images provided with the theme.
	 *
	 * @since Version 1.0
	 */
	/* More setup options for the Wordsmith Anvil Theme */
	function anvil_setup() {
	// This theme allows users to set a custom background
	add_custom_background();
	// Your changeable header business starts here
	define( 'HEADER_TEXTCOLOR', '#666633' );
	// No CSS, just IMG call. The %s is a placeholder for the theme template directory URI.
	define( 'HEADER_IMAGE', '%s/images/headers/anvil_header_bg.jpg' );
	// The height and width of your custom header. You can hook into the theme's own filters to change these values.
	// Add a filter to chrome_header_image_width and chrome_header_image_height to change these values.
	define( 'HEADER_IMAGE_WIDTH', 1076 );
	define( 'HEADER_IMAGE_HEIGHT', 145 );
	// We're not using post thumbnails for custom header images on posts and pages.
	// If we were, we would want them to be 1080 pixels wide by 145 pixels tall.
	// Accordingly, larger images will be auto-cropped to fit, smaller ones will be ignored. See header.php.
	// set_post_thumbnail_size( HEADER_IMAGE_WIDTH, HEADER_IMAGE_HEIGHT, true );
	// Don't support text inside the header image. 
	define( 'NO_HEADER_TEXT', false ); // default is true
	
	
        // Default custom headers packaged with the theme. %s is a placeholder for the theme template directory URI.
	register_default_headers( array(
		'option-one' => array(
			'url' => '%s/images/headers/anvil_header_bg.jpg',
			'thumbnail_url' => '%s/images/headers/anvil_header_bg_thumbnail.jpg',
			/* translators: header image description */
			'description' => __( 'Worsmith Anvil Header One', 'wordsmith-anvil' )
		),
		'option-two' => array(
			'url' => '%s/images/headers/anvil_header_bg2.jpg',
			'thumbnail_url' => '%s/images/headers/anvil_header_bg2_thumbnail.jpg',
			/* translators: header image description */
			'description' => __( 'Worsmith Anvil Header Two', 'wordsmith-anvil' )
		),
		'option-three' => array(
			'url' => '%s/images/headers/anvil_header_bg3.jpg',
			'thumbnail_url' => '%s/images/headers/anvil_header_bg3_thumbnail.jpg',
			/* translators: header image description */
			'description' => __( 'Worsmith Anvil Header Three', 'wordsmith-anvil' )
		),
		'plain-white' => array(
			'url' => '%s/images/headers/anvil_header_white.jpg',
			'thumbnail_url' => '%s/images/headers/anvil_header_white_thumbnail.jpg',
			/* translators: header image description */
			'description' => __( 'Worsmith Anvil Plain White Header', 'wordsmith-anvil' )
		),
		'khaki' => array(
			'url' => '%s/images/headers/anvil_header_khaki.jpg',
			'thumbnail_url' => '%s/images/headers/anvil_header_khaki_thumbnail.jpg',
			/* translators: header image description */
			'description' => __( 'Worsmith Anvil Khaki Header', 'wordsmith-anvil' )
		),
		'khaki-white' => array(
			'url' => '%s/images/headers/anvil_header_khaki_white.jpg',
			'thumbnail_url' => '%s/images/headers/anvil_header_khaki_white_thumbnail.jpg',
			/* translators: header image description */
			'description' => __( 'Worsmith Anvil Khaki n White Header', 'wordsmith-anvil' )
		),
		'two-olives' => array(
			'url' => '%s/images/headers/anvil_header_two_olives.jpg',
			'thumbnail_url' => '%s/images/headers/anvil_header_two_olives_thumbnail.jpg',
			/* translators: header image description */
			'description' => __( 'Worsmith Anvil Two Olives Header', 'wordsmith-anvil' )
		),
		'two-olives-textured' => array(
			'url' => '%s/images/headers/anvil_header_two_olives_textured.jpg',
			'thumbnail_url' => '%s/images/headers/anvil_header_two_olives_textured_thumbnail.jpg',
			/* translators: header image description */
			'description' => __( 'Worsmith Anvil Two Olives Textured Header', 'wordsmith-anvil' )
		),
		'tri-colored-textured' => array(
			'url' => '%s/images/headers/anvil_header_tri_color_textured.jpg',
			'thumbnail_url' => '%s/images/headers/anvil_header_tri_color_textured_thumbnail.jpg',
			/* translators: header image description */
			'description' => __( 'Worsmith Anvil Tri-Colored Textured Header', 'wordsmith-anvil' )
		)
	) );
}
endif;
	if ( ! function_exists( 'anvil_admin_header_style' ) ) :
	/**
	 * Styles the header image displayed on the Appearance > Header admin panel.
	 *
	 * Referenced via add_custom_image_header() .
	 *
	 */
	function anvil_admin_header_style() {
	?>
	<style type="text/css">
	/* Shows the same border as on front end */
	#headimg {
		height: <?php echo HEADER_IMAGE_HEIGHT; ?>px;
		width: <?php echo HEADER_IMAGE_WIDTH; ?>px;
	}
	/* If NO_HEADER_TEXT is false, you would style the text with these selectors:
		#headimg #name { }
		#headimg #desc { }
	*/
	</style>
	<?php
	}
	endif;
	function anvil_header_style() {
	?>
	<style type="text/css">
	#header { 
		background: url(<?php header_image() ?>) no-repeat top center;
		border: none;
		
		width: 1076px;
		border-style: none; 
		overflow: visible; 
		display: block; 
		background-position: 0 0; } 
	#header { margin: 0 auto !important; margin:30px 0 0 0; padding: 0 4px 0 4px; width: 1072px;} 
	</style>
	<?php
	}
	// Add a way for the custom header to be styled in the admin panel that controls
		// custom headers. See chrome_admin_header_style(), below.
		add_custom_image_header( 'anvil_header_style', 'anvil_admin_header_style' );
		// ... and thus ends the changeable header business.
	/*Custom thumbnails (for more details see: http://markjaquith.wordpress.com/2009/12/23/new-in-wordpress-2-9-post-thumbnail-images/)
	set_post_thumbnail_size() just calls add_image_size( 'post-thumbnail' ) — the default Post Thumbnail "handle." But as you can see, you can add additional ones by calling add_image_size( $handle, $width, $height, {$hard_crop_switch} );, and then you use that new size by passing the handle to the_post_thumbnail( $handle );
	------------------------------------------------------------ */
	if ( function_exists( 'add_theme_support' ) ) { // Added in 2.9 - dont really need this added function line for ver 2.9+
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 50, 50, true ); // Normal post thumbnails
		add_image_size( 'single-post-thumbnail', 400, 400 ); // Permalink thumbnail is width x height. If you do not want the thumbnail width or height to be cropped set the size to e.g., 400, 9999
		add_image_size( 'index-thumb', 150, 150, true ); 
		add_image_size( 'mini-thumb', 30, 30, true ); 
		add_image_size( 'small-thumb', 75, 75, true );
		add_image_size( 'big-image', 600, 600, true );
		add_image_size( 'page-thumbnail', 300, 300 );
}

	if ( isset($options['removewpautop']) && ($options['removewpautop']!="") )  
                         $nocommentp ;
						 $noexcerptp;
	# REMOVE BAD BR TAGS FROM SIGN-UP FORMS
		add_filter('the_content', 'anvil_remove_bad_br_tags');
		function anvil_remove_bad_br_tags($content) {
			$content = str_ireplace("</label><br />", "</label>", $content);
			return $content;
		}
	# REMOVE BAD P WRAPS AROUND CLOSING ANCHOR TAGS
		add_filter('the_content', 'anvil_remove_bad_p_wraps');
		function anvil_remove_bad_p_wraps($content) {
			$content = str_ireplace("<p></a></p>", "</a>", $content);
			return $content;
		}	
	# DISPLAY BLOG TITLE SIZE BASED ON NUMBER OF CHARACTERS IN TITLE
		if ( ! function_exists( 'anvil_title_display_w_logo' ) ) :
		function anvil_title_display_w_logo($blogname) {
			$blog_title = get_bloginfo();
			if (strlen ($blog_title) < 17 ) {
				$blogname = '<a href="' . get_home_url() . '">' . $blog_title . '</a>';
			} else if (strlen ($blog_title) >= 17 && (strlen ($blog_title) < 31 ) ) {
				$blogname = '<span class="thirtyeightpx"><a href="' . get_home_url() . '">' . $blog_title . '</a></span>';
			} else if (strlen ($blog_title) >= 31 && (strlen ($blog_title) < 64 ) ) {
				$blogname = '<span class="thirtytwopx"><a href="' . get_home_url() . '">' . $blog_title . '</a></span>';
			} else if (strlen ($blog_title) >= 64 && (strlen ($blog_title) < 80 ) ) {
				$blogname = '<span class="twentypx"><a href="' . get_home_url() . '">' . $blog_title . '</a></span>';
			} else {
				$blogname = '<span class="sixteenpx"><a href="' . get_home_url() . '">' . $blog_title . '</a></span>';
			}
			echo $blogname;
		} 
		endif; 
		
		if ( ! function_exists( 'anvil_title_display_no_logo' ) ) :
		function anvil_title_display_no_logo($blognamenolo) {
			$blog_title = get_bloginfo();
			if (strlen ($blog_title) < 26 ) {
				$blognamenolo = '<a href="' . get_home_url() . '">' . $blog_title . '</a>';
			} else if (strlen ($blog_title) >= 26 && (strlen ($blog_title) < 48 ) ) {
				$blognamenolo = '<span class="sixsix"><a href="' . get_home_url() . '">' . $blog_title . '</a></span>';
			} else if (strlen ($blog_title) >= 48 && (strlen ($blog_title) < 60 ) ) {
				$blognamenolo = '<span class="fiveoh"><a href="' . get_home_url() . '">' . $blog_title . '</a></span>';
			} else if (strlen ($blog_title) >= 60 && (strlen ($blog_title) < 80 ) ) {
				$blognamenolo = '<span class="threethree"><a href="' . get_home_url() . '">' . $blog_title . '</a></span>';
			} else {
				$blognamenolo = '<span class="overforty"><a href="' . get_home_url() . '">' . $blog_title . '</a></span>';
			}
			echo $blognamenolo;
		}	
		endif;	
?>