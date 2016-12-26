<?php get_header(); ?>
    <div id="main-content">
    <?php global $more; ?>
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div <?php post_class() ?> id="post-<?php the_ID(); ?>">
			<h2><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></h2>
			<div class="metabar">    
                <?php get_template_part( 'inc/meta' );           // Meta Include File  - locate_template() will not work - (inc/meta.php) ?>
            </div><!-- END of metabar --> 
            <div class="entry">
            <a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php if ( has_post_thumbnail($post->ID) ) the_post_thumbnail('small-thumb', array('class' => 'index-post-thm alignleft border') ); // for a larger thumbnail image change 'small-thumb' to 'index-thumb' ?></a> 
                    <?php // Display an Excerpt
						global $options;
						if( isset($options['show_excerpt']) && ($options['show_excerpt']!='') )  {
						the_excerpt(); 
						} else {  the_content();  } ?>
			</div><!--END entry--><br class="clearboth" />
			<div class="postmetadata">
				<?php the_tags('Tags: ', ', ', '<br />'); ?>
				Postano <?php the_category(', ') ?> | 
				<?php comments_popup_link('No Comments &#187;', '1 Comment &#187;', '% Comments &#187;'); ?>
			</div><!--END postmetadata-->
		</div><!--END post-->
	<?php endwhile; ?>
	<?php get_template_part( 'inc/nav' );           // Navigation bar (inc/nav.php) ?>
	<?php else : ?>

		<p><?php _e( 'Whoops. Oddly enough, it appears there were no results found that match your request. Perhaps searching will help find a related post.', 'wordsmith-anvil' ); ?></p>
			<div class="aligncenter"><?php get_search_form(); ?></div><!--END search_form()-->
	<?php endif; ?>
	</div><!-- END of main-content -->
<?php get_sidebar(); ?>
<?php get_footer(); ?>