<?php global $options, $directory, $blognamenolo; $options = get_option('anvil_theme_options'); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<!-- basic meta data -->
	<meta charset="<?php bloginfo('charset'); ?>" />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
	<?php if (is_search()) { ?>
	   <meta name="robots" content="noindex, nofollow" /> 
	<?php } ?>
     <!-- Favicon: You will need to add your own code for a favicon here. Removed due to Theme Reveiw Guildelines -->  
	<title>
		   <?php
		      if (function_exists('is_tag') && is_tag()) {
		         single_tag_title("Tag Archive for &quot;"); echo '&quot; - '; }
		      elseif (is_archive()) {
		         wp_title(''); echo ' Archive - '; }
		      elseif (is_search()) {
		         echo 'Search for &quot;'.esc_html($s).'&quot; - '; }
		      elseif (!(is_404()) && (is_single()) || (is_page())) {
		         wp_title(''); echo ' - '; }
		      elseif (is_404()) {
		         echo 'Not Found - '; }
		      if (is_home()) {
		         bloginfo('name'); echo ' - '; bloginfo('description'); }
		      else {
		          bloginfo('name'); }
		      if ($paged>1) {
		         echo ' - page '. $paged; }
		   ?>
	</title>
	<!--Stylesheets-->  
	<?php wp_enqueue_style('default-style'); ?>
    <?php wp_enqueue_style('font-styles'); ?>
    <?php wp_enqueue_style('main-styles'); ?>
    <?php if (is_page_template('page_product.php')) wp_enqueue_style('page-product'); ?> 
    <?php if (is_page_template('page_categories.php')) wp_enqueue_style('page-categories'); ?> 
    <?php if (is_page_template('page_home.php')) wp_enqueue_style('page-home'); ?>
    <?php wp_enqueue_style('ie-styles'); ?>   
    <?php if (isset($options['no_pseudo_first_letter']) && ($options['no_pseudo_first_letter']!='') ) { ?>
    <?php anvil_load_custom_styles();  ?>  
    <?php } ?>
    
    <?php get_template_part( 'inc/isie' ); // locate_template() does not work here ?>     

   <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" /> 
    <!-- Scripts -->
	<?php if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' ); ?>
	<?php //wp_head(); ?>

	<?php wp_enqueue_script( 'anvil-nav-hover' ); ?>

    <?php wp_enqueue_script( 'anvil-header' ); ?>
    <?php if (is_singular()) wp_enqueue_script( 'anvil-spt' ); ?>

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div id="page-wrap" class="clearit">
    	<div id="mast"></div><!-- END of mast -->
        <div id="header"><div id="headimg"></div>
			<header class="sitename">
                <?php if ( isset($options['logo']) && ($options['logo']!="") && ($options['logo_img']!="")) { ?>
                <div id="logo"><a href="<?php echo home_url(); ?>"><img src="<?php echo $directory . '/images/' . stripslashes($options['logo_img']); ?>" width="400" height="200" alt="<?php stripslashes($options['logo_img_alt']); ?>"></a></div><!--END logo-->
                    <?php } if ( isset($options['anvillogo'] ) ) { ?>
                    <div id="logo"><a href="<?php echo home_url(); ?>"><img src="<?php echo get_template_directory_uri() . '/images/logo.png' ; ?>" width="400" height="200" alt=""></a></div><!--END logo--> 
                    <?php } else { ?>
                    <?php // do nothing ?>
              <?php } ?>      
                
                <?php // added option to not display the title ?>
                
                <?php if ( isset($options['title']) && ($options['title']!="") ) { ?>
                	<h1 class="nologo"><?php // nothing here ?></h1>
                    <?php } else { ?>
					<?php if ( empty($options['logo']) && empty($options['anvillogo'] ) ) { ?>
                    <h1 class="nologo"><?php anvil_title_display_no_logo($blognamenolo); ?></h1>
                    	<?php } else { ?>
                        <h1><?php anvil_title_display_w_logo($blogname); ?></h1>
                        <?php } ?>  
                <?php } ?> 
                
                <?php get_template_part( 'inc/subscribe' ); // locate_template() does not work here ?>
                
                
        	</header>        
        </div><!-- END header --> 