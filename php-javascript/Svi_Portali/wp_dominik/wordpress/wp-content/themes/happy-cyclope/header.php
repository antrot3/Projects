<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head profile="http://gmpg.org/xfn/11">
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta name="generator" content="WordPress" /> <!-- leave this for stats -->
	<title>
		<?php if (is_home () ) { bloginfo('name'); }
		elseif ( is_category() ) { single_cat_title(); echo ' - ' ; bloginfo('name'); }
		elseif (is_single() ) { single_post_title();}
		elseif (is_page() ) { single_post_title();}
		else { wp_title('',true); } ?>
	</title>
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<?php wp_head(); ?>
</head>
<body>
<div id="wrapper">
<div id="container">
	<div id="header">
		<div id="preheader">
			<h1><a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a></h1>
			<div id="description"><?php bloginfo('description'); ?></div>
		</div>
		<div id="imageheader">
			<div id="imglogo"><a href="<?php bloginfo('url'); ?>"><img src="<?php bloginfo('template_directory'); ?>/images/logo.jpg" alt="logo header" /></a></div>
			<div id="imgbg">
				<div id="rss"><a href="<?php bloginfo('rss2_url'); ?>"><img src="<?php bloginfo('template_directory'); ?>/images/rss.png" alt="rss" /></a> Subscribe to the <a href="<?php bloginfo('rss2_url'); ?>">feed</a></div>
				<div id="search"><?php include (TEMPLATEPATH . "/searchform.php"); ?></div>
			</div>
		</div>
	</div>